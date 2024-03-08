import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [responseText, setResponseText] = useState('');

  useEffect(() => {
    const apiUrl = "/api/health"; // 프록시 설정한 URL을 포함하지 않음
    
    axios.get(apiUrl)
      .then(response => {
        console.log(response.data);
        setResponseText(response.data);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
    
  }, []);
  

  return (
    <div>
      <h1>API Response:{responseText}</h1>
    </div>
  );
}

export default App;
