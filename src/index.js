import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import Auth0ProviderWithHistory from './auth/auth0-provider-with-history';
import { UserContextProvider } from './context/dbUserContext';

// ! this is the basic guide followed for setting up auth with rect
// https://auth0.com/blog/complete-guide-to-react-user-authentication/

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

ReactDOM.render(
  <Router>
    <Auth0ProviderWithHistory
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.replace('https://memaadmin.servicedesk-us.comodo.com/index.php')}
      audience="https://memaechodesk.us.auth0.com/api/v2/"
      scope="read:current_user  update:current_user_metadata"
    >
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </Auth0ProviderWithHistory>
  </Router>,
  document.getElementById('root')
);
