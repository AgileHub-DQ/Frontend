// PlanSprint.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/BacklogPage/PlanSprint.css';
import CreateSprintModal from '../BacklogPage/modal/CreateSprintModal.js';

function PlanSprint() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleCreateSprint = () => {
    navigate('/createSprintModal'); 
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <div className='plansprint'>
      <button className='createSprintButton' onClick={handleCreateSprint}>스프린트 생성</button>
      <div className='plansprint_container'>
        <p className='plansprint_content'>스프린트 계획하기</p>
        <p className='plansprint_content'>이 스프린트의 작업을 계획하려면 백로그 섹션에서 이슈를 끌어다 놓거나 새 이슈를 생성하세요.<br></br>
          준비가 되면 스프린트 시작을(를) 선택하세요.</p>
      </div>
      {showModal && <CreateSprintModal onClose={handleModalClose} />}
    </div>
  );
}

export default PlanSprint;
