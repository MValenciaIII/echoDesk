import { React } from 'react';
import { Link } from 'react-router-dom';
import Ticketcontainer from '../containers/TicketsContainer';
import InputTicketForm from '../components/TicketForm';

function Dashboard(props) {
  return (
    <>
      <div className="bg-gray-800 box-border py-4">
        <div className="flex flex-col lg:flex-row">
          <div
            id="dashboardTicketsContainer"
            className="md:w-full order-4 lg:order-none lg:w-2/3 ticketPanel p-4 h-full lg:mx-2 "
          >
            {/*//! render tickets here */}
            <h2 className="mx-auto my-2 text-2xl font-bold mb-2 text-white text-center">
              Your Current Tickets
            </h2>
            <Ticketcontainer />
          </div>
          <div className="flex-grow order-2 md:order-none ">
            <InputTicketForm />
          </div>
        </div>
      </div>
    </>
  );
}
export default Dashboard;
