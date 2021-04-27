import React, { useContext, useEffect } from 'react';
import TicketForm from '../containers/TicketFormContainer';
import { useHistory } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Loading from '../components/Loading';
import { UserContext } from '../context/dbUserContext';
import HeaderFooter from '../containers/HeaderFooter';

export default function AgentInputTicket(props) {
  let history = useHistory();

  const { user } = useAuth0();

  const { mysqlUser, getDbUser, auth0UserMeta } = useContext(UserContext);

  let barIndex = user.sub.indexOf('|') + 1;
  let userId = user.sub.substring(barIndex);

  // get user from mysql db fetch
  useEffect(() => {
    if (!mysqlUser) {
      getDbUser(userId);
    }
  }, [user, mysqlUser, getDbUser, userId]);

  //Redirect if not an admin;
  useEffect(() => {

    if (auth0UserMeta && !auth0UserMeta?.isAdmin) {
      history.push('/');
    }
  }, [user]);

  // ||mysqlUserTickets
  if (!mysqlUser || !auth0UserMeta) {
    return <Loading />;
  } else {
    return (
      <HeaderFooter>
        <div
          id="agentTicketInputContainer"
          className={'bg-base p-8 w-full flex-grow'}
        >
          <TicketForm />
        </div>
      </HeaderFooter>
    );
  }

  // !; only for when I want to take auth fetch off or server is down;
  // return <Dashboard />;
}
