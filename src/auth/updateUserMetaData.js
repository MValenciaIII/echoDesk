import React, { useState } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

export default async function useUserMetadata(userProfile) {
  const { getAccessTokenSilently, getAccessTokenWithPopup, user } = useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);
  const domain = 'memaechodesk.us.auth0.com';

  try {
    const accessToken = await getAccessTokenSilently({
      audience: `https://${domain}/api/v2/`,
      scope:
        'read:current_user update:current_user_metadata create:current_user_metadata',
    });
    const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;

    let metadataResponse = await axios.patch(
      userDetailsByIdUrl,
      { ...userProfile },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-type': 'application/json',
        },
      }
    );
  } catch (e) {
    try {
      const accessToken = await getAccessTokenWithPopup({
        audience: `https://${domain}/api/v2/`,
        scope:
          'read:current_user update:current_user_metadata create:current_user_metadata',
      });
      const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;

      let metadataResponse = await axios.patch(
        userDetailsByIdUrl,
        { ...userProfile },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-type': 'application/json',
          },
        }
      );
      console.log(metadataResponse);
    } catch (error) {
      console.log(e.message);
    }
    console.log(e.message);
  }
}
