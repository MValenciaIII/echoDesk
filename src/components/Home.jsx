import React from "react";
import {Link} from "react-router-dom"
function Home() {
  return (
    <>
      <h2>Welcome!   
        <Link to="/login"> Login here</Link>
      </h2>
    </>
  );
}

export default Home;
