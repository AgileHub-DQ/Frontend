import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [responseText, setResponseText] = useState('');

  useEffect(() => {
    const apiUrl = 'http://www.agilehub.store/api/health'; // 서버 주소로 변경

    axios.get(apiUrl)
      .then(response => {
        setResponseText(response.data);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, []);

  return (
    <div>
      <h1>API Response:</h1>
      <p>{responseText}</p>
    </div>
  );
}


export default App;
