// mypage.js 디자인 하면 될 듯
// 카카오 마이페이지처럼 디자인
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext.js'; 

function User() {

    const { authToken } = useAuth(); 
    const [loginId, setLoginId] = useState('');
    const [name, setName] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        test();
    }, []);

    const test = async () => {
        try {
            //const authToken = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBZ2lsZUh1YiIsInN1YiI6IkFjY2Vzc1Rva2VuIiwibmFtZSI6IuyLoOyKue2YnCIsInJvbGUiOiJST0xFX1VTRVIiLCJwcm92aWRlciI6Imtha2FvIiwiZGlzdGluY3RJZCI6IjM0NTcyMjMzOTYiLCJpYXQiOjE3MTU1NzM5OTcsImV4cCI6MTcxNjc4MzU5N30.1PRhxReTmFd2UV4CI5tCrDCNq7Re2p9PNslzwfwy0d8ZZbpuxOuKd1FTwjoTkRIwtYmL2V1gzxaDhchatjKhzA'; // Use actual token
            const response = await axios.get(`https://api.agilehub.store/member/profile`, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            console.log(response.data.result);
            console.log(response.data.result.id);
            console.log(response.data.result.name);
            console.log(response.data.result.profileImageUrl);
            setLoginId(response.data.result.id);
            setName(response.data.result.name);
            setImageUrl(response.data.result.profileImageUrl);

            localStorage.setItem('loginId', loginId);

        } catch (error) {
            console.error('API request failed:', error);
        }
    };

    return (
        <div style={containerStyle}>
            <img src={imageUrl} alt={name} style={imageStyle} />
            <h2 style={nameStyle}>{name}</h2>
        </div>
    );
}

const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    maxWidth: '300px',
    margin: 'auto',
    backgroundColor: '#fff',
};

const imageStyle = {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    marginBottom: '20px',
};

const nameStyle = {
    fontSize: '1.5em',
    fontWeight: 'bold',
    color: '#333',
};

export default User;
