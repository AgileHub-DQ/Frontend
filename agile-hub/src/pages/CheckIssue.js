import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

function CheckIssue() {
  const location = useLocation();
  const projectKey = location.state?.key; // useLocation을 통해 전달된 state에서 projectKey 추출
  const [issues, setIssues] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const fetchIssues = async () => {
    try {
      if (projectKey) {
        const response = await axios.get(`/projects/${projectKey}/issues`);
        console.log(response);
        setIssues(response.data.result); // 이슈 목록을 상태에 저장
      }
    } catch (error) {
      console.error('이슈 정보를 가져오는 데 실패했습니다:', error);
      setError('이슈 정보를 가져오는 데 실패했습니다.');
    }
  };

  const handleIssueClick = (key, issueId) => {
    navigate(`/singleIssue`, { state: { key, issueId } }); // navigate 함수를 사용하여 이동할 경로와 state로 전달할 데이터 설정
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
            <button onClick={() => handleIssueClick(projectKey, issue.id)}>이슈 조회하러 가기</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CheckIssue;
