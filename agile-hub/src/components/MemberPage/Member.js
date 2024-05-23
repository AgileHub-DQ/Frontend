// import React, { useState, useEffect } from 'react';
// import Button from '../MyPage/Button';
// import axios from 'axios';

// function Modal({ isOpen, onClose }) {
//   if (!isOpen) {
//     return null;
//   }

//   const modalStyle = {
//     position: 'fixed',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     background: 'white',
//     padding: '1rem',
//     boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
//     borderRadius: '8px',
//     width: '400px',
//     maxWidth: '90%'
//   };

//   const overlayStyle = {
//     position: 'fixed',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     background: 'rgba(0, 0, 0, 0.3)'
//   };

//   const headerStyle = {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: '1rem',
//     borderBottom: '1px solid #e0e0e0',
//     paddingBottom: '0.5rem'
//   };

//   const closeButtonStyle = {
//     cursor: 'pointer',
//     border: 'none',
//     background: 'none',
//     fontSize: '1.5rem',
//     lineHeight: '1',
//     color: '#888'
//   };

//   const inputContainerStyle = {
//     display: 'flex',
//     alignItems: 'center',
//     marginBottom: '1rem'
//   };

//   const inputStyle = {
//     flex: '1',
//     padding: '0.5rem',
//     borderRadius: '4px',
//     border: '1px solid #ccc',
//     marginRight: '0.5rem'
//   };

//   const submitButtonStyle = {
//     width: '100%',
//     padding: '0.75rem',
//     background: '#00bfff',
//     border: 'none',
//     borderRadius: '4px',
//     color: 'white',
//     fontWeight: 'bold',
//     cursor: 'pointer'
//   };

//   return (
//     <div style={overlayStyle}>
//       <div style={modalStyle}>
//         <div style={headerStyle}>
//           <h2>멤버 초대</h2>
//           <button style={closeButtonStyle} onClick={onClose}>&times;</button>
//         </div>
//         <div style={inputContainerStyle}>
//           <input type="email" placeholder="이메일을 입력하세요." style={inputStyle} />
//           <select style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}>
//             <option>회원</option>
//           </select>
//         </div>
//         <button style={submitButtonStyle}>멤버 초대</button>
//       </div>
//     </div>
//   );
// }

// function Member() {
//   const [isModalOpen, setModalOpen] = useState(false);
//   const [sortOrder, setSortOrder] = useState('asc');
//   const [members, setMembers] = useState([]);

//   const headerStyle = {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: '1rem'
//   };

//   const titleStyle = {
//     display: 'flex',
//     alignItems: 'center',
//   };

//   //각주
//   const containerStyle = {
//     marginRight: '10%',
//     marginLeft: '23%',
//   };

//   const tableStyle = {
//     width: '100%',
//     borderCollapse: 'collapse',
//     marginTop: '1rem'
//   };

//   const thStyle = {
//     borderBottom: '1px solid #ddd',
//     padding: '0.75rem',
//     textAlign: 'left',
//     fontSize: '1.3rem',
//     cursor: 'pointer', // 글씨 크기 조정
//     userSelect: 'none'
//   };

//   const tdStyle = {
//     borderBottom: '1px solid #ddd',
//     padding: '0.75rem',
//     textAlign: 'left',
//     verticalAlign: 'middle',
//     fontSize: '1.3rem' // 글씨 크기 조정
//   };

//   const profileContainerStyle = {
//     display: 'flex',
//     alignItems: 'center'
//   };

//   const profileStyle = {
//     width: '40px',
//     height: '40px',
//     borderRadius: '50%',
//     backgroundColor: '#ccc',
//     display: 'inline-block',
//     marginRight: '0.75rem'
//   };

//   const handleOpenModal = () => {
//     setModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setModalOpen(false);
//   };

//   const handleSort = () => {
//     setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
//   };

//   const sortedMembers = [...members].sort((a, b) => {
//     if (sortOrder === 'asc') {
//       return a.name.localeCompare(b.name);
//     } else {
//       return b.name.localeCompare(a.name);
//     }
//   });

//   useEffect(() => {
//     const fetchMembers = async () => {
//       try {
//         const response = await axios.get('https://www.agilehub.store/projects/{key}/members'); // 여기에 실제 key를 넣어주세요
//         if (response.data.isSuccess) {
//           setMembers(response.data.result.members);
//         } else {
//           console.error('Failed to fetch members:', response.data.message);
//         }
//       } catch (error) {
//         console.error('Error fetching members:', error);
//       }
//     };

//     fetchMembers();
//   }, []);

//   return (
//     // <div style={containerStyle}>
//     //   <div style={headerStyle}>
//     //     <div style={titleStyle}>
//     //       <h1>멤버</h1>
//     //       <p style={{ marginLeft: '1rem', color: '#888' }}>프로젝트 멤버 수: {members.length}</p>
//     //     </div>
//     //     <div>
//     //       <Button onClick={handleOpenModal}>멤버 초대</Button>
//     //     </div>
//     //   </div>
//     //   <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
//     //   <table style={tableStyle}>
//     //     <thead>
//     //       <tr>
//     //         <th style={thStyle} onClick={handleSort}>
//     //           이름 {sortOrder === 'asc' ? '⬆️' : '⬇️'}
//     //         </th>
//     //         <th style={thStyle}>이메일</th>
//     //         <th style={thStyle}>역할</th>
//     //       </tr>
//     //     </thead>
//     //     <tbody>
//     //       {sortedMembers.map((member, index) => (
//     //         <tr key={index}>
//     //           <td style={tdStyle}>
//     //             <div style={profileContainerStyle}>
//     //               <div style={profileStyle}></div>
//     //               <span>{member.name}</span>
//     //             </div>
//     //           </td>
//     //           <td style={tdStyle}>{member.email}</td>
//     //           <td style={tdStyle}>{member.role}</td>
//     //         </tr>
//     //       ))}
//     //     </tbody>
//     //   </table>
//     // </div>
//     <div style={containerStyle}>
//       <div style={headerStyle}>
//         <div style={titleStyle}>
//           <h1>멤버</h1>
//           <p style={{ marginLeft: '1rem', color: '#888' }}>프로젝트 멤버 수: {members.length}</p>
//         </div>
//         <div>
//           <Button onClick={handleOpenModal}>멤버 초대</Button>
//         </div>
//       </div>
//       <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
//       <table style={tableStyle}>
//         <thead>
//           <tr>
//             <th style={thStyle} onClick={handleSort}>
//               이름 {sortOrder === 'asc' ? '⬆️' : '⬇️'}
//             </th>
//             <th style={thStyle}>이메일</th>
//             <th style={thStyle}>역할</th>
//           </tr>
//         </thead>
//         <tbody>
//           {sortedMembers.map((member, index) => (
//             <tr key={index}>
//               <td style={tdStyle}>
//                 <div style={profileContainerStyle}>
//                   <img src={member.profileImageUrl} alt={`${member.name} profile`} style={profileStyle} />
//                   <span>{member.name}</span>
//                 </div>
//               </td>
//               <td style={tdStyle}>{member.email}</td>
//               <td style={tdStyle}>{member.role}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default Member;
// import React, { useState, useEffect } from 'react';
// import Button from '../MyPage/Button'; // Button 컴포넌트의 경로가 맞는지 확인 필요
// import axios from 'axios';
// import React, { useState, useEffect } from 'react';
// import { useAuth } from "../../../src/context/AuthContext"

// function Modal({ isOpen, onClose }) {
//   if (!isOpen) {
//     return null;
//   }

//   const modalStyle = {
//     position: 'fixed',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     background: 'white',
//     padding: '1rem',
//     boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
//     borderRadius: '8px',
//     width: '400px',
//     maxWidth: '90%'
//   };

//   const overlayStyle = {
//     position: 'fixed',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     background: 'rgba(0, 0, 0, 0.3)'
//   };

//   const headerStyle = {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: '1rem',
//     borderBottom: '1px solid #e0e0e0',
//     paddingBottom: '0.5rem'
//   };

//   const closeButtonStyle = {
//     cursor: 'pointer',
//     border: 'none',
//     background: 'none',
//     fontSize: '1.5rem',
//     lineHeight: '1',
//     color: '#888'
//   };

//   const inputContainerStyle = {
//     display: 'flex',
//     alignItems: 'center',
//     marginBottom: '1rem'
//   };

//   const inputStyle = {
//     flex: '1',
//     padding: '0.5rem',
//     borderRadius: '4px',
//     border: '1px solid #ccc',
//     marginRight: '0.5rem'
//   };

//   const submitButtonStyle = {
//     width: '100%',
//     padding: '0.75rem',
//     background: '#00bfff',
//     border: 'none',
//     borderRadius: '4px',
//     color: 'white',
//     fontWeight: 'bold',
//     cursor: 'pointer'
//   };

//   return (
//     <div style={overlayStyle}>
//       <div style={modalStyle}>
//         <div style={headerStyle}>
//           <h2>멤버 초대</h2>
//           <button style={closeButtonStyle} onClick={onClose}>&times;</button>
//         </div>
//         <div style={inputContainerStyle}>
//           <input type="email" placeholder="이메일을 입력하세요." style={inputStyle} />
//           <select style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}>
//             <option>회원</option>
//           </select>
//         </div>
//         <button style={submitButtonStyle}>멤버 초대</button>
//       </div>
//     </div>
//   );
// }

// function Member() {
//   const [isModalOpen, setModalOpen] = useState(false);
//   const [sortOrder, setSortOrder] = useState('asc');
//   const [members, setMembers] = useState([]);
//   const { authToken } = useAuth();
//   const [error, setError] = useState('');

//   const headerStyle = {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: '1rem'
//   };

//   const titleStyle = {
//     display: 'flex',
//     alignItems: 'center',
//   };

//   const containerStyle = {
//     marginRight: '10%',
//     marginLeft: '23%',
//   };

//   const tableStyle = {
//     width: '100%',
//     borderCollapse: 'collapse',
//     marginTop: '1rem'
//   };

//   const thStyle = {
//     borderBottom: '1px solid #ddd',
//     padding: '0.75rem',
//     textAlign: 'left',
//     fontSize: '1.3rem',
//     cursor: 'pointer',
//     userSelect: 'none'
//   };

//   const tdStyle = {
//     borderBottom: '1px solid #ddd',
//     padding: '0.75rem',
//     textAlign: 'left',
//     verticalAlign: 'middle',
//     fontSize: '1.3rem'
//   };

//   const profileContainerStyle = {
//     display: 'flex',
//     alignItems: 'center'
//   };

//   const profileStyle = {
//     width: '40px',
//     height: '40px',
//     borderRadius: '50%',
//     backgroundColor: '#ccc',
//     display: 'inline-block',
//     marginRight: '0.75rem'
//   };

//   const handleOpenModal = () => {
//     setModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setModalOpen(false);
//   };

//   const handleSort = () => {
//     setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
//   };

//   const sortedMembers = [...members].sort((a, b) => {
//     if (sortOrder === 'asc') {
//       return a.name.localeCompare(b.name);
//     } else {
//       return b.name.localeCompare(a.name);
//     }
//   });

//   useEffect(() => {
//     const fetchMembers = async () => {
//       if (!authToken) {
//         setError('인증 토큰이 없습니다. 로그인이 필요합니다.');
//         return;
//       }
//       try {
//         const response = await axios.get('https://api.agilehub.store/projects/P1/members', {
//           headers: {
//             'Authorization':  `Bearer ${authToken}`
//           }
//         });
//         console.log(response.data); // 응답 데이터 콘솔에 출력
//         if (response.data.isSuccess) {
//           setMembers(response.data.result.members);
//         } else {
//           console.error('Failed to fetch members:', response.data.message);
//           setError('멤버를 불러오는데 실패했습니다.');
//         }
//       } catch (error) {
//         console.error('Error fetching members:', error);
//         setError('멤버를 불러오는 도중 오류가 발생했습니다.');
//       }
//     };

//     fetchMembers();
//   }, [authToken]);

//   return (
//     <div style={containerStyle}>
//       <div style={headerStyle}>
//         <div style={titleStyle}>
//           <h1>멤버</h1>
//           <p style={{ marginLeft: '1rem', color: '#888' }}>프로젝트 멤버 수: {members.length}</p>
//         </div>
//         <div>
//           <Button onClick={handleOpenModal}>멤버 초대</Button>
//         </div>
//       </div>
//       <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       <table style={tableStyle}>
//         <thead>
//           <tr>
//             <th style={thStyle} onClick={handleSort}>
//               이름 {sortOrder === 'asc' ? '⬆️' : '⬇️'}
//             </th>
//             <th style={thStyle}>이메일</th>
//             <th style={thStyle}>역할</th>
//           </tr>
//         </thead>
//         <tbody>
//           {sortedMembers.map((member, index) => (
//             <tr key={index}>
//               <td style={tdStyle}>
//                 <div style={profileContainerStyle}>
//                   <img src={member.profile_image_url} alt={`${member.name} profile`} style={profileStyle} />
//                   <span>{member.name}</span>
//                 </div>
//               </td>
//               <td style={tdStyle}>{member.email}</td>
//               <td style={tdStyle}>{member.status}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default Member;

// import Button from '../MyPage/Button'; // Button 컴포넌트의 경로가 맞는지 확인 필요
// import axios from 'axios';
// import React, { useState, useEffect } from 'react';
// import { useAuth } from "../../../src/context/AuthContext";

// function Modal({ isOpen, onClose }) {
//   if (!isOpen) {
//     return null;
//   }

//   const modalStyle = {
//     position: 'fixed',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     background: 'white',
//     padding: '1rem',
//     boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
//     borderRadius: '8px',
//     width: '400px',
//     maxWidth: '90%'
//   };

//   const overlayStyle = {
//     position: 'fixed',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     background: 'rgba(0, 0, 0, 0.3)'
//   };

//   const headerStyle = {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: '1rem',
//     borderBottom: '1px solid #e0e0e0',
//     paddingBottom: '0.5rem'
//   };

//   const closeButtonStyle = {
//     cursor: 'pointer',
//     border: 'none',
//     background: 'none',
//     fontSize: '1.5rem',
//     lineHeight: '1',
//     color: '#888'
//   };

//   const inputContainerStyle = {
//     display: 'flex',
//     alignItems: 'center',
//     marginBottom: '1rem'
//   };

//   const inputStyle = {
//     flex: '1',
//     padding: '0.5rem',
//     borderRadius: '4px',
//     border: '1px solid #ccc',
//     marginRight: '0.5rem'
//   };

//   const submitButtonStyle = {
//     width: '100%',
//     padding: '0.75rem',
//     background: '#00bfff',
//     border: 'none',
//     borderRadius: '4px',
//     color: 'white',
//     fontWeight: 'bold',
//     cursor: 'pointer'
//   };

//   return (
//     <div style={overlayStyle}>
//       <div style={modalStyle}>
//         <div style={headerStyle}>
//           <h2>멤버 초대</h2>
//           <button style={closeButtonStyle} onClick={onClose}>&times;</button>
//         </div>
//         <div style={inputContainerStyle}>
//           <input type="email" placeholder="이메일을 입력하세요." style={inputStyle} />
//           <select style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}>
//             <option>회원</option>
//           </select>
//         </div>
//         <button style={submitButtonStyle}>멤버 초대</button>
//       </div>
//     </div>
//   );
// }

// function Member() {
//   const [isModalOpen, setModalOpen] = useState(false);
//   const [sortOrder, setSortOrder] = useState('asc');
//   const [members, setMembers] = useState([]);
//   const { authToken } = useAuth();
//   const [error, setError] = useState('');

//   const headerStyle = {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: '1rem'
//   };

//   const titleStyle = {
//     display: 'flex',
//     alignItems: 'center',
//   };

//   const containerStyle = {
//     marginRight: '10%',
//     marginLeft: '23%',
//   };

//   const tableStyle = {
//     width: '100%',
//     borderCollapse: 'collapse',
//     marginTop: '1rem'
//   };

//   const thStyle = {
//     borderBottom: '1px solid #ddd',
//     padding: '0.75rem',
//     textAlign: 'left',
//     fontSize: '1.3rem',
//     cursor: 'pointer',
//     userSelect: 'none'
//   };

//   const tdStyle = {
//     borderBottom: '1px solid #ddd',
//     padding: '0.75rem',
//     textAlign: 'left',
//     verticalAlign: 'middle',
//     fontSize: '1.3rem'
//   };

//   const profileContainerStyle = {
//     display: 'flex',
//     alignItems: 'center'
//   };

//   const profileStyle = {
//     width: '40px',
//     height: '40px',
//     borderRadius: '50%',
//     backgroundColor: '#ccc',
//     display: 'inline-block',
//     marginRight: '0.75rem'
//   };

//   const handleOpenModal = () => {
//     setModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setModalOpen(false);
//   };

//   const handleSort = () => {
//     setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
//   };

//   const sortedMembers = [...members].sort((a, b) => {
//     if (sortOrder === 'asc') {
//       return a.name.localeCompare(b.name);
//     } else {
//       return b.name.localeCompare(a.name);
//     }
//   });

//   useEffect(() => {
//     const fetchMembers = async () => {
//       if (!authToken) {
//         setError('인증 토큰이 없습니다. 로그인이 필요합니다.');
//         return;
//       }
//       try {
//         const response = await axios.get('https://api.agilehub.store/projects/P1/members', {
//           headers: {
//             'Authorization':  `Bearer ${authToken}`
//           }
//         });
//         console.log(response.data); // 응답 데이터 콘솔에 출력
//         if (response.data.isSuccess) {
//           setMembers(response.data.result.members);
//           console.log("Members set successfully:", response.data.result.members);
//         } else {
//           console.error('Failed to fetch members:', response.data.message);
//           setError('멤버를 불러오는데 실패했습니다.');
//         }
//       } catch (error) {
//         console.error('Error fetching members:', error);
//         setError('멤버를 불러오는 도중 오류가 발생했습니다.');
//       }
//     };

//     fetchMembers();
//   }, [authToken]);

//   return (
//     <div style={containerStyle}>
//       <div style={headerStyle}>
//         <div style={titleStyle}>
//           <h1>멤버</h1>
//           <p style={{ marginLeft: '1rem', color: '#888' }}>프로젝트 멤버 수: {members.length}</p>
//         </div>
//         <div>
//           <Button onClick={handleOpenModal}>멤버 초대</Button>
//         </div>
//       </div>
//       <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//

//     </div>
//   );
// }

// export default Member;

import Button from '../MyPage/Button'; // Button 컴포넌트의 경로가 맞는지 확인 필요
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../src/context/AuthContext';

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

function Member() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState('asc');
  const [members, setMembers] = useState([]);
  // const { authToken } = useAuth();
  const authToken =
    'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBZ2lsZUh1YiIsInN1YiI6IkFjY2Vzc1Rva2VuIiwibmFtZSI6IuyLoOyKue2YnCIsInJvbGUiOiJST0xFX1VTRVIiLCJwcm92aWRlciI6Imtha2FvIiwiZGlzdGluY3RJZCI6IjM0NTcyMjMzOTYiLCJpYXQiOjE3MTYzNzA2NzAsImV4cCI6MTcxNzU4MDI3MH0.wHRXeGFc8xjT0INtVwmY5jt3g--Y2IuRUcjLequ3bDCvtCezsS_lobhNjp7lfqTrT-BioA2fvMWilpvnkEEzEg';
  const [error, setError] = useState('');

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
        const response = await axios.get('https://api.agilehub.store/projects/P1/members', {
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

export default Member;

{
  /* <table style={tableStyle}>
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
                  <img src={member.profileImageUrl} alt={`${member.name} profile`} style={profileStyle} />
                  <span>{member.name}</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */
}

{
  /* 아래는 검증된 로직 */
}
{
  /* {members.map((member, index) => (
        <div key={index}>
          {member.profileImageUrl && <img src={member.profileImageUrl} alt="Uploaded Image" />}
          {member.name}
          {member.id}
        </div>
      ))} */
}
