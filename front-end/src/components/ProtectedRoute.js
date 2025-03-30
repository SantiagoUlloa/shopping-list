import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
      // Check if token is expired
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expirationTime = payload.exp * 1000; // Convert to milliseconds
      return Date.now() < expirationTime;
    } catch (error) {
      console.error('Error verifying token:', error);
      return false;
    }
  };

  return (
    <Route
      {...rest}
      render={props => {
        if (isAuthenticated()) {
          return <Component {...props} />;
        }
        // Redirect to login if not authenticated
        return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />;
      }}
    />
  );
};

export default ProtectedRoute; 