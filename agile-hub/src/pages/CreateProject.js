// CreateProject.js
import React, { useState } from 'react';
import axios from 'axios';

function CreateProject() {
  const [projectName, setProjectName] = useState('');
  const [projectKey, setProjectKey] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!projectKey.match(/^[a-zA-Z0-9]+$/) || projectKey.length < 2) {
      setError('프로젝트 키는 영숫자 문자만 포함하고, 길이가 2자 이상이어야 합니다.');
      return;
    }
  
    setError('');
  
    try {
      const response = await axios.post('/api/projects', {
        name: projectName,
        key: projectKey,
      });
  
      // 리다이렉션 경로 구성
      const projectKeyReceived = response.data.key; // 응답으로 받은 프로젝트 키
      const redirectPath = `/api/projects/${projectKeyReceived}/boards`;
      window.location = redirectPath; // 사용자를 새 위치로 리다이렉트
  
    } catch (error) {
      if (error.response && error.response.status === 303) {
        // 서버에서 반환한 Location 헤더에 따라 리다이렉트
        const location = error.response.headers.location;
        window.location = location; // 사용자를 새 위치로 리다이렉트
      } else {
        console.error('프로젝트 생성 실패:', error);
      }
    }
  };
  

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="projectName">프로젝트 이름:</label>
          <input
            id="projectName"
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="projectKey">프로젝트 키:</label>
          <input
            id="projectKey"
            type="text"
            value={projectKey}
            onChange={(e) => setProjectKey(e.target.value)}
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">프로젝트 생성</button>
      </form>
    </div>
  );
}

export default CreateProject;
