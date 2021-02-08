import React from 'react';

export default function Header(props) {
  return (
    <nav className="w-full bg-blue p-4 h-20 flex items-center">
      <div className="max-w-screen-2xl">
        <div className="bg-red-500 rounded-full p-4 w-10 h-10"></div>
      </div>
      <h1 className="m-2 text-white text-5xl font-sans">EchoDesk</h1>
    </nav>
  );
}
