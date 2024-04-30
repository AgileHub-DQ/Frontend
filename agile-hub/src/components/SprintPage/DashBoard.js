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
      const endpoint = `/projects/${projectKey}/stories`;
      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });
  
      console.log(response.data.result);
  
      const newIssues = { todo: [], doing: [], complete: [] };
  
      response.data.result.forEach(issue => {
        const type = issue.type; //status로 변경만 하면 됨
        if (type === 'STORY') {
          newIssues.todo.push(issue);
        } else if (type === 'progress') {
          newIssues.doing.push(issue);
        } else if (type === 'done') {
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
  };

  const onDrop = (e, newCategory) => {
    const itemData = e.dataTransfer.getData("text/plain");
    const { id, originalCategory } = JSON.parse(itemData);

    if (newCategory === originalCategory) {
      return;
    }

    const movedItem = issues[originalCategory].find(item => item.id === id);
    const newIssues = {
      ...issues,
      [originalCategory]: issues[originalCategory].filter(item => item.id !== id),
      [newCategory]: [...issues[newCategory], movedItem],
    };

    setIssues(newIssues);
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
        <Task key={item.id} issue={item} projectKey={projectKey} />
                </div>
        ))}
        </div>
      ))}
    </div>
  );
}



