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



import React from 'react';
import { useAuth } from "../../src/context/AuthContext"; 
function Test() {
  const { authToken } = useAuth(); // AuthContext에서 토큰 가져오기



  return (
    <div>
      hi {authToken}
    </div>
  );
}

export default Test;
