import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../css/SprintPage/DashBoard.css';
import '../../css/Issue.css';
import PlusBox from './PlusBox.js';
import Task from './Task.js';

export default function DashBoard({ projectKey, sprintId }) {
  const [issues, setIssues] = useState({ todo: [], doing: [], complete: [] });
  
  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      const accessToken = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBZ2lsZUh1YiIsInN1YiI6IkFjY2Vzc1Rva2VuIiwibmFtZSI6IuyLoOyKue2YnCIsInJvbGUiOiJST0xFX1VTRVIiLCJwcm92aWRlciI6Imtha2FvIiwiZGlzdGluY3RJZCI6IjM0NTcyMjMzOTYiLCJpYXQiOjE3MTQyODMzNTYsImV4cCI6MTcxNTQ5Mjk1Nn0.PGInkoWYOAY_GsY_vO462E0dOcn-yHvlqPaa6P4SSttUtj7fW48q9DvkjSuT1I-VUxmZ04knuVK6JIZffVzyXg'; // 실제 액세스 토큰으로 대체해야 함
      const endpoint1 = `/projects/${projectKey}/stories`;
      const endpoint2 = `/projects/${projectKey}/tasks`;
      const response1 = await axios.get(endpoint1, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      const response2 = await axios.get(endpoint2, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });
  
      console.log(response1.data.result);
      console.log(response2.data.result);
  
      const newIssues = { todo: [], doing: [], complete: [] };
  
      response1.data.result.forEach(issue => {
        const status = issue.status;
        if (status === 'DO') {
          newIssues.todo.push(issue);
        } else if (status === 'PROGRESS') {
          newIssues.doing.push(issue);
        } else if (status === 'DONE') {
          newIssues.complete.push(issue);
        }
      });

      response2.data.result.forEach(issue => {
        const status = issue.status;
        if (status === 'DO') {
          newIssues.todo.push(issue);
        } else if (status === 'PROGRESS') {
          newIssues.doing.push(issue);
        } else if (status === 'DONE') {
          newIssues.complete.push(issue);
        }
      });
  
      setIssues(newIssues);
    } catch (error) {
      console.error('Failed to fetch issues:', error);
    }
  };

  // const fetchIssues = async () => {
  //   const accessToken = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBZ2lsZUh1YiIsInN1YiI6IkFjY2Vzc1Rva2VuIiwibmFtZSI6IuyLoOyKue2YnCIsInJvbGUiOiJST0xFX1VTRVIiLCJwcm92aWRlciI6Imtha2FvIiwiZGlzdGluY3RJZCI6IjM0NTcyMjMzOTYiLCJpYXQiOjE3MTQyODMzNTYsImV4cCI6MTcxNTQ5Mjk1Nn0.PGInkoWYOAY_GsY_vO462E0dOcn-yHvlqPaa6P4SSttUtj7fW48q9DvkjSuT1I-VUxmZ04knuVK6JIZffVzyXg';
  //   const endpoints = [
  //     `/projects/${projectKey}/stories`,
  //     `/projects/${projectKey}/tasks`
  //   ];
  
  //   try {
  //     const results = await Promise.all(endpoints.map(endpoint =>
  //       axios.get(endpoint, {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //           'Content-Type': 'application/json'
  //         }
  //       })
  //     ));
  
  //     const newIssues = { todo: [], doing: [], complete: [] };
  
  //     results.flatMap(response => response.data.result).forEach(issue => {
  //       switch (issue.status) {
  //         case 'DO':
  //           newIssues.todo.push(issue);
  //           break;
  //         case 'PROGRESS':
  //           newIssues.doing.push(issue);
  //           break;
  //         case 'DONE':
  //           newIssues.complete.push(issue);
  //           break;
  //         default:
  //           console.error(`Unknown issue status: ${issue.status}`);
  //       }
  //     });
  
  //     setIssues(newIssues);
  //   } catch (error) {
  //     console.error('Failed to fetch issues:', error);
  //   }
  // };

  const onDragStart = (e, item, category) => {
    const itemData = JSON.stringify({ id: item.id, originalCategory: category });
    e.dataTransfer.setData("text/plain", itemData);
    console.log(itemData);
  };

  //api 통신, 이미지 url, 날짜 초기화 되는 현상 수정해야함
  //드래그앤드랍 시 기존 데이터 유지
  //status말고 새로고침해도 저장되도록
// 이슈 상태를 업데이트하는 함수
const updateIssueStatus = async (id, newStatus) => {
  const accessToken = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBZ2lsZUh1YiIsInN1YiI6IkFjY2Vzc1Rva2VuIiwibmFtZSI6IuyLoOyKue2YnCIsInJvbGUiOiJST0xFX1VTRVIiLCJwcm92aWRlciI6Imtha2FvIiwiZGlzdGluY3RJZCI6IjM0NTcyMjMzOTYiLCJpYXQiOjE3MTQyODMzNTYsImV4cCI6MTcxNTQ5Mjk1Nn0.PGInkoWYOAY_GsY_vO462E0dOcn-yHvlqPaa6P4SSttUtj7fW48q9DvkjSuT1I-VUxmZ04knuVK6JIZffVzyXg';

  try {
    // First, get the current issue data
    const response = await axios.get(`/projects/${projectKey}/issues/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    const { title, type } = response.data.result.issue;

    if (!title || !type) {
      console.error("title과 type은 필수항목입니다.");
      return;
    }



    // console.log("response.data.result.issue"+JSON.stringify(response.data.result));

    // let formData = new FormData();
    // Object.entries(response.data.result.issue).forEach(([key, value]) => {
    //   if (key === 'status') {
    //     // status 필드만 새로운 값으로 업데이트합니다.
    //     formData.append('status', newStatus);
    //     console.log(newStatus);
    //   } else if (key === 'content'){
    //     formData.append('content', response.data.result.issue.content.text);
    //   } else {
    //     formData.append(key, value);
    //     console.log(key, value);
    //   }
    // });

    // formData.append('content', response.data.result.issue.content.text);

    // if (response.data.result.parentIssue && response.data.result.parentIssue.issueId) {
    //   console.log("parentId:"+ response.data.result.parentIssue.issueId);
    //   formData.append('parentIssueId', response.data.result.parentIssue.issueId);
    //   formData.append('parentIssueKey', response.data.result.parentIssue.key);
    //   // 추가적인 parentIssue 필드도 이와 같은 방식으로 추가 가능
    // }
    
    
    console.log("기존 데이터의 title, type 있는지 확인: "+title+", "+type+ ", " +newStatus); // ok

    console.log("responseData " + JSON.stringify(response.data.result.issue));

    const updatedIssueData = { // 기존 데이터 + 변경된 status 로 수정된 데이터 updatedIssueData
      ...response.data.result.issue,
      status: newStatus
    };

    const formData = new FormData();
    formData.append('title', title);
    formData.append('type', type);
    formData.append('status', newStatus);
    formData.append('content', updatedIssueData.content.text);
    if (updatedIssueData.content.imagesURLs) {
      updatedIssueData.content.imagesURLs.forEach((imageUrl, index) => {
        formData.append(`imageURL`, imageUrl);
      });
    }
    // console.log(response.data.result.issue.content.imagesURLs[0]);
    formData.append('startDate', updatedIssueData.startDate);
    formData.append('endDate', updatedIssueData.endDate);
    formData.append('assigneeId', updatedIssueData.assignee.id);
    formData.append('parentId',response.data.result.parentIssue.issueId);

    // const parentIssueData = {
    //   ...response.data.result.parentIssue
    // }

    // const childIssueData = {
    //   ...response.data.result.childIssue
    // }

    // console.log("updatedIssueData " + JSON.stringify(updatedIssueData));
// console.log("parentIssueData " + JSON.stringify(parentIssueData));
// console.log("childIssueData " + JSON.stringify(childIssueData));


// // FormData 객체 생성
// let formData = new FormData();

// // 주 이슈 데이터 추가

  
// // 주 이슈 데이터 추가
// Object.entries(updatedIssueData).forEach(([key, value]) => {
//   if (typeof value === 'object' && value !== null) {
//     formData.append(`issue[${key}]`, JSON.stringify(value));
//   } else if (key === 'content' && typeof value === 'object') {
//     // content 필드의 text와 imagesURLs를 개별적으로 추가
//     formData.append(`issue[content][text]`, value.text);
//     formData.append(`issue[content][imagesURLs]`, JSON.stringify(value.imagesURLs));
//   }
//     else {
//     formData.append(`issue[${key}]`, value);
//   }
// });

// // 부모 이슈 데이터 추가
// Object.entries(parentIssueData).forEach(([key, value]) => {
//   if (typeof value === 'object' && value !== null) {
//     formData.append(`parentIssue[${key}]`, JSON.stringify(value));
//   } else {
//     formData.append(`parentIssue[${key}]`, value);
//   }
// });

// // 자식 이슈 데이터 추가
// childIssueData.forEach((child, index) => {
//   Object.entries(child).forEach(([key, value]) => {
//     if (typeof value === 'object' && value !== null) {
//       formData.append(`childIssues[${index}][${key}]`, JSON.stringify(value));
//     } else {
//       formData.append(`childIssues[${index}][${key}]`, value);
//     }
//   });
// });

    const editResponse = await axios.put(`/projects/${projectKey}/issues/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data'
      }
    });
    // console.log('Issue updated:', editResponse);
  } catch (error) {
    console.error('Failed to update issue status:', error);
  }
};




// 드롭 이벤트 핸들러
const onDrop = async (e, newCategory) => {
  e.preventDefault();
  const itemData = e.dataTransfer.getData("text/plain");
  const { id, originalCategory } = JSON.parse(itemData);

  if (newCategory === originalCategory) return; // 같은 카테고리에 드롭된 경우 업데이트 없음

  const newStatus = getStatusFromCategory(newCategory); // 새 카테고리에 맞는 상태 코드를 가져옵니다
  await updateIssueStatus(id, newStatus); // 서버에 상태 업데이트 요청

  // 로컬 상태 업데이트
  const movedItem = issues[originalCategory].find(item => item.id === id);
  const newIssues = {
    ...issues,
    [originalCategory]: issues[originalCategory].filter(item => item.id !== id),
    [newCategory]: [...issues[newCategory], movedItem],
  };

  setIssues(newIssues);
  console.log(newIssues);
};


  const getStatusFromCategory = (category) => {
    switch (category) {
      case 'todo':
        return 'DO';
      case 'doing':
        return 'PROGRESS';
      case 'complete':
        return 'DONE';
      default:
        return 'DO';
    }
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="kanban-board">
      {Object.keys(issues).map(category => (
        <div
          key={category}
          className="column"
          style={{ overflowY: 'auto', maxHeight: '90vh' }}
          onDrop={e => onDrop(e, category)}
          onDragOver={onDragOver}
        >
          <div className='textdiv'>
            <div className={`status-indicator ${category}`} ></div>
            <h2>{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
          </div>
          <PlusBox projectKey={projectKey} sprintId={sprintId} fetchIssues={fetchIssues} />
          {issues[category].map((item) => (
          <div 
          key={item.id}
          draggable
          onDragStart={e => onDragStart(e, item, category)} >
        <Task key={item.id} issue={item} projectKey={projectKey} fetchIssues={fetchIssues} />
                </div>
        ))}
        </div>
      ))}
    </div>
  );
}