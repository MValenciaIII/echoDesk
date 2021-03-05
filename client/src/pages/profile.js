import React, { useEffect, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
// import getDbUser from '../auth/getDbUser';
import { UserContext } from '../context/dbUserContext';
// import Select from 'react-select';  //? NOT going to use I think; hard to use in conjuction with REACT hook form to me;  WK 3/3/21
import ProfileSettingsForm from '../components/ProfileSettings';
import Loading from '../components/Loading';

export default function ProfileSetttings() {
  //   user return from useAuth
  const { user } = useAuth0();

  //grab sql user from context;  Context updates mysqlUser when auth0 user changes in useEffect dependency array
  let { mysqlUser, getDbUser } = useContext(UserContext);

  //! the | get's converted in a query string to a code; Thus, avoiding storing the |;
  let barIndex = user.sub.indexOf('|') + 1;
  let userId = user.sub.substring(barIndex);
  console.log(userId);
  debugger;

  console.log(mysqlUser);
  // console.log(Object.entries(mysqlUser || ''));

  useEffect(() => {
    if (!mysqlUser) {
      getDbUser(userId);
    }
  }, [user]);

  //   todo: onSubmit should patch to our DATABASE TO UPDATE USER INFO WHICH WILL THEN BE CALLED TO GET TICKETS FOR THAT USER;  Or update meta in auth0?

  if (!mysqlUser) {
    return <Loading />;
  } else {
    return <ProfileSettingsForm userSub={userId} />;
  }
}
