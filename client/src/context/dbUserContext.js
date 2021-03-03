import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const UserContext = React.createContext();

function UserContextProvider(props) {
  //   user return from useAuth
  const { user } = useAuth0();

  const [mysqlUser, setmysqlUser] = useState();
  // const [usersTickets, setUsersTickets] = useState(null);

  // useEffect(() => {
  //   debugger;
  //   async function getUser() {
  //     if (!user) {
  //       return;
  //     }
  //     let url = `http://10.195.103.107:3075/api/users/${user.sub}`;
  //     let response = await fetch(url);
  //     let sqluser = await response.json();
  //     setmysqlUser(sqluser);
  //   }
  //   // async function getUsersTickets(){
  //   //   let ticketsurl = `http://10.195.103.107:3075/api/tickets/${user.sub}`;
  //   //   let response = await fetch(ticketsurl);
  //   //   let usersTickets = await response.json();
  //   //   setUsersTickets(usersTickets);
  //   // }
  //   getUser();
  // }, [user]);

  //? May not be needed since useEffect changes when user does;
  async function getDbUser(userId = user.sub) {
    let url = `http://10.195.103.107:3075/api/users/${userId}`;
    let response = await fetch(url);
    let sqlUser = await response.json();
    if (response.ok) {
      setmysqlUser(sqlUser);
    } else {
      setmysqlUser({});
    }
    // setmysqlUser(sqlUser);
    return sqlUser;
  }

  // Could also destructure props to just have children;  Some people do that
  return (
    <UserContext.Provider value={{ mysqlUser, setmysqlUser, getDbUser }}>
      {props.children}
    </UserContext.Provider>
  );
}

export { UserContextProvider, UserContext };
