import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Dashboard from '../containers/DashboardContainer';

// Header
// Footer
// Tickets
// Form?

function ClientDashboard(props) {
  const { user } = useAuth0();
  console.log(user);

  return <Dashboard />;
}

export default ClientDashboard;
