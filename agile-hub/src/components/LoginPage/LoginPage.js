// LoginPage.js
import React from 'react';
import '../../css/LoginPage/Login.css';
import '../../css/LoginPage/KakaoLoginButton.css';
import Slider from './Slider';
import KakaoLoginButton from './KakaoLoginButton.js';
import Logo from './Logo.js';

function LoginPage() {
  return (
    <div className="container">
      <div className="left-panel">
        <Logo />
        <KakaoLoginButton />
      </div>
      <div className="right-panel">
        <Slider />
      </div>
    </div>
  );
}

export default LoginPage;



