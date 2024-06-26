import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../src/context/AuthContext';
import axios from 'axios';

function Modal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const { authToken } = useAuth();
  const [email, setEmail] = useState('');
  const [inviteStatus, setInviteStatus] = useState(null);
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);

  //수정 (임의 프로젝트 지정)
  const projectId = 1;

  const handleInvite = async () => {
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
      const response = await axios.post('https://api.agilehub.store/projects/invite/send', requestBody, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.status === 200) {
        setInviteStatus({ success: true, message: '초대 이메일이 성공적으로 발송되었습니다.' });
      } else {
        setInviteStatus({ success: false, message: response.data.message || '초대 이메일 발송에 실패했습니다.' });
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
          <h2>멤버 초대</h2>
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
          <select style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}>
            <option>회원</option>
          </select>
        </div>
        <button style={submitButtonStyle} onClick={handleInvite}>
          멤버 초대
        </button>
        {inviteStatus && <div style={{ color: inviteStatus.success ? 'green' : 'red' }}>{inviteStatus.message}</div>}
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </div>
    </div>
  );
}

function Member() {
  const location = useLocation();
  const projectKey = location.state || '';

  const [isModalOpen, setModalOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState('asc');
  const [members, setMembers] = useState([]);
  const { authToken } = useAuth();
  const [error, setError] = useState('');

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '1rem',
  };

  const titleStyle = {
    display: 'flex',
    alignItems: 'center',
  };

  const containerStyle = {
    marginRight: '10%',
    marginLeft: '23%',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '1rem',
  };

  const thStyle = {
    borderBottom: '1px solid #ddd',
    padding: '0.75rem',
    textAlign: 'left',
    fontSize: '1.3rem',
    cursor: 'pointer',
    userSelect: 'none',
  };

  const tdStyle = {
    borderBottom: '1px solid #ddd',
    padding: '0.75rem',
    textAlign: 'left',
    verticalAlign: 'middle',
    fontSize: '1.3rem',
  };

  const profileContainerStyle = {
    display: 'flex',
    alignItems: 'center',
  };

  const profileStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#ccc',
    display: 'inline-block',
    marginRight: '0.75rem',
  };

  const handleOpenModal = () => {
    setModalOpen(true);
    console.log('멤버초대 버튼이 눌렸습니다.');
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSort = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const sortedMembers = [...members].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });

  useEffect(() => {
    const fetchMembers = async () => {
      if (!authToken) {
        setError('인증 토큰이 없습니다. 로그인이 필요합니다.');
        return;
      }
      try {
        const response = await axios.get(`https://api.agilehub.store/projects/P1/members`, {
          //수정 (임의 프로젝트 지정)
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        console.log(authToken);
        console.log(response.data);
        if (response.data.isSuccess) {
          setMembers(response.data.result.members);
          console.log('Members set successfully:', response.data.result.members);
        } else {
          console.error('Failed to fetch members:', response.data.message);
          setError('멤버를 불러오는데 실패했습니다.');
        }
      } catch (error) {
        console.error('Error fetching members:', error);
        setError('멤버를 불러오는 도중 오류가 발생했습니다.');
      }
    };

    fetchMembers();
  }, [authToken]);

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div style={titleStyle}>
          <h1>멤버</h1>
          <p style={{ marginLeft: '1rem', color: '#888' }}>프로젝트 멤버 수: {members.length}</p>
        </div>
        <div>
          <button
            style={{
              backgroundColor: 'blue',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold',
              ':hover': {
                backgroundColor: 'darkblue',
              },
            }}
            onClick={handleOpenModal}
          >
            멤버 초대
          </button>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle} onClick={handleSort}>
              이름 {sortOrder === 'asc' ? '⬆️' : '⬇️'}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedMembers.map((member, index) => (
            <tr key={index}>
              <td style={tdStyle}>
                <div style={profileContainerStyle}>
                  <img src={member.profileImageUrl} alt={`${member.name} profile`} style={profileStyle} />
                  <span>{member.name}</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Member;