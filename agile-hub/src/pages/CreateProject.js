// CreateProject.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/CreateProject.css';
import Menubar from '../components/Menubar.js';

function CreateProject() {
  const [projectName, setProjectName] = useState('');
  const [projectKey, setProjectKey] = useState('');
  const [error, setError] = useState('');
  const [isProjectNameEntered, setIsProjectNameEntered] = useState(false);
  const [isProjectKeyEntered, setIsProjectKeyEntered] = useState(false);

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
      }, {
        headers: {
          'Content-Type': 'application/json' // 헤더 명시 
      }
      });
    } catch (error) {
        console.error('프로젝트 생성 실패:', error);
    }
  };

  useEffect(() => {
    setIsProjectNameEntered(!!projectName);
  }, [projectName]);

  useEffect(() => {
    setIsProjectKeyEntered(!!projectKey);
  }, [projectKey]);

  return (
    <div className="container">
      <Menubar/>
      {/* <div className='group183'/> */}
      <div className={`text1 ${isProjectNameEntered ? 'blue-text' : 'grey-text'}`}>프로젝트 이름</div>
      <div className={`text2 ${isProjectKeyEntered ? 'blue-text' : 'grey-text'}`}>프로젝트 키</div>
      <form onSubmit={handleSubmit}>
        <div>
          {/* <label htmlFor="projectName">프로젝트 이름:</label> */}
          <input
            id="projectName"
            type="text"
            value={projectName}
            placeholder='프로젝트 이름'
            className='projectName'
            onChange={(e) => setProjectName(e.target.value)}
          />
        </div>
        <div>
          {/* <label htmlFor="projectKey">프로젝트 키:</label> */}
          <input
            id="projectKey"
            type="text"
            value={projectKey}
            placeholder='프로젝트 키'
            className='projectKey'
            onChange={(e) => setProjectKey(e.target.value)}
          />
        </div>
        {error && <p className='error'>{error}</p>}
        <button type='submit' className='button' >프로젝트 생성
        <svg width="34" height="34" viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="37" cy="37" r="35.5" stroke="black" strokeWidth="3"></circle>
        <path d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z" fill="black"></path>
    </svg>
    </button>
        {/* <button type="submit" className='button'>프로젝트 생성</button> */}
      </form>
    </div>
  );
}

export default CreateProject;