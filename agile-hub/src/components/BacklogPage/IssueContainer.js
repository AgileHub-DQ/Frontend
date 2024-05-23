import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../css/BacklogPage/AddBacklog.css';
import ShowEpic from './show/ShowEpic.js'; // 경로 확인 필요
import CreateEpicButton from './button/CreateEpicButton.js'; // 경로 확인 필요
import CreateStoryButton from './button/CreateStoryButton.js'; // 경로 확인 필요
import CreateTaskButton from './button/CreateTaskButton.js'; // 경로 확인 필요
import ShowStory from './show/ShowStory.js';
import ShowTask from './show/ShowTask.js';

function IssueContainer() {
    const projectKey = 'P1';
    const [epics, setEpics] = useState([]);

    const fetchIssues = async () => {
        try {
            const accessToken = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBZ2lsZUh1YiIsInN1YiI6IkFjY2Vzc1Rva2VuIiwibmFtZSI6IuyLoOyKue2YnCIsInJvbGUiOiJST0xFX1VTRVIiLCJwcm92aWRlciI6Imtha2FvIiwiZGlzdGluY3RJZCI6IjM0NTcyMjMzOTYiLCJpYXQiOjE3MTU1NzM5OTcsImV4cCI6MTcxNjc4MzU5N30.1PRhxReTmFd2UV4CI5tCrDCNq7Re2p9PNslzwfwy0d8ZZbpuxOuKd1FTwjoTkRIwtYmL2V1gzxaDhchatjKhzA';
            const endpoint = `/projects/${projectKey}/epics`;
            console.log("endpoint: "+endpoint);
            const response = await axios.get(endpoint, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            console.log(response.data.result);
            setEpics(response.data.result || []);  // 서버 응답 확인 후 적절히 조정
        } catch (error) {
            console.error('Failed to fetch issues:', error);
        }
    };

    useEffect(() => {
        fetchIssues();
    }, []);

    return (
        <div>
            {epics.map(epic => (
                <ShowEpic key={epic.id} epicData={epic} projectKey={projectKey} />
            ))}
                        <CreateEpicButton projectKey={projectKey} />
            {/* {issues.stories.map(story => (
                <ShowStory key={story.id} storyData={story} projectKey={projectKey} />
            ))}
            {issues.tasks.map(task => (
                <ShowTask key={task.id} taskData={task} projectKey={projectKey} />
            ))} */}
        </div>
    );
}

export default IssueContainer;
