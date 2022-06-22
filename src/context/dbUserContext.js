import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import {
  allTicketsRoute,
  dbUserRoute,
  dbUsersTicketsRoute,
} from '../constants/apiRoutes';
import { AUTH0_META_PROP } from '../constants/domain';

const UserContext = React.createContext();

function UserContextProvider(props) {
  //   user return from useAuth
  const { user } = useAuth0();
  const [mysqlUser, setmysqlUser] = useState();
  const [mysqlUserTickets, setmysqlUserTickets] = useState();
  const [allTickets, setAllTickets] = useState();
  const [auth0UserMeta, setAuth0UserMeta] = useState();
  const [currentFilterQuery, setcurrentFilterQuery] = useState();
  const [whichFilter, setWhichFilter] = useState('QUICK'); //will be BIG OR QUICK

  const [themeColor, setThemeColor] = useState(fetchTheme());
  const [filterPreference, setFilterPreference] = useState();
  // on Context load, Set the app.metadata into state which is passed along via an Auth0 rule
  useEffect(() => {
    if (user && user[AUTH0_META_PROP]) {
      let meta = user[AUTH0_META_PROP];
      setAuth0UserMeta(meta);
    }
  }, [user]);

  // once we know their admin meta status, we can fetch all the tickets for an admin...
  useEffect(() => {
    if (auth0UserMeta?.isAdmin) {
      getAllTickets();
    }
  }, [auth0UserMeta]);

  // Theme handling via localStorage, not DB
  function fetchTheme() {
    if (localStorage.colorTheme) {
      document.documentElement.classList.add(localStorage.colorTheme);
      return localStorage.colorTheme;
    } else {
      document.documentElement.classList.add('defaultBlueTheme');
      localStorage.setItem('colorTheme', 'defaultBlueTheme');
      return 'defaultBlueTheme';
    }
  }
  //? Being Called from Header.
  function addThemeToHTML(newTheme) {
    if (newTheme === themeColor) return;
    document.documentElement.classList.replace(themeColor, newTheme);
    document.documentElement.classList.add(newTheme);
    localStorage.setItem('colorTheme', newTheme);
    setThemeColor(newTheme);
  }

  function fetchFilterPreference() {

  }
  //? being called from Dashboard
  function addPreferenceToHTML() {

  }
  // Again, should probably make this reference the utility function that is defined in util for it;   ~wk 5/4
  let barIndex;
  let defaultuserId;

  function reduceAuthSubToNumbers(sub) {
    barIndex = user.sub.indexOf('|') + 1;
    defaultuserId = user.sub.substring(barIndex);
    return defaultuserId;
  }

  //!! EXPORTED FUNCTIONS;  NOT RUN THROUGH USE EFFECT HERE BECAUSE THE AUTH0 CLIENT IS UNDEFINED AT THIS POINT IN THE TREE;  IT IS ONLY DEFINED AFTER TRYING TO LOGIN;  THESE ARE CALLED AT THE PAGES LEVEL AFTER AUTH0 USER IS DEFINED AND LOGGEDIN

  async function getAllTickets() {
    try {
      let ticketsUrl = allTicketsRoute;
      let response = await fetch(ticketsUrl);
      let allTickets = await response.json();

      //sorting could be done via api, but here it just sorts them as a default by newest id's
      let defaultSorted = allTickets.sort((one, two) => {
        return two.id - one.id ;
      });
      
      if (response.ok) {
        setAllTickets([...defaultSorted.filter(ticketOrder => ticketOrder.status_id !== 3 && ticketOrder.status_id !== 4)]);
      }
    } catch (error) {
      console.error({ error });
      setAllTickets([]);
    }
  }

  //default param in case the param is omitted...
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
      setmysqlUser({}); ///setting to an empty object to avoid "Cannot access prop of undefined errors on initial creation of user in profile page"
    }
  }

  async function getDbUsersTickets(userId = reduceAuthSubToNumbers(user.sub)) {
    try {
      let ticketsUrl = dbUsersTicketsRoute(userId);
      let response = await fetch(ticketsUrl);
      let sqlUsersTickets = await response.json();

      let defaultSorted = sqlUsersTickets.sort((one, two) => {
        return two.id - one.id;
      });
      if (response.ok) {
        setmysqlUserTickets([...defaultSorted]);
      }
    } catch (error) {
      console.error({ error });
      setmysqlUserTickets([]);
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
        allTickets,
        setAllTickets,
        getAllTickets,
        currentFilterQuery,
        setcurrentFilterQuery,
        setThemeColor,
        themeColor,
        addThemeToHTML,
        whichFilter,
        setWhichFilter,
        addPreferenceToHTML,
        filterPreference,
        setFilterPreference
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

export { UserContextProvider, UserContext };
