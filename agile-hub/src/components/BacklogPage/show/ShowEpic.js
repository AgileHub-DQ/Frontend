import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreateStoryButton from '../button/CreateStoryButton'; // CreateStoryButton 컴포넌트의 경로에 맞게 수정

function ShowEpic({epicData}) {
    const [epicTitle, setEpicTitle] = useState('');

    useEffect(() => {
        fetchIssues();
    }, []);

    const fetchIssues = async () => {
        try {
            const issueId = epicData.result; //38
            const projectKey = 'P1';
            const accessToken = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBZ2lsZUh1YiIsInN1YiI6IkFjY2Vzc1Rva2VuIiwibmFtZSI6IuyLoOyKue2YnCIsInJvbGUiOiJST0xFX1VTRVIiLCJwcm92aWRlciI6Imtha2FvIiwiZGlzdGluY3RJZCI6IjM0NTcyMjMzOTYiLCJpYXQiOjE3MTQyODMzNTYsImV4cCI6MTcxNTQ5Mjk1Nn0.PGInkoWYOAY_GsY_vO462E0dOcn-yHvlqPaa6P4SSttUtj7fW48q9DvkjSuT1I-VUxmZ04knuVK6JIZffVzyXg';  // 액세스 토큰
            const response = await axios.get(`/projects/${projectKey}/issues/${issueId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            });
            // console.log(response.data.result);
            setEpicTitle(response.data.result.issue.title);
            
        } catch (error) {
            console.error('API request failed:', error);
        }
    };

    return (
        <div className='showEpic' style={{ border: '1px solid black', padding: '10px' }}>
            <p>에픽: {epicTitle}</p>
            <CreateStoryButton/>
        </div>
    );
}

export default ShowEpic;
