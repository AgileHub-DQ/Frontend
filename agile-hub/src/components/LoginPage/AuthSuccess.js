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
import React, { useEffect } from 'react';
import { useAuth } from "../../context/AuthContext"; // 경로는 실제 경로에 맞게 조정해주세요.

const AuthSuccess = () => {
  const { login } = useAuth();

  useEffect(() => {
    const accessToken = new URLSearchParams(window.location.search).get('accessToken');
    if (accessToken) {
      login(accessToken);
      // navigate('/'); // 이 줄을 제거하여 리다이렉션을 하지 않습니다.
    } else {
      // accessToken이 없다면 여전히 로그인 페이지로 이동합니다.
      window.location.href = '/login'; // useNavigate 대신 강제 리다이렉션
    }
  }, [login]);

  return (
    <div>로그인 처리 중입니다. 잠시만 기다려 주세요.</div> // 로딩 메시지를 보다 명확하게 표현
  );
};

export default AuthSuccess;
