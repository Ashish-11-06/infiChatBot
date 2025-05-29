import React, { useState } from 'react';
import { Form, Input, Button, Typography, Card, Divider, message, notification } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosIntance';

const { Title, Text } = Typography;

function Registration() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.post('/api/register/', formData);
      if (response.status === 201 && response.data.message) {
        notification.success({
          message: 'Success',
          description: response.data.message,
        });
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        notification.error({
          message: 'Registration Failed',
          description: 'Please try again.',
        });
      }
    } catch (error) {
      const backendMessage =
        error.response?.data?.message ||
        error.response?.data?.detail ||
        JSON.stringify(error.response?.data) ||
        error.message;

      notification.error({
        message: 'Error',
        description: backendMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        // background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
        padding: '20px',
      }}
    >
      <Card
        style={{
          width: '100%',
          maxWidth: '500px',
          // borderRadius: '12px',
          // boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
          overflow: 'hidden',
          // marginTop: '-40px',
        }}
        bodyStyle={{ padding: '40px' }}
      >
        <div style={{ textAlign: 'center'}}>
          <Title level={2} >
            Create Account
          </Title>
          <Text type="secondary">Join us to get started</Text>
        </div>

        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Username"
            name="username"
            rules={[
              { required: true, message: 'Please input your username!' },
              { min: 3, message: 'Username must be at least 3 characters!' },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              name="username"
              value={formData.username}
              onChange={handleChange}
              size="large"
              placeholder="Enter your username"
            />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              name="email"
              value={formData.email}
              onChange={handleChange}
              size="large"
              placeholder="Enter your email"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: 'Please input your password!' },
              { min: 6, message: 'Password must be at least 6 characters!' },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              name="password"
              value={formData.password}
              onChange={handleChange}
              size="large"
              placeholder="Enter your password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              loading={loading}
            
            >
              Register
            </Button>
          </Form.Item>

          <Divider>Already have an account?</Divider>

          <Form.Item style={{ textAlign: 'center', marginBottom: 0 }}>
            <Text>Sign in to your account </Text>
            <Button
              type="link"
              onClick={() => navigate('/login')}
              style={{
                // padding: 0,
                // fontSize: '16px',
                // color: '#6a0dad',
                // fontWeight: '500',
              }}
            >
              Sign in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default Registration;
