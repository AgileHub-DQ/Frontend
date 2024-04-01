// PlanSprint.js
import React from 'react';
import '../../css/BacklogPage/PlanSprint.css';

function PlanSprint() {

  return (
    <div className='plansprint'>
      <div className='plansprint_container'>
        <p className='plansprint_content'>스프린트 계획하기</p>
        <p className='plansprint_content'>이 스프린트의 작업을 계획하려면 백로그 섹션에서 이슈를 끌어다 놓거나 새 이슈를 생성하세요.<br></br>
        준비가 되면 스프린트 시작을(를) 선택하세요.</p>
      </div>
    </div>
  );
}

export default PlanSprint;