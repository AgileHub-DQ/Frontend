// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from "../../context/AuthContext"; // 경로는 실제 경로에 맞게 조정해주세요.

// const AuthSuccess = () => {
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const accessToken = new URLSearchParams(window.location.search).get('accessToken');
//     if (accessToken) {
//       login(accessToken);
//       navigate('/'); // 로그인 성공 후 메인 페이지로 리다이렉션
//     } else {
//       navigate('/login'); // 액세스 토큰이 없으면 로그인 페이지로 리다이렉션
//     }
//   }, [login, navigate]);

//   return (
//     <div>Loading...</div> // 로딩 중이거나 처리 중 표시
//   );
// };

// export default AuthSuccess;
// AuthSuccess.js
// AuthSuccess.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AuthSuccess = () => {
  const navigate = useNavigate();
  const { setAuthToken } = useAuth();

  useEffect(() => {
    // URL에서 accessToken을 추출합니다.
    const token = new URLSearchParams(window.location.search).get('accessToken');
    if (token) {
      localStorage.setItem('authToken', token);
      setAuthToken(token);
      navigate('/'); // 메인 페이지로 리디렉션
    } else {
      console.error('토큰이 없습니다.');
      navigate('/login'); // 토큰이 없으면 로그인 페이지로 리디렉션
    }
  }, [navigate, setAuthToken]);

  return <div>로그인 성공! 리디렉션 중...</div>;
};

export default AuthSuccess;
