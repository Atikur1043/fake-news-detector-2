import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
    setLoading(false);
  }, []);

  const signup = async (username, password) => {
    // FIX: Use relative path for API call
    const { data } = await axios.get('/api/auth/signup', { username, password });
    localStorage.setItem('userInfo', JSON.stringify(data));
    setUser(data);
  };

  const login = async (username, password) => {
    // FIX: Use relative path for API call
    const { data } = await axios.post('/api/auth/login', { username, password });
    localStorage.setItem('userInfo', JSON.stringify(data));
    setUser(data);
  };

  const logout = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
  };

  const deleteAccount = async () => {
    if (!user || !user.token) {
      throw new Error('Not authenticated');
    }
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    // FIX: Use relative path for API call
    await axios.delete('/api/auth/profile', config);
    logout();
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout, deleteAccount, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
