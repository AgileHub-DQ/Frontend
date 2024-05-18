// LoginPage.js
import '../css/LoginPage/LoginPage.css';
import React, { useEffect, useState } from 'react';
import Slider from '../components/LoginPage/Slider.js';
import KakaoLoginButton from '../components/LoginPage/KakaoLoginButton.js';
import Logo from '../components/LoginPage/Logo.js';


function LoginPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  console.log(isLoggedIn); 

  console.log("여기는 LoginPage입니다."); 

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
