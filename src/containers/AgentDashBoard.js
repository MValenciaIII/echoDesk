import { React, useState } from 'react';
import Ticketcontainer from './TicketsContainer';
import TicketFilter from './TicketFilter';
import Dashboard from '../components/DashBoard';

//called by agentHome.js PAGE;
function DashboardContainer(props) {
  // State for page to determine whether to display quick filters or not
  let [showFilters, setShowFilters] = useState(true);

  return (
    <Dashboard>
      <Dashboard.InnerContainer>
        <Dashboard.TicketsContainer>
          <Dashboard.Header
            isAgent
            mysqlUser={props.mysqlUser}
            setShowFilters={setShowFilters}
            showFilters={showFilters}
          />
          <Dashboard.QuickFilters showFilters={showFilters} />
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
