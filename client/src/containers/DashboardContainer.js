import { React } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Ticketcontainer from '../containers/TicketsContainer';
import InputTicketForm from '../components/TicketForm';

function Dashboard(props) {
  //todo: const { user } = useAuth0();
  // todo: get user referencing sub of user from auth0
  //   const userFromSQL = fetch(user.sub);

  const user = {
    firstName: 'Will',
    lastName: 'Kelly',
    department: 'InformationTechnology',
    location: 'Warehouse',
    phone: '555-555-5555',
  };

  return (
    // @% OUTER CONTAINER FOR BACKGROUND COLOR
    <div className="bg-gray-800 box-border py-4">
      {/* //@% INNER FLEX CONTAINER FOR TICKETS AND INPUT FORM */}
      <div className="flex flex-col lg:flex-row">
        {/* //@% HOLDS THE TICKETS */}
        <div
          id="dashboardTicketsContainer"
          className="md:w-full order-4 lg:order-none lg:w-2/3 ticketPanel p-4 h-full lg:mx-2 "
        >
          {/*//! render tickets here */}
          <h2 className="mx-auto my-2 text-2xl font-bold mb-2 text-white text-center">
            {user
              ? `Welcome ${user.firstName} ${user.lastName}.  Here are your tickets`
              : 'Welcome, here are your current tickets'}
          </h2>
          <Ticketcontainer />
        </div>
        <div className="flex-grow order-2 md:order-none ">
          <InputTicketForm />
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
