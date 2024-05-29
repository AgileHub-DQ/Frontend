import React from 'react';
import '../../css/LoginPage/KakaoLoginButton.css';

const KakaoLoginButton = () => {
  const handleLogin = () => {
    const { origin, pathname, search } = window.location;
    const redirectUrl = `${origin}${pathname}${search}`;

    console.log(origin);
    console.log(pathname);
    console.log(search);

    const authUrl = `https://api.agilehub.store/oauth2/authorization/kakao?redirect_url=${redirectUrl}`;
    window.location.href = authUrl;
  };

  return (
    <div className="kakao-login-button" onClick={handleLogin}>
      <img src="../../../assets/images/KakaotalkIcon.png" alt="Kakao Icon" className="kakao-icon" />
      <span className="kakao-login-text">카카오톡 로그인</span>
    </div>
  );
};

export default KakaoLoginButton;
