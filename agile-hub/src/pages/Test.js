// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function Test() {
//   const [projects, setProjects] = useState([]);
//   const [error, setError] = useState(null);
//   const [createdIssue, setCreatedIssue] = useState(null);
//   const [errorMessage, setErrorMessage] = useState(null);
//   const [formData, setFormData] = useState({
//     title: '',
//     type: 'EPIC',
//     status: 'DO',
//     contentText: '',
//     imageURLs: '',
//     startDate: '',
//     endDate: '',
//     memberId: '',
//     projectKey: '' // 클릭된 프로젝트의 키를 저장하는 상태 추가
//   });

//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         const response = await axios.get('/api/projects');
//         setProjects(response.data.result);
//       } catch (error) {
//         setError(error);
//       }
//     };

//     fetchProjects();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const handleProjectClick = (projectKey) => {
//     setFormData({ ...formData, projectKey }); // 클릭된 프로젝트의 키를 저장
//     console.log(projectKey);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { projectKey, ...data } = formData; // projectKey는 formData에서 제외
//     try {
//       const response = await axios.post(`/api/projects/${projectKey}/boards`, data);
//       if (response.status === 200 || response.status === 201) {
//         setCreatedIssue(response.data.result.issue);
//         setErrorMessage(null);
//       } else {
//         setErrorMessage('이슈 생성에 실패했습니다.');
//       }
//     } catch (error) {
//       if (error.response && error.response.status === 415) {
//         setErrorMessage('서버에서 지원하지 않는 미디어 유형으로 요청을 보냈습니다.');
//       } else {
//         setErrorMessage('이슈 생성에 실패했습니다.');
//       }
//     }
// };


// return (
//     <div>
//       {/* 응답을 출력하는 부분 */}
//       {projects.length > 0 && (
//         <div>
//           <h2>프로젝트 목록:</h2>
//           <ul>
//             {projects.map(project => (
//               <li key={project.id} onClick={() => handleProjectClick(project.key)} style={{ cursor: 'pointer' }}>
//                 Key: {project.key}, Name: {project.name}, Created At: {project.createdAt}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       <h2>이슈 생성 폼</h2>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Title:
//           <input
//             type="text"
//             name="title"
//             value={formData.title}
//             onChange={handleInputChange}
//           />
//         </label>
//         <label>
//           Type:
//           <select name="type" value={formData.type} onChange={handleInputChange}>
//             <option value="EPIC">EPIC</option>
//             <option value="STORY">STORY</option>
//             <option value="TASK">TASK</option>
//           </select>
//         </label>
//         <label>
//           Status:
//           <select name="status" value={formData.status} onChange={handleInputChange}>
//             <option value="DO">DO</option>
//             <option value="PROGRESS">PROGRESS</option>
//             <option value="DONE">DONE</option>
//           </select>
//         </label>
//         <label>
//           Content Text:
//           <textarea
//             name="contentText"
//             value={formData.contentText}
//             onChange={handleInputChange}
//           />
//         </label>
//         <label>
//           Image URLs (comma separated):
//           <input
//             type="text"
//             name="imageURLs"
//             value={formData.imageURLs}
//             onChange={handleInputChange}
//           />
//         </label>
//         <label>
//           Start Date:
//           <input
//             type="date"
//             name="startDate"
//             value={formData.startDate}
//             onChange={handleInputChange}
//           />
//         </label>
//         <label>
//           End Date:
//           <input
//             type="date"
//             name="endDate"
//             value={formData.endDate}
//             onChange={handleInputChange}
//           />
//         </label>
//         <label>
//           Member ID:
//           <input
//             type="text"
//             name="memberId"
//             value={formData.memberId}
//             onChange={handleInputChange}
//           />
//         </label>
//         <button type="submit">Submit</button>
//       </form>

//       {createdIssue && (
//         <div>
//           <h2>새로 생성된 이슈 정보:</h2>
//           <ul>
//             <li>Title: {createdIssue.title}</li>
//             <li>Type: {createdIssue.type}</li>
//             <li>Status: {createdIssue.status}</li>
//             <li>Issue ID: {createdIssue.issueId}</li>
//             <li>Key: {createdIssue.key}</li>
//             <li>Assignee ID: {createdIssue.assigneeId}</li>
//             <li>Start Date: {createdIssue.startDate}</li>
//             <li>End Date: {createdIssue.endDate}</li>
//           </ul>
//         </div>
//       )}

//       {/* 에러 메시지 출력 */}
//       {errorMessage && <p>{errorMessage}</p>}
//     </div>
// );
// }

// export default Test;



// import React from 'react';
// import { useAuth } from "../../src/context/AuthContext"; 
// function Test() {
//   const { authToken } = useAuth(); // AuthContext에서 토큰 가져오기



//   return (
//     <div>
//       hi {authToken}
//     </div>
//   );
// }

// export default Test;






import Button from '../components/MyPage/Button.js';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';

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
    maxWidth: '90%',
  };

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.3)',
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
    borderBottom: '1px solid #e0e0e0',
    paddingBottom: '0.5rem',
  };

  const closeButtonStyle = {
    cursor: 'pointer',
    border: 'none',
    background: 'none',
    fontSize: '1.5rem',
    lineHeight: '1',
    color: '#888',
  };

  const inputContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1rem',
  };

  const inputStyle = {
    flex: '1',
    padding: '0.5rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
    marginRight: '0.5rem',
  };

  const submitButtonStyle = {
    width: '100%',
    padding: '0.75rem',
    background: '#00bfff',
    border: 'none',
    borderRadius: '4px',
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer',
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <div style={headerStyle}>
          <h2>멤버 초대</h2>
          <button style={closeButtonStyle} onClick={onClose}>
            &times;
          </button>
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

function Test() {
  const location = useLocation();
  const projectKey = location.state || '';

  const [isModalOpen, setModalOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState('asc');
  const [members, setMembers] = useState([]);
  const { authToken } = useAuth();
  const [error, setError] = useState('');

  console.log("test: "+ projectKey, authToken);

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '1rem',
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
    marginTop: '1rem',
  };

  const thStyle = {
    borderBottom: '1px solid #ddd',
    padding: '0.75rem',
    textAlign: 'left',
    fontSize: '1.3rem',
    cursor: 'pointer',
    userSelect: 'none',
  };

  const tdStyle = {
    borderBottom: '1px solid #ddd',
    padding: '0.75rem',
    textAlign: 'left',
    verticalAlign: 'middle',
    fontSize: '1.3rem',
  };

  const profileContainerStyle = {
    display: 'flex',
    alignItems: 'center',
  };

  const profileStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#ccc',
    display: 'inline-block',
    marginRight: '0.75rem',
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

  const sortedMembers = [...members].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });

  useEffect(() => {
    const fetchMembers = async () => {
      if (!authToken) {
        setError('인증 토큰이 없습니다. 로그인이 필요합니다.');
        return;
      }
      try {
        const response = await axios.get(`https://api.agilehub.store/projects/${projectKey}/members`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        console.log(authToken);
        console.log(response.data); // 응답 데이터 콘솔에 출력
        if (response.data.isSuccess) {
          setMembers(response.data.result.members);
          console.log('Members set successfully:', response.data.result.members);
        } else {
          console.error('Failed to fetch members:', response.data.message);
          setError('멤버를 불러오는데 실패했습니다.');
        }
      } catch (error) {
        console.error('Error fetching members:', error);
        setError('멤버를 불러오는 도중 오류가 발생했습니다.');
      }
    };

    fetchMembers();
  }, [authToken]);

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
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle} onClick={handleSort}>
              이름 {sortOrder === 'asc' ? '⬆️' : '⬇️'}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedMembers.map((member, index) => (
            <tr key={index}>
              <td style={tdStyle}>
                <div style={profileContainerStyle}>
                  <img src={member.profileImageUrl} alt={`${member.name} profile`} style={profileStyle} />
                  <span>{member.name}</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Test;

