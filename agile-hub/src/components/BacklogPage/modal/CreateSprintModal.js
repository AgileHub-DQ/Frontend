// CreateSprintModal.js
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../../css/BacklogPage/CreateSprintModal.css';

function CreateSprintModal() {
    const location = useLocation();
    const [projectKey, setProjectKey] = useState('');
    const [error, setError] = useState('');
    const [title, setTitle] = useState('title');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [description, setDescription] = useState('description');
    const navigate = useNavigate(); 

    useEffect(() => {
        // location.state에서 projectKey 가져오기
        const key = location.state?.key;
        setProjectKey(key);
        console.log('projectKey:', key);
    }, [location.state]);


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('title', title);
        formData.append('startDate', startDate);
        formData.append('endDate', endDate);
        formData.append('description', description);

        const accessToken = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBZ2lsZUh1YiIsInN1YiI6IkFjY2Vzc1Rva2VuIiwibmFtZSI6IuyLoOyKue2YnCIsInJvbGUiOiJST0xFX1VTRVIiLCJwcm92aWRlciI6Imtha2FvIiwiZGlzdGluY3RJZCI6IjM0NTcyMjMzOTYiLCJpYXQiOjE3MTQyODMzNTYsImV4cCI6MTcxNTQ5Mjk1Nn0.PGInkoWYOAY_GsY_vO462E0dOcn-yHvlqPaa6P4SSttUtj7fW48q9DvkjSuT1I-VUxmZ04knuVK6JIZffVzyXg'; 
    
        try {
          const endpoint = `/projects/${projectKey}/sprints`;
          const response = await axios.post(endpoint, formData, {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${accessToken}`
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
                {/* <div className='title'></div> */}
                <div className='startDateText'>시작 날짜<span className='red'>*</span></div>
                <input
      type="date"
      className="startDate"
      value={startDate}
      onChange={(e) => setStartDate(e.target.value)}
    />
                {/* <div className='startDate'></div> */}
                <div className='endDateText'>종료 날짜<span className='red'>*</span></div>
                <input
      type="date"
      className="endDate"
      value={endDate}
      onChange={(e) => setEndDate(e.target.value)}
    />
                {/* <div className='endDate'></div> */}
                <div className='descriptionText'>스프린트 목표</div>
                <input type="text" className='description' value={description} onChange={(e) => setDescription(e.target.value)}/>
                {/* <div className='description'></div> */}
            <button className='cancel'>취소</button>
            <button className='start' onClick={handleSubmit}>시작</button>
        </div>
    </div>
  );
}

export default CreateSprintModal;