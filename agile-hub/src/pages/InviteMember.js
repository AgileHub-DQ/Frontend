import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import axios from 'axios';
import { useAuth } from '../../src/context/AuthContext';
import { useLocation } from 'react-router-dom';

Modal.setAppElement('#root');

function InviteMember() {
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const [inviteCode, setInviteCode] = useState('');
  const [acceptStatus, setAcceptStatus] = useState(null);
  const { authToken } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleAcceptInvite = async () => {
    if (!authToken) {
      setAcceptStatus({ success: false, message: '인증 토큰이 없습니다. 로그인이 필요합니다.' });
      // 로그인 페이지로 리다이렉트하면서 현재 URL을 쿼리 파라미터로 전달
      navigate(`/login?redirectUrl=${location.pathname + location.search}`);
      return;
    }

    const requestBody = {
      inviteCode: inviteCode,
    };

    console.log('redirect' + document.referrer);
    try {
      console.log('redirect' + document.referrer);
      const response = await axios.post('https://api.agilehub.store/projects/invite/receive', requestBody, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`, // Directly using the provided token
        },
      });

      if (response.status === 200) {
        console.log('제대로 수락이 되었습니다');
        setAcceptStatus({ success: true, message: '초대가 성공적으로 수락되었습니다.' });
        closeModal(); // 초대 수락 후 모달 닫기
        window.location.href = 'https://www.agilehub.store/myPage';
      } else {
        setAcceptStatus({ success: false, message: response.data.message || '초대 수락에 실패했습니다.' });
      }
    } catch (error) {
      console.log('인증토큰' + authToken);
      setAcceptStatus({ success: false, message: '초대코드가 만료되었습니다.' });
    }
  };

  useEffect(() => {
    // URL에서 초대 코드를 추출
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get('inviteCode');
    console.log('Extracted inviteCode: ', code);
    if (code) {
      setInviteCode(code);
    }
    // 컴포넌트가 마운트될 때 모달을 열도록 설정
    setModalIsOpen(true);
  }, [location]);

  return (
    <div className="invite-member-container">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Invite Member Modal"
        style={{
          overlay: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          content: {
            position: 'relative',
            background: '#fff',
            padding: '20px',
            borderRadius: '10px',
            maxWidth: '500px',
            width: '90%',
            height: 'auto',
            overflowY: 'auto',
          },
        }}
      >
        <span className="close-button" onClick={closeModal}>
          &times;
        </span>
        <img src="/assets/images/AgileHub.png" alt="Agile Hub" className="modal-image" />
        <div className="modal-section">
          관리자가 <strong>[핑핑이네]</strong>에 초대했습니다. {/* 수정해야 함 */}
        </div>
        <div className="modal-section">
          관리자 및 팀과 함께 이슈 추적을 시작하세요! <br />
          작업을 공유하고 팀이 무엇을 하고 있는지 볼 수 있어요.
        </div>
        <div className="modal-section">
          <input
            type="text"
            placeholder="초대 코드를 입력하세요"
            value={inviteCode}
            onChange={(e) => setInviteCode(e.target.value)}
            style={{ textAlign: 'center' }}
            disabled
          />
        </div>
        <div className="modal-section modal-buttons">
          <button className="accept-button" onClick={handleAcceptInvite}>
            Accept Invite
          </button>
        </div>
        <div className="modal-section footer">This message was sent to you by AgileHub</div>
        {acceptStatus && (
          <div style={{ color: acceptStatus.success ? 'green' : 'red', textAlign: 'center' }}>
            {acceptStatus.message}
          </div>
        )}
      </Modal>

      <style>
        {`
          .invite-member-container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
          }

          .close-button {
            position: absolute;
            top: 10px;
            right: 10px;
            font-size: 24px;
            cursor: pointer;
            color: #aaa;
            transition: color 0.2s;
          }

          .close-button:hover {
            color: #000;
          }

          .modal-image {
            display: block;
            margin: 0 auto 20px;
            width: 250px;
            height: 100px;
          }

          .modal-section {
            margin-bottom: 20px;
            font-size: 20px; /* 전반적인 글자 크기를 더 키움 */
            color: #333;
            text-align: center;
          }

          .modal-buttons {
            text-align: center;
          }

          .accept-button {
            background-color: #24b4fb;
            border: none;
            color: white;
            padding: 15px 30px; /* 패딩 유지 */
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 20px; /* 버튼 글자 크기를 더 키움 */
            margin: 4px 2px;
            cursor: pointer;
            border-radius: 12px;
            transition: background-color 0.3s;
          }

          .accept-button:hover {
            background-color: #0071e2;
          }

          .footer {
            font-size: 18px; /* 푸터 글자 크기를 더 키움 */
            color: #999;
            text-align: center;
          }
        `}
      </style>
    </div>
  );
}

export default InviteMember;