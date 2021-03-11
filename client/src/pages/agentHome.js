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
  console.log(user);
  debugger;

  let {
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

  useEffect(() => {
    if (!mysqlUser) {
      Promise.all([getDbUser(userId), getAuth0UserMeta()])
        .then((values) => console.log(values))
        .catch((err) => console.log(err));
    }
  }, [user, mysqlUser, getAuth0UserMeta]);

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
