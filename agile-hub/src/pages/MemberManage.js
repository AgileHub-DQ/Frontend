// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import Menubar from "../components/Menubar"; 
// import { useAuth } from '../context/AuthContext';

// function MemberManage() { 
//     const navigate = useNavigate();
//     const { authToken } = useAuth(); // AuthContext에서 토큰 가져오기
//     const location = useLocation();
//     const sprintData = location.state?.sprintData;
//     const sprintId = sprintData?.sprintId;
//     const projectKey = location.state?.projectKey;

//     const [email, setEmail] = useState('');
//     const [inviteStatus, setInviteStatus] = useState(null);

//     useEffect(() => {
//         // 로그인 상태 확인
//         if (!authToken) {
//           navigate('/login');
//         }
//     }, [authToken, navigate]);

//     const handleInvite = async () => {
//         if (!email) {
//             alert("이메일을 입력해주세요.");
//             return;
//         }

//         const requestBody = {
//             email: email,
//             projectId: sprintId // Assuming sprintId is the projectId you want to use
//         };

//         try {
//             const response = await fetch('https://www.agilehub.store/projects/invite/send', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${authToken}` // Assuming you need to pass the auth token
//                 },
//                 body: JSON.stringify(requestBody)
//             });
//             const result = await response.json();
            
//             if (response.ok) {
//                 setInviteStatus({ success: true, message: "초대 이메일이 성공적으로 발송되었습니다." });
//             } else {
//                 setInviteStatus({ success: false, message: result.message || "초대 이메일 발송에 실패했습니다." });
//             }
//         } catch (error) {
//             setInviteStatus({ success: false, message: "서버 오류로 인해 초대 이메일을 발송할 수 없습니다." });
//         }
//     };

//     return(
//         <div>
//             <Menubar/>
//             <h1>멤버 페이지입니다.</h1>
//             <div>
//                 <input 
//                     type="email" 
//                     placeholder="이메일을 입력하세요" 
//                     value={email} 
//                     onChange={(e) => setEmail(e.target.value)} 
//                 />
//                 <button onClick={handleInvite}>초대하기</button>
//             </div>
//             {inviteStatus && (
//                 <div style={{ color: inviteStatus.success ? 'green' : 'red' }}>
//                     {inviteStatus.message}
//                 </div>
//             )}
//         </div>
//     ); 
// }

// export default MemberManage;

//로그인 안 해도 되는 버전 
// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import Menubar from "../components/Menubar"; 
// import { useAuth } from '../context/AuthContext';

// function MemberManage() { 
//     const navigate = useNavigate();
//     const { authToken } = useAuth(); // AuthContext에서 토큰 가져오기
//     const location = useLocation();
//     const sprintData = location.state?.sprintData;
//     const sprintId = sprintData?.sprintId;
//     const projectKey = location.state?.projectKey;

//     const [email, setEmail] = useState('');
//     const [inviteStatus, setInviteStatus] = useState(null);

//     // 로그인 상태 확인을 위한 useEffect 제거

//     const handleInvite = async () => {
//         if (!email) {
//             alert("이메일을 입력해주세요.");
//             return;
//         }

//         const requestBody = {
//             email: email,
//             projectId: sprintId // Assuming sprintId is the projectId you want to use
//         };

//         try {
//             const response = await fetch('https://www.agilehub.store/projects/invite/send', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${authToken}` // Assuming you need to pass the auth token
//                 },
//                 body: JSON.stringify(requestBody)
//             });
//             const result = await response.json();
            
//             if (response.ok) {
//                 setInviteStatus({ success: true, message: "초대 이메일이 성공적으로 발송되었습니다." });
//             } else {
//                 setInviteStatus({ success: false, message: result.message || "초대 이메일 발송에 실패했습니다." });
//             }
//         } catch (error) {
//             setInviteStatus({ success: false, message: "서버 오류로 인해 초대 이메일을 발송할 수 없습니다." });
//         }
//     };

//     return(
//         <div>
//             <Menubar/>
//             <h1>멤버 페이지입니다.</h1>
//             <div>
//                 <input 
//                     type="email" 
//                     placeholder="이메일을 입력하세요" 
//                     value={email} 
//                     onChange={(e) => setEmail(e.target.value)} 
//                 />
//                 <button onClick={handleInvite}>초대하기</button>
//             </div>
//             {inviteStatus && (
//                 <div style={{ color: inviteStatus.success ? 'green' : 'red' }}>
//                     {inviteStatus.message}
//                 </div>
//             )}
//         </div>
//     ); 
// }

// export default MemberManage;




import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Menubar from '../components/Menubar';
import Member from '../components/MemberPage/Member'; 


function MemberManage() {
    
    return (
        <div>
            <Menubar />
            <Member />
        </div>
    );
}

export default MemberManage;



// 임시 인증 토큰 
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Menubar from "../components/Menubar";
// import axios from 'axios';
// import { useAuth } from "../../src/context/AuthContext";

// function MemberManage() {
//     const navigate = useNavigate();
//     const { authToken } = useAuth(); // AuthContext에서 토큰 가져오기
//     const [email, setEmail] = useState('');
//     const [inviteStatus, setInviteStatus] = useState(null);
//     const [projects, setProjects] = useState([]);
//     const [error, setError] = useState(null);

//     // 임의로 넣을 인증 토큰
//     const projectId = 1; // 임의의 프로젝트 아이디


//     // useEffect(() => {
//     //     fetchProjects();
//     // }, [authToken]); // authToken이 변경되면 fetchProjects를 다시 호출

//     const handleInvite = async () => {
//         if (!authToken) {
//             setError('인증 토큰이 없습니다. 로그인이 필요합니다.');
//             return;
//         }
        
//         if (!email) {
//             alert("이메일을 입력해주세요.");
//             return;
//         }

//         const requestBody = {
//             email: email,
//             projectId: projectId // 직접 설정한 프로젝트 아이디 사용
//         };

//         try {
//             const response = await axios.post(
//                 'https://api.agilehub.store/projects/invite/send', 
//                 requestBody,
//                 {
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Authorization': `Bearer ${authToken}` // Directly using the provided token
//                     }
//                 }
//             );

//             if (response.status === 200) {
//                 setInviteStatus({ success: true, message: "초대 이메일이 성공적으로 발송되었습니다." });
//             } else {
//                 setInviteStatus({ success: false, message: response.data.message || "초대 이메일 발송에 실패했습니다." });
//             }
//         } catch (error) {
//             console.error("Error inviting member:", error); // 오류 메시지 출력
//             setInviteStatus({ success: false, message: "서버 오류로 인해 초대 이메일을 발송할 수 없습니다." });
//         }
//     };

//     return (
//         <div>
//             <Menubar />
//             <h1>멤버 페이지입니다.</h1>
//             <div>
//                 <input
//                     type="email"
//                     placeholder="이메일을 입력하세요"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                 />
//                 <button onClick={handleInvite}>초대하기</button>
//             </div>
//             {inviteStatus && (
//                 <div style={{ color: inviteStatus.success ? 'green' : 'red' }}>
//                     {inviteStatus.message}
//                 </div>
//             )}
//             {error && (
//                 <div style={{ color: 'red' }}>
//                     {error}
//                 </div>
//             )}
//         </div>
//     );
// }

// export default MemberManage;
