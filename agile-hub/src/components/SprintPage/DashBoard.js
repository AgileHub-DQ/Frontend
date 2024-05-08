import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../css/SprintPage/DashBoard.css';
import '../../css/Issue.css';
import PlusBox from './PlusBox.js';
import Task from './Task.js';

export default function DashBoard({ projectKey, sprintId }) {
  const [imagesURLs, setImagesURLs] = useState('');
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

  const onDragStart = (e, item, category) => {
    const itemData = JSON.stringify({ id: item.id, originalCategory: category });
    e.dataTransfer.setData("text/plain", itemData);
    console.log(itemData);
  };

const updateIssueStatus = async (id, newStatus, files) => {
  const accessToken = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBZ2lsZUh1YiIsInN1YiI6IkFjY2Vzc1Rva2VuIiwibmFtZSI6IuyLoOyKue2YnCIsInJvbGUiOiJST0xFX1VTRVIiLCJwcm92aWRlciI6Imtha2FvIiwiZGlzdGluY3RJZCI6IjM0NTcyMjMzOTYiLCJpYXQiOjE3MTQyODMzNTYsImV4cCI6MTcxNTQ5Mjk1Nn0.PGInkoWYOAY_GsY_vO462E0dOcn-yHvlqPaa6P4SSttUtj7fW48q9DvkjSuT1I-VUxmZ04knuVK6JIZffVzyXg';

  try {
    const response = await axios.get(`/projects/${projectKey}/issues/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    const { title, type } = response.data.result.issue;

    if (!title || !type ) {
      console.error("title과 type은 필수항목입니다.");
      return;
    }

    //의심 Point
    const updatedIssueData = { // 기존 데이터 + 변경된 status 로 수정된 데이터 updatedIssueData
      ...response.data.result.issue,
      status: newStatus
    };

    console.log("updatedIssueData: "+JSON.stringify(updatedIssueData)); // status 변경 + 기존 데이터와 합쳐진 데이터 

    const formData = new FormData();
    formData.append('title', title);
    formData.append('type', type);
    formData.append('status', newStatus); // ok
    formData.append('content', updatedIssueData.content.text);

    // if (files && files.length) {
    //   files.forEach((file, index) => {
    //     formData.append(`file${index}`, file);
    //   });
    // }

    //here - 1
    if (files && files.length) { // if문이 있으냐 없으냐 차이임 (files 배열이 존재하며 '그 길이가 0보다 큰지' 확인), 이는 files가 null이거나 undefined이 아니고, 적어도 하나 이상의 파일을 포함하고 있어야
    for (let i = 0; i < files.length; i++) { // 이렇게 하면 status 변경이 안 됨
      formData.append('files', files[i]);
    }
  }

  //드래그앤드랍할 때 files 배열이 초기화 되는 거야? files 변수 자체가 없거나 아니면 안 넘어오거나 

    //here - 2 
    // for (let i = 0; i < files.length; i++) { // 이렇게 하면 이미지는 잘 나옴
    //   formData.append('files', files[i]);
    // }

    formData.append('startDate', updatedIssueData.startDate);
    formData.append('endDate', updatedIssueData.endDate);
    formData.append('assigneeId', updatedIssueData.assignee.id);
    formData.append('parentId',response.data.result.parentIssue.issueId)

    const editResponse = await axios.put(`/projects/${projectKey}/issues/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data'
      }
    });
  } catch (error) {
    console.error('Failed to update issue status:', error);
  }
};




// 드롭 이벤트 핸들러
const onDrop = async (e, newCategory) => {
  e.preventDefault();
  const itemData = e.dataTransfer.getData("text/plain");
  const { id, originalCategory, files } = JSON.parse(itemData);

  if (newCategory === originalCategory) return; // 같은 카테고리에 드롭된 경우 업데이트 없음

  const newStatus = getStatusFromCategory(newCategory); 
  // console.log("newStatus: "+newStatus);
  await updateIssueStatus(id, newStatus, files); 

  // 로컬 상태 업데이트
  const movedItem = issues[originalCategory].find(item => item.id === id);
  const newIssues = {
    ...issues,
    [originalCategory]: issues[originalCategory].filter(item => item.id !== id),
    [newCategory]: [...issues[newCategory], movedItem],
  };

  setIssues(newIssues);
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
        <Task key={item.id} issue={item} projectKey={projectKey} fetchIssues={fetchIssues} imagesURLs={imagesURLs} />
                </div>
        ))}
        </div>
      ))}
    </div>
  );
}