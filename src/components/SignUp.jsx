import React from "react";
import { Link } from "react-router-dom";

function SignUp() {
  return (
  <>
    <div class="main-background">
      <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
        <div class="mb-4">
          <label class="block text-grey-darker text-sm font-bold mb-2" for="username">
            Full Name*: 
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="fullname" type="text" placeholder="Enter Full Name"/>
        </div>
        <div class="mb-4">
         <label class="block text-grey-darker text-sm font-bold mb-2" for="username">
           Email*: 
         </label>
         <input class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="email" type="text" placeholder="Enter Your Email"/>
        </div>
        <div class="mb-6">
          <label class="block text-grey-darker text-sm font-bold mb-2" for="password">
            Password
          </label>
          <input class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3" id="password" type="password" placeholder="******************"/>
        </div>
        <div class="flex items-center justify-between">
          <button class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded" type="button">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  </>
  );
}
export default SignUp;