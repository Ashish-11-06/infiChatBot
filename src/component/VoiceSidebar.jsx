import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  HomeOutlined,
  AudioOutlined,
  ClusterOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { Layout, Menu, Avatar, Typography, Space, Divider } from 'antd';

const { Sider } = Layout;
const { Text } = Typography;

const VoiceSidebar = () => {
  const location = useLocation();

  const selectedKey = (() => {
    if (location.pathname.startsWith('/voicebot')) return 'voice';
    if (location.pathname.startsWith('/gmtt')) return 'gmtt';
    return 'home';
  })();

  return (
    <Sider
      width={220}
      style={{
        // minHeight: '100vh',
        // background: 'linear-gradient(135deg, #5a189a 0%, #10002b 100%)',
        // boxShadow: '2px 0 10px rgba(0, 0, 0, 0.1)',
        position: 'fixed',
        // left: 0,
        // top: 0,
        zIndex: 1,
      }}
    >
      <div style={{ padding: '16px 24px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div
          style={{
            width: 40,
            height: 40,
            background: '#3b82f6',
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: 18,
          }}
        >
          ∞
        </div>
        <Text style={{ color: 'white', fontSize: 18, margin: 0 }}>Infi Chat</Text>
      </div>

      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[selectedKey]}
        selectedKeys={[selectedKey]}
        style={{ background: 'transparent', borderRight: 0, color: 'white' }}
      >
        <Menu.Item key="home" icon={<HomeOutlined />} style={{ marginBlock: 4 }}>
          <Link to="/">Home Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="voice" icon={<AudioOutlined />} style={{ marginBlock: 4 }}>
          <Link to="/voicebot">Voice Bot</Link>
        </Menu.Item>
        <Menu.Item key="gmtt" icon={<ClusterOutlined />} style={{ marginBlock: 4 }}>
          <Link to="/gmtt">Give Me Tree</Link>
        </Menu.Item>
      </Menu>

      {/* <Divider style={{ background: 'rgba(255, 255, 255, 0.2)', margin: '16px 0' }} /> */}

      <div style={{ padding: '0 24px', marginTop: 'auto', color: 'white' }}>
        <Space align="center">
          <Avatar icon={<UserOutlined />} style={{ backgroundColor: 'rgba(255,255,255,0.15)' }} />
          <div>
            <Text strong style={{ color: 'white' }}>John Doe</Text>
            <br />
            <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12 }}>Admin</Text>
          </div>
          <Space size="middle">
            <SettingOutlined style={{ color: 'rgba(255, 255, 255, 0.7)', cursor: 'pointer' }} />
            <LogoutOutlined style={{ color: 'rgba(255, 255, 255, 0.7)', cursor: 'pointer' }} />
          </Space>
        </Space>
      </div>
    </Sider>
  );
};

export default VoiceSidebar;
