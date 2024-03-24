// LoginPage.js
import React from 'react';
import '../../css/LoginPage/LoginPage.css';
import Slider from './Slider';
import KakaoLoginButton from './KakaoLoginButton';
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



