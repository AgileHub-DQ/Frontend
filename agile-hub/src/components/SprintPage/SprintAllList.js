// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useLocation } from 'react-router-dom';

// function SprintAllList() {
//     const location = useLocation();
//     const [sprints, setSprints] = useState([]);
//     const [projectKey, setProjectKey] = useState('');

//     useEffect(() => {
//         const key = location.state?.key;
//         setProjectKey(key);
//         if (key) {
//             fetchSprints(key);
//         }
//     }, [location.state]);

//     const fetchSprints = async (projectKey) => {
//         try {
//             const accessToken = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBZ2lsZUh1YiIsInN1YiI6IkFjY2Vzc1Rva2VuIiwibmFtZSI6IuyLoOyKue2YnCIsInJvbGUiOiJST0xFX1VTRVIiLCJwcm92aWRlciI6Imtha2FvIiwiZGlzdGluY3RJZCI6IjM0NTcyMjMzOTYiLCJpYXQiOjE3MTQyODMzNTYsImV4cCI6MTcxNTQ5Mjk1Nn0.PGInkoWYOAY_GsY_vO462E0dOcn-yHvlqPaa6P4SSttUtj7fW48q9DvkjSuT1I-VUxmZ04knuVK6JIZffVzyXg'; 
//             const response = await axios.get(`/projects/${projectKey}/sprints`, {
//                 headers: {
//                     Authorization: `Bearer ${accessToken}`
//                 }
//             });
//             setSprints(response.data.result || []);
//             console.log("스프린트 목록:", response.data.result);
//         } catch (error) {
//             console.error('스프린트 조회에 실패했습니다:', error);
//         }
//     };

//     const deleteSprint = async (sprintId) => {
//         try {
//             const accessToken = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBZ2lsZUh1YiIsInN1YiI6IkFjY2Vzc1Rva2VuIiwibmFtZSI6IuyLoOyKue2YnCIsInJvbGUiOiJST0xFX1VTRVIiLCJwcm92aWRlciI6Imtha2FvIiwiZGlzdGluY3RJZCI6IjM0NTcyMjMzOTYiLCJpYXQiOjE3MTQyODMzNTYsImV4cCI6MTcxNTQ5Mjk1Nn0.PGInkoWYOAY_GsY_vO462E0dOcn-yHvlqPaa6P4SSttUtj7fW48q9DvkjSuT1I-VUxmZ04knuVK6JIZffVzyXg'; 
//             await axios.delete(`/projects/${projectKey}/sprints/${sprintId}`, {
//                 headers: {
//                     Authorization: `Bearer ${accessToken}`
//                 }
//             });
//             fetchSprints(projectKey);
//             console.log(`스프린트 ${sprintId}가 삭제되었습니다.`);
//         } catch (error) {
//             console.error('스프린트 삭제에 실패했습니다:', error);
//         }
//     };

//     const changeSprintStatus = async (sprintId, newStatus) => {
//         try {
//             const accessToken = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBZ2lsZUh1YiIsInN1YiI6IkFjY2Vzc1Rva2VuIiwibmFtZSI6IuyLoOyKue2YnCIsInJvbGUiOiJST0xFX1VTRVIiLCJwcm92aWRlciI6Imtha2FvIiwiZGlzdGluY3RJZCI6IjM0NTcyMjMzOTYiLCJpYXQiOjE3MTQyODMzNTYsImV4cCI6MTcxNTQ5Mjk1Nn0.PGInkoWYOAY_GsY_vO462E0dOcn-yHvlqPaa6P4SSttUtj7fW48q9DvkjSuT1I-VUxmZ04knuVK6JIZffVzyXg'; 
//             await axios.patch(`/projects/${projectKey}/sprints/${sprintId}/status`, {
//                 status: newStatus
//             }, {
//                 headers: {
//                     Authorization: `Bearer ${accessToken}`
//                 }
//             });
//             fetchSprints(projectKey);  // 상태 변경 후 스프린트 목록 다시 불러오기
//             console.log(`스프린트 ${sprintId}의 상태가 ${newStatus}로 변경되었습니다.`);
//         } catch (error) {
//             console.error('스프린트 상태 변경에 실패했습니다:', error);
//         }
//     };

//     return (
//         <div className="container">
//             <h1>Sprint 목록</h1>
//             <ul>
//                 {sprints.map(sprint => (
//                     <li key={sprint.sprintId}>
//                         스프린트 제목: {sprint.title} - 시작일: {sprint.startDate} / 종료일: {sprint.endDate} 스프린트 목표: {sprint.description}
//                         <button onClick={() => deleteSprint(sprint.sprintId)}>스프린트 삭제</button>
//                         <button onClick={() => changeSprintStatus(sprint.sprintId, 'PLANNED')}>상태 변경: PLANNED</button>
//                         <button onClick={() => changeSprintStatus(sprint.sprintId, 'ACTIVE')}>상태 변경: ACTIVE</button>
//                         <button onClick={() => changeSprintStatus(sprint.sprintId, 'COMPLETED')}>상태 변경: COMPLETED</button>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }

// export default SprintAllList;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function SprintAllList() {
    const location = useLocation();
    const [sprints, setSprints] = useState([]);
    const [projectKey, setProjectKey] = useState('');

    useEffect(() => {
        const key = location.state?.key;
        setProjectKey(key);
        if (key) {
            fetchSprints(key);
        }
    }, [location.state]);

    const fetchSprints = async (projectKey) => {
        try {
            const accessToken = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBZ2lsZUh1YiIsInN1YiI6IkFjY2Vzc1Rva2VuIiwibmFtZSI6IuyLoOyKue2YnCIsInJvbGUiOiJST0xFX1VTRVIiLCJwcm92aWRlciI6Imtha2FvIiwiZGlzdGluY3RJZCI6IjM0NTcyMjMzOTYiLCJpYXQiOjE3MTQyODMzNTYsImV4cCI6MTcxNTQ5Mjk1Nn0.PGInkoWYOAY_GsY_vO462E0dOcn-yHvlqPaa6P4SSttUtj7fW48q9DvkjSuT1I-VUxmZ04knuVK6JIZffVzyXg'; 
            const response = await axios.get(`/projects/${projectKey}/sprints`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            setSprints(response.data.result || []);
            console.log("스프린트 목록:", response.data.result);
        } catch (error) {
            console.error('스프린트 조회에 실패했습니다:', error);
        }
    };

    const deleteSprint = async (sprintId) => {
        try {
            const accessToken = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBZ2lsZUh1YiIsInN1YiI6IkFjY2Vzc1Rva2VuIiwibmFtZSI6IuyLoOyKue2YnCIsInJvbGUiOiJST0xFX1VTRVIiLCJwcm92aWRlciI6Imtha2FvIiwiZGlzdGluY3RJZCI6IjM0NTcyMjMzOTYiLCJpYXQiOjE3MTQyODMzNTYsImV4cCI6MTcxNTQ5Mjk1Nn0.PGInkoWYOAY_GsY_vO462E0dOcn-yHvlqPaa6P4SSttUtj7fW48q9DvkjSuT1I-VUxmZ04knuVK6JIZffVzyXg'; 
            await axios.delete(`/projects/${projectKey}/sprints/${sprintId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            fetchSprints(projectKey);
            console.log(`스프린트 ${sprintId}가 삭제되었습니다.`);
        } catch (error) {
            console.error('스프린트 삭제에 실패했습니다:', error);
        }
    };

    const changeSprintStatus = async (sprintId, newStatus) => {
        try {
            const accessToken = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBZ2lsZUh1YiIsInN1YiI6IkFjY2Vzc1Rva2VuIiwibmFtZSI6IuyLoOyKue2YnCIsInJvbGUiOiJST0xFX1VTRVIiLCJwcm92aWRlciI6Imtha2FvIiwiZGlzdGluY3RJZCI6IjM0NTcyMjMzOTYiLCJpYXQiOjE3MTQyODMzNTYsImV4cCI6MTcxNTQ5Mjk1Nn0.PGInkoWYOAY_GsY_vO462E0dOcn-yHvlqPaa6P4SSttUtj7fW48q9DvkjSuT1I-VUxmZ04knuVK6JIZffVzyXg'; 
            await axios.patch(`/projects/${projectKey}/sprints/${sprintId}/status`, {
                status: newStatus
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            fetchSprints(projectKey);  // 상태 변경 후 스프린트 목록 다시 불러오기
            console.log(`스프린트 ${sprintId}의 상태가 ${newStatus}로 변경되었습니다.`);
        } catch (error) {
            console.error('스프린트 상태 변경에 실패했습니다:', error);
        }
    };

    return (
        <div className="container">
            <h1>Sprint 목록</h1>
            <ul>
                {sprints.map(sprint => (
                    <li key={sprint.sprintId}>
                        스프린트 제목: {sprint.title} - 시작일: {sprint.startDate} / 종료일: {sprint.endDate} 스프린트 목표: {sprint.description}
                        <button onClick={() => deleteSprint(sprint.sprintId)}>스프린트 삭제</button>
                        <select onChange={(e) => changeSprintStatus(sprint.sprintId, e.target.value)}>
                            <option value="PLANNED">PLANNED</option>
                            <option value="ACTIVE">ACTIVE</option>
                            <option value="COMPLETED">COMPLETED</option>
                        </select>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SprintAllList;
