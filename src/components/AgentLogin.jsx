import React from "react";
import { Link } from "react-router-dom";

function AgentLogin() {
  return (
    <>
    <div class="main-background">
     <div class="p-4 container">
      <div className="grid md:grid-cols-12 gap-2">
        <div class="p-8 md:col-span-5 py-16 px-5 bg-gray rounded-md shadow-lg text-sm ">
          <form action="/" method="get">
          <label>Email</label>
            <div>
            <input type="text" name="name" id="user-email" placeholder="Enter Email" class="md:border-2"></input>
            </div>
            <br></br>
            <label>Password</label>
            <div>
            <input type="password" name="name" id="user-password" placeholder="Enter a Password " class="md:border-2"></input>
            </div>
            <br></br>
            <p> 
            <input type="checkbox" defaultChecked={false}/>  
             Keep me logged in</p>
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
export default AgentLogin;