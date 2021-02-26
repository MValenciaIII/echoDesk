import React from 'react';
// import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

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
        <img
          src="/media/mema-seal.png"
          alt="Mema Seal"
          className="w-24 inline-block"
        />
        <h1 className="m-2 text-white text-5xl logo inline-block">EchoDesk</h1>
      </header>

      <button
        className={`mr-4 bg-gray-100 rounded px-4 py-2 ${showLogout()}`}
        onClick={() => {
          logout();
        }}
      >
        Log out
      </button>
    </nav>
  );
}
export default Header;
