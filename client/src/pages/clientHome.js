import React, { useContext, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import DashboardContainer from '../containers/ClientDashboardContainer';
import Loading from '../components/Loading';
import { UserContext } from '../context/dbUserContext';
import HeaderFooter from '../containers/HeaderFooter';

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
    auth0UserMeta,
    getAuth0UserMeta,
  } = useContext(UserContext);

  // console.log({ mysqlUserTickets });
  // console.log({ mysqlUser });

  let barIndex = user.sub.indexOf('|') + 1;
  let userId = user.sub.substring(barIndex);

  useEffect(() => {
    if (!mysqlUser) {
      Promise.all([
        getDbUser(userId),
        getDbUsersTickets(userId),
        getAuth0UserMeta(),
      ])
        .then((values) => console.log(values))
        .catch((err) => console.log(err));
    }
  }, [user, mysqlUser, mysqlUserTickets, getAuth0UserMeta]);

  // ||mysqlUserTickets
  if (!mysqlUser || !mysqlUserTickets || !auth0UserMeta) {
    return <Loading />;
  } else {
    return (
      <HeaderFooter>
        <DashboardContainer mysqlUser={mysqlUser} />
      </HeaderFooter>
    );
  }

  // !; only for when I want to take auth fetch off or server is down;
  // return <Dashboard />;
}

export default ClientDashboard;
