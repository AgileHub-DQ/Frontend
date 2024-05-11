import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Menubar from '../components/Menubar';
import Header from '../components/MyPage/Header';
import Button from '../components/MyPage/Button';

function ProjectsList() {
  const navigate = useNavigate(); 
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState('');
  const [editingProjectId, setEditingProjectId] = useState(null); 
  const [editedName, setEditedName] = useState(''); // 수정된 프로젝트 이름
  const [editedKey, setEditedKey] = useState(''); // 수정된 프로젝트 키

  const fetchProjects = async () => {
    try {
      const accessToken = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBZ2lsZUh1YiIsInN1YiI6IkFjY2Vzc1Rva2VuIiwibmFtZSI6IuyLoOyKue2YnCIsInJvbGUiOiJST0xFX1VTRVIiLCJwcm92aWRlciI6Imtha2FvIiwiZGlzdGluY3RJZCI6IjM0NTcyMjMzOTYiLCJpYXQiOjE3MTQyODMzNTYsImV4cCI6MTcxNTQ5Mjk1Nn0.PGInkoWYOAY_GsY_vO462E0dOcn-yHvlqPaa6P4SSttUtj7fW48q9DvkjSuT1I-VUxmZ04knuVK6JIZffVzyXg';

      const response = await axios.get("/projects", {
        headers: {
          Authorization: `Bearer ${accessToken}`  
        }
      });

      console.log("API Response:", response.data);  
      
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
    const accessToken = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBZ2lsZUh1YiIsInN1YiI6IkFjY2Vzc1Rva2VuIiwibmFtZSI6IuyLoOyKue2YnCIsInJvbGUiOiJST0xFX1VTRVIiLCJwcm92aWRlciI6Imtha2FvIiwiZGlzdGluY3RJZCI6IjM0NTcyMjMzOTYiLCJpYXQiOjE3MTQyODMzNTYsImV4cCI6MTcxNTQ5Mjk1Nn0.PGInkoWYOAY_GsY_vO462E0dOcn-yHvlqPaa6P4SSttUtj7fW48q9DvkjSuT1I-VUxmZ04knuVK6JIZffVzyXg';

    console.log(project.key);
    try {
      await axios.put(`/projects/${project.key}`, {
        name: editedName,
        key: editedKey
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
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

  const navigateToIssue = (projectKey) => {
    navigate(`/issue`, { state: { key: projectKey } }); 
  };

  const navigateToCheckIssue = (projectKey) => { 
    navigate(`/checkIssue`, { state: { key: projectKey } }); 
  }

  const navigateToCreateSprintModal = (projectKey) => { 
    navigate(`/createSprintModal`, { state: { key: projectKey } }); 
  }

  const navigateToBacklog = (projectKey) => { 
    navigate(`/backlog`, { state: { key: projectKey } }); 
  }

  const navigateToSprintAllList = (projectKey) => { 
    navigate(`/sprintAllList`, { state: { key: projectKey } }); 
  }

  const projectItem = {
    marginTop: '2rem',
    background: '#F2F1F7',
    borderRadius: '20px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between', 
    width:'80%'
  }

  const projectName = { 
    fontFamily: "Mona Sans", 
    fontSize: "24px", 
    fontWeight: "600", 
    color: "black"
  }

  const projectKey = { 
    fontFamily: "Mona Sans", 
    fontSize: "18px", 
    fontWeight: "400", 
    color: "black"
  }

  const projectCreatedAt = { 
    fontFamily: "Mona Sans", 
    fontSize: "18px", 
    fontWeight: "800", 
    color: "gray"
  }

  const inputStyle = { 
    borderRadius: '5px',
    fontSize: '16px',
    fontWeight: 'bold',
    border: 'none',
    padding: '10px 20px',
  }

  return (
    <div className="container">
      <Menubar/>
      <div style={{width:'100%', height:'100%'}}>
      <Header/>
      <div style={{paddingLeft: '5%', width:'100%'}}>
      <h1>나의 프로젝트 목록</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
        {projects.map(project => (
          <li key={project.id} style={projectItem}>
            {editingProjectId === project.id ? (
              // 스타일 수정
              <>
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  style={inputStyle}
                />
                <input
                  type="text"
                  value={editedKey}
                  onChange={(e) => setEditedKey(e.target.value)}
                  style={inputStyle}
                />
                <Button onClick={() => saveProject(project)}>저장하기</Button>
              </>
            ) : (
              <>
                <div>
                  <div style={projectName}>{project.name}</div> 
                  <div style={projectKey}>{project.key}</div> 
                  <div style={projectCreatedAt}>{project.createdAt}</div>
                </div>
                <Button onClick={() => editProject(project)}>수정하기</Button>
                <Button onClick={() => deleteProject}>삭제하기</Button>
                <Button onClick={() => navigateToIssue(project.key)}>이슈 생성하러가기</Button>
                <Button onClick={() => navigateToCreateSprintModal(project.key)}>스프린트 생성하러 가기</Button>
                <Button onClick={() => navigateToBacklog(project.key)}>백로그 페이지 바로가기</Button>
                <Button onClick={() => navigateToSprintAllList(project.key)}>스프린트 전체 조회하러가기</Button>
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