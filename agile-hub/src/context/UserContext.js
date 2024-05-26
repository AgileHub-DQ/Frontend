import React, { createContext, useContext, useState, useEffect } from 'react';

const UserIdContext = createContext();

export const UserIdProvider = ({ children }) => {
  const [loginId, setLoginId] = useState(localStorage.getItem('loginId'));

  useEffect(() => {
    const storedLoginId = localStorage.getItem('loginId');
    if (storedLoginId) {
      setLoginId(storedLoginId);
    }
  }, []);

  const saveLoginId = (id) => {
    localStorage.setItem('loginId', id);
    setLoginId(id);
  };

  return (
    <UserIdContext.Provider value={{ loginId, saveLoginId }}>
      {children}
    </UserIdContext.Provider>
  );
};

export const useUserId = () => useContext(UserIdContext);
