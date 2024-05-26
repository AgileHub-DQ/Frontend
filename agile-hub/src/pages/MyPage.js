import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Menubar from '../components/Menubar';
import Header from '../components/MyPage/Header';
import { useAuth } from '../../src/context/AuthContext';
import Button from '../components/MyPage/Button';

function ProjectsList() {
  const navigate = useNavigate();
  const { authToken } = useAuth(); // AuthContext에서 토큰 가져오기
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState('');
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedKey, setEditedKey] = useState('');

  console.log('MyPage입니다. ');

  const fetchProjects = async () => {
    if (!authToken) {
      setError('인증 토큰이 없습니다. 로그인이 필요합니다.');
      return;
    }
    try {
      const response = await axios.get(`https://api.agilehub.store/projects`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      console.log('API Response:', response.data);
      setProjects(response.data.result);
    } catch (error) {
      console.error('프로젝트 정보를 가져오는 데 실패했습니다:', error);
      setError('프로젝트 정보를 가져오는 데 실패했습니다.');
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [authToken]); // authToken이 변경되면 fetchProjects를 다시 호출

  const editProject = async (project) => {
    setEditingProjectId(project.id);
    setEditedName(project.name);
    setEditedKey(project.key);
  };

  const saveProject = async (project) => {
    console.log(project.key);
    try {
      await axios.put(
        `https://api.agilehub.store/projects/${project.key}`,
        {
          name: editedName,
          key: editedKey,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      );

      setEditingProjectId(null);
      fetchProjects();
    } catch (error) {
      console.error('프로젝트 수정에 실패했습니다:', error);
      setError('프로젝트 수정에 실패했습니다.');
    }
  };

  const deleteProject = (project) => {
    console.log('삭제하기 버튼 클릭');
  };

  const navigateToCreateSprintModal = (projectKey, projectName) => {
    navigate(`/createSprintModal`, { state: { key: projectKey, projectName: projectName } });
  };

  const projectItemStyle = {
    margin: '2rem 0',
    background: '#F2F1F7',
    borderRadius: '20px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '60rem',
  };

  return (
    <div className="frame" style={{ display: 'flex' }}>
      <Menubar />
      <div style={{ width: '100%', height: '100%' }}>
        <Header />
        <div style={{ paddingLeft: '5%' }}>
          <h1>나의 프로젝트 목록</h1>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {projects.map((project) => (
              <li key={project.id} style={projectItemStyle}>
                {editingProjectId === project.id ? (
                  <>
                    <input type="text" value={editedName} onChange={(e) => setEditedName(e.target.value)} />
                    <input type="text" value={editedKey} onChange={(e) => setEditedKey(e.target.value)} />
                    <button onClick={() => saveProject(project)}>저장하기</button>
                  </>
                ) : (
                  <>
                    <div style={{ width: '15rem' }}>
                      <div>프로젝트 이름: {project.name}</div>
                      <div>프로젝트 키: {project.key}</div>
                      <div>프로젝트 생성일: {project.createdAt}</div>
                    </div>
                    <Button style={{ width: '100%' }} onClick={() => editProject(project)}>
                      수정하기
                    </Button>
                    <Button onClick={() => deleteProject(project)}>삭제하기</Button>
                    <Button onClick={() => navigateToCreateSprintModal(project.key, project.name)}>
                      스프린트 생성
                    </Button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProjectsList;
