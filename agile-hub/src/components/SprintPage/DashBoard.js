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

  const onDragStart = (e, item, category) => {
    const itemData = JSON.stringify({ 
      id: item.id, 
      title: item.title, 
      type: item.type, 
      status: item.status, 
      originalCategory: category,
      content: item.content,
      startDate: item.startDate,
      endDate: item.endDate
    });
    e.dataTransfer.setData("text/plain", itemData);
  };
  


  const onDrop = async (e, newCategory) => {
    e.preventDefault();
    const itemData = e.dataTransfer.getData("text/plain");
    const { id, title, type, status, originalCategory, content, startDate, endDate } = JSON.parse(itemData);
  
    if (newCategory === originalCategory) {
      return;
    }
  
    const movedItem = issues[originalCategory].find(item => item.id === id);
  
    try { // 해당 카테고리로 이동되면 데이터의 status 값 변경
      const accessToken = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBZ2lsZUh1YiIsInN1YiI6IkFjY2Vzc1Rva2VuIiwibmFtZSI6IuyLoOyKue2YnCIsInJvbGUiOiJST0xFX1VTRVIiLCJwcm92aWRlciI6Imtha2FvIiwiZGlzdGluY3RJZCI6IjM0NTcyMjMzOTYiLCJpYXQiOjE3MTQyODMzNTYsImV4cCI6MTcxNTQ5Mjk1Nn0.PGInkoWYOAY_GsY_vO462E0dOcn-yHvlqPaa6P4SSttUtj7fW48q9DvkjSuT1I-VUxmZ04knuVK6JIZffVzyXg';
      const movedItemEditStatus = await axios.put(`/projects/${projectKey}/issues/${id}`, { title: movedItem.title, type: movedItem.type, status: getStatusFromCategory(newCategory) }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      const updatedStatus = status;
  
      const newIssues = {
        ...issues,
        [originalCategory]: issues[originalCategory].filter(item => item.id !== id),
        [newCategory]: [...issues[newCategory], { ...movedItem, status: updatedStatus }],
      };

      setIssues(newIssues);
    } catch (error) {
      console.error('Failed to update task status:', error);
      setIssues(issues);
    }
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