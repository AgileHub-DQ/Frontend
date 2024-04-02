import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

function SingleIssue() {
  const location = useLocation();
  const { key, issueId } = location.state; // useLocation을 통해 전달된 state에서 key와 issueId 추출
  const [issueDetails, setIssueDetails] = useState(null); // 이슈 상세 정보를 저장할 상태
  const [error, setError] = useState('');

  const fetchIssueDetails = async () => {
    try {
      const response = await axios.get(`/api/projects/${key}/issues/${issueId}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      // 여기를 수정하여, issueDetails에 response.data.result를 저장합니다.
      setIssueDetails(response.data.result); // 서버로부터 받은 데이터의 result를 상태에 저장
    } catch (error) {
      console.error('이슈 상세 정보를 가져오는 데 실패했습니다:', error);
      setError('이슈 상세 정보를 가져오는 데 실패했습니다.');
    }
  };  

  useEffect(() => {
    if (key && issueId) { // key와 issueId가 유효한 경우에만 요청을 보냅니다.
      fetchIssueDetails();
    }
  }, [key, issueId]); // 컴포넌트 마운트 시 이슈 상세 정보 요청

  if (!issueDetails || !issueDetails.issue) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1>이슈 상세</h1>
      <p></p>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <p>{issueDetails.issue.title}</p>
        <p>키: {issueDetails.issue.key}</p>
        <p>상태: {issueDetails.issue.status}</p>
        <p>타입: {issueDetails.issue.type}</p>
        <p>시작일: {issueDetails.issue.startDate}</p>
        <p>종료일: {issueDetails.issue.endDate}</p>
        <p>내용: {issueDetails.issue.content.text}</p>
        {/* 여기에 더 많은 상세 정보를 표시할 수 있습니다. */}
      </div>
    </div>
  );
}

export default SingleIssue;
