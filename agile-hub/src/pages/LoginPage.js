// LoginPage.js
import React from 'react';
import '../css/LoginPage/LoginPage.css';
import Slider from '../components/LoginPage/Slider.js';
import KakaoLoginButton from '../components/LoginPage/KakaoLoginButton.js';
import Logo from '../components/LoginPage/Logo.js';


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
