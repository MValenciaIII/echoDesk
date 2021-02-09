import React from "react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <>
    <div class="main-background">
     <div class="p-4 container">
       <div className="grid md:grid-cols-12 gap-2">
        <div class="p-8 md:col-span-5 py-16 px-5 bg-gray rounded-md shadow-lg text-sm ">
          <h1>Login into EchoDesk support portal</h1>
          <form action="/" method="get">
            <div>
            <input type="text" name="name" id="user-login" placeholder="Enter Your Email Here " class="sm:border-2 md:border-2 "></input>
            </div>
            <input type="password" name="name" id="user-password" placeholder="Password " class="md:border-2"></input>
            <br></br>
            <p> 
            <input type="checkbox" defaultChecked={false}/>  
             Remember me on this device.</p>
            <Link>Forget your password? </Link>
            <input type="submit"  id="login-button"></input>
          </form>
        <div>
            <p class="p-4">Are you an ECHO agent? <Link to="/agent">Login Here</Link></p>
          </div>
         </div>
          <div class=" p-4 col-span-3 py-10 px-5 bg-gray rounded-md shadow-lg">
            <h1>SIGN UP</h1>
            <h2>NEED AN ACCOUNT?
              <Link class="md:border-2" to="/signup"> SIGN UP HERE</Link>
            </h2>
            <p>Signing in will give you complete access to our portal. Using this software will allow you to submit and track tickets.</p>
            <p class="p-4">..or SUBMIT A TICKET: <Link class= "md:border-2">NEW ECHO TICKET</Link></p>
          </div>
         </div>
       </div>
     </div>
    </>
  );
}

export default Login;
