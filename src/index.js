import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './scss/style.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

const userAgent = navigator.userAgent || navigator.vendor || window.opera;
// 모바일로 화면 분기시에 활성화
// const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // 모바일로 화면 분기시에 활성화
    // <App isMobile={isMobile}/>
    <App/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
