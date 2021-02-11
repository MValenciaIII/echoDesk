import React from 'react';
import { Link } from 'react-router-dom';

function Footer(props) {
  return (
    <>
      <div class="footer-background bg-blue ">
        <div class="container ">
          <div className="grid grid-cols-12 sm:grid-cols-8 md:grid-cols-8 lg:grid-cols-12 gap-4 ">
              <div className="col-start-2 sm:col-span-2 md:col-span-2 hidden sm:block lg:col-span-2 lg:col-start-2 text-white ">
                <p className="footer-logo hidden sm:block text-2xl font-semibold logo">EchoDesk</p>
              </div>
              <div className="col-span-4 sm:col-span-2 md:col-span-2 lg:col-span-3 text-white">
                <p class="footer-ulTitle text-xl font-semibold ">Get Started</p>
                <ul>
                  <li class="footer-li text-xs">Dashboard</li>
                  <li class="footer-li text-xs">Create a ticket</li>
                  <li class="footer-li text-xs">Login</li>
                </ul>
              </div>
              <div className="col-span-4 sm:col-span-2 md:col-span-2 lg:col-span-3 text-white">
              <p class="text-xl font-semibold footer-ulTitle">About us</p>
                <ul>
                  <li class="footer-li text-xs">Contact us</li>
                  <li class="footer-li text-xs">About us</li>
                  <li class="footer-li text-xs">lorem epson</li>
                </ul>
              </div>
              <div className="col-span-4 sm:col-span-2 md:col-span-2 lg:col-span-3 text-white">
              <p class="text-xl font-semibold footer-ulTitle">Support</p>
              <ul>
                <li class="footer-li text-xs">FAQ</li>
                <li class="footer-li text-xs">HelpDesk</li>
                <li class="footer-li text-xs">Forms</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Footer;
