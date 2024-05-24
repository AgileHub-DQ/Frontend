// CreateSprintModal.js
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext'; 
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

    const { authToken } = useAuth(); // AuthContext에서 토큰 가져오기
    console.log("createSprintModal authToken: "+authToken);

    const fetchProjects = async () => {
      if (!authToken) {
        setError('인증 토큰이 없습니다. 로그인이 필요합니다.');
        return;
      }
      // try {
        
      //   //const accessToken = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBZ2lsZUh1YiIsInN1YiI6IkFjY2Vzc1Rva2VuIiwibmFtZSI6IuyLoOyKue2YnCIsInJvbGUiOiJST0xFX1VTRVIiLCJwcm92aWRlciI6Imtha2FvIiwiZGlzdGluY3RJZCI6IjM0NTcyMjMzOTYiLCJpYXQiOjE3MTU1NzM5OTcsImV4cCI6MTcxNjc4MzU5N30.1PRhxReTmFd2UV4CI5tCrDCNq7Re2p9PNslzwfwy0d8ZZbpuxOuKd1FTwjoTkRIwtYmL2V1gzxaDhchatjKhzA';
  
      //   const response = await axios.get(`https://api.agilehub.store/createSprintModal`, {
      //     headers: {
      //       Authorization: `Bearer ${authToken}`  
      //     }
      //   });
  
      //   console.log("createsprintmodal authToken: !!!", authToken);  
      // } catch (error) {
      //   console.error('프로젝트 정보를 가져오는 데 실패했습니다:', error);
       
      // }
    };
  
    // useEffect(() => {
    //   fetchProjects();
    // }, [authToken]); // authToken이 변경되면 fetchProjects를 다시 호출


    
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

        //const accessToken = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBZ2lsZUh1YiIsInN1YiI6IkFjY2Vzc1Rva2VuIiwibmFtZSI6IuyjvOybkO2drCIsInJvbGUiOiJST0xFX1VTRVIiLCJwcm92aWRlciI6Imtha2FvIiwiZGlzdGluY3RJZCI6IjM0NTc4MDQ1MjUiLCJpYXQiOjE3MTU1MjM2MjcsImV4cCI6MTcxNjczMzIyN30.7W2ZV5RmSGhf_GjV-xTeYtC7ZPF-QcIpIj5QksTTfxXt8U5NdpWM-WejbW6Exl8u-qU2jGrotz0oTtty51etYw'; 
    
        try {
          //const projectKey = 'P1';
          const endpoint = `https://api.agilehub.store/projects/${projectKey}/sprints`;
          const response = await axios.post(endpoint, formData, {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${authToken}`
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