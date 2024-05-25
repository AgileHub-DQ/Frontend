// // KakaoLoginButton.js
// import React from 'react';
// import '../../css/LoginPage/KakaoLoginButton.css';

// const KakaoLoginButton = () => {
//   return (
//     <div className="kakao-login-button">
//       <img src="../../../assets/images/KakaotalkIcon.png" alt="Kakao Icon" className="kakao-icon"/>
//       <span className="kakao-login-text">카카오톡 로그인</span>
//     </div>
//   );
// };
// export default KakaoLoginButton;
import React from 'react';

import '../../css/LoginPage/KakaoLoginButton.css';

const KakaoLoginButton = () => {
  const handleLogin = () => {
    window.location.href = 'https://api.agilehub.store/oauth2/authorization/kakao';
  };

  return (
    <div className="kakao-login-button" onClick={handleLogin}>
      <img src="../../../assets/images/KakaotalkIcon.png" alt="Kakao Icon" className="kakao-icon" />
      <span className="kakao-login-text">카카오톡 로그인</span>
    </div>
  );
};

export default KakaoLoginButton;
