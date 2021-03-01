import React from 'react';
import Loader from 'react-loader-spinner';

// npm details here:
// https://www.npmjs.com/package/react-loader-spinner
export default function LoaderIcon(props) {
  return (
    <div
      id="loader"
      className="min-h-screen w-max mx-auto flex flex-col content-center justify-center"
    >
      <Loader
        type="BallTriangle"
        color="#0d4aa1"
        height={150}
        width={150}
        timeout={16000} //3 secs
      />
    </div>
  );
}
