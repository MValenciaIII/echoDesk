import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import SettingsDropdown from './SettingsDropdown';
import { UserContext } from '../context/dbUserContext';

// called by the headerfooter.js container on each page... placed on each page instead of around the app since i am using the auth0 metadata to determine which links to render for admin or client and the data is undefined until authenticated within a page. ~WK 3-15-2021
function Header(props) {
  let { auth0UserMeta } = useContext(UserContext);

  function clientOrAgentLink() {
    if (auth0UserMeta && auth0UserMeta.app_metadata?.isAdmin?.admin) {
      return '/agentHome';
    } else {
      return '/';
    }
  }

  return (
    <nav className="flex items-center justify-between w-full p-4 bg-blue">
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
