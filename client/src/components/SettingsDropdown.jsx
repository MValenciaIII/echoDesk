import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { UserContext } from '../context/dbUserContext';

export default function SettingsDropdown(props) {
  const [listHovered, setlistHovered] = useState(false);
  const { logout } = useAuth0();

  let { auth0UserMeta } = useContext(UserContext);

  function clientOrAgentLink() {
    if (auth0UserMeta && auth0UserMeta.app_metadata?.isAdmin) {
      return '/agentHome';
    } else {
      return '/';
    }
  }

  return (
    <ul className={`flex flex-col md:flex-row`}>
      <li className={`text-gray-100 text-sm  underline m-1 inline-block`}>
        <Link to={clientOrAgentLink()}>Dashboard</Link>
      </li>
      <li className={`text-gray-100 text-sm underline m-1 inline-block`}>
        <Link to="/profilesettings">Profile Settings</Link>
      </li>

      {auth0UserMeta.app_metadata?.isAdmin && (
        <li className={`text-gray-100 text-sm underline m-1 inline-block`}>
          <Link to="/agentInputTicket">Input a ticket</Link>
        </li>
      )}

      <li className={`text-gray-100 text-sm underline m-1 inline-block`}>
        <button
          className={`text-gray-100 text-sm underline inline-block`}
          onClick={() => {
            logout();
          }}
        >
          Logout
        </button>
      </li>
    </ul>
  );
}
