import { React } from 'react';
import Ticketcontainer from '../containers/TicketsContainer';
import TicketFilter from '../containers/TicketFilter';
import Dashboard from '../components/DashBoard';

//called by agentHome.js PAGE;
function DashboardContainer(props) {
  return (
    <Dashboard>
      <Dashboard.InnerContainer>
        <Dashboard.TicketsContainer>
          <Ticketcontainer />
        </Dashboard.TicketsContainer>
        <Dashboard.FormContainer>
          <TicketFilter />
        </Dashboard.FormContainer>
      </Dashboard.InnerContainer>
    </Dashboard>
  );
}
export default DashboardContainer;
