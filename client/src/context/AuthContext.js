import React, { createContext, useState, useEffect } from 'react';

// NOTE: We no longer need to import axios.
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

  const handleAuthResponse = async (response) => {
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    localStorage.setItem('userInfo', JSON.stringify(data));
    setUser(data);
  };

  const signup = async (username, password) => {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    await handleAuthResponse(response);
  };

  const login = async (username, password) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    await handleAuthResponse(response);
  };

  const logout = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
  };

  const deleteAccount = async () => {
    if (!user || !user.token) {
      throw new Error('Not authenticated');
    }
    const response = await fetch('/api/auth/profile', {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`,
      }
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    logout();
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout, deleteAccount, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
