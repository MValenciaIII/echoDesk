import React from 'react';
// import { Link } from 'react-router-dom';

function Header(props) {
  return (
    <>
      <nav className="w-full bg-blue p-4 h-20 flex items-center">
        <div className="max-w-screen-2xl">
          {/* todo:higher quality image for this size and not shrunk so much */}
          <img src="/media/mema-seal.png" alt="Mema Seal" className="w-16" />
        </div>
        <h1 className="m-2 text-white text-5xl font-sans">EchoDesk</h1>
      </nav>
    </>
  );
}
export default Header;
