// UserMainPage.js
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Menubar from '../Menubar.js';
import { useAuth } from '../../context/AuthContext';
import IssueEx from '../../components/MainPage/IssueEx.js';
import ProjectEx from '../../components/MainPage/ProjectEx.js';
import TimeLineEx from '../../components/MainPage/TimeLineEx.js';
import SprintEx from '../../components/MainPage/SprintEx.js';
import axios from 'axios';

function UserMainPage() {
  const navigate = useNavigate();
  const { authToken } = useAuth(); // AuthContext에서 토큰 가져오기
  const location = useLocation();
  const sprintData = location.state?.sprintData;
  const sprintId = sprintData?.sprintId;
  const projectKey = location.state?.projectKey;

  const [loginId, setLoginId] = useState('');
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    getUserId();
  }, []);

  const getUserId = async () => {
      try {
          const response = await axios.get(`https://api.agilehub.store/member/profile`, {
              headers: {
                  Authorization: `Bearer ${authToken}`
              }
          });
          setLoginId(response.data.result.id);
          setName(response.data.result.name);
          setImageUrl(response.data.result.profileImageUrl);

          localStorage.setItem('loginId', response.data.result.id);
          
      } catch (error) {
          console.error('API request failed:', error);
      }
  };

  useEffect(() => {
    // 로그인 상태 확인
    if (!authToken) {
      navigate('/login');
    }
  }, [authToken, navigate]);

  // 오늘 날짜를 가져오기 위한 코드
  const today = new Date();
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = today.toLocaleDateString('en-US', options);

  console.log('여기는 UserMainPage(로그인 시 유저메인페이지)');

  const waveText = 'Agilehub는 쉽고 빠르게 프로젝트를 생성할 수 있는 템플릿을 제공합니다!';

  // 모달 상태 관리
  const [modalContent, setModalContent] = useState(null);

  const openModal = (content) => {
    setModalContent(content);
  };

  const closeModal = () => {
    setModalContent(null);
  };

  return (
    <div className="sprint_container">
      <Menubar loginId={loginId} />
      <div className="mainContent">
        <div className="banner">
          {waveText.split('').map((char, index) => (
            <span key={index} className="waveChar" style={{ animationDelay: `${index * 0.1}s` }}>
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </div>
        <div className="projectCard">
          <div className="projectDate">{formattedDate}</div>
          <button className="createProjectButton" onClick={() => navigate('/createProject')}>
            <span>프로젝트 생성하러 가기</span>
          </button>
        </div>
        <div className="highlightText">Agilehub을 미리 사용해보세요!</div>
        <div className="projectContainer">
          <button className="projectItem" style={{ backgroundColor: '#FCB9AA' }} onClick={() => openModal(<IssueEx />)}>
            이슈 생성해보기
          </button>
          <button
            className="projectItem"
            style={{ backgroundColor: '#A2E1DB' }}
            onClick={() => openModal(<ProjectEx />)}
          >
            프로젝트 생성해보기
          </button>
          <button
            className="projectItem"
            style={{ backgroundColor: '#F6EAC2' }}
            onClick={() => openModal(<TimeLineEx />)}
          >
            타임라인 미리보기
          </button>
          <button
            className="projectItem"
            style={{ backgroundColor: '#CBAACB' }}
            onClick={() => openModal(<SprintEx />)}
          >
            스프린트 생성해보기
          </button>
        </div>
      </div>
      {modalContent && (
        <div className="modal">
          <div className="modalContent">
            <span className="closeButton" onClick={closeModal}>
              &times;
            </span>
            <div>{modalContent}</div>
          </div>
        </div>
      )}
      <style>
        {`
          .sprint_container {
            display: flex;
          }

          .mainContent {
            flex-grow: 1;
            padding: 20px;
            text-align: center;
          }

          .banner {
            background: linear-gradient(to right, #6a11cb, #2575fc);
            color: #fff;
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 20px;
            font-size: 40px;
            overflow: hidden;
            white-space: nowrap;
          }

          .waveChar {
            display: inline-block;
            animation: wave 1s infinite;
            transition: transform 0.2s;
          }

          @keyframes wave {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
          }

          .projectCard {
            display: inline-block;
            border: 1px solid #ddd;
            border-radius: 10px;
            padding: 60px; /* 패딩을 늘려 크기를 키움 */
            text-align: center;
            background-color: #f9f9f9;
            width: 700px; /* 너비를 늘려 크기를 키움 */
            margin-bottom: 20px;
          }

          .projectDate {
            font-size: 28px; /* 폰트 크기를 늘려 가독성을 높임 */
            color: #0071e2;
            margin-bottom: 20px; /* 간격을 넓힘 */
          }

          .createProjectButton {
            border: 2px solid #24b4fb;
            background-color: #24b4fb;
            border-radius: 0.9em;
            padding: 30px 40px; /* 패딩을 늘려 크기를 키움 */
            transition: all ease-in-out 0.2s;
            font-size: 28px; /* 폰트 크기를 늘려 가독성을 높임 */
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
            font-weight: 600;
            cursor: pointer;
            width: 100%;
          }

          .createProjectButton:hover {
            background-color: #0071e2;
          }

          .highlightText {
            font-size: 24px;
            font-weight: bold;
            color: #333;
            padding: 20px;
            background: #f0f0f0;
            border-radius: 10px;
            margin: 20px 0;
            animation: fadeIn 1s ease-in-out;
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          .projectContainer {
            display: inline-grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
            justify-items: center;
            margin-top: 20px;
          }

          .projectItem {
            width: 600px;
            height: 300px;
            border-radius: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #333;
            font-size: 30px;
            font-weight: bold;
            border: none;
            cursor: pointer;
            transition: transform 0.2s, background-color 0.2s;
          }

          .projectItem:hover {
            transform: scale(1.05);
            background-color: #333; 
            color: #fff;
          }

          /* 모달 스타일 */
          .modal {
            display: flex;
            justify-content: center; /* 가운데 정렬 */
            align-items: center;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 1000;
          }

          .modalContent {
            background-color: #fff;
            padding: 20px;
            border-radius: 10px;
            // text-align: center;
            position: relative;
            max-width: 800px; /* 최대 너비 조정 */
            width: 70%;
            height: 70%; /* 높이 조정 */
            overflow-y: auto; /* 내용이 넘칠 경우 스크롤 */
            z-index: 1001;
            
          }

          .closeButton {
            position: absolute;
            top: 10px;
            right: 10px;
            font-size: 24px;
            cursor: pointer;
          }
        `}
      </style>
    </div>
  );
}

export default UserMainPage;
