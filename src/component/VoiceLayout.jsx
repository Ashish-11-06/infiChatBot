import React from 'react';
import { Layout } from 'antd';
import { useLocation } from 'react-router-dom';
import VoiceSidebar from './VoiceSidebar';
import Voicebot from './Voicebot';
import GmttBot from './GmttBot';

const { Sider, Content } = Layout;

const VoiceLayout = () => {
  const location = useLocation();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        width={220}
        breakpoint="lg"
        collapsedWidth="0"
        theme="dark"
        style={{
          background: '#001529',
          boxShadow: '2px 0 6px rgba(0,0,0,0.1)',
          zIndex: 100,
        }}
      >
        <VoiceSidebar />
      </Sider>

      <Layout>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            background: '#fff',
            borderRadius: 8,
            minHeight: '100vh',
          }}
        >
          {location.pathname === '/gmtt' ? <GmttBot /> : <Voicebot />}
        </Content>
      </Layout>
    </Layout>
  );
};

export default VoiceLayout;
