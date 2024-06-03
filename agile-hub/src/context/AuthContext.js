// // src/context/AuthContext.js
// import React, { createContext, useContext, useState } from 'react';

// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const [authToken, setAuthToken] = useState(localStorage.getItem('token') || null);

//   const login = (token) => {
//     localStorage.setItem('token', token);
//     setAuthToken(token);
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     setAuthToken(null);
//   };

//   return (
//     <AuthContext.Provider value={{ authToken, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
// src/context/AuthContext.js
// src/context/AuthContext.js
// src/context/AuthContext.js
// AuthContext.js
// AuthContext.js
// AuthContext.js
// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setAuthToken(token);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
