import { React } from 'react';
import { Link } from 'react-router-dom';
import Ticketcontainer from '../containers/TicketsContainer';

function Dashboard(props) {
  return (
    <>
      <div className="dashboard-background box-border py-4">
        <div className="border-4 border-blue-900 flex flex-col lg:flex-row">
          <div className="dashboard-mobilenav md:hidden lg:hidden">
            <p className="text-center text-4xl pt-3">▼▼▼</p>
          </div>
          <div className="border-2 border-black flex flex-column w-14 invisible md:visible dashboard-nav ">
            <p>I am the icons for dash</p>
            {/*//! big dashboard and icons can go here  */}
          </div>
          <div className="ticketPanel lg:w-4/5 p-2 h-full border-black border-4">
            {/*//! render tickets here */}
            <h2 className="mx-auto my-2 text-lg text-center font-bold text-gray-100">
              Your Current Tickets
            </h2>
            <Ticketcontainer />
          </div>
          <div className="lg:w-1/5 border-2 border-red-800">
            <div className=" h-full border-black border-4">
              <div className="grid grid-rows-1">
                <div className="row-span-1">
                  <p className="text-right text-white text-2xl ">
                    Create a Ticket
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Dashboard;
