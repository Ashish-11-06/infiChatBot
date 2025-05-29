import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Space, Layout, Button, Typography } from 'antd';
import { 
  RocketFilled, 
  MessageFilled, 
  UserOutlined, 
  InfoCircleFilled 
} from '@ant-design/icons';

const { Header } = Layout;
const { Text } = Typography;

function Navbar() {
  const location = useLocation();

  const getSelectedKey = () => {
    const pathMap = {
      '/': location.hash === '#features' ? 'features' : 'home',
      '/about': 'about',
      '/login': 'login',
      '/register': 'register',
      '/features': 'features',
      '/contact': 'contactus'
    };
    return pathMap[location.pathname] || '';
  };

  const menuItems = [
    {
      key: 'home',
      icon: <RocketFilled />,
      label: <Link to="/">Home</Link>,
    },
    {
      key: 'about',
      icon: <InfoCircleFilled />,
      label: <Link to="/about">About</Link>,
    },
    {
      key: 'features',
      icon: <MessageFilled />,
      label: <Link to="/features">Features</Link>,
    },
    {
      key: 'contactus',
      label: <Link to="/contact">Contact Us</Link>,
    },
    {
      key: 'login',
      icon: <UserOutlined />,
      label: <Link to="/login">Login</Link>,
        },
    {
      key: 'register',
      label: (
        <Link to="/register">
          <Button type="primary">Register</Button>
        </Link>
      ),
    },
  ];

  return (
    <Header style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      background: '#4e1b6b',
      position: 'fixed',  // Changed from sticky to fixed
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,       // Higher z-index to stay on top
      height: '50px',
      // boxShadow: '0 2px 8px rgba(0,0,0,0.15)', // optional shadow for separation
    }}>
      {/* Logo Section */}
      <Link to="/" style={{
        alignItems: 'center',
        textDecoration: 'none'
      }}>
        <Space>
          <RocketFilled style={{ fontSize: '24px'}} />
          <Text strong style={{ 
            color: 'rgba(255, 255, 255, 0.85)',
            fontSize: '18px'
          }}>
            Infi-Chat
          </Text>
        </Space>
      </Link>

      {/* Navigation Menu */}
      <Menu
        mode="horizontal"
        selectedKeys={[getSelectedKey()]}
        items={menuItems}
        style={{
          justifyContent: 'flex-end',
          borderBottom: 'none',
          background: 'transparent',
          color: 'rgba(255, 255, 255, 0.85)',
        }}
      />
    </Header>
  );
}

export default Navbar;
