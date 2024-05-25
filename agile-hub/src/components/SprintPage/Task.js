import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../css/SprintPage/Task.css';
import Modal from './StoryModal.js';
import { useAuth } from '../../context/AuthContext.js';

function Task({ projectKey, issue, fetchIssues}) {
  const { authToken } = useAuth();

  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [storyDetails, setStoryDetails] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const label = issue.label;
  console.log(label);

  const getBoxStyle = (label) => {
    switch (label) {
      case 'PLAN':
        return { background: '#E97373' };
      case 'DESIGN':
        return { background: '#945EB5' };
      case 'DEVELOP':
        return { background: '#3FA976' };
      case 'TEST':
        return { background: '#FFBF43' };
      case 'FEEDBACK':
        return { background: '#95ADF6' };
      default:
        return {};
    }
  };

  const handleBoxClick = (type) => {
    const color = getBoxStyle(type).background;
    // 이제 선택한 색상을 이용하여 작업을 수행할 수 있습니다.
  };

  const onEdit = () => {
    fetchIssues2();
    fetchIssues();
  }

  const fetchIssues2 = async () => {
    try {
      const issueId = issue.id;
      //const accessToken = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBZ2lsZUh1YiIsInN1YiI6IkFjY2Vzc1Rva2VuIiwibmFtZSI6IuyLoOyKue2YnCIsInJvbGUiOiJST0xFX1VTRVIiLCJwcm92aWRlciI6Imtha2FvIiwiZGlzdGluY3RJZCI6IjM0NTcyMjMzOTYiLCJpYXQiOjE3MTU1NzM5OTcsImV4cCI6MTcxNjc4MzU5N30.1PRhxReTmFd2UV4CI5tCrDCNq7Re2p9PNslzwfwy0d8ZZbpuxOuKd1FTwjoTkRIwtYmL2V1gzxaDhchatjKhzA';
      const response = await axios.get(`https://api.agilehub.store/projects/${projectKey}/issues/${issueId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      });
      setResponse(response.data); // 모든 데이터 
      console.log(response);
      setIsLoading(false);
    } catch (error) {
      console.error('API request failed:', error);
      setError(error);
      setIsLoading(false);
    }
  };

  const handleIssueTitleClick = () => {
    if (response) {
      setStoryDetails(response);
      setIsModalVisible(true);
    }
  };

  useEffect(() => {
    if (projectKey && issue.id) {
      fetchIssues2();
    }
  }, [projectKey, issue.id]);


  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: 이슈를 불러올 수 없습니다.</div>;
  }

  

  return (
    <div className="task">
       <div className='typecolor' style={getBoxStyle(issue.label)}></div>
      <div className='issueTitle' onClick={handleIssueTitleClick}>{issue.title}</div>
      <div className='issueType'>{issue.type}</div>
      <div className='issueAssignee'>
      <div className='issueAssigneeImage'>
          <img src={issue.assignee.profileImageURL} alt="Assignee's Profile" />
        </div>
        <div className='issueAssigneeName'> 담당자: {issue.assignee.name} </div>
      </div>

      {isModalVisible && (
        <Modal
          isVisible={isModalVisible}
          details={storyDetails}
          onClose={() => setIsModalVisible(false)}
          projectKey={projectKey}
          onEdit={onEdit}
        />
      )}
    </div>
  );
}

export default Task;





// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import '../../css/SprintPage/Task.css';
// import Modal from './StoryModal.js';
// import { useAuth } from '../../context/AuthContext.js';

// function Task({ projectKey, issue, fetchIssues }) {
//   const { authToken } = useAuth();

//   const [response, setResponse] = useState('');
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [storyDetails, setStoryDetails] = useState('');
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const label = issue.label;
//   console.log(label);

//   const getBoxStyle = (label) => {
//     switch (label) {
//       case 'PLAN':
//         return { background: '#E97373' };
//       case 'DESIGN':
//         return { background: '#945EB5' };
//       case 'DEVELOP':
//         return { background: '#3FA976' };
//       case 'TEST':
//         return { background: '#FFBF43' };
//       case 'FEEDBACK':
//         return { background: '#95ADF6' };
//       default:
//         return {};
//     }
//   };

//   const handleBoxClick = (type) => {
//     const color = getBoxStyle(type).background;
//   };

//   const onEdit = () => {
//     fetchIssues2();
//     fetchIssues();
//   }

//   const fetchIssues2 = async () => {
//     try {
//       const issueId = issue.issueId; // issue.id 가 아닌 issue.issueId 사용
//       const response = await axios.get(`https://api.agilehub.store/projects/${projectKey}/issues/${issueId}`, {
//         headers: {
//           Authorization: `Bearer ${authToken}`,
//           'Content-Type': 'application/json'
//         }
//       });
//       setResponse(response.data); // 모든 데이터 
//       console.log(response);
//       setIsLoading(false);
//     } catch (error) {
//       console.error('API request failed:', error);
//       setError(error);
//       setIsLoading(false);
//     }
//   };

//   const handleIssueTitleClick = () => {
//     if (response) {
//       setStoryDetails(response);
//       setIsModalVisible(true);
//     }
//   };

//   useEffect(() => {
//     if (projectKey && issue.issueId) {
//       fetchIssues2();
//     }
//   }, [projectKey, issue.issueId]);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: 이슈를 불러올 수 없습니다.</div>;
//   }

//   return (
//     <div className="task">
//        <div className='typecolor' style={getBoxStyle(issue.label)}></div>
//       <div className='issueTitle' onClick={handleIssueTitleClick}>{issue.title}</div>
//       <div className='issueType'>{issue.type}</div>
//       <div className='issueAssignee'>
//         <div className='issueAssigneeImage'>
//           <img src={issue.assigneeDto.profileImageURL} alt="Assignee's Profile" />
//         </div>
//         <div className='issueAssigneeName'> 담당자: {issue.assigneeDto.name} </div>
//       </div>

//       {isModalVisible && (
//         <Modal
//           isVisible={isModalVisible}
//           details={storyDetails}
//           onClose={() => setIsModalVisible(false)}
//           projectKey={projectKey}
//           onEdit={onEdit}
//         />
//       )}
//     </div>
//   );
// }

// export default Task;
