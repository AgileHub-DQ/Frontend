import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../css/SprintPage/DashBoard.css';
import '../../css/Issue.css';
import PlusBox from './PlusBox.js';
import Task from './Task.js';
import { useAuth } from '../../context/AuthContext.js';

export default function DashBoard({ projectKey, sprintId, issues: initialBacklogIssue }) {
  const { authToken } = useAuth();

  const [imagesURLs, setImagesURLs] = useState('');
  const [issues, setIssues] = useState({ todo: [], doing: [], complete: [] });
  const [backlogIssue, setBacklogIssue] = useState(initialBacklogIssue);

  // 페이지 로드 시 로컬 스토리지에서 데이터 불러오기
  useEffect(() => {
    const storedSprintIssues = JSON.parse(localStorage.getItem('sprintIssues')) || [];
    setBacklogIssue(storedSprintIssues);
  }, []);

  useEffect(() => {
    fetchIssues();
  }, [backlogIssue]);

  const onRendering = async () => {
    const storedSprintIssues = JSON.parse(localStorage.getItem('sprintIssues')) || [];
    setBacklogIssue(storedSprintIssues);
    fetchIssues();
    console.log("fetchIssues()");
  };

  const fetchIssues = async () => {
    try {
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

      const storedSprintIssues = JSON.parse(localStorage.getItem('sprintIssues')) || [];

      storedSprintIssues.forEach(backlog => {
        const issue = allIssues.find(item => item.id === backlog.issueId);

        if (issue) {
          console.log(JSON.stringify(issue));
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
      console.error('Failed to fetch issues:', error);
    }
  };

  const onDragStart = (e, item, category) => {
    const itemData = JSON.stringify({ id: item.id, originalCategory: category });
    e.dataTransfer.setData("text/plain", itemData);
  };

  const updateIssue = async (id, newStatus) => {
    try {
      await axios.put(`https://api.agilehub.store/projects/${projectKey}/issues/${id}/status`, {
        status: newStatus
      }, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        }
      });
    } catch (error) {
      console.error('Failed to update issue status:', error);
    }
  };

  const onDrop = async (e, newCategory) => {
    e.preventDefault();
    const itemData = e.dataTransfer.getData("text/plain");
    const { id, originalCategory } = JSON.parse(itemData);

    if (newCategory === originalCategory) return;

    const newStatus = getStatusFromCategory(newCategory);
    await updateIssue(id, newStatus);

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
          <PlusBox projectKey={projectKey} sprintId={sprintId} fetchIssues={fetchIssues} onRendering={onRendering} />
          {issues[category].map((item) => (
            <div
              key={item.id}
              draggable
              onDragStart={e => onDragStart(e, item, category)}
            >
              <Task key={item.id} issue={item} projectKey={projectKey} fetchIssues={fetchIssues} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
