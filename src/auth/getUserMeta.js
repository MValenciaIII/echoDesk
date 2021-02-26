import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

const apiBase = 'https://memaechodesk.us.auth0.com/api/v2/';
const getUserApiPath = (user) => `${apiBase}users/${user.sub}`;

export default function GetUser() {
  const { getAccessTokenSilently, getAccessTokenWithPopup, user } = useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);
  const domain = 'memaechodesk.us.auth0.com';

  //   async function updateMeta(userProfile) {
  //     try {
  //       const accessToken = await getAccessTokenWithPopup({
  //         audience: `https://${domain}/api/v2/`,
  //         scope:
  //           'read:current_user update:current_user_identities update:current_user_metadata create:current_user_metadata',
  //       });
  //       const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;

  //       let metadataResponse = await axios.patch(
  //         userDetailsByIdUrl,
  //         { ...userProfile },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${accessToken}`,
  //             'Content-type': 'application/json',
  //           },
  //         }
  //       );

  //       //   const metadataResponse = await fetch(userDetailsByIdUrl, {
  //       //     method: 'PATCH',
  //       //     body: JSON.stringify({
  //       //       nickname: 'big-Will',
  //       //     }),
  //       //     headers: {
  //       //       Authorization: `Bearer ${accessToken}`,
  //       //       'Content-type': 'application/json',
  //       //     },
  //       //   });
  //       console.log(metadataResponse);

  //       let user_metadata = metadataResponse.data.user_metadata;
  //       console.log(user_metadata);
  //       setUserMetadata(user_metadata);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

  //   updateMeta({ nickname: 'wilfred' });

  //     ! get!!!

  //   return getAccessTokenSilently()
  //     .then((accessToken) => {
  //       return axios.get(getUserApiPath(user), {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       });
  //     })
  //     .then(
  //       (success) => {
  //         console.log('retrieved successfully', success);
  //       },
  //       (fail) => {
  //         console.log('failed', fail);
  //       }
  //     );

  //     updateUserProfile({
  //       user_metadata: { some_property: 'test value' },
  //     }).then(() => getUserProfile());

  //     getUserProfile();
  //     console.log(userMetadata);

  function stringy(prop) {
    return JSON.stringify(prop, null, 3);
  }

  return (
    <div>
      <h1>Profile Settings</h1>
      {/* <pre>{stringy(userMetadata)}</pre> */}
    </div>
  );
}
