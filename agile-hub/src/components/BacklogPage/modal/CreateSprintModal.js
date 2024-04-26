import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../../css/BacklogPage/CreateSprintModal.css';

function CreateSprintModal({projectKey}) {
    const navigate = useNavigate(); 
    const [error, setError] = useState('');
    const [title, setTitle] = useState('title');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [description, setDescription] = useState('description');

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('title', title);
        formData.append('startDate', startDate);
        formData.append('endDate', endDate);
        formData.append('description', description);
    
        try {
          const endpoint = `/api/projects/${projectKey}/sprints`;
          const response = await axios.post(endpoint, formData, {
            headers: {
                'Content-Type': 'application/json'
            }
          });
          console.log(response.data.result);
          navigate('/sprint', { state: { sprintData: response.data.result, projectKey: projectKey } });
        } catch (error) {
          console.error('create sprint error!!', error);
          setError('입력되지 않은 빈칸이 존재합니다.');
        }
      };


  return (
    <div className='createSprintModal'>
        <div className='date'>
            <div className='sprintStart'>스프린트 시작</div>
            <div className='errorMessage'>{error}</div>
            <div className='dd'>1개의 이슈를 이 스프린트에 포함합니다.</div>
            <div className='dd2'>필수 필드는 별표 <span className='red'>*</span>로 표시되어 있습니다.</div>
                <div className='titleText'>스프린트 이름<span className='red'>*</span></div>
                <input type="text" className='title' value={title} onChange={(e) => setTitle(e.target.value)}/>
                <div className='startDateText'>시작 날짜<span className='red'>*</span></div>
                <input
      type="date"
      className="startDate"
      value={startDate}
      onChange={(e) => setStartDate(e.target.value)}
    />
                <div className='endDateText'>종료 날짜<span className='red'>*</span></div>
                <input
      type="date"
      className="endDate"
      value={endDate}
      onChange={(e) => setEndDate(e.target.value)}
    />
                <div className='descriptionText'>스프린트 목표</div>
                <input type="text" className='description' value={description} onChange={(e) => setDescription(e.target.value)}/>
            <button className='cancel'>취소</button>
            <button className='start' onClick={handleSubmit}>시작</button>
        </div>
    </div>
  );
}

export default CreateSprintModal;
