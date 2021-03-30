import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import {
  allTicketsRoute,
  dbUserRoute,
  dbUsersTicketsRoute,
} from '../constants/apiRoutes';

const UserContext = React.createContext();

function UserContextProvider(props) {
  //   user return from useAuth
  const { user, getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
  const [mysqlUser, setmysqlUser] = useState();
  const [mysqlUserTickets, setmysqlUserTickets] = useState();
  const [allTickets, setAllTickets] = useState();
  const [auth0UserMeta, setAuth0UserMeta] = useState();

  useEffect(() => {
    async function fetchTickets() {
      // todo: Should this be refactored to only call if the currently logged in user is an admin?  Otherwise anyone could inspect files and makes this call no?  A form of front end security
      try {
        let ticketsUrl = allTicketsRoute;
        let response = await fetch(ticketsUrl);
        let allTickets = await response.json();

        // todo:sort based on timestamps;  Change sorting to server side in SQL statement and limit?
        let defaultSorted = allTickets.sort((one, two) => {
          return two.id - one.id;
        });
        console.log(defaultSorted);
        if (response.ok) {
          setAllTickets([...defaultSorted]);
        }
      } catch (error) {
        console.error({ error });
        setAllTickets([]);
      }
    }
    fetchTickets();
  }, [mysqlUserTickets]);

  let barIndex;
  let defaultuserId; //i.e. the current auth0 user with pipe removed
  // if (user) {
  //   barIndex = user.sub.indexOf('|') + 1;
  //   defaultuserId = user.sub.substring(barIndex);
  // }

  function reduceAuthSubToNumbers(sub) {
    barIndex = user.sub.indexOf('|') + 1;
    defaultuserId = user.sub.substring(barIndex);
    return defaultuserId;
  }

  //!! EXPORTED FUNCTIONS;  NOT RUN THROUGH USE EFFECT HERE BECAUSE THE AUTH0 CLIENT IS UNDEFINED AT THIS POINT IN THE TREE;  IT IS ONLY DEFINED AFTER TRYING TO LOGIN;  THESE ARE CALLED AT THE PAGES LEVEL AFTER AUTH0 USER IS DEFINED

  async function getDbUser(userId = defaultuserId) {
    try {
      let url = dbUserRoute(userId);
      let response = await fetch(url);
      let sqlUser = await response.json();
      if (response.ok) {
        setmysqlUser(sqlUser);
      }
    } catch (error) {
      console.log(error);
      setmysqlUser({});
    }
  }

  async function getDbUsersTickets(userId = reduceAuthSubToNumbers(user.sub)) {
    try {
      let ticketsUrl = dbUsersTicketsRoute(userId);
      let response = await fetch(ticketsUrl);
      let sqlUsersTickets = await response.json();

      // todo:change sorting to server side with sql statemnt?
      let defaultSorted = sqlUsersTickets.sort((one, two) => {
        return two.id - one.id;
      });
      console.log(defaultSorted);
      if (response.ok) {
        setmysqlUserTickets([...defaultSorted]);
      }
    } catch (error) {
      console.error({ error });
      setmysqlUserTickets([]);
    }
  }

  async function getAuth0UserMeta() {
    const domain = 'memaechodesk.us.auth0.com';
    try {
      const accessToken = await getAccessTokenSilently({
        audience: `https://${domain}/api/v2/`,
        scope: 'read:current_user ',
      });

      // API LINK WITH USER SUB
      const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;

      // get METADATA
      let metadataResponse = await fetch(userDetailsByIdUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-type': 'application/json',
        },
      });

      let user_metadata = await metadataResponse.json();
      setAuth0UserMeta(user_metadata);
    } catch (error) {
      console.log(error);
      try {
        const accessToken = await getAccessTokenWithPopup({
          audience: `https://${domain}/api/v2/`,
          scope: 'read:current_user ',
        });

        // API LINK WITH USER SUB
        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;

        // get METADATA
        let metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-type': 'application/json',
          },
        });

        let user_metadata = await metadataResponse.json();
        setAuth0UserMeta(user_metadata);
      } catch (error) {
        console.log(error);
      }
    }
  }

  // Could also destructure props to just have children;  Some people do that
  return (
    <UserContext.Provider
      value={{
        mysqlUser,
        setmysqlUser,
        getDbUser,
        mysqlUserTickets,
        setmysqlUserTickets,
        getDbUsersTickets,
        auth0UserMeta,
        getAuth0UserMeta,
        allTickets,
        setAllTickets,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

export { UserContextProvider, UserContext };
