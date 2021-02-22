import React from "react";
import {useForm} from "react-hook-form"
import { ErrorMessage } from "@hookform/error-message";
import { Link } from "react-router-dom";

function SignUp() {
  const { register, errors, handleSubmit } = useForm();
  const onSubmit = (data) => 
  fetch(`http://localhost:3000/login`)
  .then(resp => {
    // Navigate here, either:
    // use browser (not nice if SPA)
    alert("Thank you for signing up!")
    window.location = "http://localhost:3000/login";
    // use connected react router
    // implementation specific
    // e.g. this.props.push("/path");
  });
  return (
  <>
    <form className="bg-gray-800 p-4 mx-auto " onSubmit={handleSubmit(onSubmit)}>
      <div class="main-background">
       <div class="container">
          <h2 className=" col-span-5 text-center text-2xl font-bold mb-2 text-white">
               SIGN UP WITH ECHODESK
          </h2>
          <div className="grid md:grid-cols-12">
            <div class="sm:col-span-4 md:col-span-8  px-8 pt-6 pb-8 mb-4 flex flex-col bg-white shadow-md rounded"> 
              <div class="mb-4">
                  <label class="block text-grey-darker text-sm font-bold mb-2">
                      First Name
                  </label>
                  <input type="text" name="fname" ref={register({ required: true })} class="w-full py-2 px-3 shadow appearance-none border rounded text-grey-darker" placeholder="Enter First Name"/>
                   <ErrorMessage errors={errors} name="fname" message="First name is required" />
              </div>
              <div class="mb-4">
                  <label class="block text-grey-darker text-sm font-bold mb-2">
                      Last Name
                  </label>
                  <input type="text" name="lname" ref={register({ required: true })} class="w-full py-2 px-3 shadow appearance-none border rounded text-grey-darker" placeholder="Enter Last Name"/>
                  <ErrorMessage errors={errors} name="lname" message="Last Name is required" />
              </div>
              <div class="mb-4">
                  <label class="block text-grey-darker text-sm font-bold mb-2" for="username">
                    Email*: 
                  </label>
                  <input  type="text" name="Email"ref={register({ required: true })} class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" placeholder="Enter Your Email"/>
                  <ErrorMessage errors={errors} name="Email" message="Email is required" />
              </div>
              <div class="mb-6">
                    <label class="block text-grey-darker text-sm font-bold mb-2" for="password">
                      Password
                    </label>
                    <input  type="password" name="Password" ref={register({ required: true })} class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"  placeholder="******************"/>
                    <ErrorMessage errors={errors} name="Password" message="Password is  is required" />
              </div>
              <div>
                <input type="submit" class="py-2 px-4 rounded font-bold bg-blue hover:bg-blue-dark text-white" />
              </div>
            </div>
          </div>
         </div>
      </div>
    </form>
  </>
  );
  }
export default SignUp;
