import React from 'react';
import { Layout } from 'antd';
import { useLocation } from 'react-router-dom';
import VoiceSidebar from './VoiceSidebar';
import Voicebot from './Voicebot';
import GmttBot from './GmttBot';
import InterviewBot from './InterviewBot';

const { Header, Sider, Content } = Layout;

const VoiceLayout = () => {
  const location = useLocation();

  return (
    <Layout style={{ Height: '80vh' }}>
      {/* Fixed Top Header */}
      <Header
        style={{
          background: '#4e1b6b',
          display: 'flex',
          alignItems: 'center',
          height: '60px',
          position: 'fixed',
          width: '100%',
          zIndex: 2,
          padding: '0 20px',
          margin: '-8px -8px',
        }}
      >
        <h1 style={{ color: 'white', margin: 0 }}>Voicebot</h1>
      </Header>

      {/* Sidebar */}
      <Sider
        width={220}
        style={{
          position: 'fixed',
          top: 60,
          bottom: 0,
          left: 0,
          zIndex: 1,
          background: 'linear-gradient(135deg, #5a189a 0%, #10002b 100%)',
        }}
      >
        <VoiceSidebar />
      </Sider>
        <Content style={{ padding: '20px', overflowY: 'auto', marginLeft: 220, marginTop: 60 }}>
          {location.pathname.startsWith('/voicebot') ? (
            <Voicebot />
          ) : location.pathname.startsWith('/gmtt') ? (
            <GmttBot />
          ) : location.pathname.startsWith('/interviewbot') ? (
            <InterviewBot />
          ) : (
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <h2>Select a bot from the sidebar</h2>
            </div>
          )}
        </Content>  
    </Layout>
  );
};

export default VoiceLayout;
