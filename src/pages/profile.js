import React, { useEffect, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { UserContext } from '../context/dbUserContext';

import ProfileSettingsForm from '../containers/ProfileSettingsContainer';
import Loading from '../components/Loading';
import HeaderFooter from '../containers/HeaderFooter';
import Auth0subConverter from '../utils/Auth0subConverter';

// ! This package is react-select, which creates more pleasant looking and powerful Select options... It takes some work to integrate it with React hook form.  As of 5/4/2021, I don't have it integrated, but it could be worth a shot for creating a more pleasant multiple select or searchable select.    ~wk 5/4/2021
// import Select from 'react-select';  /

export default function ProfileSettings() {
  const { user } = useAuth0();

  //sat
  let { mysqlUser, setmysqlUser, getDbUser } = useContext(UserContext);

  //! the | get's converted in a query string to a code symbol; Thus, avoiding storing the | and just stoiring the num;
  let userId = Auth0subConverter(user);

  // React complains about the dependency array here having missing dependencies, but we really only would re-run this if the auth0 user changed.... I think I tried including them once and got an infinite loop due to one of the deps, probably mysqlUser
  useEffect(() => {
    if (!mysqlUser) {
      getDbUser(userId);
    }
  }, [user]);

  //! MYSQLuser will be initialized to an empty object if it's the first time for a user to login through Auth0;  Otherwise, pull their data and pass it to the profile settings form;  The props could be pulled in via contenxt, but I just decided to pass them in this case the one level...
  if (!mysqlUser) {
    return <Loading />;
  } else {
    return (
      <HeaderFooter>
        <ProfileSettingsForm
          mysqlUser={mysqlUser}
          setmysqlUser={setmysqlUser}
          userSub={userId}
        />
      </HeaderFooter>
    );
  }
}
