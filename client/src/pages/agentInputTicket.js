import React, { useContext, useEffect } from 'react';
import TicketForm from '../components/TicketForm';
import { useHistory } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Loading from '../components/Loading';
import { UserContext } from '../context/dbUserContext';
import HeaderFooter from '../containers/HeaderFooter';

export default function AgentInputTicket(props) {
  let history = useHistory();

  const { user } = useAuth0();

  const { mysqlUser, getDbUser, auth0UserMeta, getAuth0UserMeta } = useContext(
    UserContext
  );

  let barIndex = user.sub.indexOf('|') + 1;
  let userId = user.sub.substring(barIndex);

  //   auth0 meta fetch;  Promise all not working like I would expect, so splitting it up: wk-3-15
  useEffect(() => {
    if (!auth0UserMeta) {
      getAuth0UserMeta();
    }
  }, [user, getAuth0UserMeta, auth0UserMeta]);

  // get user from mysql db fetch
  useEffect(() => {
    if (!mysqlUser) {
      getDbUser(userId);
    }
  }, [user, mysqlUser, getDbUser, userId]);

  //Redirect if not an admin;
  useEffect(() => {
    if (auth0UserMeta && !auth0UserMeta.app_metadata?.isAdmin) {
      history.push('/');
    }
  }, [user, auth0UserMeta, history]);

  // ||mysqlUserTickets
  if (!mysqlUser || !auth0UserMeta) {
    return <Loading />;
  } else {
    return (
      <HeaderFooter>
        <TicketForm />
      </HeaderFooter>
    );
  }

  // !; only for when I want to take auth fetch off or server is down;
  // return <Dashboard />;
}
