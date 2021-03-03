import React, { useContext, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Dashboard from '../containers/DashboardContainer';
import Loading from '../components/Loading';
import { UserContext } from '../context/dbUserContext';

// Header
// Footer
// Tickets
// Form?

function ClientDashboard(props) {
  const { user } = useAuth0();
  let { mysqlUser, getDbUser } = useContext(UserContext);

  useEffect(() => {
    if (!mysqlUser) {
      getDbUser(user.sub);
    }
  }, [user]);

  if (!mysqlUser) {
    return <Loading />;
  } else return <Dashboard />;
}

export default ClientDashboard;
