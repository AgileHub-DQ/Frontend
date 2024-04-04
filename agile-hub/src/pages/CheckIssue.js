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
        setIssues(response.data.result); // 이슈 목록을 상태에 저장
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
            <strong>{issue.title}</strong> - {issue.status}
            <div>설명: {issue.description}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CheckIssue;
