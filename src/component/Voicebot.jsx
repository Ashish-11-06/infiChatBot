import React, { useState, useRef, useEffect } from 'react';
import axiosInstance from '../utils/axiosIntance';
import { 
  Layout, 
  Input, 
  Button, 
  List, 
  Typography, 
  Space,
  Avatar,
  Card,
  Row,
  Col,
  Divider,
  Popover,
  Tooltip,
  Switch,
  message as antMessage
} from 'antd';
import {
  UserOutlined, // Corrected icon import
  RobotOutlined,
  AudioOutlined,
  AudioMutedOutlined,
  MessageOutlined,
  SendOutlined,
  ClearOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion'; // Import framer-motion for animations

const { Header, Content, Footer } = Layout;
const { Text, Title } = Typography;
const { TextArea } = Input;

const Voicebot = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState('');
  const [inputMode, setInputMode] = useState('voice'); // 'voice' or 'text'
  const [isContinuousMode, setIsContinuousMode] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const chatContainerRef = useRef(null);
  const inputRef = useRef(null);
  const recognitionRef = useRef(null);
  const isRespondingRef = useRef(false);

  // Supported languages for speech synthesis
  const supportedLanguages = {
    en: { code: 'en-US', name: 'English' },
    hi: { code: 'hi-IN', name: 'Hindi' },
    mr: { code: 'mr-IN', name: 'Marathi' },
  };

  useEffect(() => {
    initializeSpeechRecognition();
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isContinuousMode, selectedLanguage]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, interimTranscript]);

  useEffect(() => {
    if (inputMode === 'text' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputMode]);

  const initializeSpeechRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      antMessage.warning("Speech Recognition is not supported in your browser.");
      setInputMode('text');
      return;
    }

    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    const recognition = new SpeechRecognition();
    recognition.lang = supportedLanguages[selectedLanguage].code;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    recognition.continuous = isContinuousMode;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => {
      setIsListening(false);
      if (isContinuousMode && !isRespondingRef.current) {
        recognition.start();
      }
    };

    recognition.onerror = (e) => {
      setIsListening(false);
      if (e.error !== 'no-speech') {
        addMessage(`Error: ${e.error}`, 'bot');
      }
    };

    recognition.onresult = (event) => {
      let interim = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interim += event.results[i][0].transcript;
        }
      }

      setInterimTranscript(interim);

      if (finalTranscript) {
        setInterimTranscript('');
        const lower = finalTranscript.trim().toLowerCase();
        if (lower.includes('bye') || lower.includes('exit')) {
          recognition.stop();
        }
        submitMessage(finalTranscript.trim());
      }
    };

    recognitionRef.current = recognition;
  };

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  const addMessage = (text, sender, isTyping = false) => {
    const newMessage = { 
      id: Date.now(), 
      text, 
      sender, 
      isTyping,
      timestamp: new Date().toLocaleTimeString()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const toggleListening = () => {
    try {
      if (!recognitionRef.current) return;
    
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      try {
        recognitionRef.current.start();
      } catch (err) {
        antMessage.error("Failed to start voice recognition: " + err.message);
      }
    }
    } catch (error) {
      console.error("Error toggling listening state:", error);
    }
    
  };

  const botRespond = async (userMessage) => {
    const typingId = Date.now();
    isRespondingRef.current = true;
    addMessage('Typing...', 'bot', true);

    try {
      const response = await axiosInstance.post('/api/indeed-chat/', {
        query: userMessage,
        chatbot_type: 'indeed',
      });

      let botReply = response.data?.response || "Sorry, I didn't understand that. Could you please rephrase?";

      // Remove typing indicator
      setMessages(prev => prev.filter(msg => msg.id !== typingId));

      // Add empty message that we'll populate character by character
      const responseId = Date.now();
      setMessages(prev => [...prev, { id: responseId, text: '', sender: 'bot' }]);

      // Typewriter effect
      let i = 0;
      const interval = setInterval(() => {
        if (i < botReply.length) {
          setMessages(prev => prev.map(msg =>
            msg.id === responseId
              ? { ...msg, text: msg.text + botReply.charAt(i) }
              : msg
          ));
          i++;
        } else {
          clearInterval(interval);
          speakText(botReply, selectedLanguage);
        }
      }, 20);

    } catch (error) {
      setMessages(prev => prev.filter(msg => msg.id !== typingId));
      addMessage("Sorry, I'm having trouble connecting to the server.", 'bot');
      console.error('API Error:', error);
    } finally {
      isRespondingRef.current = false;
    }
  };

  const speakText = (text, langCode = 'en') => {
    if (!('speechSynthesis' in window)) return;

    // Cancel any ongoing speech
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }

    setIsSpeaking(true);

    const utterance = new SpeechSynthesisUtterance(text);
    const lang = supportedLanguages[langCode]?.code || 'en-US';
    utterance.lang = lang;

    // Try to find a suitable voice
    const voices = window.speechSynthesis.getVoices();
    const preferredVoices = voices.filter(voice => {
      const langMatch = voice.lang.toLowerCase().startsWith(lang.toLowerCase().slice(0,2));
      return langMatch;
    });

    if (preferredVoices.length > 0) {
      utterance.voice = preferredVoices[0];
    }

    utterance.rate = 1;
    utterance.pitch = 1;

    utterance.onend = () => {
      setIsSpeaking(false);
      if (isContinuousMode && recognitionRef.current && !isRespondingRef.current) {
        recognitionRef.current.start();
      }
    };

    utterance.onerror = (e) => {
      setIsSpeaking(false);
      console.error('Speech synthesis error:', e);
    };

    window.speechSynthesis.speak(utterance);
  };

  const submitMessage = async (message) => {
    if (!message.trim()) return;

    // Cancel any ongoing speech
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }

    addMessage(message, 'user');
    setInputText('');
    await botRespond(message);
  };

  const handleTextSubmit = (e) => {
    e.preventDefault();
    submitMessage(inputText);
  };

  const toggleInputMode = (mode) => {
    if (mode === inputMode) return;
    
    // Stop listening if switching from voice to text
    if (inputMode === 'voice' && isListening) {
      recognitionRef.current.stop();
    }
    
    setInputMode(mode);
  };

  const clearConversation = () => {
    setMessages([]);
    setInterimTranscript('');
    if (isListening) {
      recognitionRef.current.stop();
    }
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
  };

  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
    antMessage.info(`Language set to ${supportedLanguages[lang].name}`);
  };

  return (
    <Layout style={{ height: '100vh', background: '#f0f2f5' }}>
      <Header style={{ background: '#fff', padding: '0 20px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={4} style={{ margin: 0 }}>
              <Space>
                <RobotOutlined style={{ color: '#1890ff' }} />
                Voice Assistant
              </Space>
            </Title>
          </Col>
          <Col>
            <Space>
              <Tooltip title="Continuous Mode">
                <Switch 
                  checkedChildren="Continuous" 
                  unCheckedChildren="Manual" 
                  checked={isContinuousMode}
                  onChange={setIsContinuousMode}
                />
              </Tooltip>
              
              <Popover 
                placement="bottomRight"
                content={
                  <Space direction="vertical">
                    {Object.entries(supportedLanguages).map(([code, { name }]) => (
                      <Button 
                        key={code}
                        type={selectedLanguage === code ? 'primary' : 'default'}
                        onClick={() => handleLanguageChange(code)}
                      >
                        {name}
                      </Button>
                    ))}
                  </Space>
                }
                trigger="click"
              >
                <Button>Language: {supportedLanguages[selectedLanguage].name}</Button>
              </Popover>
            </Space>
          </Col>
        </Row>
      </Header>
      
      <Content style={{ padding: '20px', overflow: 'hidden' }}>
        <Card 
          style={{ 
            height: 'calc(100vh - 180px)', 
            display: 'flex', 
            flexDirection: 'column',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            background: 'linear-gradient(to bottom right, #ffffff, #f0f2f5)' // Gradient background
          }}
          bodyStyle={{ 
            padding: '16px',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}
        >
          <div 
            ref={chatContainerRef} 
            style={{ 
              flex: 1,
              overflowY: 'auto', 
              padding: '10px',
              marginBottom: '16px',
              background: '#fafafa',
              borderRadius: '4px'
            }}
          >
            {messages.length === 0 ? (
              <div style={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                alignItems: 'center',
                color: '#999'
              }}>
                <RobotOutlined style={{ fontSize: '48px', marginBottom: '16px' }} />
                <Text>How can I help you today?</Text>
                <Text>Try speaking or typing your question.</Text>
              </div>
            ) : (
              <List
                dataSource={messages}
                renderItem={msg => (
                  <motion.div 
                    key={msg.id}
                    initial={{ opacity: 0, translateY: 20 }} 
                    animate={{ opacity: 1, translateY: 0 }} 
                    transition={{ duration: 0.3 }}
                  >
                    <List.Item 
                      style={{ 
                        padding: '8px 0',
                        alignItems: 'flex-start',
                        background: msg.sender === 'user' ? '#f0f7ff' : 'transparent',
                        borderRadius: '4px',                                      
                        marginBottom: '4px'
                      }}
                    >
                      <List.Item.Meta
                        avatar={
                          <Avatar 
                            icon={msg.sender === 'user' ? <UserOutlined /> : <RobotOutlined />} // Corrected icon reference
                            style={{ 
                              background: msg.sender === 'user' ? '#1890ff' : '#722ed1' 
                            }} 
                          />
                        }
                        title={
                          <Space>
                            <Text strong>{msg.sender === 'user' ? 'You' : 'Assistant'}</Text>
                            <Text type="secondary" style={{ fontSize: '12px' }}>{msg.timestamp}</Text>
                          </Space>
                        }
                        description={
                          msg.isTyping ? (
                            <Text type="secondary">Typing...</Text>
                          ) : (
                            <Text>{msg.text}</Text>
                          )
                        }
                      />
                    </List.Item>
                  </motion.div>
                )}
              />
            )}
            
            {interimTranscript && (
              <div style={{ padding: '8px 16px', fontStyle: 'italic', color: '#666' }}>
                {interimTranscript}...
              </div>
            )}
          </div>
          
          <div style={{ marginTop: 'auto' }}>
            {inputMode === 'text' ? (
              <form onSubmit={handleTextSubmit}>
                <Space.Compact style={{ width: '100%' }}>
                  <TextArea
                    ref={inputRef}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Type your message here..."
                    autoSize={{ minRows: 1, maxRows: 4 }}
                    style={{ flex: 1 }}
                  />
                  <Button 
                    type="primary" 
                    htmlType="submit" 
                    icon={<SendOutlined />}
                    disabled={!inputText.trim()}
                  />
                </Space.Compact>
              </form>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <Button 
                  type={isListening ? 'default' : 'primary'} 
                  icon={isListening ? <AudioMutedOutlined /> : <AudioOutlined />}
                  onClick={toggleListening}
                  size="large"
                  style={{ width: '60%' }}
                >
                  {isListening ? 'Stop Listening' : 'Start Speaking'}
                </Button>
                {isListening && (
                  <div style={{ marginTop: '8px' }}>
                    <Text type="secondary">
                      {interimTranscript ? 'Listening...' : 'Waiting for your voice input...'}
                    </Text>
                  </div>
                )}
              </div>
            )}
            
            <Divider style={{ margin: '12px 0' }} />
            
            <Row justify="space-between">
              <Col>
                <Space>
                  <Tooltip title="Voice Input">
                    <Button 
                      shape="circle" 
                      icon={<AudioOutlined />} 
                      onClick={() => toggleInputMode('voice')}
                      type={inputMode === 'voice' ? 'primary' : 'default'}
                      disabled={isSpeaking}
                    />
                  </Tooltip>
                  <Tooltip title="Text Input">
                    <Button 
                      shape="circle" 
                      icon={< MessageOutlined />} 
                      onClick={() => toggleInputMode('text')}
                      type={inputMode === 'text' ? 'primary' : 'default'}
                    />
                  </Tooltip>
                </Space>
              </Col>
              <Col>
                <Tooltip title="Clear Conversation">
                  <Button 
                    shape="circle" 
                    icon={<ClearOutlined />} 
                    onClick={clearConversation}
                    danger
                  />
                </Tooltip>
              </Col>
            </Row>
          </div>
        </Card>
      </Content>
      
      <Footer style={{ textAlign: 'center', padding: '10px 20px' }}>
        <Text type="secondary">
          {isSpeaking ? 'Assistant is speaking...' : 'Ready to assist you'}
        </Text>
      </Footer>
    </Layout>
  );
};

export default Voicebot;
