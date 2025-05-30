import React from 'react';
import { Typography, Card, Button, Space } from 'antd';
import { SmileOutlined, HomeOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

const ThankU = () => {
  const particlesCount = 15;

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap"
        rel="stylesheet"
      />
      <div
        style={{
          fontFamily: "'Poppins', sans-serif",
          position: 'relative',
          display: 'flex',
          height: '92vh',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #f5f5f5 0%, #fafafa 100%)',
          padding: 20,
          overflow: 'hidden',
        }}
      >
        {/* Particles container behind the card */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        >
          {[...Array(particlesCount)].map((_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                borderRadius: '50%',
                backgroundColor: `rgba(111,44,145,${Math.random() * 0.25 + 0.15})`,
                width: `${Math.random() * 10 + 7}px`,
                height: `${Math.random() * 10 + 7}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `floatUpDown ${Math.random() * 6 + 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 6}s`,
                filter: 'blur(0.5px)',
                boxShadow: `0 0 8px rgba(111,44,145,0.35)`,
                opacity: 0.75,
              }}
            />
          ))}
        </div>

        {/* Card container */}
        <Card
          bordered={false}
          style={{
            maxWidth: 460,
            width: '100%',
            textAlign: 'center',
            borderRadius: 22,
            padding: 52,
            background: 'rgba(255, 255, 255, 0.48)',
            boxShadow: '0 12px 30px rgba(111,44,145,0.28)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            border: '1.5px solid rgba(111,44,145,0.18)',
            position: 'relative',
            zIndex: 1, // Make sure card is above particles
            animation: 'fadeSlideUp 1.2s ease forwards',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            cursor: 'default',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'perspective(600px) rotateX(4deg) rotateY(6deg)';
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(111,44,145,0.5)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg)';
            e.currentTarget.style.boxShadow = '0 12px 30px rgba(111,44,145,0.28)';
          }}
        >
          <SmileOutlined
            style={{
              fontSize: 88,
              color: '#6f2c91',
              marginBottom: 22,
              animation: 'bounce 2.5s infinite',
              textShadow: '0 2px 10px rgba(111,44,145,0.4)',
              position: 'relative',
            }}
          />
          {/* Sparkle effect */}
          <div
            style={{
              position: 'absolute',
              top: '30%',
              left: '55%',
              width: 0,
              height: 0,
              borderRadius: '50%',
              backgroundColor: '#9b59b6',
                boxShadow: '0 0 4px 1.5px #9b59b6',
              filter: 'blur(1.5px)',
              animation: 'sparkle 2.8s ease-in-out infinite',
              pointerEvents: 'none',
              zIndex: 2,
            }}
          />

          <Title
            level={2}
            style={{
              background: 'linear-gradient(90deg, #6f2c91, #7a3caa)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: 28,
              fontWeight: 900,
              letterSpacing: '0.03em',
              textShadow: '0 4px 14px rgba(111,44,145,0.35)',
            }}
          >
            Thank you for visiting!
          </Title>
          <Paragraph
            style={{
              fontSize: 19,
              color: '#555555',
              marginBottom: 44,
              lineHeight: 1.7,
              fontWeight: 600,
              letterSpacing: '0.01em',
            }}
          >
            We appreciate your time and hope you found this useful.
          </Paragraph>
          <Space size="large">
            <Button
              type="primary"
              shape="round"
              size="large"
              onClick={() => (window.location.href = '/')}
              icon={<HomeOutlined />}
              style={{
                background: 'linear-gradient(135deg, #6f2c91 0%, #7a3caa 100%)',
                border: 'none',
                fontWeight: '700',
                padding: '0 40px',
                boxShadow: '0 0 12px rgba(111,44,145,0.8), 0 6px 20px rgba(122,60,170,0.65)',
                transition: 'all 0.4s ease',
                userSelect: 'none',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow =
                  '0 0 28px rgba(122,60,170,1), 0 8px 28px rgba(122,60,170,0.85)';
                e.currentTarget.style.transform = 'scale(1.12)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow =
                  '0 0 12px rgba(111,44,145,0.8), 0 6px 20px rgba(122,60,170,0.65)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              Back to Home
            </Button>
          </Space>
          <Text
            type="secondary"
            style={{
              display: 'block',
              marginTop: 38,
              fontSize: 13,
              opacity: 0.6,
              fontWeight: 500,
              letterSpacing: '0.04em',
            }}
          >
            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
          </Text>
        </Card>

        <style>
          {`
            @keyframes bounce {
              0%, 100% {
                transform: translateY(0);
              }
              50% {
                transform: translateY(-18px);
              }
            }
            @keyframes floatUpDown {
              0%, 100% {
                transform: translateY(0);
                opacity: 0.6;
              }
              50% {
                transform: translateY(-15px);
                opacity: 1;
              }
            }
            @keyframes fadeSlideUp {
              0% {
                opacity: 0;
                transform: translateY(30px);
              }
              100% {
                opacity: 1;
                transform: translateY(0);
              }
            }
            @keyframes sparkle {
              0%, 100% {
                opacity: 0.3;
                transform: scale(1);
              }
              50% {
                opacity: 1;
                transform: scale(1.3);
              }
            }
          `}
        </style>
      </div>
    </>
  );
};

export default ThankU;
