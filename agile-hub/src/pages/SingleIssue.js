// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate, useLocation } from 'react-router-dom';

// function SingleIssue() {
//   const location = useLocation();
//   const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수 가져오기
//   const { key, issueId } = location.state;
//   const [issueDetails, setIssueDetails] = useState(null);
//   const [error, setError] = useState('');
//   const projectKey = location.state?.key; 

//   const fetchIssueDetails = async () => {
//     try {
//       const response = await axios.get(`/api/projects/${key}/issues/${issueId}`, {
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });
//       setIssueDetails(response.data.result);
//     } catch (error) {
//       console.error('이슈 상세 정보를 가져오는 데 실패했습니다:', error);
//       setError('이슈 상세 정보를 가져오는 데 실패했습니다.');
//     }
//   };

//   const handleDeleteIssue = async () => {
//     const isConfirmed = window.confirm('정말로 삭제하시겠습니까?');
//     if (isConfirmed) {
//       try {
//         await axios.delete(`/api/projects/${key}/issues/${issueId}`, {
//           headers: {
//             'Content-Type': 'application/json'
//           }
//         });
//         navigate('/issues', { state: { projectKey: key } });
//       } catch (error) {
//         console.error('이슈 삭제에 실패했습니다:', error);
//         setError('이슈 삭제에 실패했습니다.');
//       }
//     }
//   };  
  
//   const handleEditIssue = async () => { 
    
//   }

//   useEffect(() => {
//     if (key && issueId) {
//       fetchIssueDetails();
//     }
//   }, [key, issueId]);

//   if (!issueDetails || !issueDetails.issue) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="container">
//       <h1>이슈 상세</h1>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       <div>
//         <p>{issueDetails.issue.title}</p>
//         {/* <p>키: {issueDetails.issue.key}</p> */}
//         <p>상태: {issueDetails.issue.status}</p>
//         <p>타입: {issueDetails.issue.type}</p>
//         <p>시작일: {issueDetails.issue.startDate}</p>
//         <p>종료일: {issueDetails.issue.endDate}</p>
//         <p>내용: {issueDetails.issue.content.text}</p>
//         <button onClick={handleEditIssue}>이슈 수정</button>
//         <button onClick={handleDeleteIssue}>이슈 삭제</button>
//       </div>
//     </div>
//   );
// }

// export default SingleIssue;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

function SingleIssue() {
  const location = useLocation();
  const navigate = useNavigate();
  const { key, issueId } = location.state;
  const [issueDetails, setIssueDetails] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedIssue, setEditedIssue] = useState({ title: '', status: '', type: '', startDate: '', endDate: '', content: { text: '' } });
  const [error, setError] = useState('');

  const fetchIssueDetails = async () => {
    try {
      const response = await axios.get(`/api/projects/${key}/issues/${issueId}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setIssueDetails(response.data.result);
      setEditedIssue(response.data.result.issue); // 편집을 위해 상태 복사
    } catch (error) {
      console.error('이슈 상세 정보를 가져오는 데 실패했습니다:', error);
      setError('이슈 상세 정보를 가져오는 데 실패했습니다.');
    }
  };

  const handleDeleteIssue = async () => {
    const isConfirmed = window.confirm('정말로 삭제하시겠습니까?');
    if (isConfirmed) {
      try {
        await axios.delete(`/api/projects/${key}/issues/${issueId}`, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        navigate('/issues', { state: { projectKey: key } });
      } catch (error) {
        console.error('이슈 삭제에 실패했습니다:', error);
        setError('이슈 삭제에 실패했습니다.');
      }
    }
  };

  const handleEditIssue = () => {
    setIsEditing(true);
  };

  const handleSaveIssue = async () => {
    const formData = new FormData();
  
    // editedIssue.assigneeId가 유효한 숫자인지 확인하고, 아닐 경우 기본값 설정
    const validAssigneeId = editedIssue.assigneeId ? editedIssue.assigneeId : '1';
  
    formData.append('parentId', editedIssue.parentId || '');
    formData.append('endDate', editedIssue.endDate);
    formData.append('assigneeId', validAssigneeId); // 수정된 부분
    formData.append('startDate', editedIssue.startDate);
    formData.append('status', editedIssue.status);
    formData.append('title', editedIssue.title);
    formData.append('content', editedIssue.content.text);
    formData.append('type', editedIssue.type);
    
    try {
      await axios.put(`/api/projects/${key}/issues/${issueId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setIsEditing(false);
      fetchIssueDetails();
    } catch (error) {
      console.error('이슈 수정에 실패했습니다:', error);
      setError('이슈 수정에 실패했습니다.');
    }
  };

  const handleAddComment = () => {
    navigate('/issueComment', { state: { projectKey: key, issueId: issueId } });
  };
  
  useEffect(() => {
    if (key && issueId) {
      fetchIssueDetails();
    }
  }, [key, issueId]);

  if (!issueDetails || !issueDetails.issue) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1>이슈 상세</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        {isEditing ? (
          <>
            <p>제목</p>
            <input value={editedIssue.title} onChange={(e) => setEditedIssue({ ...editedIssue, title: e.target.value })} />
            <p>타입</p>
            <select value={editedIssue.status} onChange={(e) => setEditedIssue({ ...editedIssue, status: e.target.value })} disabled={true} >
              <option value="EPIC">EPIC</option>
              <option value="STORY">STORY</option>
              <option value="TASK">TASK</option>
            </select>
            <p>상태</p>
            <select value={editedIssue.type} onChange={(e) => setEditedIssue({ ...editedIssue, type: e.target.value })}>
              <option value="DO">DO</option>
              <option value="PROGRESS">PROGRESS</option>
              <option value="DONE">DONE</option>
            </select>
            <p>시작날짜</p>
            <input type="date" value={editedIssue.startDate} onChange={(e) => setEditedIssue({ ...editedIssue, startDate: e.target.value })} />
            <p>마감날짜</p>
            <input type="date" value={editedIssue.endDate} onChange={(e) => setEditedIssue({ ...editedIssue, endDate: e.target.value })} />
            <p>내용</p>
            <textarea value={editedIssue.content.text} onChange={(e) => setEditedIssue({ ...editedIssue, content: { text: e.target.value } })} />
            <button onClick={handleSaveIssue}>저장하기</button>
          </>
        ) : (
          <>
            <p>제목: {issueDetails.issue.title}</p>
            <p>상태: {issueDetails.issue.status}</p>
            <p>타입: {issueDetails.issue.type}</p>
            <p>시작일: {issueDetails.issue.startDate}</p>
            <p>종료일: {issueDetails.issue.endDate}</p>
            <p>내용: {issueDetails.issue.content.text}</p>
            <button onClick={handleEditIssue}>이슈 수정</button>
            <button onClick={handleDeleteIssue}>이슈 삭제</button>
            <button onClick={handleAddComment}>댓글 달기</button>
          </>
        )}
      </div>
    </div>
  );
}

export default SingleIssue;
