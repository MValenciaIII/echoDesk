import { React } from 'react';
import { Link } from 'react-router-dom';
import Ticketcontainer from '../containers/TicketsContainer';
import InputTicketForm from '../components/TicketForm';

function Dashboard(props) {
  return (
    <>
      <div className="bg-gray-800 box-border py-4">
        <div className="border-4 border-blue-900 flex flex-col lg:flex-row">
          <div className="dashboard-mobilenav lg:hidden">
            <p className="text-center text-4xl pt-3">▼▼▼</p>
          </div>
          <div className="border-2 border-black  w-14 hidden lg:flex flex-column dashboard-nav ">
            <p>I am the icons for dash</p>
            {/*//! big dashboard and icons can go here  */}
          </div>
          <div className="md:w-full order-4 lg:order-none lg:w-2/3 ticketPanel p-2 h-full border-black border-4 mx-2">
            {/*//! render tickets here */}
            <h2 className="mx-auto my-2 text-lg text-center font-bold text-gray-100">
              Your Current Tickets
            </h2>
            <Ticketcontainer />
          </div>
          <div className="flex-grow order-2 md:order-none border-2 border-red-800">
            <InputTicketForm />
          </div>
        </div>
      </div>
    </>
  );
}
export default Dashboard;
