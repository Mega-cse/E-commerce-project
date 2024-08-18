import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cartItems, setCart] = useState([]); // Only use setCart to update cartItems

  const value = {
    user,
    setUser,
    cartItems,
    setCart // Use setCart to update cartItems
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
