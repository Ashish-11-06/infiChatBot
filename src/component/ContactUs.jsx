import React, { useState } from 'react';
import {
  Row,
  Col,
  Typography,
  Button,
  Card,
  Form,
  Input,
} from 'antd';
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaWhatsapp,
} from 'react-icons/fa';

import './ContactUs.css';
import img from '../assets/contact.gif';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../utils/axiosIntance';

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

const socialLinks = [
  { icon: <FaFacebook />, url: 'https://www.facebook.com/prushal', label: 'Facebook' },
  { icon: <FaInstagram />, url: 'https://www.instagram.com/prushaltech/', label: 'Instagram' },
  { icon: <FaLinkedin />, url: 'https://www.linkedin.com/company/prushal-technology-pvt-ltd/', label: 'LinkedIn' },
  { icon: <FaYoutube />, url: 'https://www.youtube.com/@prushaltechnology8846', label: 'YouTube' },
  { icon: <FaWhatsapp />, url: 'https://wa.me/919850113269', label: 'WhatsApp' },
];

const ContactUs = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post('/api/contact/', values);
      toast.success(response.data.message || 'Message sent successfully!', {
        position: 'top-right',
      });
    } catch (error) {
      toast.error(
        error.response?.data?.error || 'Failed to send message. Please try again.',
        { position: 'top-right' }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-container contactus-narrow">
      <ToastContainer />
      <Row gutter={[32, 32]} align="middle" className="contact-hero-row">
        <Col xs={24} md={12}>
          <div className="contact-form-glass">
            <Title level={2} style={{ marginBottom: 30 }}>
              Contact <span className="accent-text">Us</span>
            </Title>
            <Form layout="vertical" onFinish={handleSubmit}>
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please enter your name' }]}
              >
                <Input placeholder="Enter your name" />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: 'Please enter your email' },
                  { type: 'email', message: 'Please enter a valid email' },
                ]}
              >
                <Input placeholder="Enter your email" />
              </Form.Item>

              <Form.Item
                label="Message"
                name="message"
                rules={[{ required: true, message: 'Please enter your message' }]}
              >
                <TextArea rows={4} placeholder="Type your message here..." />
              </Form.Item>

              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                style={{ width: '100%', marginTop: 20 }}
              >
                Send Message
              </Button>
            </Form>
          </div>
        </Col>

        <Col xs={24} md={12}>
          <div className="contact-art-box">
            <img
              src={img}
              alt="Contact Illustration"
              className="contact-chatbot-img"
              style={{ width: '100%', maxWidth: 220, margin: '0 auto', display: 'block' }}
            />
            <div className="social-media-section" style={{ marginTop: 30, textAlign: 'center' }}>
              <Title level={4} style={{ color: 'var(--primary-color)', marginBottom: 12 }}>
                Connect with us
              </Title>
              <div className="social-icons-row" style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
                {socialLinks.map(({ icon, url, label }) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    style={{ fontSize: 24, color: '#7B2CBF' }}
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Col>
      </Row>

      <div className="contact-info-section" style={{ marginTop: 60 }}>
        <Row gutter={[32, 32]}>
          <Col xs={24} md={8}>
            <Card bordered={false} className="contact-info-card">
              <Title level={4}>Indeed Inspiring Infotech</Title>
              <Paragraph>
                We resource Corporate Trainers on demand.
                <br />
                We impart professional trainings in domains that best fit corporates.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card bordered={false} className="contact-info-card">
              <Title level={4}>Address</Title>
              <Paragraph>
                Flat No 401<br />
                Vrindavan Society,<br />
                Near Samindradevi Market,<br />
                BAIF Road, Wagholi, Pune MH - 412207
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card bordered={false} className="contact-info-card">
              <Title level={4}>Contact</Title>
              <Paragraph>
                info@indeedinspiring.com<br />
                (+91) 9850113269<br />
                (+91) 9850603269<br />
                (+91) 9850803269<br />
                (+91) 9762203269
              </Paragraph>
            </Card>
          </Col>
        </Row>

        <div className="contact-map-section" style={{ marginTop: 36 }}>
          <iframe
            title="Company Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d682.6188161467643!2d73.98006358889943!3d18.574471260457578!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c3fbd4314181%3A0x8dd7d41e1bdef971!2sSachin%20Wanis%20house!5e1!3m2!1sen!2sin!4v1743762710000!5m2!1sen!2sin"
            width="100%"
            height="280"
            style={{ border: 0, borderRadius: 12, boxShadow: '0 8px 32px rgba(123, 44, 191, 0.10)' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
