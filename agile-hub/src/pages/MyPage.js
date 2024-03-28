import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProjectsList() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('/api/projects');
        setProjects(response.data.result); // response.data에서 result 키에 접근하여 데이터를 설정
      } catch (error) {
        console.error('프로젝트 정보를 가져오는 데 실패했습니다:', error);
        setError('프로젝트 정보를 가져오는 데 실패했습니다.'); // 에러 상태 업데이트
      }
    };
  
    fetchProjects();
  }, []);
  

  return (
    <div className="container">
      <h1>프로젝트 목록</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {projects.map(project => (
          <li key={project.id}>
            <strong>{project.name}</strong> ({project.key})
            <div>생성일: {project.createdAt}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProjectsList;
