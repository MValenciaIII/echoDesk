import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function Login() {
  const {
    loginWithPopup,
    loginWithRedirect,
    getAccessTokenWithPopup,
  } = useAuth0();

  const domain = 'memaechodesk.us.auth0.com';

  return (
    <div className="flex-grow bg-gray-800 text-center pt-4">
      <h1 className=" text-lg md:text-3xl text-gray-100">
        Please Log In To See Your Tickets or Input a Ticket
      </h1>
      <button
        className="ml-4 bg-gray-100 rounded px-4 py-2 text-3xl mt-4 inline-block"
        onClick={() => {
          loginWithRedirect();
        }}
      >
        Log in
      </button>
    </div>
    // <form
    //   className="bg-gray-800 p-4 w-full flex-grow flex place-items-center"
    //   onSubmit={handleSubmit(onSubmit)}
    // >
    //   {/* lg:mx-1 sm:mx-20 */}
    //   <div className="max-w-2xl mx-auto">
    //     <div class="px-8 pt-6 pb-8 flex flex-col bg-white shadow-md rounded ">
    //       <div class="mb-4">
    //         <label
    //           class="block text-grey-darker text-sm font-bold mb-2"
    //           for="username"
    //         >
    //           Username
    //         </label>
    //         <input
    //           ref={register({ required: true })}
    //           name="username"
    //           type="text"
    //           placeholder="Username"
    //           class="w-full py-2 px-3 shadow appearance-none border rounded text-grey-darker"
    //         />
    //         <ErrorMessage
    //           errors={errors}
    //           name="username"
    //           message="Username cannot be blank."
    //         />
    //       </div>
    //       <div class="mb-6">
    //         <label
    //           class="block text-sm font-bold mb-2 text-grey-darker"
    //           for="password"
    //         >
    //           Password
    //         </label>
    //         <input
    //           type="password"
    //           name="password"
    //           ref={register({ required: true })}
    //           class="shadow appearance-none border border-red rounded w-full py-2 px-3 mb-5 sm:mb-3 text-grey-darker"
    //           placeholder="******************"
    //         />
    //         <ErrorMessage
    //           errors={errors}
    //           name="password"
    //           message="Password must be entered."
    //         />
    //         <p>
    //           <input type="checkbox" defaultChecked={false} /> Remember me on
    //           this device.
    //         </p>
    //       </div>
    //       <div class="flex items-center justify-between flex-wrap">
    //         <input
    //           type="submit"
    //           class="py-2 px-4 rounded font-bold bg-blue hover:bg-blue-dark text-white"
    //         />
    //         <a
    //           class="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker"
    //           href="#"
    //         >
    //           Forgot Password?
    //         </a>
    //         <h2 className="  w-full text-center underline hover:text-blue-400 text-blue-500 mt-4">
    //           NEED AN ACCOUNT?
    //           <Link to="/signup"> SIGN UP </Link>
    //         </h2>
    //       </div>
    //     </div>
    //   </div>
    // </form>
  );
}
export default Login;
