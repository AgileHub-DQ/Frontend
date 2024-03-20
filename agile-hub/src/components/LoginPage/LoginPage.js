// LoginPage.js
import React from 'react';
//import { Slide } from 'react-slideshow-image'; // 라이브러리 import, yarn add react-slideshow-image
import '../../css/LoginPage/Login.css';
import Slider from './Slider';

function LoginPage() {
  return (
    <div className="container">
      <div className="background-container" />
      <Slider />
    </div>
  );
}


export default LoginPage;


