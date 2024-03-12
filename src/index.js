import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ConfigProvider } from 'antd';
import storageUtils from './utils/storageUtils';
import memoryUtils from './utils/memoryUtils';



const root = ReactDOM.createRoot(document.getElementById('root'));

const user = storageUtils.getUser()
memoryUtils.user = user

root.render(
  <ConfigProvider
  // 配置主题色
  theme={{
    token: {
      colorPrimary: '#1677FF',
    },
  }}
>
{/* 这个app外面包裹的去掉后就是去掉严格模式 */}
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </ConfigProvider>
);

reportWebVitals();
