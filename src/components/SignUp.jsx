import React from "react";
import { Link } from "react-router-dom";

function SignUp() {
  return (
    <>
    {/* <div class="main-background">
     <div class="p-4 container">
      <div className="grid md:grid-cols-12 gap-2">
        <div class="p-8 md:col-span-5 py-16 px-5 bg-gray rounded-md shadow-lg text-sm ">
          <h1>Sign Up for your Echo account</h1>
          <form action="/" method="get">
            <div>
            <label>Full Name*: </label>
            <input type="text" name="name" id="user-name"  class=" w-full sm:border-2 md:border-2 border-b-2"></input>
            </div>
            <label class="block mb-2">Email: </label>
            <input type="text" name="email" id="user-email" class="w-full md:border-2  border-b-2"></input>
            <br></br>
            <label class="block mb-2">Password:: </label>
            <input type="password" name="password" id="user-password" class="w-full md:border-2  border-b-2 "></input>
            <br></br>
            <input type="submit"  id="login-button"></input>
          </form>
       </div>
     </div>
    </div>
    </div> */}
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