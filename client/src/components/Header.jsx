import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import SettingsDropdown from './SettingsDropdown';
import { UserContext } from '../context/dbUserContext';
import useAuth0UserMeta from '../auth/useAuth0UserMeta';

function Header(props) {
  const { loginWithRedirect, logout, user } = useAuth0();
  let { auth0UserMeta } = useContext(UserContext);

  console.log(auth0UserMeta);

  function clientOrAgentLink() {
    if (auth0UserMeta && auth0UserMeta.app_metadata?.isAdmin) {
      return '/agentHome';
    } else {
      return '/';
    }
  }

  return (
    <nav className="flex items-center justify-between w-full p-4 bg-blue">
      {/* todo:higher quality image for this size and not shrunk so much */}
      <header>
        <Link to={clientOrAgentLink()}>
          <img
            src="/media/mema-seal.png"
            alt="Mema Seal"
            className="inline-block w-16 md:w-20 lg:w-24"
          />
          <h1 className="inline-block m-2 text-3xl text-white font-logo md:text-4xl lg:text-5xl logo">
            EchoDesk
          </h1>
        </Link>
      </header>
      <div className="flex">
        <SettingsDropdown />
      </div>
    </nav>
  );
}

export default Header;
