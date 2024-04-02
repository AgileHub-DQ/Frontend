import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

function CheckIssue() {
  const location = useLocation();
  const projectKey = location.state?.key; // useLocation을 통해 전달된 state에서 projectKey 추출
  const [issues, setIssues] = useState([]);
  const [error, setError] = useState('');

  const fetchIssues = async () => {
    try {
      if (projectKey) {
        const response = await axios.get(`/api/projects/${projectKey}/issues`);
        // 배열 데이터에 접근하기 위한 경로를 수정하였습니다. 실제 경로는 서버 응답의 구조에 따라 다를 수 있습니다.
        setIssues(response.data.result || []); // 예를 들어, 'result' 키 안에 배열 데이터가 있다고 가정
      }
    } catch (error) {
      console.error('이슈 정보를 가져오는 데 실패했습니다:', error);
      setError('이슈 정보를 가져오는 데 실패했습니다.');
    }
  };
  

  useEffect(() => {
    fetchIssues();
  }, [projectKey]); // projectKey가 바뀔 때마다 이슈 목록을 다시 가져옴

  return (
    <div className="container">
      <h1>이슈 목록</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {issues.map(issue => (
          <li key={issue.id}>
            <strong>제목:</strong> {issue.title} <br />
            <strong>키:</strong> {issue.key} <br />
            <strong>상태:</strong> {issue.status} <br />
            <strong>타입:</strong> {issue.type} <br />
            <strong>시작일:</strong> {issue.startDate || "N/A"} <br />
            <strong>종료일:</strong> {issue.endDate || "N/A"} <br />
            <strong>부모 ID:</strong> {issue.parentId || "N/A"} <br />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CheckIssue;
