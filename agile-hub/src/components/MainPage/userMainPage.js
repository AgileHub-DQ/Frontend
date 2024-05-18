import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Menubar from '../Menubar.js';
import { useAuth } from '../../context/AuthContext';

function UserMainPage() {  
  const navigate = useNavigate();
  const { authToken } = useAuth(); // AuthContext에서 토큰 가져오기
  const location = useLocation();
  const sprintData = location.state?.sprintData;
  const sprintId = sprintData?.sprintId;
  const projectKey = location.state?.projectKey;

  useEffect(() => {
    // 로그인 상태 확인
    if (!authToken) {
      navigate('/login');
    }
  }, [authToken, navigate]);

  console.log("여기는 UserMainPage(로그인 시 유저메인페이지)"); 

  return (
    <div className='sprint_container'>
      <Menubar/>
      <button className="createProjectButton" onClick={() => navigate('/createProject')}>
        <span>
          프로젝트 생성하러 가기
        </span>
      </button>
      <style>
        {`
          .createProjectButton {
            border: 2px solid #24b4fb;
            background-color: #24b4fb;
            border-radius: 0.9em;
            padding: 0.8em 1.2em;
            transition: all ease-in-out 0.2s;
            font-size: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
            font-weight: 600;
            cursor: pointer;
            width: 30rem;
            height: 5rem;
          }

          .createProjectButton:hover {
            background-color: #0071e2;
          }
        `}
      </style>
    </div>
  );
}

export default UserMainPage;