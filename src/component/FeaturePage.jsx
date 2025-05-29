import React from 'react';
import { Typography, Card, Row, Col, Divider, Button, Space, Image } from 'antd';
import { Typewriter } from 'react-simple-typewriter';
import {
  FaBrain, 
  FaBook, 
  FaHandsHelping,
  FaRobot, 
  FaQuestionCircle, 
  FaUserFriends, 
  FaRegCommentDots, 
  FaRegLightbulb,
  FaCogs, 
  FaCloud, 
  FaUserShield, 
  FaRegFileAlt, 
  FaSearch, 
  FaRegEnvelope,
  FaRegCheckCircle, 
  FaRegClock, 
  FaRegBell, 
  FaRegHandshake, 
  FaRegComments, 
  FaChartLine, 
  FaDatabase
} from 'react-icons/fa';

const { Title, Paragraph, Text } = Typography;

const features = [
  {
    icon: <FaBrain style={{ fontSize: '32px', color: '#1890ff' }} />,
    title: 'Contextual Conversations using NLU',
    description: 'Understands user intent and context, enabling natural, meaningful, and dynamic conversations using advanced Natural Language Understanding.'
  },
  {
    icon: <FaBook style={{ fontSize: '32px', color: '#1890ff' }} />,
    title: 'Pre-trained with FAQs and Internal Documents',
    description: `Instantly ready to answer common questions and reference your company's knowledge base, reducing setup time and improving accuracy.`
  },
  {
    icon: <FaHandsHelping style={{ fontSize: '32px', color: '#1890ff' }} />,
    title: 'Fallback and Escalation to Human Support',
    description: 'Seamlessly transfers complex or sensitive queries to human agents, ensuring users always get the help they need.'
  }
];

function Features() {
  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Hero Section */}
      <Space 
        direction="vertical" 
        align="center" 
        size="large" 
        style={{ 
          textAlign: 'center', 
          padding: '60px 0',
          background: '#f0f5ff',
          borderRadius: '8px',
          marginBottom: '48px'
        }}
      >
        <Title level={1} style={{ marginBottom: '16px' }}>
          <Text type="secondary">Features of </Text>
          <Text type="primary">
            <Typewriter
              words={['InFi-Chatbot']}
              loop={1}
              cursor
              cursorStyle="|"
              typeSpeed={120}
              deleteSpeed={0}
              delaySpeed={1000}
            />
          </Text>
        </Title>
        
        <Paragraph style={{ fontSize: '18px', maxWidth: '800px' }}>
          Discover the intelligent features that make InFi-Chatbot your best AI-powered assistant for business and support.
        </Paragraph>
        
        <Button 
          type="primary" 
          size="large"
          href="/register"
          style={{ marginTop: '24px' }}
        >
          Try Now
        </Button>
      </Space>

      {/* Features Section */}
      <Divider>
        <Title level={2} style={{ margin: 0 }}>Key Features</Title>
      </Divider>
      
      <Row gutter={[32, 32]} style={{ marginBottom: '48px' }}>
        {features.map((feature, index) => (
          <Col xs={24} md={8} key={index}>
            <Card 
              hoverable
              style={{ 
                height: '100%',
                textAlign: 'center',
                borderRadius: '8px'
              }}
            >
              <div style={{ marginBottom: '16px' }}>
                {feature.icon}
              </div>
              <Title level={3} style={{ marginBottom: '16px' }}>
                {feature.title}
              </Title>
              <Paragraph style={{ color: '#666' }}>
                {feature.description}
              </Paragraph>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Additional Features Section */}
      <Divider>
        <Title level={2} style={{ margin: 0 }}>More Capabilities</Title>
      </Divider>
      
      <Row gutter={[16, 16]} style={{ marginBottom: '48px' }}>
        {[
          { icon: <FaRobot />, title: 'Multi-platform Support' },
          { icon: <FaDatabase />, title: 'Knowledge Base Integration' },
          { icon: <FaChartLine />, title: 'Analytics Dashboard' },
          { icon: <FaUserFriends />, title: 'User Management' },
          { icon: <FaRegCommentDots />, title: 'Conversation History' },
          { icon: <FaRegFileAlt />, title: 'Document Processing' }
        ].map((item, index) => (
          <Col xs={12} sm={8} md={4} key={index}>
            <Card 
              hoverable
              style={{ 
                textAlign: 'center',
                borderRadius: '8px'
              }}
            >
              <div style={{ fontSize: '24px', color: '#1890ff', marginBottom: '8px' }}>
                {item.icon}
              </div>
              <Text strong>{item.title}</Text>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Features;