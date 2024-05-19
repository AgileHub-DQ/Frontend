import React, { useState, useEffect } from 'react';
import '../../css/CreateProject.css';

const ProjectEx = () => {
  const [projectName, setProjectName] = useState('');
  const [projectKey, setProjectKey] = useState('');
  const [isProjectNameEntered, setIsProjectNameEntered] = useState(false);
  const [isProjectKeyEntered, setIsProjectKeyEntered] = useState(false);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setIsProjectNameEntered(projectName.length > 0);
    setIsProjectKeyEntered(projectKey.length > 0);
  }, [projectName, projectKey]);

  const handleButtonClick = (e) => {
    e.preventDefault(); // Prevent form submission
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

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
        <button className="button" onClick={handleButtonClick}>프로젝트 생성</button>
      </form>

      {showModal && (
        <div style={{
          position: 'fixed',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '4px',
            textAlign: 'center',
            maxWidth: '400px',
            width: '80%',
          }}>
            <p>테스트용입니다! 프로젝트 생성 먼저 해주세요.</p>
            <button
              onClick={handleCloseModal}
              style={{
                backgroundColor: '#007bff',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                marginTop: '10px'
              }}
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectEx;
