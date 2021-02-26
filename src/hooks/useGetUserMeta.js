import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export default async function useUserMetadata() {
  const { getAccessTokenSilently, getAccessTokenWithPopup, user } = useAuth0();
  const [user_metadata, setUserMetadata] = useState(null);

  //   async function to get data
  debugger;
  const domain = 'memaechodesk.us.auth0.com';
  try {
    const accessToken = await getAccessTokenSilently({
      audience: `https://${domain}/api/v2/`,
      scope: 'read:current_user update:current_user_metadata',
    });
    const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;
    const metadataResponse = await fetch(userDetailsByIdUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(metadataResponse);
    const { user_metadata } = await metadataResponse.json();
    setUserMetadata(user_metadata);
  } catch (e) {
    try {
      const accessToken = await getAccessTokenWithPopup({
        audience: `https://${domain}/api/v2/`,
        scope: 'read:current_user update:current_user_metadata',
      });
      const userDetailsByIdUrl = `https://${domain}/PATCH/api/v2/users/${user.sub}`;
      const metadataResponse = await fetch(userDetailsByIdUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: {
          color: 'red',
        },
      });
      console.log(metadataResponse);
      const { user_metadata } = await metadataResponse.json();
      setUserMetadata(user_metadata);
    } catch (error) {
      console.log(e.message);
    }
    console.log(e.message);
  }

  return { user_metadata };
}
