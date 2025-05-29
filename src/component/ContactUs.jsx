import React, { useState } from 'react';
import {
  Row,
  Col,
  Typography,
  Button,
  Card,
  Form,
  Input,
  Divider,
} from 'antd';
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaWhatsapp,
} from 'react-icons/fa';

// import './ContactUs.css'
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
    <div className="home-container contactus-narrow" style={{ padding: '40px 0' , alignItems: 'center' , display: 'flex', flexDirection: 'column',width: '100%' }}>
      <ToastContainer />
 <Row
  gutter={[32, 32]}
  align="stretch" // Make sure children stretch vertically
  className="contact-hero-row"
  style={{ width: '100%', margin: '0 auto', height: '100%' }}
>
  <Col
    xs={24}
    md={12}
    style={{ display: 'flex', justifyContent: 'center', height: '100%' }} // fill height & center horizontally
  >
    <Card
      style={{
        borderRadius: 8,
        boxShadow: '0 1px 6px rgba(0,0,0,0.1)',
        padding: '24px',
        width: '80%',
        display: 'flex',
        flexDirection: 'column',
        height: '100%', // full height to match sibling
      }}
      className="contact-form-glass"
    >
      <Title level={2} style={{ marginBottom: 30 }}>
        Contact Us
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
     
    </Card>
  </Col>


  
  <Col
    xs={24}
    md={12}
    style={{ display: 'flex', justifyContent: 'center', height: '100%' }} // fill height & center horizontally
  >
    <Card
    bordered={false}
      style={{
       background: '#f5f5f5',
        height: '100%', // full height to match sibling
        boxShadow: '0 1px 6px rgba(255, 255, 255, 0)',
      }}
      className="contact-art-box"
    >
      <img
        src={img}
        alt="Contact Illustration"
        className="contact-chatbot-img"
        style={{ width: '100%', maxWidth: 410, margin: '0 auto', display: 'block' }}
      />
      <div className="social-media-section" style={{ marginTop: 30 , textAlign: 'center' }}>
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
    </Card>
  </Col>
</Row>

  <Divider
  style={{ margin: '40px 0', borderColor: '#7B2CBF', width: '80%' }}
  >
      </Divider>


    <div className="contact-info-section" style={{ marginTop: 60 }}>
  <Row gutter={[32, 32]} align="stretch">
    <Col xs={24} md={8} style={{ display: 'flex' }}>
      <Card
        
        className="contact-info-card"
        style={{ height: '100%', width: '100%' }}
      >
        <Title level={4}>Indeed Inspiring Infotech</Title>
        <Paragraph>
          We resource Corporate Trainers on demand.
          <br />
          We impart professional trainings in domains that best fit corporates.
        </Paragraph>
      </Card>
    </Col>

    <Col xs={24} md={8} style={{ display: 'flex' }}>
      <Card
        
        className="contact-info-card"
        style={{ height: '100%', width: '100%' }}
      >
        <Title level={4}>Address</Title>
        <Paragraph>
          Flat No 401<br />
          Vrindavan Society,<br />
          Near Samindradevi Market,<br />
          BAIF Road, Wagholi, Pune MH - 412207
        </Paragraph>
      </Card>
    </Col>

    <Col xs={24} md={8} style={{ display: 'flex' }}>
      <Card
        
        className="contact-info-card"
        style={{ height: '100%', width: '100%' }}
      >
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
      style={{
        border: 0,
        borderRadius: 12,
        boxShadow: '0 8px 32px rgba(123, 44, 191, 0.10)',
      }}
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
