import React from "react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <>
    <div class="login-background">
     <div class="container">
       <div className="grid md:grid-cols-12 gap-2">
        <div class="p-4 col-span-3 md:border-2 border-blue">
          <h1>Login into EchoDesk support portal</h1>
          <form action="" method="get">
            <input type="text" name="name" id="user-login" placeholder="Enter Your Email Here " class="sm:border-2 md:border-2 "></input>
            <br></br>
            <input type="text" name="name" id="user-password" placeholder="Password " class="md:border-2"></input>
            <br></br>
            <Link>Forget your password? </Link>
            <input type="submit" id="login-button"></input>
          </form>
            <p class="p-4">Are you an ECHO agent? <Link>Login Here</Link></p>
         </div>
          <div class=" p-4 col-span-3 md:border-2 border-blue">
            <h1>NEED AN ACCOUNT?
              <Link class="md:border-2"> SIGN UP HERE</Link>
            </h1>
            <p>Signing in will give you complete access to our portal. Using this software will allow you to submit and track tickets</p>
            <p>OR</p>
            <p>SUBMIT A TICKET: <Link class= "md:border-2">NEW ECHO TICKET</Link></p>
          </div>
         </div>
       </div>
     </div>
    </>
  );
}

export default Login;
