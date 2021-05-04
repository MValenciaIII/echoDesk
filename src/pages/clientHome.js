import React, { useContext, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useHistory } from 'react-router-dom';
import DashboardContainer from '../containers/ClientDashboardContainer';
import Loading from '../components/Loading';
import { UserContext } from '../context/dbUserContext';
import HeaderFooter from '../containers/HeaderFooter';

function ClientDashboard(props) {
  const { user } = useAuth0();
  let history = useHistory();

  const {
    mysqlUser,
    getDbUser,
    mysqlUserTickets,
    getDbUsersTickets,
    auth0UserMeta,
  } = useContext(UserContext);

  // Should probably use the util function in utils folder that does this... but it's stable.    ~ wk 5/4/2021
  let barIndex = user.sub.indexOf('|') + 1;
  let userId = user.sub.substring(barIndex);

  // The console.log value of these promise.all promises is undefined since there is no return value in those functions, but they set the state of context values...
  useEffect(() => {
    if (!mysqlUser || !auth0UserMeta || !mysqlUserTickets)
      Promise.all([getDbUser(userId), getDbUsersTickets()])
        .then((values) => console.log(values))
        .catch((err) => console.warn(err));
  }, []);

  // Redirect to admin page if they are an admin... again, CRA complains about the dependency array, but we only want to really check if the user were to somehow change,
  useEffect(() => {
    if (auth0UserMeta && auth0UserMeta.isAdmin) {
      history.push('/agentHome');
    }
  }, [auth0UserMeta]);

  //again passing the mysqlUser as prop is optional to using context, but since it's only one level deep, I passes the prop.   Prboably can be removed if I used the context hook in the dask container.
  // As a reminder, the flow to create a page ==    pages are mad of containers are made of components or other containers are made of components;
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
