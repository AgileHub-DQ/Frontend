import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

function SingleIssue() {
  const location = useLocation();
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수 가져오기
  const { key, issueId } = location.state;
  const [issueDetails, setIssueDetails] = useState(null);
  const [error, setError] = useState('');
  const projectKey = location.state?.key; 

  const fetchIssueDetails = async () => {
    try {
      const response = await axios.get(`/api/projects/${key}/issues/${issueId}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setIssueDetails(response.data.result);
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
        // 삭제 후 이슈 목록 페이지로 이동하면서 projectKey를 state로 전달합니다.
        // 이 예제에서는 /issues 경로를 이슈 목록 페이지로 가정합니다.
        // 실제 애플리케이션의 이슈 목록 페이지 경로에 맞게 수정해야 합니다.
        navigate('/issues', { state: { projectKey: key } });
      } catch (error) {
        console.error('이슈 삭제에 실패했습니다:', error);
        setError('이슈 삭제에 실패했습니다.');
      }
    }
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
        <p>{issueDetails.issue.title}</p>
        <p>키: {issueDetails.issue.key}</p>
        <p>상태: {issueDetails.issue.status}</p>
        <p>타입: {issueDetails.issue.type}</p>
        <p>시작일: {issueDetails.issue.startDate}</p>
        <p>종료일: {issueDetails.issue.endDate}</p>
        <p>내용: {issueDetails.issue.content.text}</p>
        <button>이슈 수정</button>
        <button onClick={handleDeleteIssue}>이슈 삭제</button>
      </div>
    </div>
  );
}

export default SingleIssue;
