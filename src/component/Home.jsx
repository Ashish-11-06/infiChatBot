import React from 'react';
import { Button, Typography, Card, Row, Col, Divider, Space, Image } from 'antd';
import { 
  RocketOutlined,
  MessageOutlined,
  CodeOutlined,
  TeamOutlined,
  CustomerServiceOutlined 
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import { Typewriter } from 'react-simple-typewriter';

// Import your image (make sure the path is correct)
import chatbotGif from '../assets/chatbot.gif';

const { Title, Paragraph, Text } = Typography;

function Home() {
  const navigate = useNavigate();

  const services = [
    {
      title: 'AI/ML Powered Chatbots',
      icon: <RocketOutlined style={{ fontSize: '32px' }} />,
      description: 'Advanced chatbots leveraging artificial intelligence and machine learning for intelligent conversations'
    },
    {
      title: 'Website Chatbots',
      icon: <CodeOutlined style={{ fontSize: '32px' }} />,
      description: 'Custom chatbots integrated seamlessly into your website for 24/7 customer support'
    },
    {
      title: 'Interview Bots',
      icon: <TeamOutlined style={{ fontSize: '32px' }} />,
      description: 'Smart interview assistants that can conduct preliminary screening and assessments'
    },
    {
      title: 'Indeed/Purshal Support',
      icon: <CustomerServiceOutlined style={{ fontSize: '32px' }} />,
      description: 'Specialized chatbots for Indeed and Purshal platforms to handle queries and support'
    }
  ];

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <Space direction="vertical" align="center" size="large" style={{ textAlign: 'center' }}>
          <Title level={1} style={{ marginBottom: 0 }}>
            Welcome to{' '}
            <Text type="success">
              <Typewriter
                words={['InFi-Chat']}
                loop={0}
                cursor
                cursorStyle="|"
                typeSpeed={100}
                deleteSpeed={80}
                delaySpeed={1200}
              />
            </Text>
          </Title>
          
          <Paragraph style={{ maxWidth: '800px', fontSize: '18px' }}>
            Infi-Chat is your AI-powered chatbot solution for Indeed and Purshal platforms,
            providing intelligent support, query resolution, and automated assistance.
            Our cutting-edge technology transforms how businesses interact with their users.
          </Paragraph>
          
          <Image
            src={chatbotGif}
            alt="AI animation"
            preview={false}
            width={200}
            style={{ margin: '20px 0' }}
          />
          
          <Space>
            <Button 
              type="primary" 
              size="large"
              onClick={() => navigate('/login')}
            >
              Get Started
            </Button>
            <Button 
              size="large"
              onClick={() => navigate('/register')}
            >
              Learn More
            </Button>
          </Space>
        </Space>
      </section>

      {/* Rest of your components remain the same... */}
      {/* Mission & Vision */}
      <Divider orientation="center">
        <Title level={3} style={{ margin: 0 }}>Our Purpose</Title>
      </Divider>
      
      <Row gutter={[40, 40]} justify="center">
        <Col xs={24} md={12}>
          <Card
            hoverable
            title={<Title level={3}>Our Vision</Title>}
          >
            <Paragraph>
              To revolutionize digital interactions through AI-powered conversational interfaces
              that understand, learn, and respond with human-like intelligence across all platforms.
            </Paragraph>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card
            hoverable
            title={<Title level={3}>Our Mission</Title>}
          >
            <Paragraph>
              To develop intelligent chatbot solutions that enhance user experience on Indeed and Purshal platforms,
              providing instant, accurate support while continuously learning and improving through advanced ML algorithms.
            </Paragraph>
          </Card>
        </Col>
      </Row>

      {/* Services */}
      <Divider orientation="center">
        <Title level={3} style={{ margin: 0 }}>Our Services</Title>
      </Divider>
      
      <Row gutter={[30, 30]} justify="center">
        {services.map((service, index) => (
          <Col xs={24} sm={12} md={6} key={index}>
            <Card
              hoverable
              cover={
                <div style={{ textAlign: 'center', padding: '24px 0' }}>
                  {service.icon}
                </div>
              }
            >
              <Card.Meta 
                title={service.title}
                description={service.description}
              />
            </Card>
          </Col>
        ))}
      </Row>

      {/* Testimonials */}
      <Divider orientation="center">
        <Title level={3} style={{ margin: 0 }}>What Our Clients Say</Title>
      </Divider>
      
      <Row justify="center">
        <Col xs={24} md={16}>
          <Card>
            <Paragraph italic style={{ fontSize: '16px' }}>
              "InFi-Chat transformed our customer support with its intelligent chatbot solution.
              Our response times improved by 70% and customer satisfaction scores skyrocketed."
            </Paragraph>
            <Paragraph strong style={{ textAlign: 'right' }}>
              - Sarah Johnson, CEO of TechSolutions
            </Paragraph>
          </Card>
        </Col>
      </Row>

      {/* Final CTA */}
      <section className="final-cta">
        <Space direction="vertical" align="center" size="large">
          <Title level={2} style={{ textAlign: 'center' }}>
            Ready to Transform Your Digital Interactions?
          </Title>
          <Button
            type="primary"
            size="large"
            onClick={() => navigate('/voicebot')}
          >
            Start Free Trial
          </Button>
        </Space>
      </section>
    </div>
  );
}

export default Home;