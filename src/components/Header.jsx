import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import SettingsDropdown from './SettingsDropdown';

function Header(props) {
  const { loginWithRedirect, logout, user } = useAuth0();

  console.log(user);
  function showLogout() {
    if (!user) {
      return 'hidden';
    } else {
      return 'block';
    }
  }

  return (
    <nav className="w-full bg-blue p-4 flex items-center justify-between">
      {/* todo:higher quality image for this size and not shrunk so much */}
      <header>
        <Link to="/">
          <img
            src="/media/mema-seal.png"
            alt="Mema Seal"
            className="w-16 md:w-20 lg:w-24 inline-block"
          />
          <h1 className="m-2 font-logo text-white text-3xl md:text-4xl lg:text-5xl logo inline-block">
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
