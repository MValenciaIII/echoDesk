import React from "react";
import {useForm} from "react-hook-form"
import { Link } from "react-router-dom";

function SignUp() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(JSON.stringify(data));
  return (
  <>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div class="mb-4">
          <label class="block text-grey-darker text-sm font-bold mb-2">
              Full Name
          </label>
          <input type="text" name="Full Name" ref={register} class="w-full py-2 px-3 shadow appearance-none border rounded text-grey-darker" placeholder="Full Name"/>
      </div>
      <div class="mb-4">
          <label class="block text-grey-darker text-sm font-bold mb-2" for="username">
            Email*: 
          </label>
          <input  type="text" name="Email" ref={register} class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" placeholder="Enter Your Email"/>
      </div>
      <div class="mb-6">
            <label class="block text-grey-darker text-sm font-bold mb-2" for="password">
              Password
            </label>
            <input  type="password" name="Password" ref={register} class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"  placeholder="******************"/>
      </div>
      <div>
          <Link to="/login" >
          <input type="submit" class="py-2 px-4 rounded font-bold bg-blue hover:bg-blue-dark text-white" />
          </Link>  
      </div>
    </form>
  </>
  );
  }
export default SignUp;

{/* <div class="main-background">
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
      </div>
    </div> */}