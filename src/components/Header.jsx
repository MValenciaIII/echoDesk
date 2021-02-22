import React from 'react';
// import { Link } from 'react-router-dom';

function Header(props) {
  return (
    <>
      <nav className="w-full bg-blue p-2 flex items-center">
        <div className="max-w-screen-2xl">
          {/* todo:higher quality image for this size and not shrunk so much */}
          <img src="/media/mema-seal.png" alt="Mema Seal" className="w-24" />
        </div>
        <h1 className="m-2 text-white text-5xl logo">EchoDesk</h1>
      </nav>
    </>
  );
}
export default Header;
