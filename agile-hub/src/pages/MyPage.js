import React, { useState, useEffect } from 'react';
import axios from 'axios';


function ProjectsList() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState('');
  const [editingProjectId, setEditingProjectId] = useState(null); // 현재 수정 중인 프로젝트의 ID, 현재 사용자가 편집하고자 하는 특정 프로젝트를 구별하기 위함. 
  const [editedName, setEditedName] = useState(''); // 수정된 프로젝트 이름
  const [editedKey, setEditedKey] = useState(''); // 수정된 프로젝트 키
  const [isEditing, setIsEditing] = useState(false);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('/api/projects');
      setProjects(response.data.result);
    } catch (error) {
      console.error('프로젝트 정보를 가져오는 데 실패했습니다:', error);
      setError('프로젝트 정보를 가져오는 데 실패했습니다.');
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);
  
  const editProject = async (project) => { 
    setEditingProjectId(project.id);
    setEditedName(project.name); // 현재 프로젝트 이름으로 초기화
    setEditedKey(project.key); // 현재 프로젝트 키로 초기화
  }; 
  
  const saveProject = async (project) => {
    console.log(project.key);
    try {
      await axios.put(`/api/projects/${project.key}`, {
        name: editedName,
        key: editedKey
      });
      setEditingProjectId(null); // 편집 모드 종료
      fetchProjects(); // 프로젝트 목록 갱신
    } catch (error) {
      console.error('프로젝트 수정에 실패했습니다:', error);
      setError('프로젝트 수정에 실패했습니다.');
    }
  };

  const deleteProject = () => { 
    console.log("삭제하기 버튼 클릭"); 
  }

  return (
    <div className="container">
      <h1>프로젝트 목록</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {projects.map(project => (
          <li key={project.id}>
            {editingProjectId === project.id ? (
              <>
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                />
                <input
                  type="text"
                  value={editedKey}
                  onChange={(e) => setEditedKey(e.target.value)}
                />
                <button onClick={() => saveProject(project)}>저장하기</button>
              </>
            ) : (
              <>
                <strong>{project.name}</strong> ({project.key})
                <div>생성일: {project.createdAt}</div>
                <button onClick={() => editProject(project)}>수정하기</button>
                <button onClick={deleteProject}>삭제하기</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProjectsList;