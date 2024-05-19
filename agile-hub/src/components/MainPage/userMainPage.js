// import React, { useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import Menubar from '../Menubar.js';
// import { useAuth } from '../../context/AuthContext';

// function UserMainPage() {  
//   const navigate = useNavigate();
//   const { authToken } = useAuth(); // AuthContext에서 토큰 가져오기
//   const location = useLocation();
//   const sprintData = location.state?.sprintData;
//   const sprintId = sprintData?.sprintId;
//   const projectKey = location.state?.projectKey;

//   useEffect(() => {
//     // 로그인 상태 확인
//     if (!authToken) {
//       navigate('/login');
//     }
//   }, [authToken, navigate]);

//   console.log("여기는 UserMainPage(로그인 시 유저메인페이지)"); 

//   return (
//     <div className='sprint_container'>
//       <Menubar/>
//       <button className="createProjectButton" onClick={() => navigate('/createProject')}>
//         <span>
//           프로젝트 생성하러 가기
//         </span>
//       </button>
//       <style>
//         {`
//           .createProjectButton {
//             border: 2px solid #24b4fb;
//             background-color: #24b4fb;
//             border-radius: 0.9em;
//             padding: 0.8em 1.2em;
//             transition: all ease-in-out 0.2s;
//             font-size: 30px;
//             display: flex;
//             justify-content: center;
//             align-items: center;
//             color: #fff;
//             font-weight: 600;
//             cursor: pointer;
//             width: 30rem;
//             height: 5rem;
//           }

//           .createProjectButton:hover {
//             background-color: #0071e2;
//           }
//         `}
//       </style>
//     </div>
//   );
// }

// export default UserMainPage;

//여기는 로그인로직x, 위에 로그인 로직 o 
import React from 'react';
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

  // 오늘 날짜를 가져오기 위한 코드
  const today = new Date();
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = today.toLocaleDateString('en-US', options);

  console.log("여기는 UserMainPage(로그인 시 유저메인페이지)"); 

  return (
    <div className='sprint_container'>
      <Menubar/>
      <div className='mainContent'>
        <div className='banner'>
          <p>우리 Agilehub는 쉽고 빠르게 프로젝트를 생성할 수 있는 템플릿을 제공합니다</p>
        </div>
        <div className='projectCard'>
          <div className='projectDate'>{formattedDate}</div>
          <button className="createProjectButton" onClick={() => navigate('/createProject')}>
            <span>
              프로젝트 생성하러 가기
            </span>
          </button>
        </div>
        <div className='projectContainer'>
          <div className='projectItem' style={{ backgroundColor: '#f1c40f' }}>Project 1</div>
          <div className='projectItem' style={{ backgroundColor: '#e74c3c' }}>Project 2</div>
          <div className='projectItem' style={{ backgroundColor: '#2ecc71' }}>Project 3</div>
          <div className='projectItem' style={{ backgroundColor: '#3498db' }}>Project 4</div>
        </div>
      </div>
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
            animation: slideIn 1s ease-in-out;
          }

          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateX(-100%);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          .projectCard {
            display: inline-block;
            border: 1px solid #ddd;
            border-radius: 10px;
            padding: 20px;
            text-align: center;
            background-color: #f9f9f9;
            width: 300px;
            margin-bottom: 20px;
          }

          .projectDate {
            font-size: 18px;
            color: #0071e2;
            margin-bottom: 10px;
          }

          .createProjectButton {
            border: 2px solid #24b4fb;
            background-color: #24b4fb;
            border-radius: 0.9em;
            padding: 0.8em 1.2em;
            transition: all ease-in-out 0.2s;
            font-size: 20px;
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

          .projectContainer {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 100px 5px; /* 행 간격을 줄이고 열 간격을 늘림 */
            justify-items: center;
            margin-top: 20px;
          }

          .projectItem {
            width: 800px;
            height: 400px;
            border-radius: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            font-size: 20px;
            font-weight: bold;
          }
        `}
      </style>
    </div>
  );
}

export default UserMainPage;
