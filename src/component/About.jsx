import React, { useEffect } from 'react';
import { Typography, Card, Divider, Carousel, Layout, Row, Col } from 'antd';
import AOS from 'aos';
import 'aos/dist/aos.css';

const { Title, Paragraph } = Typography;
const { Content } = Layout;

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <Layout style={{ background: '#fff', padding: '24px' }}>
      <Content>
        {/* Hero Section */}
        <Row justify="center" data-aos="fade-down" style={{ textAlign: 'center', marginBottom: '40px' }}>
          <Col xs={24} md={20} lg={16}>
            <Title level={1}>
              About <span style={{ color: '#1890ff' }}>Infi-Chat</span>
            </Title>
            <Paragraph style={{ fontSize: '16px', color: '#555' }}>
              Welcome to Infi-Chat! We are dedicated to providing seamless and efficient communication solutions for everyone. 
              Our platform is designed to connect people and foster collaboration in real-time.
            </Paragraph>
            <Paragraph style={{ fontSize: '16px', color: '#555' }}>
              Whether you're chatting with friends, collaborating with colleagues, or building communities, 
              Infi-Chat is here to make your experience smooth and enjoyable.
            </Paragraph>
          </Col>
        </Row>

        {/* Testimonials Section */}
        <Divider orientation="center">What Our Teams Say</Divider>
        <Row justify="center" data-aos="zoom-in">
          <Col xs={24} md={18} lg={14}>
            <Carousel autoplay dotPosition="bottom">
              <div>
                <Card bordered hoverable style={{ textAlign: 'center' }}>
                  <Paragraph style={{ fontStyle: 'italic', fontSize: '16px' }}>
                    "Infi-Chat has completely transformed the way we communicate as a team. 
                    It's fast, reliable, and easy to use!"
                  </Paragraph>
                  <Paragraph strong>- Aarti, UI Developer</Paragraph>
                </Card>
              </div>
              <div>
                <Card bordered hoverable style={{ textAlign: 'center' }}>
                  <Paragraph style={{ fontStyle: 'italic', fontSize: '16px' }}>
                    "Deploying Infi-Chat was smooth and effortless. The system runs flawlessly even at scale!"
                  </Paragraph>
                  <Paragraph strong>- Ashish, DevOps & Deployment Lead</Paragraph>
                </Card>
              </div>
              <div>
                <Card bordered hoverable style={{ textAlign: 'center' }}>
                  <Paragraph style={{ fontStyle: 'italic', fontSize: '16px' }}>
                    "We loved working on the chatbot logic. It’s exciting to see it engaging users so effectively!"
                  </Paragraph>
                  <Paragraph strong>- Nikita & Akanksha, Chatbot Creators</Paragraph>
                </Card>
              </div>
            </Carousel>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default About;
