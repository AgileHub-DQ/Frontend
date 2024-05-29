// import React from 'react';

// import '../../css/LoginPage/KakaoLoginButton.css';

// const KakaoLoginButton = () => {
//   const handleLogin = () => {
//     window.location.href = 'https://api.agilehub.store/oauth2/authorization/kakao';
//   };

//   return (
//     <div className="kakao-login-button" onClick={handleLogin}>
//       <img src="../../../assets/images/KakaotalkIcon.png" alt="Kakao Icon" className="kakao-icon" />
//       <span className="kakao-login-text">카카오톡 로그인</span>
//     </div>
//   );
// };
// //하이

// export default KakaoLoginButton;

// import React from 'react';
// import '../../css/LoginPage/KakaoLoginButton.css';
// import { useLocation } from 'react-router-dom';

// const KakaoLoginButton = () => {
//   const location = useLocation();

//   const handleLogin = () => {
//     const redirectUrl = encodeURIComponent(`${window.location.origin}${location.pathname}${location.search}`);
//     window.location.href = `https://api.agilehub.store/oauth2/authorization/kakao?redirect_url=${redirectUrl}`;
//   };

//   return (
//     <div className="kakao-login-button" onClick={handleLogin}>
//       <img src="../../../assets/images/KakaotalkIcon.png" alt="Kakao Icon" className="kakao-icon" />
//       <span className="kakao-login-text">카카오톡 로그인</span>
//     </div>
//   );
// };

// export default KakaoLoginButton;

import React from 'react';
import '../../css/LoginPage/KakaoLoginButton.css';
import { useLocation } from 'react-router-dom';

const KakaoLoginButton = () => {
  const location = useLocation();

  const handleLogin = () => {
    console.log('handleLogin 클릭');

    // 현재 위치와 URL 쿼리 스트링을 포함한 리다이렉트 URL 생성
    // const redirectUrl = `${window.location.origin}${location.pathname}${location.search}`;
    const redirectUrl = `https://www.agilehub.store` + document.referrer;

    //gdkdgd
    console.log('1');
    console.log(location.origin);
    console.log(location.pathname); //
    console.log(location.search);
    console.log(redirectUrl);
    // const redirectUrl = `https://www.agilehub.store`;
    console.log('redirectUrl:' + redirectUrl);

    console.log('2' + navigator.location);
    // 로그인 URL 생성
    const loginUrl = `https://api.agilehub.store/oauth2/authorization/kakao?redirect_url=${redirectUrl}`;
    console.log('loginUrl' + loginUrl);

    // URL을 로그에 출력하여 디버깅
    console.log('Redirect URL: ', redirectUrl);
    console.log('Login URL: ', loginUrl);

    console.log('1 document.referrer' + document.referrer);
    // 로그인 URL로 리다이렉트
    // window.location.href = loginUrl;
    window.location.href = loginUrl;
    console.log('2 document.referrer' + document.referrer);
    //navigate(loginUrl);
  };

  return (
    <div className="kakao-login-button" onClick={handleLogin}>
      <img src="../../../assets/images/KakaotalkIcon.png" alt="Kakao Icon" className="kakao-icon" />
      <span className="kakao-login-text">카카오톡 로그인</span>
    </div>
  );
};

export default KakaoLoginButton;

// import React from 'react';
// import '../../css/LoginPage/KakaoLoginButton.css';
// import { useLocation } from 'react-router-dom';

// const KakaoLoginButton = () => {
//   const location = useLocation();

//   const handleLogin = () => {
//     console.log('handleLogin 클릭');

//     // 현재 위치와 URL 쿼리 스트링을 포함한 리다이렉트 URL 생성
//     const currentPath = `${window.location.pathname}${window.location.search}`;
//     //아래가 문제
//     const redirectUrl = `${window.location.origin}/oauth2/redirect?redirect_uri=${currentPath}`;
//     const redirectUrl = `${window.location.origin}${location.pathname}${location.search}`;

//     // 로그인 URL 생성
//     const loginUrl = `https://api.agilehub.store/oauth2/authorization/kakao?redirect_url=${redirectUrl}`;

//     // URL을 로그에 출력하여 디버깅
//     console.log('Redirect URL: ', redirectUrl);
//     console.log('Login URL: ', loginUrl);

//     // 로그인 URL로 리다이렉트
//     window.location.href = loginUrl;
//   };

//   return (
//     <div className="kakao-login-button" onClick={handleLogin}>
//       <img src="../../../assets/images/KakaotalkIcon.png" alt="Kakao Icon" className="kakao-icon" />
//       <span className="kakao-login-text">카카오톡 로그인</span>
//     </div>
//   );
// };

// export default KakaoLoginButton;
