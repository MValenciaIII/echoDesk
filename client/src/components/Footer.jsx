import React from 'react';
import { Link } from 'react-router-dom';

function Footer(props) {
  return (
    <footer className="footer-background bg-blue p-6">
      <div className="grid grid-cols-12 gap-4 ">
        <div className="col-start-1 sm:col-span-2 hidden sm:block text-white ">
          <p className="font-logo hidden sm:block text-2xl font-semibold ">
            EchoDesk
          </p>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
