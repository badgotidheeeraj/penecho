import React, { createContext, useContext, useState, useMemo } from 'react';
import UserContext from './UserContext';

const UserProvider = ({ children }) => {
  const [user, setUser] = React.useState('');
  const [catergory, setCatergory] = React.useState('');
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  const storeToken = useMemo(() => (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  }, [token]);

  const removeToken = useMemo(() => () => {
    setToken(null);
    localStorage.removeItem('token');
  }, []);

  const contextValue = useMemo(() => ({
    token,
    setToken: storeToken,
    removeToken: removeToken,
    user,
     setUser,
      catergory, 
      setCatergory
  }), [token, storeToken, removeToken, user, setUser, catergory, setCatergory]);
  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
