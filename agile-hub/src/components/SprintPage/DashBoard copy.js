import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../css/SprintPage/DashBoard.css';
import '../../css/Issue.css';
import PlusBox from './PlusBox.js';
import Task from './Task.js';

export default function DashBoard({ projectKey, sprintId }) {
  const [issues, setIssues] = useState([]);

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
    //console.log('Issues:', response.data.result); 
    setIssues(response.data.result);
    } catch (error) {
      console.error('Failed to fetch issues:', error);
    }
  };

  return (
    <div className="kanban-board">
    <div className="column">
        <div className='textdiv'>
            <div className="status-indicator preparing" ></div>
            <h2>Preparing</h2> 
        </div>
        <PlusBox projectKey={projectKey} sprintId={sprintId} fetchIssues={fetchIssues} />
        {issues.map((issue, index) => (
        <Task key={index} issue={issue} projectKey={projectKey} />
        ))}
    </div>
    <div className="column">
    <div className='textdiv'>
            <div className="status-indicator in-progress"></div>
            <h2>In Progress</h2> 
        </div>
        <PlusBox/>
        <div className="task">
            <h3>Task 3</h3>
            <p>This is a description for task 3.</p>
        </div>
        <div className="task">
            <h3>Task 4</h3>
            <p>This is a description for task 4.</p>
        </div>
    </div>
    <div className="column">
    <div className='textdiv'>
            <div className="status-indicator complete"></div>
            <h2>Complete</h2> 
        </div>
        <PlusBox/>
        <div className="task">
            <h3>Task 5</h3>
            <p>This is a description for task 5.</p>
        </div>
        <div className="task">
            <h3>Task 6</h3>
            <p>This is a description for task 6.</p>
        </div>
    </div>
</div>
);
}
