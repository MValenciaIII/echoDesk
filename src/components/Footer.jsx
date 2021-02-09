import React from "react";
import { Link } from "react-router-dom";

function Footer(props) {
  return (
    <>
    <div class="footer-background bg-blue ">
        <div class="container ">
          <div className="grid grid-cols-6   ">
              <div className="col-start-2 col-span-1 text-white ">
                <p class="footer-logo text-2xl font-semibold">EchoDesk</p>
              </div>
              <div className="text-white">
                <p class="footer-ulTitle text-xl font-semibold ">Get Started</p>
                <ul>
                  <li class="footer-li text-xs">Dashboard</li>
                  <li class="footer-li text-xs">Create a ticket</li>
                  <li class="footer-li text-xs">Login</li>
                </ul>
              </div>
              <div className="text-white">
              <p class="text-xl font-semibold footer-ulTitle">About us</p>
                <ul>
                  <li class="footer-li text-xs">Contact us</li>
                  <li class="footer-li text-xs">About us</li>
                  <li class="footer-li text-xs">lorem epson</li>
                </ul>
              </div>
              <div className="text-white">
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
