import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Modal 접근성을 위해 설정

function InviteMember() {
  const [modalIsOpen, setModalIsOpen] = useState(true);

  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    // 컴포넌트가 마운트될 때 모달을 열도록 설정
    setModalIsOpen(true);
  }, []);

  return (
    <div className='invite-member-container'>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Invite Member Modal"
        style={{
          overlay: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
          },
          content: {
            position: 'relative',
            background: '#fff',
            padding: '20px',
            borderRadius: '10px',
            maxWidth: '500px',
            width: '90%',
            height: 'auto',
            overflowY: 'auto'
          }
        }}
      >
        <span className='close-button' onClick={closeModal}>&times;</span>
        <img src="/assets/images/AgileHub.png" alt="Agile Hub" className="modal-image"/>
        <div className="modal-section">
          관리자가 <strong>[핑핑이네]</strong>에 초대했습니다.
        </div>
        <div className="modal-section">
          관리자 및 팀과 함께 이슈 추적을 시작하세요! <br/>
          작업을 공유하고 팀이 무엇을 하고 있는지 볼 수 있어요.
        </div>
        <div className="modal-section modal-buttons">
          <button className="accept-button">Accept Invite</button>
        </div>
        <div className="modal-section footer">
          This message was sent to you by AgileHub
        </div>
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
