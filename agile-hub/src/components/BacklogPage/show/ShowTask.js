import React from 'react';
import axios from 'axios';
import '../../../css/BacklogPage/ShowTask.css';
import { useAuth } from '../../../context/AuthContext.js'; 

function ShowTask({ projectKey, tasks, sprintId }) {
    const { authToken } = useAuth(); 

    const alignToSprint = async (issueId) => {
        try {
            // const sprintId = 80;
            //const accessToken = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBZ2lsZUh1YiIsInN1YiI6IkFjY2Vzc1Rva2VuIiwibmFtZSI6IuyLoOyKue2YnCIsInJvbGUiOiJST0xFX1VTRVIiLCJwcm92aWRlciI6Imtha2FvIiwiZGlzdGluY3RJZCI6IjM0NTcyMjMzOTYiLCJpYXQiOjE3MTU1NzM5OTcsImV4cCI6MTcxNjc4MzU5N30.1PRhxReTmFd2UV4CI5tCrDCNq7Re2p9PNslzwfwy0d8ZZbpuxOuKd1FTwjoTkRIwtYmL2V1gzxaDhchatjKhzA';
            const response = await axios.post(`https://api.agilehub.store/projects/${projectKey}/sprints/${sprintId}/issue`, {
                issueId: issueId
            }, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    'Content-Type': 'application/json'
                }
            });
            alert("할당되었습니다.");
            console.log('Issue added to sprint:', response);
        } catch (error) {
            console.error('API request failed:', error);
        }
    };

    const removeFromSprint = async (issueId) => {
        // const sprintId = 77; 
        try {
            //const accessToken = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBZ2lsZUh1YiIsInN1YiI6IkFjY2Vzc1Rva2VuIiwibmFtZSI6IuyLoOyKue2YnCIsInJvbGUiOiJST0xFX1VTRVIiLCJwcm92aWRlciI6Imtha2FvIiwiZGlzdGluY3RJZCI6IjM0NTcyMjMzOTYiLCJpYXQiOjE3MTU1NzM5OTcsImV4cCI6MTcxNjc4MzU5N30.1PRhxReTmFd2UV4CI5tCrDCNq7Re2p9PNslzwfwy0d8ZZbpuxOuKd1FTwjoTkRIwtYmL2V1gzxaDhchatjKhzA';
            const response = await axios.delete(`https://api.agilehub.store/projects/${projectKey}/sprints/${sprintId}/issue`, {
                data: {
                    issueId: issueId
                },
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    'Content-Type': 'application/json'
                }
            });

            alert("삭제되었습니다.")
            console.log('Removed from sprint:', response);
        } catch (error) {
            console.error('Removing from sprint failed:', error);
        }
    };

    if (!tasks || tasks.length === 0) {
        return null;
    }

    const deleteTask = async (issueId) => {
        console.log("deleteTask id: " + issueId);
        const isConfirmed = window.confirm('정말로 삭제하시겠습니까?');
        if (isConfirmed) {
            //const accessToken = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBZ2lsZUh1YiIsInN1YiI6IkFjY2Vzc1Rva2VuIiwibmFtZSI6IuyLoOyKue2YnCIsInJvbGUiOiJST0xFX1VTRVIiLCJwcm92aWRlciI6Imtha2FvIiwiZGlzdGluY3RJZCI6IjM0NTcyMjMzOTYiLCJpYXQiOjE3MTU1NzM5OTcsImV4cCI6MTcxNjc4MzU5N30.1PRhxReTmFd2UV4CI5tCrDCNq7Re2p9PNslzwfwy0d8ZZbpuxOuKd1FTwjoTkRIwtYmL2V1gzxaDhchatjKhzA';
            try {
                await axios.delete(`https://api.agilehub.store/projects/${projectKey}/issues/${issueId}`, {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                        'Content-Type': 'application/json'
                    }
                });
            } catch (error) {
                console.error('이슈 삭제에 실패했습니다:', error);
            }
        }
    };

    return (
        <div className='showTasks' style={{
            border: '1px solid #ddd',
            borderRadius: '10px',
            padding: '10px',
            backgroundColor: '#f9f9f9',
            marginBottom: '10px',
            marginLeft: '10px',
            marginRight: '10px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
            {tasks.map((task, index) => (
                <div key={index} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '10px',
                    marginBottom: '10px',
                    marginLeft: '10px',
                    marginRight: '10px',
                    padding: '15px',
                    borderRadius: '8px',
                    backgroundColor: '#fff',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                }}>
                    <div style={{ flex: 1 }}>
                        <strong>{task.title}</strong>
                    </div>
                    <div style={{ flex: 1, textAlign: 'center' }}>
                        <span className="taskType" style={{ marginLeft: '5px' }}>
                            {task.type}
                        </span>
                        <span className="taskStatus" style={{ marginLeft: '30px' }}>
                            {task.status}
                        </span>
                    </div>
                    <div className='buttonContainer' style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                        <button style={{
                            backgroundColor: '#3e8cf9',
                            color: 'white',
                            border: 'none',
                            borderRadius: '7px',
                            padding: '10px 20px',
                            cursor: 'pointer',
                            boxShadow: '0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)',
                            transition: 'all 0.15s ease'
                        }} onClick={() => alignToSprint(task.id)}>할당하기</button>
                        <button style={{
                            marginLeft: '10px',
                            backgroundColor: '#aa5cea',
                            color: 'white',
                            border: 'none',
                            borderRadius: '7px',
                            padding: '10px 20px',
                            cursor: 'pointer',
                            boxShadow: '0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)',
                            transition: 'all 0.15s ease'
                        }} onClick={() => removeFromSprint(task.id)}>취소하기</button>
                        <button style={{
                            marginLeft: '10px',
                            backgroundColor: '#ff7770',
                            color: 'white',
                            border: 'none',
                            borderRadius: '7px',
                            padding: '10px 20px',
                            cursor: 'pointer',
                            boxShadow: '0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)',
                            transition: 'all 0.15s ease'
                        }} onClick={() => deleteTask(task.id)}>삭제하기</button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ShowTask;