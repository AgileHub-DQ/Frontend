// // AddBacklog.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import '../../css/BacklogPage/AddBacklog.css';
// import ShowEpic from './show/ShowEpic';  // 경로 확인 필요
// import CreateEpicButton from './button/CreateEpicButton';  // 경로 확인 필요

// function AddBacklog() {
//     const projectKey = 'P1';
//     const [epics, setEpics] = useState([]);

//     const fetchEpics = async () => {
//         try {
//             const accessToken = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBZ2lsZUh1YiIsInN1YiI6IkFjY2Vzc1Rva2VuIiwibmFtZSI6IuyLoOyKue2YnCIsInJvbGUiOiJST0xFX1VTRVIiLCJwcm92aWRlciI6Imtha2FvIiwiZGlzdGluY3RJZCI6IjM0NTcyMjMzOTYiLCJpYXQiOjE3MTU1NzM5OTcsImV4cCI6MTcxNjc4MzU5N30.1PRhxReTmFd2UV4CI5tCrDCNq7Re2p9PNslzwfwy0d8ZZbpuxOuKd1FTwjoTkRIwtYmL2V1gzxaDhchatjKhzA';
//             const response = await axios.get(`/projects/${projectKey}/epics`, {
//                 headers: { Authorization: `Bearer ${accessToken}` }
//             });
//             setEpics(response.data.result || []);
//         } catch (error) {
//             console.error('Failed to fetch epics:', error);
//         }
//     };

//     useEffect(() => {
//         fetchEpics();
//     }, []);

    // const handleEpicDeleted = () => {
    //     fetchEpics();  // 에픽 삭제 후 에픽 목록 다시 가져오기
    // };

//     return (
//         <div className='addBacklog'>
//             {epics.map(epic => (
//                 <div key={epic.id} className='epic-section'>
//                     <ShowEpic epicData={epic} projectKey={projectKey} onEpicDeleted={handleEpicDeleted} />
//                     <CreateEpicButton projectKey={projectKey} onEpicSubmit={fetchEpics} />
//                 </div>
//             ))}
//         </div>
//     );
// }

// export default AddBacklog;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../css/BacklogPage/AddBacklog.css';
import ShowEpic from './show/ShowEpic.js'; // 경로 확인 필요
import CreateEpicButton from './button/CreateEpicButton.js'; // 경로 확인 필요
// import CreateStoryButton from './button/CreateStoryButton.js'; 
// import CreateTaskButton from './button/CreateTaskButton.js'; 
// import ShowStory from './show/ShowStory.js';
// import ShowTask from './show/ShowTask.js';

function AddBacklog() {
    const projectKey = 'P1';
    const [epics, setEpics] = useState([]);


    const epicIssue = async () => {
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
        epicIssue();
    }, []);

    const onEpicDeleted = () => {
        epicIssue();  // 에픽 삭제 후 에픽 목록 다시 가져오기
    };

    return (
        <div className='addBacklog'>
            {epics.length === 0 ? (
                <CreateEpicButton projectKey={projectKey} onEpicSubmit={epicIssue} />
            ) : (
                epics.map(epic => (
                    <div key={epic.id} className='epic-section'>
                        <ShowEpic epicData={epic} projectKey={projectKey} onEpicDeleted={onEpicDeleted} />
                        <CreateEpicButton projectKey={projectKey} onEpicSubmit={epicIssue} />
                    </div>
                ))
            )}
        </div>
    );
}

export default AddBacklog;