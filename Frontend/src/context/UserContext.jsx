import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userType, setUserType] = useState('main');

  const setUserTypeContext = (type) => {
    setUserType(type);
  };

  return (
    <UserContext.Provider value={{ userType, setUserType: setUserTypeContext }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
