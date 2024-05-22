import React, { useState } from 'react';
import Button from '../MyPage/Button';

function Modal({ isOpen, onClose }) {
  if (!isOpen) {
    return null;
  }

  const modalStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: 'white',
    padding: '1rem',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    width: '400px',
    maxWidth: '90%'
  };

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.3)'
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
    borderBottom: '1px solid #e0e0e0',
    paddingBottom: '0.5rem'
  };

  const closeButtonStyle = {
    cursor: 'pointer',
    border: 'none',
    background: 'none',
    fontSize: '1.5rem',
    lineHeight: '1',
    color: '#888'
  };

  const inputContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1rem'
  };

  const inputStyle = {
    flex: '1',
    padding: '0.5rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
    marginRight: '0.5rem'
  };

  const submitButtonStyle = {
    width: '100%',
    padding: '0.75rem',
    background: '#00bfff',
    border: 'none',
    borderRadius: '4px',
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer'
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <div style={headerStyle}>
          <h2>멤버 초대</h2>
          <button style={closeButtonStyle} onClick={onClose}>&times;</button>
        </div>
        <div style={inputContainerStyle}>
          <input type="email" placeholder="이메일을 입력하세요." style={inputStyle} />
          <select style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}>
            <option>회원</option>
          </select>
        </div>
        <button style={submitButtonStyle}>멤버 초대</button>
      </div>
    </div>
  );
}

function Member() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState('asc');

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '1rem'
  };

  const titleStyle = {
    display: 'flex',
    alignItems: 'center',
  };

  const containerStyle = { 
    marginRight: '10%', 
    marginLeft: '23%', 
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '1rem'
  };

  const thStyle = {
    borderBottom: '1px solid #ddd',
    padding: '0.75rem',
    textAlign: 'left',
    fontSize: '1.3rem',
    cursor: 'pointer', // 글씨 크기 조정
    userSelect: 'none'
  };

  const tdStyle = {
    borderBottom: '1px solid #ddd',
    padding: '0.75rem',
    textAlign: 'left',
    verticalAlign: 'middle',
    fontSize: '1.3rem' // 글씨 크기 조정
  };

  const profileContainerStyle = {
    display: 'flex',
    alignItems: 'center'
  };

  const profileStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#ccc',
    display: 'inline-block',
    marginRight: '0.75rem'
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSort = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  // 더미 데이터
  const members = [
    {
      name: '김민상',
      email: 'ymsu7176@naver.com',
      role: '회원'
    },
    {
      name: 'Edu팀 담당자',
      email: 'edu@miridish.com',
      role: '관리자'
    },
    {
      name: 'MRIDU_MIRICANVAS',
      email: 'syyang@miridish.com',
      role: '회원'
    },
    {
      name: 'MiriCanvas Help Center',
      email: 'ymkim@miridish.com',
      role: '관리자'
    },
    {
      name: 'Wekie Liang',
      email: 'wekieliang@miridish.com',
      role: '회원'
    }
  ];

  const sortedMembers = [...members].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div style={titleStyle}>
          <h1>멤버</h1>
          <p style={{ marginLeft: '1rem', color: '#888' }}>프로젝트 멤버 수: {members.length}</p>
        </div>
        <div>
          <Button onClick={handleOpenModal}>멤버 초대</Button>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle} onClick={handleSort}>
              이름 {sortOrder === 'asc' ? '⬆️' : '⬇️'}
            </th>
            <th style={thStyle}>이메일</th>
            <th style={thStyle}>역할</th>
          </tr>
        </thead>
        <tbody>
          {sortedMembers.map((member, index) => (
            <tr key={index}>
              <td style={tdStyle}>
                <div style={profileContainerStyle}>
                  <div style={profileStyle}></div>
                  <span>{member.name}</span>
                </div>
              </td>
              <td style={tdStyle}>{member.email}</td>
              <td style={tdStyle}>{member.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Member;

// 임시 인증 토큰 
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Menubar from "../components/Menubar";
// import axios from 'axios';
// import { useAuth } from "../../src/context/AuthContext";

// function MemberManage() {
//     const navigate = useNavigate();
//     const { authToken } = useAuth(); // AuthContext에서 토큰 가져오기
//     const [email, setEmail] = useState('');
//     const [inviteStatus, setInviteStatus] = useState(null);
//     const [projects, setProjects] = useState([]);
//     const [error, setError] = useState(null);

//     // 임의로 넣을 인증 토큰
//     const projectId = 1; // 임의의 프로젝트 아이디


//     // useEffect(() => {
//     //     fetchProjects();
//     // }, [authToken]); // authToken이 변경되면 fetchProjects를 다시 호출

//     const handleInvite = async () => {
//         if (!authToken) {
//             setError('인증 토큰이 없습니다. 로그인이 필요합니다.');
//             return;
//         }
        
//         if (!email) {
//             alert("이메일을 입력해주세요.");
//             return;
//         }

//         const requestBody = {
//             email: email,
//             projectId: projectId // 직접 설정한 프로젝트 아이디 사용
//         };

//         try {
//             const response = await axios.post(
//                 'https://api.agilehub.store/projects/invite/send', 
//                 requestBody,
//                 {
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Authorization': `Bearer ${authToken}` // Directly using the provided token
//                     }
//                 }
//             );

//             if (response.status === 200) {
//                 setInviteStatus({ success: true, message: "초대 이메일이 성공적으로 발송되었습니다." });
//             } else {
//                 setInviteStatus({ success: false, message: response.data.message || "초대 이메일 발송에 실패했습니다." });
//             }
//         } catch (error) {
//             console.error("Error inviting member:", error); // 오류 메시지 출력
//             setInviteStatus({ success: false, message: "서버 오류로 인해 초대 이메일을 발송할 수 없습니다." });
//         }
//     };

//     return (
//         <div>
//             <Menubar />
//             <h1>멤버 페이지입니다.</h1>
//             <div>
//                 <input
//                     type="email"
//                     placeholder="이메일을 입력하세요"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                 />
//                 <button onClick={handleInvite}>초대하기</button>
//             </div>
//             {inviteStatus && (
//                 <div style={{ color: inviteStatus.success ? 'green' : 'red' }}>
//                     {inviteStatus.message}
//                 </div>
//             )}
//             {error && (
//                 <div style={{ color: 'red' }}>
//                     {error}
//                 </div>
//             )}
//         </div>
//     );
// }

// export default MemberManage;
