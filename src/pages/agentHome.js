import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import AgentDashboardContainer from '../containers/AgentDashBoard';
import Loading from '../components/Loading';
import { UserContext } from '../context/dbUserContext';
import HeaderFooter from '../containers/HeaderFooter';

function AgentDashboard(props) {
  let history = useHistory();

  const { user } = useAuth0();

  const {
    mysqlUser,
    getDbUser,
    mysqlUserTickets,
    getDbUsersTickets,
    auth0UserMeta,
    allTickets,
  } = useContext(UserContext);

  let barIndex = user.sub.indexOf('|') + 1;
  let userId = user.sub.substring(barIndex);

  //Not sure if this is right use of Promise.all, but it works;  Is cleaner to read I decided vs multiple individual use effects;  wk 3-16
  useEffect(() => {
    if (!mysqlUser || !mysqlUserTickets)
      Promise.all([getDbUser(userId), getDbUsersTickets()])
        .then((values) => console.log(values))
        .catch((err) => console.warn(err));
  }, []);

  //Redirect if not an admin;
  useEffect(() => {
    if (auth0UserMeta && !auth0UserMeta.isAdmin) {
      history.push('/');
    }
  }, [auth0UserMeta]);

  //  Gatekeeping the Components from loading if the necessary data has not yet been fetched here at the page leve;

  if (!mysqlUser || !allTickets || !auth0UserMeta || !mysqlUserTickets) {
    return <Loading />;
  } else {
    return (
      <HeaderFooter>
        <AgentDashboardContainer
          mysqlUser={mysqlUser}
          allTickets={allTickets}
          auth0UserMeta={auth0UserMeta}
          mysqlUserTickets={mysqlUserTickets}
        />
      </HeaderFooter>
    );
  }
}

export default AgentDashboard;
