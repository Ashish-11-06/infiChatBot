import React, { useState, useRef, useEffect } from 'react';
import {
  Typography,
  Card,
  List,
  Space,
  Button,
  Avatar,
  theme,
  Tooltip,
} from 'antd';
import {
  CheckCircleTwoTone,
  RobotOutlined,
  AudioTwoTone,
  AudioMutedOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const instructions = [
  'Select the interview category (Technical, HR, Behavioral).',
  'Click "Start Interview" to begin.',
  'Speak or type your answer when a question is asked.',
  'After each answer, the bot will give instant feedback.',
  'You can skip a question or repeat it if needed.',
  'At the end, you’ll get a performance summary.',
];

const InterviewBot = () => {
  const { token } = theme.useToken();
  const navigate = useNavigate();

  const [agreed, setAgreed] = useState(false);
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const [recording, setRecording] = useState(false);
  const containerRef = useRef(null);

  const handleAgree = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      setStream(mediaStream);
      setAgreed(true);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play().catch(console.error);
      }

      if (containerRef.current) {
        if (containerRef.current.requestFullscreen) {
          await containerRef.current.requestFullscreen();
        } else if (containerRef.current.webkitRequestFullscreen) {
          containerRef.current.webkitRequestFullscreen();
        } else if (containerRef.current.msRequestFullscreen) {
          containerRef.current.msRequestFullscreen();
        }
      }
    } catch (err) {
      console.error('Error accessing camera or fullscreen:', err);
      alert('Could not access camera or fullscreen.');
    }
  };

  const handleStartRecording = () => {
    if (!stream) return;

    recordedChunksRef.current = [];

    const combinedStream = new MediaStream();
    stream.getVideoTracks().forEach((track) => combinedStream.addTrack(track));
    stream.getAudioTracks().forEach((track) => combinedStream.addTrack(track));

    const mediaRecorder = new MediaRecorder(combinedStream, {
      mimeType: 'video/webm; codecs=vp8,opus',
    });
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        recordedChunksRef.current.push(event.data);
      }
    };

    mediaRecorder.start();
    setRecording(true);
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `InterviewBot_recording_${new Date().toISOString()}.webm`;
        document.body.appendChild(a);
        a.click();

        setTimeout(() => {
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          navigate('/thanku');
        }, 100);
      };
    }
  };

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.onloadedmetadata = () => {
        videoRef.current.play().catch(console.error);
      };
    }

    return () => {
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, [stream]);

  return (
    <>
      <style>{`
        @keyframes pulseRed {
          0% { box-shadow: 0 0 8px #ff4d4fcc; }
          50% { box-shadow: 0 0 20px #ff4d4fcc; }
          100% { box-shadow: 0 0 8px #ff4d4fcc; }
        }
      `}</style>

      <div
        ref={containerRef}
        style={{
          padding: 40,
          maxWidth: 700,
          margin: '40px auto',
          background: `linear-gradient(135deg, ${token.colorBgLayout} 0%, ${token.colorPrimaryHover}33 100%)`,
          borderRadius: parseInt(token.borderRadiusLg, 10),
          boxShadow: `0 15px 40px ${token.colorPrimaryActive}4D`,
          minHeight: '70vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Space align="center" style={{ justifyContent: 'center', gap: 12 }}>
            <Avatar
              size={48}
              icon={<RobotOutlined />}
              style={{ backgroundColor: token.colorPrimaryActive }}
            />
            <Title
              level={2}
              style={{
                color: token.colorPrimaryActive,
                fontWeight: token.fontWeightBold,
                margin: 0,
                textShadow: `1px 1px 3px ${token.colorPrimary}80`,
              }}
            >
              InterviewBot
            </Title>
          </Space>

          {!agreed ? (
            <>
              <Paragraph
                style={{
                  fontSize: 17,
                  textAlign: 'center',
                  color: token.colorTextSecondary,
                  fontWeight: 500,
                  lineHeight: 1.7,
                  marginBottom: 32,
                }}
              >
                Prepare confidently with simulated interview questions and personalized feedback to help you ace your real interviews.
              </Paragraph>

              <Card
                bordered={false}
                style={{
                  borderRadius: parseInt(token.borderRadiusLg, 10),
                  backgroundColor: token.colorBgContainer,
                  boxShadow: `0 6px 18px ${token.colorPrimary}26`,
                  padding: '24px 32px',
                  fontSize: 16,
                  lineHeight: 1.8,
                  color: token.colorTextSecondary,
                  maxHeight: 320,
                  overflowY: 'auto',
                }}
                title={
                  <span
                    style={{
                      fontWeight: token.fontWeightBold,
                      fontSize: 20,
                      color: token.colorPrimary,
                      userSelect: 'none',
                      letterSpacing: 0.5,
                    }}
                  >
                    📝 Interview Instructions
                  </span>
                }
              >
                <List
                  dataSource={instructions}
                  renderItem={(item) => (
                    <List.Item
                      style={{
                        marginBottom: 8,
                        borderRadius: parseInt(token.borderRadiusBase, 10),
                        padding: '12px 16px',
                        backgroundColor: token.colorBgLayout,
                        boxShadow: `0 1px 4px ${token.colorPrimary}1A`,
                        transition: 'background-color 0.3s ease',
                        cursor: 'default',
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = `${token.colorPrimary}1A`)
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = token.colorBgLayout)
                      }
                    >
                      <Space>
                        <CheckCircleTwoTone
                          twoToneColor={token.colorPrimary}
                          style={{ fontSize: 20 }}
                        />
                        <span style={{ fontSize: 16, color: token.colorTextSecondary }}>
                          {item}
                        </span>
                      </Space>
                    </List.Item>
                  )}
                />
                <div style={{ textAlign: 'center', marginTop: 24 }}>
                  <Button
                    type="primary"
                    size="large"
                    shape="round"
                    onClick={handleAgree}
                    style={{
                      backgroundColor: token.colorPrimary,
                      borderColor: token.colorPrimary,
                      fontWeight: token.fontWeightBold,
                      fontSize: 16,
                      padding: '0 30px',
                      boxShadow: `0 8px 15px ${token.colorPrimaryActive}4D`,
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = token.colorPrimaryHover;
                      e.currentTarget.style.borderColor = token.colorPrimaryHover;
                      e.currentTarget.style.boxShadow = `0 10px 20px ${token.colorPrimaryHover}66`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = token.colorPrimary;
                      e.currentTarget.style.borderColor = token.colorPrimary;
                      e.currentTarget.style.boxShadow = `0 8px 15px ${token.colorPrimaryActive}4D`;
                    }}
                  >
                    Agree
                  </Button>
                </div>
              </Card>
            </>
          ) : (
            <>
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '75vh',
                  borderRadius: 16,
                  backgroundColor: '#000',
                  objectFit: 'contain',
                }}
              />

              <Space style={{ marginTop: 10, justifyContent: 'center', width: '100%' }}>
                {!recording ? (
                  <Tooltip title="Start Recording">
                    <Avatar
                      size={64}
                      icon={<AudioMutedOutlined style={{ fontSize: 28, color: '#8e44ad' }} />}
                      style={{
                        backgroundColor: '#fff',
                        boxShadow: `0 0 20px #8e44ad`,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease-in-out',
                      }}
                      onClick={handleStartRecording}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.15)';
                        e.currentTarget.style.boxShadow = `0 0 28px #9b59b6`; // lighter purple glow on hover
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = `0 0 20px #8e44ad`;
                      }}
                    />
                  </Tooltip>
                ) : (
                  <Tooltip title="Stop Recording">
                    <Avatar
                      size={64}
                      icon={<AudioTwoTone twoToneColor={token.colorPrimary} style={{ fontSize: 28 }} />}
                      style={{
                        backgroundColor: '#fff',
                        boxShadow: `0 0 16px ${token.colorPrimaryActive}`,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease-in-out',
                      }}
                      onClick={handleStopRecording}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.15)';
                        e.currentTarget.style.boxShadow = `0 0 24px ${token.colorPrimaryHover}`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = `0 0 16px ${token.colorPrimaryActive}`;
                      }}
                    />
                  </Tooltip>
                )}
              </Space>

            </>
          )}
        </Space>
      </div>
    </>
  );
};

export default InterviewBot;
