import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../css/SprintPage/DashBoard.css';
import '../../css/Issue.css';
import PlusBox from './PlusBox.js';
import Task from './Task.js';
import { useAuth } from '../../context/AuthContext.js';

export default function DashBoard({ projectKey, sprintId, issues:backlogIssues}) {
  const { authToken } = useAuth();

  const [imagesURLs, setImagesURLs] = useState('');
  const [issues, setIssues] = useState({ todo: [], doing: [], complete: [] });
  const [sprintIssues, setSprintIssues] = useState(backlogIssues);

  useEffect(() => {
    test();
  }, []);


  const onRendering = async () => {
    test();
  };

  const test = async () => {
    try {
      const response = await axios.get(`https://api.agilehub.store/projects/${projectKey}/sprints`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      });

      console.log("API response:", response.data); // API 응답 확인

      const sprints = response.data.result;
      if (sprints.length === 0) {
        console.error('No sprints found');
        return;
      }


      const latestSprint = sprints[sprints.length - 1];
      const sprintIssues = latestSprint.issues;
      setSprintIssues(sprintIssues); 
      console.log("setSprintIssues:", sprintIssues);

      const endpoint1 = `https://api.agilehub.store/projects/${projectKey}/stories`;
      const endpoint2 = `https://api.agilehub.store/projects/${projectKey}/tasks`;
      const response1 = await axios.get(endpoint1, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      });

      const response2 = await axios.get(endpoint2, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      });




      const allIssues = [...response1.data.result, ...response2.data.result];

      const newIssues = { todo: [], doing: [], complete: [] };

      
      sprintIssues.forEach(sprint => {
   
        const issue = allIssues.find(item => item.id === sprint.issueId); // item.issuId -> id


        if (issue) {
          console.log("issue json check: "+JSON.stringify(issue));
          const status = issue.status;
          if (status === 'DO') {
            newIssues.todo.push(issue);
          } else if (status === 'PROGRESS') {
            newIssues.doing.push(issue);
          } else if (status === 'DONE') {
            newIssues.complete.push(issue);
          } else {
            newIssues.todo.push(issue); 
          }
        }
      });
  
      setIssues(newIssues);





    } catch (error) {
      console.error('API request failed:', error);
    }
  };

  const onDragStart = (e, item, category) => {
    const itemData = JSON.stringify({ id: item.id, originalCategory: category });
    e.dataTransfer.setData("text/plain", itemData);
  };

  const updateIssue = async (id, newStatus) => {
    try {
      const response = await axios.put(`https://api.agilehub.store/projects/${projectKey}/issues/${id}/status`, {
        status: newStatus
         },
        {
        headers: {
          Authorization: `Bearer ${authToken}`,
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
  console.log(itemData);
  const { id, originalCategory, files} = JSON.parse(itemData);

  if (newCategory === originalCategory) return; // 같은 카테고리에 드롭된 경우 업데이트 없음

  const newStatus = getStatusFromCategory(newCategory); 
  await updateIssue(id, newStatus); 

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
          <PlusBox projectKey={projectKey} sprintId={sprintId} test={test} onRendering={onRendering}/>
          {issues[category].map((item) => (
          <div 
          key={item.id}
          draggable
          onDragStart={e => onDragStart(e, item, category)} >
        <Task key={item.id} issue={item} projectKey={projectKey} test={test} />
                </div>
        ))}
        </div>
      ))}
    </div>
  );
}