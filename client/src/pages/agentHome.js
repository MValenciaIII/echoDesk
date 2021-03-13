import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import AgentDashboardContainer from '../containers/AgentDashBoard';
import AgentTicketFilter from '../containers/TicketFilter';
import Loading from '../components/Loading';
import { UserContext } from '../context/dbUserContext';
import HeaderFooter from '../containers/HeaderFooter';

function AgentDashboard(props) {
  let history = useHistory();

  const { user } = useAuth0();
  console.log(user);

  const {
    mysqlUser,
    getDbUser,
    auth0UserMeta,
    getAuth0UserMeta,
    allTickets,
  } = useContext(UserContext);

  // console.log({ mysqlUserTickets });
  // console.log({ mysqlUser });

  let barIndex = user.sub.indexOf('|') + 1;
  let userId = user.sub.substring(barIndex);

  //   auth0 meta fetch;  Promise all not working like I would expect, so splitting it up: wk-3-15
  useEffect(() => {
    if (!auth0UserMeta) {
      getAuth0UserMeta();
    }
  }, [user, getAuth0UserMeta]);

  // get user from mysql db fetch
  useEffect(() => {
    if (!mysqlUser) {
      getDbUser(userId);
    }
  }, [user, mysqlUser]);

  //Redirect if not an admin;
  useEffect(() => {
    if (auth0UserMeta && !auth0UserMeta.app_metadata?.isAdmin) {
      history.push('/');
    }
  }, [user, auth0UserMeta]);

  // ||mysqlUserTickets
  if (!mysqlUser || !allTickets || !auth0UserMeta) {
    return <Loading />;
  } else {
    return (
      <HeaderFooter>
        <AgentDashboardContainer mysqlUser={mysqlUser} />
      </HeaderFooter>
    );
  }

  // !; only for when I want to take auth fetch off or server is down;
  // return <Dashboard />;
}

export default AgentDashboard;
