import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Task({ text, draggable, onDragStart, onDragEnd, projectKey }) {
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', text); 
    onDragStart(); 
  };

  const handleDragEnd = () => {
    onDragEnd(); 
  };

  const fetchIssues = async () => {
    try {
      const issueId = 9;
      const response = await axios.get(`/api/projects/${projectKey}/issues/${issueId}`);
      setResponse(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('API request failed:', error);
      setError(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="task" draggable={draggable} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <h3>{text}</h3>
      <p>This is a description for {text}.</p>
      <pre>{JSON.stringify(response.result.issue, null, 2)}</pre>
    </div>
  );
}

export default Task;
