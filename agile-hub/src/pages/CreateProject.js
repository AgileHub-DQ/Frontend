import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { useAuth } from '../context/AuthContext';
import '../css/CreateProject.css';
import { useAuth } from '../context/AuthContext';

function CreateProject() {
  const location = useLocation();
  const navigate = useNavigate();
  const { accessToken } = location.state || {};

  // const { authToken } = useAuth(); 
  const [projectName, setProjectName] = useState('');
  const [projectKey, setProjectKey] = useState('');
  const [error, setError] = useState('');
  const [isProjectNameEntered, setIsProjectNameEntered] = useState(false);
  const [isProjectKeyEntered, setIsProjectKeyEntered] = useState(false);
  const { authToken } = useAuth();


  
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!projectKey.match(/^[a-zA-Z0-9]+$/) || projectKey.length < 2) {
      setError('프로젝트 키는 영숫자 문자만 포함하고, 길이가 2자 이상이어야 합니다.');
      return;
    }
    setError('');

    // const accessToken = 'your-access-token-here'; // Use actual token
    try {
      const response = await axios.post('https://www.agilehub.store/projects', { name: projectName, key: projectKey }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`

        }
      });
      console.log("API Response:", response.data);
      navigate('/mypage');
    } catch (error) {
        console.error('프로젝트 생성 실패:', error);
        setError('프로젝트 생성 실패: ' + (error.response?.data?.message || error.message));
    }
  };

  useEffect(() => {
    setIsProjectNameEntered(!!projectName);
  }, [projectName]);

  useEffect(() => {
    setIsProjectKeyEntered(!!projectKey);
  }, [projectKey]);

  return (
    <div className="main-container">
      <div className="sub-container">
        <div className={`text1 ${isProjectNameEntered ? 'blue-text' : 'grey-text'}`}>프로젝트 이름</div>
        <div className={`text2 ${isProjectKeyEntered ? 'blue-text' : 'grey-text'}`}>프로젝트 키</div>
      </div>
      <form onSubmit={handleSubmit} className="form-container">
        <div>
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
        <button type='submit' className='button'>프로젝트 생성</button>
      </form>
    </div>
  );
}

export default CreateProject;