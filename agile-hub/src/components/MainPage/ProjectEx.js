import React, { useState, useEffect } from 'react';
import '../../css/CreateProject.css';

const ProjectEx = () => {
  const [projectName, setProjectName] = useState('');
  const [projectKey, setProjectKey] = useState('');
  const [isProjectNameEntered, setIsProjectNameEntered] = useState(false);
  const [isProjectKeyEntered, setIsProjectKeyEntered] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setIsProjectNameEntered(projectName.length > 0);
    setIsProjectKeyEntered(projectKey.length > 0);
  }, [projectName, projectKey]);

  return (
    <div className="main-container">
      <div className="sub-container">
        <div className={`text1 ${isProjectNameEntered ? 'blue-text' : 'grey-text'}`}>프로젝트 이름</div>
        <div className={`text2 ${isProjectKeyEntered ? 'blue-text' : 'grey-text'}`}>프로젝트 키</div>
      </div>
      <form className="form-container">
        <div>
          <input
            id="projectName"
            type="text"
            value={projectName}
            placeholder="프로젝트 이름"
            className="projectName"
            onChange={(e) => setProjectName(e.target.value)}
          />
        </div>
        <div>
          <input
            id="projectKey"
            type="text"
            value={projectKey}
            placeholder="프로젝트 키"
            className="projectKey"
            onChange={(e) => setProjectKey(e.target.value)}
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button className="button">프로젝트 생성</button>
      </form>
    </div>
  );
};

export default ProjectEx;
