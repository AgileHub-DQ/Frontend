import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../css/SprintPage/Task.css';

function Task({ projectKey, issue }) {
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchIssues = async () => {
    try {
      const issueId = issue.id;
      const accessToken = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBZ2lsZUh1YiIsInN1YiI6IkFjY2Vzc1Rva2VuIiwibmFtZSI6IuyLoOyKue2YnCIsInJvbGUiOiJST0xFX1VTRVIiLCJwcm92aWRlciI6Imtha2FvIiwiZGlzdGluY3RJZCI6IjM0NTcyMjMzOTYiLCJpYXQiOjE3MTQyODMzNTYsImV4cCI6MTcxNTQ5Mjk1Nn0.PGInkoWYOAY_GsY_vO462E0dOcn-yHvlqPaa6P4SSttUtj7fW48q9DvkjSuT1I-VUxmZ04knuVK6JIZffVzyXg';
      const response = await axios.get(`/projects/${projectKey}/issues/${issueId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json' 
        }
      });
      
      setResponse(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('API request failed:', error);
      setError(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: 이슈를 불러올 수 없습니다.</div>;
  }

  const handleIssueTitleClick = () =>{
    // showStory(response.result);
    console.log("projectKey 클릭함");

  }
  return (
    <div className="task">
      <div className='typecolor'></div> {/* 단계의 값으로 설정 */}
      <div className='issueTitle' onClick={handleIssueTitleClick}> {issue.title} </div>
      <div className='issueType'> {issue.type} </div>
      <div className='issueAssigneeName'> 담당자: {response.result.issue.assignee.name} </div>
      {/* <div className='issueAssigneeName'> 담당자: {issue.assignee.name} </div> */}
      
      {/* <div className='issueTitle'> {response.result.issue.title} </div>
      <div className='issueType'> {response.result.issue.type} </div>
      <div className='issueAssigneeName'> 담당자: {response.result.issue.assignee.name} </div> */}
      {/* <pre>{JSON.stringify(response.result.issue, null, 2)}</pre> */}
    </div>
  );
}

export default Task;