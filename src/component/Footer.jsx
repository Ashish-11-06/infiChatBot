import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Row, Col, Divider, Typography, Space, Image } from 'antd';
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaWhatsapp,
} from 'react-icons/fa';
import img from '../assets/foot.gif'; // Your chatbot GIF

const { Footer: AntFooter } = Layout;
const { Text, Title } = Typography;

const socialLinks = [
  { icon: <FaFacebook />, url: 'https://www.facebook.com/prushal', label: 'Facebook' },
  { icon: <FaInstagram />, url: 'https://www.instagram.com/prushaltech/', label: 'Instagram' },
  { icon: <FaLinkedin />, url: 'https://www.linkedin.com/company/prushal-technology-pvt-ltd/', label: 'LinkedIn' },
  { icon: <FaYoutube />, url: 'https://www.youtube.com/@prushaltechnology8846', label: 'YouTube' },
  { icon: <FaWhatsapp />, url: 'https://wa.me/919850113269', label: 'WhatsApp' },
];

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <AntFooter style={{ 
      background: '#4e1b6b',
      color: 'rgba(255, 255, 255, 0.85)',
      padding: '40px 0 0'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        <Row gutter={[32, 32]}>
          {/* GIF Section */}
          <Col xs={24} md={8}>
            <Space direction="vertical" align="center" style={{ width: '100%' }}>
              <Image
                src={img}
                alt="AI Chatbot"
                preview={false}
                width={150}
                style={{ borderRadius: '8px' }}
              />
            </Space>
          </Col>

          {/* Quick Links */}
          <Col xs={24} md={8}>
            <Title level={4} style={{ color: 'rgba(255, 255, 255, 0.85)', marginBottom: '16px' }}>
              Quick Links
            </Title>
            <Space direction="vertical">
              <Link to="/about" style={{ color: 'rgba(255, 255, 255, 0.65)' }}>About Us</Link>
              <Link to="/contact" style={{ color: 'rgba(255, 255, 255, 0.65)' }}>Contact Us</Link>
              <Link to="/login" style={{ color: 'rgba(255, 255, 255, 0.65)' }}>Login</Link>
            </Space>
          </Col>

          {/* Contact Info */}
          <Col xs={24} md={8}>
            <Title level={4} style={{ color: 'rgba(255, 255, 255, 0.85)', marginBottom: '16px' }}>
              Contact
            </Title>
            <Space direction="vertical">
              <a href="mailto:info@indeedinspiring.com" style={{ color: 'rgba(255, 255, 255, 0.65)' }}>info@indeedinspiring.com</a>
              <a href="tel:+919850113269" style={{ color: 'rgba(255, 255, 255, 0.65)' }}>(+91) 9850113269</a>
              <a href="tel:+919850603269" style={{ color: 'rgba(255, 255, 255, 0.65)' }}>(+91) 9850603269</a>
              <a href="tel:+919850803269" style={{ color: 'rgba(255, 255, 255, 0.65)' }}>(+91) 9850803269</a>
              <a href="tel:+919762203269" style={{ color: 'rgba(255, 255, 255, 0.65)' }}>(+91) 9762203269</a>
            </Space>
          </Col>
        </Row>

        <Divider style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />

        {/* Social Links */}
        <Row justify="center" style={{ marginBottom: '24px' }}>
          <Col>
            <Space size="large">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  style={{ 
                    color: 'rgba(255, 255, 255, 0.65)',
                    fontSize: '20px',
                    transition: 'color 0.3s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.65)'}
                >
                  {item.icon}
                </a>
              ))}
            </Space>
          </Col>
        </Row>

        {/* Copyright */}
        <Row justify="center">
          <Col>
            <Text style={{ color: 'rgba(255, 255, 255, 0.45)' }}>
              Infi-Chat ©{currentYear} | AI powered by <Text strong style={{ color: 'rgba(255, 255, 255, 0.65)' }}>Indeed Inspiring Inotech</Text>
            </Text>
          </Col>
        </Row>
      </div>
    </AntFooter>
  );
}

export default Footer;