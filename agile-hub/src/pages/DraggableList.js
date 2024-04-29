import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DraggableList() {
  const [issues, setIssues] = useState({ todo: [], doing: [], complete: [] });
  const projectKey = 'P1';

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      const accessToken = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBZ2lsZUh1YiIsInN1YiI6IkFjY2Vzc1Rva2VuIiwibmFtZSI6IuyLoOyKue2YnCIsInJvbGUiOiJST0xFX1VTRVIiLCJwcm92aWRlciI6Imtha2FvIiwiZGlzdGluY3RJZCI6IjM0NTcyMjMzOTYiLCJpYXQiOjE3MTQyODMzNTYsImV4cCI6MTcxNTQ5Mjk1Nn0.PGInkoWYOAY_GsY_vO462E0dOcn-yHvlqPaa6P4SSttUtj7fW48q9DvkjSuT1I-VUxmZ04knuVK6JIZffVzyXg';
      const endpoint = `/projects/${projectKey}/stories`;
      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });
      console.log('Issues:', response.data.result);

      const updatedIssues = { todo: [], doing: [], complete: [] };
    response.data.result.forEach((item) => {
      if (item.type === 'STORY') {
        updatedIssues.todo.push(item);
      } else if (item.type === 'TASK') {
        updatedIssues.doing.push(item);
      }
    });

    setIssues(updatedIssues);
      //setIssues(response.data.result);
    } catch (error) {
      console.error('Failed to fetch issues:', error);
    }
  };

  const [currentCategory, setCurrentCategory] = useState(null);

  const onDragStart = (e, item, category) => {
    e.dataTransfer.setData("text/plain", item);
    setCurrentCategory(category);
  };

  const onDrop = (e, category) => {
    const item = e.dataTransfer.getData("text/plain");
    
    // 만약 드롭된 카테고리가 현재 아이템이 속한 카테고리와 같다면 드롭 이벤트를 무시
    if (category === currentCategory) {
      return;
    }
  
    const newTasks = { ...issues };
  
    // 아이템을 현재 카테고리에서 제거
    Object.keys(newTasks).forEach((key) => {
      newTasks[key] = newTasks[key].filter((i) => i !== item);
    });
  
    // 아이템을 새 카테고리에 추가
    newTasks[category].push(item);
  
    setIssues(newTasks);
  };
  

  const onDragOver = (e) => {
    e.preventDefault(); // 드롭을 가능하게 하는 기본 이벤트 방지
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      <div 
        style={{ width: '50%' }}
        onDrop={(e) => onDrop(e, 'todo')}
        onDragOver={onDragOver}
      >
        <h2>To Do</h2>
        {issues.todo?.map((item) => (
          <div 
            key={item.id}
            draggable 
            onDragStart={(e) => onDragStart(e, item.title)}
            style={{ margin: '8px', padding: '8px', backgroundColor: '#f9caca' }}
          >
            {item.title}
          </div>
        ))}
      </div>
      <div 
        style={{ width: '50%' }}
        onDrop={(e) => onDrop(e, 'doing')}
        onDragOver={onDragOver}
      >
        <h2>Doing</h2>
        {issues.doing?.map((item) => (
          <div 
            key={item.id}
            draggable 
            onDragStart={(e) => onDragStart(e, item.title)}
            style={{ margin: '8px', padding: '8px', backgroundColor: '#f9caca' }}
          >
            {item.title}
          </div>
        ))}
      </div>
      <div 
        style={{ width: '50%' }}
        onDrop={(e) => onDrop(e, 'complete')}
        onDragOver={onDragOver}
      >
        <h2>Complete</h2>
        {issues.complete?.map((item) => (
          <div 
            key={item.id}
            draggable 
            onDragStart={(e) => onDragStart(e, item.title)}
            style={{ margin: '8px', padding: '8px', backgroundColor: '#f9caca' }}
          >
            {item.title}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DraggableList;
