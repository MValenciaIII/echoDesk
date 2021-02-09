import React from "react";
import { Link } from "react-router-dom";

function SignUp() {
  return (
    <>
    <div class="main-background">
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
            <input type="text" name="name" id="user-email" class="w-full md:border-2  border-b-2"></input>
            <br></br>
            <label class="block mb-2">Password: </label>
            <input type="password" name="name" id="user-password" class="w-full md:border-2  border-b-2 "></input>
            <br></br>
            <input type="submit"  id="login-button"></input>
          </form>
       </div>
     </div>
    </div>
    </div>
    </>
  );
}
export default SignUp;