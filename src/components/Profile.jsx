import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import GetUserMeta from '../auth/getUserMeta';

// taken from below;
// https://auth0.com/docs/quickstart/spa/react/02-calling-an-api#set-up-the-auth0-service
const Profile = () => {
  const {
    user,
    isAuthenticated,
    getAccessTokenSilently,
    getAccessTokenWithPopup,
  } = useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);

  //   Getting user metadata with token
  //   useEffect(() => {
  //     const getUserMetadata = async () => {
  //       const domain = 'memaechodesk.us.auth0.com';

  //       try {
  //         const accessToken = await getAccessTokenSilently({
  //           audience: `https://${domain}/api/v2/`,
  //           scope: 'read:current_user update:current_user_metadata',
  //         });

  //         const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;

  //         const metadataResponse = await fetch(userDetailsByIdUrl, {
  //           headers: {
  //             Authorization: `Bearer ${accessToken}`,
  //           },
  //         });
  //         // console.log(metadataResponse);

  //         const { user_metadata } = await metadataResponse.json();

  //         setUserMetadata(user_metadata);
  //       } catch (e) {
  //         try {
  //           const accessToken = await getAccessTokenWithPopup({
  //             audience: `https://${domain}/api/v2/`,
  //             scope: 'read:current_user update:current_user_metadata',
  //           });

  //           const userDetailsByIdUrl = `https://${domain}/PATCH/api/v2/users/${user.sub}`;

  //           const metadataResponse = await fetch(userDetailsByIdUrl, {
  //             headers: {
  //               Authorization: `Bearer ${accessToken}`,
  //             },
  //           });
  //           console.log(metadataResponse);

  //           const { user_metadata } = await metadataResponse.json();

  //           setUserMetadata(user_metadata);
  //         } catch (error) {
  //           console.log(e.message);
  //         }
  //         console.log(e.message);
  //       }
  //     };

  //     getUserMetadata();
  //   }, []);

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <h3>User Metadata</h3>
        {userMetadata ? (
          <pre>{JSON.stringify(userMetadata, null, 2)}</pre>
        ) : (
          'No user metadata defined'
        )}

        {/* <GetUserMeta /> */}
      </div>
    )
  );
};

export default Profile;
