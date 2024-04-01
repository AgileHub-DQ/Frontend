import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

function CheckIssue() {
    
    const [issues, setIssues] = useState([]); // 이슈들을 저장할 상태
  const location = useLocation(); // 현재 위치를 알아내기 위한 hook
  const [projectKey, setProjectKey] = useState('');

  useEffect(() => {
    // 프로젝트 키를 URL에서 추출
    const projectKey = location.pathname.split('/')[3]; // URL 구조에 따라 수정할 수 있음
    const fetchIssues = async () => {
      try {
        const response = await axios.get(`/api/projects/${projectKey}/issues`, {
          headers: {
            'accept': 'application/json'
          }
        });
        setIssues(response.data); // 응답 데이터로 이슈 상태 업데이트
      } catch (error) {
        console.error('이슈 조회 실패:', error);
      }
    };

    fetchIssues();
  }, [location.pathname]); // location.pathname이 변경될 때마다 요청

  return (
  <div className="container">
      <h1>이슈 목록</h1>
      <ul>
        {issues.map((issue, index) => (
          <li key={index}>
            <p><strong>제목:</strong> {issue.title}</p>
            <p><strong>타입:</strong> {issue.type}</p>
            <p><strong>상태:</strong> {issue.status}</p>
            <p><strong>내용:</strong> {issue.content}</p>
            {/* 추가적으로 표시하고 싶은 내용이 있다면 여기에 추가 */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CheckIssue;
