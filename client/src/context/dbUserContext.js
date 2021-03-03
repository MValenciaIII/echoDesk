import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const UserContext = React.createContext();

debugger;
function ContextProvider(props) {
  //   user return from useAuth
  const { user } = useAuth0();

  const [mysqlUser, setmysqlUser] = useState(null);
  //? Need to fetch or set state?

  useEffect(() => {
    debugger;
    async function getUser() {
      let url = `http://10.195.103.107:3075/api/users/${user.sub}`;
      let response = await fetch(url);
      let sqluser = await response.json();
      setmysqlUser(sqluser);
    }
    getUser();
  }, []);

  async function getDbUser(auth0sub) {
    let url = `http://10.195.103.107:3075/api/users/${auth0sub}`;
    let response = await fetch(url);
    let user = await response.json();
    setmysqlUser(user);
    return user;
  }

  // Context methods here;

  // Could also destructure props to just have children;  Some people do that
  return (
    <UserContext.Provider value={{ mysqlUser, getDbUser }}>
      {props.children}
    </UserContext.Provider>
  );
}

export { ContextProvider, UserContext };
