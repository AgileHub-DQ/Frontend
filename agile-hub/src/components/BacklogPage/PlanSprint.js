import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../css/BacklogPage/PlanSprint.css';
import { useAuth } from '../../../context/AuthContext'; 

function PlanSprint({projectKey, sprintId, sprintData}) {
  // const projectKey = 'p1';
  const { authToken } = useAuth(); 



  // 마지막에 생성한 스프린트에 관련된 값들이 설정
  // const [issues, setIssues] = useState([]);
  // const [count, setCount] = useState('');
  // const navigate = useNavigate();

  // 생성한 스프린트에 관련된 값들이 설정
  const [issues, setIssues] = useState([]);
  const [count, setCount] = useState('');
  const navigate = useNavigate();






  // const handleCreateSprint = () => {
  //   navigate('/sprint', { state: { projectKey, sprintId } });
  // };


  const handleCreateSprint = () => {
    navigate('/sprint', { state: { sprintData: response.data.result, projectKey: projectKey } });
  };
  



  useEffect(() => {
    test();
  }, []);

  const test = async () => {
    try {
      //const accessToken = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBZ2lsZUh1YiIsInN1YiI6IkFjY2Vzc1Rva2VuIiwibmFtZSI6IuyLoOyKue2YnCIsInJvbGUiOiJST0xFX1VTRVIiLCJwcm92aWRlciI6Imtha2FvIiwiZGlzdGluY3RJZCI6IjM0NTcyMjMzOTYiLCJpYXQiOjE3MTU1NzM5OTcsImV4cCI6MTcxNjc4MzU5N30.1PRhxReTmFd2UV4CI5tCrDCNq7Re2p9PNslzwfwy0d8ZZbpuxOuKd1FTwjoTkRIwtYmL2V1gzxaDhchatjKhzA';
      const response = await axios.get(`https://api.agilehub.store/projects/${projectKey}/sprints`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      });

      console.log("API response:", response.data); // API 응답 확인

      const sprints = response.data.result;
      if (sprints.length === 0) {
        console.error('No sprints found');
        return;
      }

      // const latestSprint = sprints[sprints.length - 1];
      // const latestSprintIssues = latestSprint.issues;
      // const issueCount = latestSprint.issueCount;
      // console.log("latestSprint:", latestSprint);
      // console.log("issueCount:", issueCount);
      // console.log("latestSprintIssues:", latestSprintIssues);

      const latestSprint = sprintId;
      const sprintIssues = latestSprint.issues;
      const issueCount = latestSprint.issueCount;
      console.log("latestSprint:", latestSprint);
      console.log("issueCount:", issueCount);
      console.log("sprintIssues:", sprintIssues);

      // setIssues(latestSprintIssues);
      // setCount(issueCount);

      setIssues(sprintIssues);
      setCount(issueCount);

    } catch (error) {
      console.error('API request failed:', error);
    }
  };

  return (
    <div className='plansprint'>
      <div className='plansprint_container'>
        {issues.length === 0 && (
          <>
            <p className='plansprint_content'>스프린트 계획하기</p>
            <p className='plansprint_content'>이 스프린트의 작업을 계획하려면 백로그 섹션에서 이슈를 끌어다 놓거나 새 이슈를 생성하세요.<br />
              준비가 되면 스프린트 시작을(를) 선택하세요.</p>
          </>
        )}
        <h3 className='issueCount'>({count}개 이슈)</h3>
        {issues.length > 0 && (
          <div className='issues-list'>
            <ul>
              {issues.map(issue => (
                <li key={issue.id} className='issue-item'>
                  <div className='issue-icon'></div>
                  <div className='issue-key'>{issue.key}</div>
                  <div className='issue-title'>{issue.title}</div>
                  <div className='issue-type'>{issue.type}</div>
                  <div className='issue-status'>{issue.status}</div>
                  <div className='issue-avatar'>
                    <img src={issue.assigneeDto.profileImageURL} alt='Profile' className='profile-image' />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <button className='create-sprint-button' onClick={handleCreateSprint}>스프린트 시작</button>
    </div>
  );
}

export default PlanSprint;
