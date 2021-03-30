import { React } from 'react';
import Ticketcontainer from './TicketsContainer';
import TicketFilter from './TicketFilter';
import Dashboard from '../components/DashBoard';

//called by agentHome.js PAGE;
function DashboardContainer(props) {
  return (
    <Dashboard>
      <Dashboard.InnerContainer>
        <Dashboard.TicketsContainer>
          <Dashboard.Header isAgent mysqlUser={props.mysqlUser} />
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
