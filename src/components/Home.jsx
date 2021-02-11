import React from 'react';
import {Link} from "react-router-dom"
import TicketsContainer from '../containers/TicketsContainer.js';

function Home() {
  return (
    <>
      <h2>Home</h2>
      <TicketsContainer />
    </>
  );
}

export default Home;
