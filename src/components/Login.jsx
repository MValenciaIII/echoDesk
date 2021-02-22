import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {useForm} from "react-hook-form"
import { ErrorMessage } from "@hookform/error-message";
import {WarningIcon} from "./Icons"

function Login() {
  const { register, errors, handleSubmit } = useForm();
  const onSubmit = (data) => 
  fetch(`http://localhost:3000/clientHome`)
  .then(resp => {
    // Navigate here, either:
    // use browser (not nice if SPA)
    alert("Welcome to Echo Desk")
    window.location = "http://localhost:3000/clientHome";
    // use connected react router
    // implementation specific
    // e.g. this.props.push("/path");
  });

  return (
      <form className="bg-gray-800 p-4 mx-auto " onSubmit={handleSubmit(onSubmit)}>
        <div class="main-background"> 
            <div className="grid grid-cols-1 sm:grid-cols-12 lg:mx-1 sm:mx-20 gap-2">
              <div class="col-span-5 md:col-span-5 sm:col-span-5 px-8 pt-6 pb-8 mb-4 flex flex-col bg-white shadow-md rounded">
                <div class="mb-4">
                  <label class="block text-grey-darker text-sm font-bold mb-2" for="username"> Username </label>
                  <input ref={register({ required: true })} name="username" type="text"placeholder="Username" class="w-full py-2 px-3 shadow appearance-none border rounded text-grey-darker" />
                  <ErrorMessage errors={errors} name="username" message="Username cannot be blank." />
                </div>
                <div class="mb-6">
                  <label class="block text-sm font-bold mb-2 text-grey-darker"for="password">Password</label>
                  <input type="password" name="password" ref={register({ required: true })} class="shadow appearance-none border border-red rounded w-full py-2 px-3 mb-5 sm:mb-3 text-grey-darker"  placeholder="******************"/>
                  <ErrorMessage errors={errors} name="password" message="Password must be entered." />
                  <p> <input  type="checkbox" defaultChecked={false} /> Remember me on this device.</p>
                </div>
                <div class="flex items-center justify-between">
                    <input type="submit" class="py-2 px-4 rounded font-bold bg-blue hover:bg-blue-dark text-white" />
                  <a class="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker"href="#" >Forgot Password?</a>
                </div>
                <div class="mb-6 visible md:invisible font-bold">
                  <h2> NEED AN ACCOUNT?
                  <Link class="hover:bg-blue-dark text-black" to="/signup"> SIGN UP </Link> </h2>
                </div>

              </div>
              <div class="col-span-4 md:col-span-4 sm:col-span-4 p-4 py-10 px-5 hidden sm:block flex flex-col pt-6 pb-8 mb-4 shadow-md rounded bg-white">
                <div class="mb-4">
                  <h1>SIGN UP</h1>
                </div>
                <div class="mb-6 font-bold">
                  <h2> NEED AN ACCOUNT?
                  <Link class="py-1 px-1 mx-1 hover:bg-blue-dark text-white font-bold rounded bg-blue" to="/signup"> SIGN UP </Link> </h2>
                </div>
                <div class="flex items-center justify-between">
                  <p>
                    Signing in will give you complete access to our portal. Using
                    this software will allow you to submit and track tickets.
                  </p>
                </div>
              </div>
            </div>
          </div>
      </form>
    </>
  );
}
export default Login;
