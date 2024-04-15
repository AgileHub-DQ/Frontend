// CreateSprintModal.js
import React, {useState} from 'react';
import '../../../css/BacklogPage/CreateSprintModal.css';

function CreateSprintModal() {


  return (
    <div className='createSprintModal'>
        <div className='date'>
        <div className='sprintStart'>스프린트 시작</div>
        <div className='dd'>1개의 이슈를 이 스프린트에 포함합니다.</div>
        <div className='dd2'>필수 필드는 별표 <span className='red'>*</span>로 표시되어 있습니다.</div>
        <div className='titleText'>스프린트 이름<span className='red'>*</span></div>
        <div className='title'></div>
        <div className='startDateText'>시작 날짜<span className='red'>*</span></div>
        <div className='startDate'></div>
        <div className='endDateText'>종료 날짜<span className='red'>*</span></div>
        <div className='endDate'></div>
        <div className='descriptionText'>스프린트 목표</div>
        <div className='description'></div>
        <button className='cancel'>취소</button>
        <button className='start'>시작</button>
        </div>
    </div>
  );
}

export default CreateSprintModal;