import React, { useEffect} from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext.js'; 

function User() {

    const { authToken } = useAuth(); 

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
            console.log(response);
            console.log(response.result);
        } catch (error) {
            console.error('API request failed:', error);
        }
    };

  return (
    <div>
     hi hello?
    </div>
  );
}

export default User;
