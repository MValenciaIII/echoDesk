import { useState } from 'react';

import { useAuth0 } from '@auth0/auth0-react';

export default async function GetUserMetaData(userProfile) {
  const { getAccessTokenSilently, getAccessTokenWithPopup, user } = useAuth0();
  const [userMetadata] = useState(null);
  const domain = 'memaechodesk.us.auth0.com';
  let user_metadata;

  try {
    const accessToken = await getAccessTokenSilently({
      audience: `https://${domain}/api/v2/`,
      scope: 'read:current_user ',
    });

    // API LINK WITH USER SUB
    const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;

    // PATCH METADATA
    let metadataResponse = await fetch(userDetailsByIdUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-type': 'application/json',
      },
    });

    user_metadata = await metadataResponse.json();
    console.log(user_metadata);

    return user_metadata;
  } catch (error) {
    try {
      const accessToken = await getAccessTokenWithPopup({
        audience: `https://${domain}/api/v2/`,
        scope: 'read:current_user',
      });

      // API LINK WITH USER SUB
      const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;

      // PATCH METADATA
      let metadataResponse = await fetch(userDetailsByIdUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-type': 'application/json',
        },
      });

      user_metadata = await metadataResponse.json();
      console.log(user_metadata);
      return user_metadata;
    } catch (error) {
      console.log(error);
    }
    console.log(error);
  }
  return { user_metadata };
}
