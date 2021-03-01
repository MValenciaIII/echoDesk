import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

export default function SettingsDropdown(props) {
  const [listHovered, setlistHovered] = useState(false);
  const { logout } = useAuth0();

  return (
    <ul className={`flex flex-col md:flex-row`}>
      <li className={`text-gray-100 text-sm  underline m-1 inline-block`}>
        <Link to="/">Dashboard</Link>
      </li>
      <li className={`text-gray-100 text-sm underline m-1 inline-block`}>
        <Link to="/profilesettings">Profile Settings</Link>
      </li>
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
