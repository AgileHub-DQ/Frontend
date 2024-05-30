import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../css/TimeLinePage/ComponentTimeline.css';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.js';

function Modal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const { authToken } = useAuth();
  const [email, setEmail] = useState('');
  const [inviteStatus, setInviteStatus] = useState(null);
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);

  //수정 (임의 프로젝트 지정)
  const projectId = 1;

  const handlePostAI = async () => {
    if (!authToken) {
      setError('인증 토큰이 없습니다. 로그인이 필요합니다.');
      return;
    }

    if (!email) {
      alert('이메일을 입력해주세요.');
      return;
    }

    const requestBody = {
      email: email,
      projectId: projectId, //수정 (임의 프로젝트 지정)
    };

    try {
      const response = await axios.post('https://api.agilehub.store/reports/monthly', requestBody, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.status === 200) {
        setInviteStatus({ success: true, message: '이메일이 성공적으로 발송되었습니다.' });
      } else {
        setInviteStatus({ success: false, message: response.data.message || '이메일 발송에 실패했습니다.' });
      }
    } catch (error) {
      console.error('Error inviting member:', error);
      setInviteStatus({ success: false, message: '서버 오류로 인해 초대 이메일을 발송할 수 없습니다.' });
    }
  };

  if (!isOpen) {
    return null;
  }

  const modalStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: 'white',
    padding: '1rem',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    width: '400px',
    maxWidth: '90%',
  };

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.3)',
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
    borderBottom: '1px solid #e0e0e0',
    paddingBottom: '0.5rem',
  };

  const closeButtonStyle = {
    cursor: 'pointer',
    border: 'none',
    background: 'none',
    fontSize: '1.5rem',
    lineHeight: '1',
    color: '#888',
  };

  const inputContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1rem',
  };

  const inputStyle = {
    flex: '1',
    padding: '0.5rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
    marginRight: '0.5rem',
  };

  const submitButtonStyle = {
    width: '100%',
    padding: '0.75rem',
    background: '#00bfff',
    border: 'none',
    borderRadius: '4px',
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer',
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <div style={headerStyle}>
          <h2>AI 요약</h2>
          <button style={closeButtonStyle} onClick={onClose}>
            &times;
          </button>
        </div>
        <div style={inputContainerStyle}>
          <input
            type="email"
            placeholder="이메일을 입력하세요."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />
        </div>
        <button style={submitButtonStyle} onClick={handlePostAI}>
          AI 요약본 전송하기
        </button>
        {inviteStatus && <div style={{ color: inviteStatus.success ? 'green' : 'red' }}>{inviteStatus.message}</div>}
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </div>
    </div>
  );
}

function ComponentTimeline({ onTitleClick, projectKey, projectName }) {
  console.log('componentTimeline projectName: ' + projectName);
  // const projectKey = 'P1';
  const { authToken } = useAuth();

  const [timelineTitle, setTimelineTitle] = useState([]);
  const [filteredTitles, setFilteredTitles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statistics, setStatistics] = useState([]);
  const [timelineStatus, setTimelineStatus] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);

  useEffect(() => {
    searchBox();
  }, []);

  useEffect(() => {
    filterTitles(searchTerm);
  }, [searchTerm, timelineTitle]);

  const searchBox = async () => {
    try {
      const response = await axios.get(`https://api.agilehub.store/projects/${projectKey}/epics/stats`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });

      const result = response.data.result || [];
      const statuses = result.map((item) => item.issue?.status || '');
      const statistics = result.map((item) => item.statistic || {});
      const titles = result.map((item) => item.issue?.title || 'No Title');

      setTimelineStatus(statuses);
      setStatistics(statistics);
      setTimelineTitle(titles);

      console.log('statuses:' + JSON.stringify(statuses));
      console.log('statistics:' + JSON.stringify(statistics));
      console.log('titles:' + JSON.stringify(titles));
    } catch (error) {
      console.error('API 요청 실패:', error);
    }
  };

  const filterTitles = (searchTerm) => {
    if (!searchTerm) {
      setFilteredTitles([]);
    } else {
      const filtered = timelineTitle.filter((title) => title.toLowerCase().includes(searchTerm.toLowerCase()));
      setFilteredTitles(filtered);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
    console.log('멤버초대 버튼이 눌렸습니다.');
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="barentirecontainer">
      <div className="barcontainer">
        <div className="project">
          프로젝트/[<span style={{ color: 'black' }}>{projectName}</span>]
        </div>
        <div className="timeline_text">타임라인</div>
      </div>
      <div className="bar2container">
        <div className="search-container">
          <input
            type="text"
            id="search"
            className="search"
            placeholder="검색..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <FaSearch className="search-icon" />
        </div>
        <button
          className="flash-animation"
          style={{
            backgroundColor: 'blue',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
          }}
          onClick={handleOpenModal}
        >
          AI 요약하기
        </button>
        <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
      </div>
      {searchTerm && (
        <div style={styles.resultsContainer}>
          {filteredTitles.map((title, index) => (
            <div key={index} style={styles.resultItem} onClick={() => onTitleClick(title)}>
              {title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  resultsContainer: {
    position: 'absolute',
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '4px',
    width: '350px',
    marginTop: '100px',
    marginLeft: '10px',
    zIndex: 1000,
    border: '1px solid #ddd',
    padding: '10px',
  },
  resultItem: {
    padding: '10px',
    cursor: 'pointer',
    borderBottom: '1px solid #ddd',
  },
};

export default ComponentTimeline;
