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
      const accessToken = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBZ2lsZUh1YiIsInN1YiI6IkFjY2Vzc1Rva2VuIiwibmFtZSI6IuyLoOyKue2YnCIsInJvbGUiOiJST0xFX1VTRVIiLCJwcm92aWRlciI6Imtha2FvIiwiZGlzdGluY3RJZCI6IjM0NTcyMjMzOTYiLCJpYXQiOjE3MTQyODMzNTYsImV4cCI6MTcxNTQ5Mjk1Nn0.PGInkoWYOAY_GsY_vO462E0dOcn-yHvlqPaa6P4SSttUtj7fW48q9DvkjSuT1I-VUxmZ04knuVK6JIZffVzyXg'; // 실제 액세스 토큰으로 대체해야 함
      const endpoint = `/projects/${projectKey}/stories`;
      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });
  
      // 이 부분에서 데이터 구조를 확인합니다.
      console.log(response.data.result);
  
      const newIssues = { todo: [], doing: [], complete: [] };
  
      response.data.result.forEach(issue => {
        // 여기서 'status' 대신 실제 응답에 있는 적절한 필드를 사용하세요.
        // 예를 들어, issue.state 또는 issue.stage 등이 될 수 있습니다.
        const title = issue.title; // 여기서 Optional Chaining을 사용하여 에러 방지
        if (title === 'STORY1') {
          newIssues.todo.push(issue);
        } else if (title === 'STORY2') {
          newIssues.doing.push(issue);
        } else if (title === 'STORY3') {
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
          onDrop={e => onDrop(e, category)}
          onDragOver={onDragOver}
        >
          <div className='textdiv'>
            <div className={`status-indicator ${category}`} ></div>
            <h2>{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
          </div>
          {issues[category].map((item) => (
            <div 
              key={item.id}
              draggable
              onDragStart={e => onDragStart(e, item, category)}
              style={{ margin: '8px', padding: '8px', backgroundColor: '#f9caca' }}
            >
              {item.title}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default DraggableList;