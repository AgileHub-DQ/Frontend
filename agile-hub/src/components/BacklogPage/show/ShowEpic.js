import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreateStoryButton from '../button/CreateStoryButton'; // CreateStoryButton 컴포넌트의 경로에 맞게 수정
import ShowStory from './ShowStory';
import '../../../css/BacklogPage/ShowEpic.css';

function ShowEpic({epicData, projectKey, onEpicDeleted}) {
    const issueId = epicData.id;
    const [epicTitle, setEpicTitle] = useState('');
    const [stories, setStories] = useState([]);
    const title = epicTitle || epicData?.title;

    const fetchIssues = async () => { // 생성한 에픽 title 값 가져오는 로직 
        try {
            const issueId = epicData.result; // issueId
            const accessToken = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBZ2lsZUh1YiIsInN1YiI6IkFjY2Vzc1Rva2VuIiwibmFtZSI6IuyLoOyKue2YnCIsInJvbGUiOiJST0xFX1VTRVIiLCJwcm92aWRlciI6Imtha2FvIiwiZGlzdGluY3RJZCI6IjM0NTcyMjMzOTYiLCJpYXQiOjE3MTU1NzM5OTcsImV4cCI6MTcxNjc4MzU5N30.1PRhxReTmFd2UV4CI5tCrDCNq7Re2p9PNslzwfwy0d8ZZbpuxOuKd1FTwjoTkRIwtYmL2V1gzxaDhchatjKhzA';  // 액세스 토큰
            const response = await axios.get(`/projects/${projectKey}/issues/${issueId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log("!!!!!!!!!!!!!"+response);
            setEpicTitle(response.data.result.issue.title);
            
        } catch (error) {
            console.error('API request failed:', error);
        }
    };

    
    useEffect(() => {
        fetchIssues2();
    }, []);

    const fetchIssues2 = async () => { // 에픽의 아이디를 모두 가져와서 스토리 목록 출력
        try {
            const accessToken = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBZ2lsZUh1YiIsInN1YiI6IkFjY2Vzc1Rva2VuIiwibmFtZSI6IuyLoOyKue2YnCIsInJvbGUiOiJST0xFX1VTRVIiLCJwcm92aWRlciI6Imtha2FvIiwiZGlzdGluY3RJZCI6IjM0NTcyMjMzOTYiLCJpYXQiOjE3MTU1NzM5OTcsImV4cCI6MTcxNjc4MzU5N30.1PRhxReTmFd2UV4CI5tCrDCNq7Re2p9PNslzwfwy0d8ZZbpuxOuKd1FTwjoTkRIwtYmL2V1gzxaDhchatjKhzA';  // 액세스 토큰
            const response = await axios.get(`/projects/${projectKey}/epics/${issueId}/stories`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.result) {
                setStories(response.data.result); // 모든 스토리 목록
            } else {
                console.error('Unexpected API response format:', response.data);
            }
            
        } catch (error) {
            console.error('API request failed:', error);
        }
    };


    const deleteIssue = async () => {
        const isConfirmed = window.confirm('정말로 삭제하시겠습니까?');
        if (isConfirmed) {
            const accessToken = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBZ2lsZUh1YiIsInN1YiI6IkFjY2Vzc1Rva2VuIiwibmFtZSI6IuyLoOyKue2YnCIsInJvbGUiOiJST0xFX1VTRVIiLCJwcm92aWRlciI6Imtha2FvIiwiZGlzdGluY3RJZCI6IjM0NTcyMjMzOTYiLCJpYXQiOjE3MTU1NzM5OTcsImV4cCI6MTcxNjc4MzU5N30.1PRhxReTmFd2UV4CI5tCrDCNq7Re2p9PNslzwfwy0d8ZZbpuxOuKd1FTwjoTkRIwtYmL2V1gzxaDhchatjKhzA';  // 액세스 토큰

            try {
                await axios.delete(`/projects/${projectKey}/issues/${issueId}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                });
                onEpicDeleted();

            } catch (error) {
                console.error('이슈 삭제에 실패했습니다:', error);

            }
        }
    };

    return (
        <div className='showEpic' style={{
            border: '1px solid #ddd',
            borderRadius: '10px',
            padding: '20px',
            backgroundColor: '#f9f9f9',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            marginBottom: '10px',
            marginTop: '10px'
            
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px'
            }}>
                <div className='epictitle' style={{
                    fontWeight: 'bold',
                    fontSize: '1.2em'
                }}>
                    {title}
                    <span className="epicType" style={{
                        marginLeft: '10px',
                        color: '#888',
                        fontSize: '0.9em'
                    }}>{epicData.type}</span>
                </div>
                <button style={{
                    backgroundColor: 'rgb(255 119 112)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '7px',
                    padding: '10px 20px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)',
                    transition: 'all 0.15s ease'
                }} onClick={() => deleteIssue(issueId)}>삭제하기</button>
            </div>
            <ShowStory projectKey={projectKey} issueId={issueId} />
            <CreateStoryButton projectKey={projectKey} />
        </div>
    );
}

export default ShowEpic;
