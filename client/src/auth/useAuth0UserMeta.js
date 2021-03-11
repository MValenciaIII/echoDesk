import { useState, useEffect } from 'react';

import { useAuth0 } from '@auth0/auth0-react';

export default async function GetUserMetaData(userProfile) {
  const { getAccessTokenSilently, getAccessTokenWithPopup, user } = useAuth0();
  const [auth0UserWithMeta, setauth0UserWithMeta] = useState();
  const domain = 'memaechodesk.us.auth0.com';
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

    let user_metadata = await metadataResponse.json();
    setauth0UserWithMeta(user_metadata);
  } catch (error) {
    console.log(error);
  }
  return auth0UserWithMeta;
}
