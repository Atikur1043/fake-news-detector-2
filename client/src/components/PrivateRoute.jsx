import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const PrivateRoute = () => {
  const { user, loading } = useContext(AuthContext);

  // While the context is checking for a user, don't render anything
  if (loading) {
    return null; 
  }

  // If there is a user, render the child components (the protected page).
  // Otherwise, redirect to the login page.
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
