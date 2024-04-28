// // MainPage.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function MainPage() {
//   const [responseData, setResponseData] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("/api/health");
//         setResponseData("API Response:" + response.data); 
//       } catch (error) {
//         console.error('fetch error', error);
//         setError('API 요청에 문제 발생');
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <>
//       <h1>여기는 MainPage입니다.</h1>
//       {error && <p>Error: {error}</p>}
//       {responseData && (
//         <div>
//           <h2>API Response: {responseData}</h2>
//         </div>
//       )}
//     </>
//   );
// }

// export default MainPage;
// MainPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MainPage() {
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBZ2lsZUh1YiIsInN1YiI6IkFjY2Vzc1Rva2VuIiwibmFtZSI6IuyLoOyKue2YnCIsInJvbGUiOiJST0xFX1VTRVIiLCJwcm92aWRlciI6Imtha2FvIiwiZGlzdGluY3RJZCI6IjM0NTcyMjMzOTYiLCJpYXQiOjE3MTQyODMzNTYsImV4cCI6MTcxNTQ5Mjk1Nn0.PGInkoWYOAY_GsY_vO462E0dOcn-yHvlqPaa6P4SSttUtj7fW48q9DvkjSuT1I-VUxmZ04knuVK6JIZffVzyXg';
        const response = await axios.get("/api/health", {
          headers: {
            Authorization: `Bearer ${accessToken}`  
          }
        });

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