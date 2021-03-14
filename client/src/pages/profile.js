import React, { useEffect, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
// import getDbUser from '../auth/getDbUser';
import { UserContext } from '../context/dbUserContext';
// import Select from 'react-select';  //? NOT going to use I think; hard to use in conjuction with REACT hook form to me;  WK 3/3/21
import ProfileSettingsForm from '../components/ProfileSettings';
import Loading from '../components/Loading';
import HeaderFooter from '../containers/HeaderFooter';
import Auth0subConverter from '../utils/Auth0subConverter';

export default function ProfileSettings() {
  //   user return from useAuth
  const { user } = useAuth0();

  //sat
  let {
    mysqlUser,
    setmysqlUser,
    getDbUser,
    auth0UserMeta,
    getAuth0UserMeta,
  } = useContext(UserContext);

  //! the | get's converted in a query string to a code symbol; Thus, avoiding storing the | and just stoiring the num;
  let userId = Auth0subConverter(user);

  // console.log(Object.entries(mysqlUser || ''));
  useEffect(() => {
    if (!mysqlUser) {
      getDbUser(userId);
    }
  }, [user]);

  //! MYSQLuser will be initialized to an empty object if it's the first time for a user;  Otherwise, pull their data and pass it to the profile settings;   META info doesn't exist on the first login, THUS, it CAN'T prevent us from rending the profile seetings page.  May see about pulling it in from an effect on the settings page though for posting admin status to our db.  Right now, all our admin stuff is connect to the auth0.app_metadata.isAdmin
  if (!mysqlUser) {
    return <Loading />;
  } else {
    return (
      <HeaderFooter>
        <ProfileSettingsForm
          auth0UserWithMeta={auth0UserMeta}
          mysqlUser={mysqlUser}
          setmysqlUser={setmysqlUser}
          userSub={userId}
          getAuth0UserMeta={getAuth0UserMeta}
        />
      </HeaderFooter>
    );
  }
}
