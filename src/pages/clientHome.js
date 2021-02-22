import React from 'react';
import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Dashboard from '../components/Dashboard';

// Header
// Footer
// Tickets
// Form?

function ClientDashboard(props) {
  const { user, isAuthenticated } = useAuth0();

  if (!isAuthenticated) {
    useEffect;
  }
  return <Dashboard />;
}

export default ClientDashboard;
