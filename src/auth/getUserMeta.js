import { useState } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

const apiBase = 'https://memaechodesk.us.auth0.com/api/v2/';
const getUserApiPath = (user) => `${apiBase}users/${user.sub}`;

export default async function GetUserMetaData(userProfile) {
  const { getAccessTokenSilently, getAccessTokenWithPopup, user } = useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);
  const domain = 'memaechodesk.us.auth0.com';

  try {
    const accessToken = await getAccessTokenSilently({
      audience: `https://${domain}/api/v2/`,
      scope:
        'read:current_user update:current_user_metadata create:current_user_metadata',
    });

    // API LINK WITH USER SUB
    const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;

    // PATCH METADATA
    let metadataResponse = await axios.get(userDetailsByIdUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-type': 'application/json',
      },
    });
    console.log(metadataResponse);

    let user_metadata = metadataResponse.data.user_metadata;
    console.log(user_metadata);
    setUserMetadata(user_metadata);
  } catch (error) {
    try {
      const accessToken = await getAccessTokenWithPopup({
        audience: `https://${domain}/api/v2/`,
        scope:
          'read:current_user update:current_user_metadata create:current_user_metadata',
      });

      // API LINK WITH USER SUB
      const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;

      // PATCH METADATA
      let metadataResponse = await axios.get(userDetailsByIdUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-type': 'application/json',
        },
      });
      console.log(metadataResponse);

      let user_metadata = metadataResponse.data.user_metadata;
      console.log(user_metadata);
      setUserMetadata(user_metadata);
    } catch (error) {
      console.log(error);
    }
    console.log(error);
  }
  return { userMetadata };
}
