import { React } from 'react';

import Ticketcontainer from './TicketsContainer';
import InputTicketForm from '../containers/TicketFormContainer';
import Dashboard from '../components/DashBoard';

// reminder: containers props are coming from pages folder;  I.e. ClientHome would be the caller here;
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
