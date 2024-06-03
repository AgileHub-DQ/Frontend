// LoginPage.js
import '../css/LoginPage/LoginPage.css';
import React, { useEffect, useState } from 'react';
import Slider from '../components/LoginPage/Slider.js';
import KakaoLoginButton from '../components/LoginPage/KakaoLoginButton.js';
import Logo from '../components/LoginPage/Logo.js';

function LoginPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  console.log(isLoggedIn);

  console.log('여기는 LoginPage입니다.');

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

// import '../css/LoginPage/LoginPage.css';
// import React, { useEffect, useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import Slider from '../components/LoginPage/Slider.js';
// import KakaoLoginButton from '../components/LoginPage/KakaoLoginButton.js';
// import Logo from '../components/LoginPage/Logo.js';
// import { useAuth } from '../../src/context/AuthContext';

// function LoginPage() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const { login } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     console.log(isLoggedIn);
//     console.log('여기는 LoginPage입니다.');
//   }, [isLoggedIn]);

//   // const handleLogin = async () => {
//   //   console.log(handleLogin + '클릭');
//   //   try {
//   //     await login();
//   //     setIsLoggedIn(true);
//   //     // 로그인 성공 시 원래 URL로 리다이렉트
//   //     // const redirectUrl = new URLSearchParams(location.search).get('redirectUrl') || '/';
//   //     // navigate(redirectUrl);
//   //   } catch (error) {
//   //     console.error('Failed to login', error);
//   //     // 로그인 실패 처리
//   //   }
//   // };

//   return (
//     <div className="container">
//       <div className="left-panel">
//         <Logo />
//         <KakaoLoginButton />
//       </div>
//       <div className="right-panel">
//         <Slider />
//       </div>
//     </div>
//   );
// }

// export default LoginPage;
