import React from 'react';
import { Link } from 'react-router-dom';

function Footer(props) {
  return (
    <footer className="p-6 footer-background bg-off-base-lighter">
      <div className="grid grid-cols-12 gap-4 ">
        <div className="hidden col-start-1 text-text-base sm:col-span-2 sm:block ">
          <p className="hidden text-2xl font-semibold font-logo sm:block ">
            EchoDesk
          </p>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
