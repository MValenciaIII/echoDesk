import React from "react";
import { Link } from "react-router-dom";

function Login() {
  return (
  <>
    <div class="main-background">
      <div class="container">
        <div className="grid md:grid-cols-12 gap-2">
          <div class="col-span-5 px-8 pt-6 pb-8 mb-4 flex flex-col bg-white shadow-md rounded">
            <div class="mb-4">
              <label class="block text-grey-darker text-sm font-bold mb-2" for="username">
                Username
              </label>
              <input class="w-full py-2 px-3 shadow appearance-none border rounded text-grey-darker" id="username" type="text" placeholder="Username"/>
           </div>
            <div class="mb-6">
              <label class="block text-sm font-bold mb-2 text-grey-darker" for="password">
                Password
              </label>
              <input class="shadow appearance-none border border-red rounded w-full py-2 px-3  mb-3text-grey-darker" id="password" type="password" placeholder="******************"/>
              <p> 
              <input type="checkbox" defaultChecked={false}/>  
              Remember me on this device.</p>
            </div>
            <div class="flex items-center justify-between">
              <button class="py-2 px-4 rounded font-bold bg-blue hover:bg-blue-dark text-white" type="button">
                <Link>Sign In</Link>
              </button>
              <a class="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker" href="#">
                Forgot Password?
              </a>
            </div>
          </div>
          <div class="col-span-3 p-4 py-10 px-5 hidden sm:block flex flex-col pt-6 pb-8 mb-4 shadow-md rounded bg-white">
              <div class="mb-4">
              <h1>SIGN UP</h1>
              </div>
              <div class="mb-6 font-bold">
              <h2>NEED AN ACCOUNT?
                <Link class="py-1 px-1 mx-1 hover:bg-blue-dark text-white font-bold rounded bg-blue" to="/signup">SIGN UP HERE</Link>
              </h2>
              </div>
              <div class="flex items-center justify-between">
              <p>Signing in will give you complete access to our portal. Using this software will allow you to submit and track tickets.</p>
              </div>
          </div>
        </div>
      </div>
    </div>
  </>
  );
}
export default Login;
