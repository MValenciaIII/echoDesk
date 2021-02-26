import React from 'react';
import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Dashboard from '../components/Dashboard';
import LoginPrompt from '../components/Login';

// Header
// Footer
// Tickets
// Form?

function ClientDashboard(props) {
  const { isAuthenticated, user, loginWithPopup } = useAuth0();
  console.log(user);

  // useEffect(() => {
  //   straightToLogin();
  // }, [user]);

  if (isAuthenticated) {
    return <Dashboard />;
  } else {
    return <LoginPrompt />;
  }
}

export default ClientDashboard;
