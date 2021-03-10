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
  let {
    mysqlUser,
    getDbUser,
    mysqlUserTickets,
    getDbUsersTickets,
  } = useContext(UserContext);

  console.log({ mysqlUserTickets });
  console.log({ mysqlUser });

  let barIndex = user.sub.indexOf('|') + 1;
  let userId = user.sub.substring(barIndex);

  useEffect(() => {
    if (!mysqlUser) {
      getDbUser(userId);
      getDbUsersTickets(userId);
    }
  }, [user, mysqlUser, mysqlUserTickets]);

  // ||mysqlUserTickets
  if (!mysqlUser || !mysqlUserTickets) {
    return <Loading />;
  } else return <Dashboard />;

  // !; only for when I want to take auth fetch off or server is down;
  // return <Dashboard />;
}

export default ClientDashboard;
