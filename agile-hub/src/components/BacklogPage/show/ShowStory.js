// ShowStory.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreateTaskButton from '../button/CreateTaskButton.js';

function ShowStory({ storyData, projectKey }) {
    console.log("ShowStory: "+projectKey);
    const [storyTitle, setStoryTitle] = useState('');

    useEffect(() => {
        fetchIssues();
    }, []);

    const fetchIssues = async () => {
        try {
            const issueId = storyData.result; 
            const accessToken = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBZ2lsZUh1YiIsInN1YiI6IkFjY2Vzc1Rva2VuIiwibmFtZSI6IuyLoOyKue2YnCIsInJvbGUiOiJST0xFX1VTRVIiLCJwcm92aWRlciI6Imtha2FvIiwiZGlzdGluY3RJZCI6IjM0NTcyMjMzOTYiLCJpYXQiOjE3MTQyODMzNTYsImV4cCI6MTcxNTQ5Mjk1Nn0.PGInkoWYOAY_GsY_vO462E0dOcn-yHvlqPaa6P4SSttUtj7fW48q9DvkjSuT1I-VUxmZ04knuVK6JIZffVzyXg';  // 액세스 토큰
            const response = await axios.get(`/projects/${projectKey}/issues/${issueId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            });
            // console.log(response.data.result);
            setStoryTitle(response.data.result.issue.title);
            
        } catch (error) {
            console.error('API request failed:', error);
        }
    };

    return (
        <div className='showEpic' style={{ border: '1px solid black', padding: '10px' }}>
            <p>스토리: {storyTitle}</p>
            <CreateTaskButton projectKey={projectKey}/>
        </div>
    );
}

export default ShowStory;
