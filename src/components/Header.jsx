import React from 'react';
// import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

function Header(props) {
  const { loginWithRedirect, logout } = useAuth0();

  return (
    <nav className="w-full bg-blue p-4 flex items-center">
      {/* todo:higher quality image for this size and not shrunk so much */}
      <img src="/media/mema-seal.png" alt="Mema Seal" className="w-24" />
      <h1 className="m-2 text-white text-5xl logo">EchoDesk</h1>
      <button
        className="ml-4 bg-gray-100 rounded px-4 py-2"
        onClick={() => {
          loginWithRedirect();
        }}
      >
        Log in
      </button>
      <button
        className="ml-4 bg-gray-100 rounded px-4 py-2"
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
