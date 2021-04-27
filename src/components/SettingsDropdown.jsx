import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { UserContext } from '../context/dbUserContext';

export default function SettingsDropdown(props) {
  const { logout } = useAuth0();
  let { auth0UserMeta, setcurrentFilterQuery } = useContext(UserContext); //meta info from auth0 used to determie which link to render for agent or for client

  function clientOrAgentLink() {
    if (auth0UserMeta?.isAdmin) {
      return '/agentHome';
    } else {
      return '/';
    }
  }

  return (
    <ul className={`flex flex-col md:flex-row`}>
      <li className={`text-text-muted text-sm  underline m-2 inline-block`}>
        <Link to={clientOrAgentLink()}>Dashboard</Link>
      </li>
      <li className={`text-text-muted text-sm underline m-2 inline-block`}>
        <Link
          onClick={(e) => setcurrentFilterQuery(null)}
          to="/profilesettings"
        >
          Profile Settings
        </Link>
      </li>

      {auth0UserMeta && auth0UserMeta.isAdmin && (
        <li className={`text-text-muted text-sm underline m-2 inline-block`}>
          <Link
            onClick={(e) => setcurrentFilterQuery(null)}
            to="/agentInputTicket"
          >
            Input a ticket
          </Link>
        </li>
      )}

      <li className={`text-text-muted text-sm underline m-2 inline-block`}>
        <button
          className={`text-text-muted text-sm underline inline-block`}
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
