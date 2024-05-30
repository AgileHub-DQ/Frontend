// MainPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MainPage() {
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
    <>
      <h1>여기는 MainPage입니다.</h1>
      <h2>API Response:{responseText}</h2>
    </>
  );
  
}

export default MainPage;