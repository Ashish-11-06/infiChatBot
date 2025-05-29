import React from 'react';
import ReactDOM from 'react-dom/client';
import { StyleProvider } from 'antd-style';
import { ConfigProvider } from 'antd';
import App from './App';
import theme from './theme/themeConfig';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StyleProvider hashPriority="high">
      <ConfigProvider theme={theme}>
        <App />
      </ConfigProvider>
    </StyleProvider>
  </React.StrictMode>
);