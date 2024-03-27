// MainPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MainPage() {
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/health");
        setResponseData(response.data);
      } catch (error) {
        console.error('fetch error', error);
        setError('API 요청에 문제 발생');
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h1>여기는 MainPage입니다.</h1>
      {error && <p>Error: {error}</p>}
      {responseData && (
        <div>
          <h2>API Response: {responseData}</h2>
        </div>
      )}
    </>
  );
}

export default MainPage;
