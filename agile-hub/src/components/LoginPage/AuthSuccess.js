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
