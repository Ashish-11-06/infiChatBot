import React, { useState } from 'react';
import { Form, Input, Button, Typography, Card, Divider, Row, Col, Image, Layout } from 'antd';
import { useNavigate } from 'react-router-dom';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axiosInstance from '../utils/axiosIntance';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import img from '../assets/login.gif';
import './Login.css'; // 👉 Add this line for external styling

const { Title, Text } = Typography;
const { Content } = Layout;

function Login() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.post('/api/login/', formData);
      if (response.status === 200 && response.data.message) {
        toast.success(response.data.message);
        setTimeout(() => navigate('/'), 2000);
      } else {
        toast.error('Login failed. Please try again.');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Login failed! Please check your credentials.';
      toast.error(errorMessage, {
        position: 'top-right',
        autoClose: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout className="login-layout">
      <Content>
        <Row justify="center" align="middle" className="login-row">
          <Col xs={24} sm={24} md={12} lg={10} xl={8} className="login-col">
            <Card bordered={false} className="login-card">
              <div className="login-header">
                <Title level={2} className="login-title">Welcome Back</Title>
                <Text type="secondary" className="login-subtitle">
                  Sign in to your account to continue
                </Text>
              </div>

              <Form layout="vertical" onFinish={handleSubmit}>
                <Form.Item
                  label="Username"
                  name="username"
                  rules={[{ required: true, message: 'Please input your username!' }]}
                >
                  <Input
                    prefix={<UserOutlined />}
                    placeholder="Username"
                    size="large"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    autoComplete="username"
                  />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[{ required: true, message: 'Please input your password!' }]}
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="Password"
                    size="large"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                  />
                </Form.Item>

                <Form.Item className="login-forgot">
                  <Button type="link" onClick={() => console.log('Forgot password clicked')}>
                    Forgot password?
                  </Button>
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    block
                    size="large"
                    loading={loading}
                    className="login-button"
                  >
                    Sign In
                  </Button>
                </Form.Item>

                <Divider className="login-divider">or</Divider>

                <Form.Item className="login-signup">
                  <Text>Don't have an account? </Text>
                  <Button
                    type="link"
                    onClick={() => navigate('/register')}
                    className="signup-link"
                  >
                    Sign up now
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>

          <Col xs={0} sm={0} md={12} lg={12} xl={12}>
            <div className="login-image-container">
              <Image src={img} alt="Login Visual" preview={false} className="login-image" />
            </div>
          </Col>
        </Row>
      </Content>
      <ToastContainer />
    </Layout>
  );
}

export default Login;
