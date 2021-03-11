import { React, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Ticketcontainer from './TicketsContainer';
import InputTicketForm from '../components/TicketForm';
import { UserContext } from '../context/dbUserContext';
import Dashboard from '../components/DashBoard';

function DashboardContainer({ mysqlUser, ...restProps }) {
  return (
    <Dashboard>
      <Dashboard.InnerContainer>
        <Dashboard.TicketsContainer>
          <Dashboard.Header mysqlUser={mysqlUser} />
          <Ticketcontainer />
        </Dashboard.TicketsContainer>
        <Dashboard.FormContainer>
          <InputTicketForm />
        </Dashboard.FormContainer>
      </Dashboard.InnerContainer>
    </Dashboard>
  );
}
export default DashboardContainer;

// page
// Containers
// ticketsContainer
//Input Ticket Form
