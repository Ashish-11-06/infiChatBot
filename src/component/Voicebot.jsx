import React, { useState, useRef, useEffect } from 'react';
import axiosInstance from '../utils/axiosIntance';
import { 
  Layout, 
  Input, 
  Button, 
  List, 
  Typography, 
  Space 
} from 'antd';

const { Header, Content } = Layout;
const { Text } = Typography;

const Voicebot = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState('');
  const [inputMode, setInputMode] = useState('voice');
  const [shouldContinueListening, setShouldContinueListening] = useState(false);

  const chatContainerRef = useRef(null);
  const inputRef = useRef(null);
  const recognitionRef = useRef(null);
  const isRespondingRef = useRef(false);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => setIsListening(true);

      recognition.onend = () => {
        setIsListening(false);
        if (shouldContinueListening && !isRespondingRef.current) {
          recognition.start(); // Restart only if bot is not speaking
        }
      };

      recognition.onerror = (e) => {
        setIsListening(false);
        if (e.error === 'no-speech') {
          return;
        }
        addMessage(`Error: ${e.error}`, 'bot');
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
            setShouldContinueListening(false);
            recognition.stop();
          }
          recognition.stop(); // Pause mic while bot is responding
          submitMessage(finalTranscript.trim());
        }
      };

      recognitionRef.current = recognition;
    } else {
      addMessage("Speech Recognition is not supported in your browser.", 'bot');
    }

    return () => {
      if (recognitionRef.current) recognitionRef.current.stop();
    };
  }, [shouldContinueListening]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, interimTranscript]);

  useEffect(() => {
    if (inputMode === 'text' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputMode]);

  const addMessage = (text, sender, isTyping = false) => {
    const newMessage = { id: Date.now(), text, sender, isTyping };
    setMessages(prev => [...prev, newMessage]);
  };

  const toggleListening = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      setShouldContinueListening(false);
      recognitionRef.current.stop();
    } else {
      setShouldContinueListening(true);
      recognitionRef.current.start();
    }
  };

  const botRespond = async (message) => {
    const typingId = Date.now();
    isRespondingRef.current = true; // Block mic restart
    addMessage('Typing...', 'bot', true);

    try {
      const response = await axiosInstance.post('/api/indeed-chat/', {
        query: message,
        chatbot_type: 'indeed',
      });

      let botReply = response.data?.response || "";

      if (!botReply.trim()) {
        botReply = "Sorry, I didn't quite catch that. Could you please say it again?";
      }

      setMessages(prev => prev.filter(msg => msg.id !== typingId));

      const responseId = Date.now();
      setMessages(prev => [...prev, { id: responseId, text: '', sender: 'bot' }]);

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
          speakText(botReply, 'en', () => {
            isRespondingRef.current = false;
            if (shouldContinueListening && recognitionRef.current) {
              recognitionRef.current.start();
            }
          });
        }
      }, 30);

    } catch (error) {
      setMessages(prev => prev.filter(msg => msg.id !== typingId));
      addMessage("Sorry, something went wrong with the server.", 'bot');
      console.error('API Error:', error);
      isRespondingRef.current = false;
    }
  };

  const supportedLanguages = {
    en: 'en-US',   // English (US)
    hi: 'hi-IN',   // Hindi (India)
    mr: 'mr-IN',   // Marathi (India)
  };

  const speakText = (text, langCode = 'en', onEnd) => {
    if (!('speechSynthesis' in window)) {
      onEnd?.();
      return;
    }
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    const lang = supportedLanguages[langCode] || 'en-US';
    utterance.lang = lang;

    const voices = window.speechSynthesis.getVoices();
    const femaleVoices = voices.filter(voice => {
      const langMatch = voice.lang.toLowerCase().startsWith(lang.toLowerCase().slice(0,2));
      const isFemale = /female|woman|girl|zira|susan|amelia|google/i.test(voice.name);
      return langMatch && isFemale;
    });

    const selectedVoice = femaleVoices.length ? femaleVoices[0] : (voices[0] || null);

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.rate = 1;
    utterance.pitch = 1;

    utterance.onend = () => {
      onEnd?.();
    };

    window.speechSynthesis.speak(utterance);
  };

  const submitMessage = async (message) => {
    if (!message.trim()) return;

    if ('speechSynthesis' in window && window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }

    isRespondingRef.current = false;

    addMessage(message, 'user');
    setInputText('');
    await botRespond(message);
  };

  const handleTextSubmit = (e) => {
    e.preventDefault();
    submitMessage(inputText);
  };

  const toggleInputMode = (mode) => {
    setInputMode(mode);
    if (isListening && mode === 'text') {
      setShouldContinueListening(false);
      recognitionRef.current.stop();
    }
  };

  return (
    <Layout style={{ height: '100vh' }}>
      <Header>
        <h1 style={{ color: 'white' }}>Voicebot</h1>
      </Header>
      <Content style={{ padding: '20px' }}>
        <div ref={chatContainerRef} style={{ maxHeight: '65vh', overflowY: 'auto', marginBottom: '20px' }}>
          <List
            dataSource={messages}
            renderItem={msg => (
              <List.Item key={msg.id}>
                <Text strong={msg.sender === 'user'}>{msg.sender === 'user' ? 'You: ' : 'Bot: '}</Text>
                <Text>{msg.text}</Text>
              </List.Item>
            )}
          />
          {interimTranscript && (
            <Text italic>{interimTranscript}…</Text>
          )}
        </div>

        <Space direction="vertical" style={{ width: '100%' }}>
          {inputMode === 'text' ? (
            <form onSubmit={handleTextSubmit}>
              <Input
                ref={inputRef}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your message..."
                style={{ width: 'calc(100% - 100px)', marginRight: '10px' }}
              />
              <Button type="primary" htmlType="submit">Send</Button>
            </form>
          ) : (
            <Button onClick={toggleListening} type="default" icon={isListening ? "pause" : "play"}>
              {isListening ? 'Stop Listening' : 'Start Listening'}
            </Button>
          )}

          <Space>
            <Button onClick={() => toggleInputMode('voice')} type={inputMode === 'voice' ? 'primary' : 'default'}>
              Voice Mode
            </Button>
            <Button onClick={() => toggleInputMode('text')} type={inputMode === 'text' ? 'primary' : 'default'}>
              Text Mode
            </Button>
          </Space>
        </Space>
      </Content>
    </Layout>
  );
};

export default Voicebot;
