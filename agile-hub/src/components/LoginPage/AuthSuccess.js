import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AuthSuccess = () => {
  const navigate = useNavigate();
  const { setAuthToken } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('accessToken');
    const redirectUrl = params.get('redirect_url') || '/mypage';

    console.log('Access Token:', token);
    console.log('Redirect URL:', redirectUrl);


    if (token) {
      localStorage.setItem('authToken', token);
      console.log('Token stored in localStorage:', localStorage.getItem('authToken'));
      setAuthToken(token);
      navigate(redirectUrl, { replace: true }); // 지정된 URL로 리디렉션
    } else {
      console.error('토큰이 없습니다.');
      navigate('/login'); // 토큰이 없으면 로그인 페이지로 리디렉션
    }
  }, [navigate, setAuthToken]);

  return <div>로그인 성공! 리디렉션 중...</div>;
};

export default AuthSuccess;

// dfkdsjfslkdjflk