import { React, useContext } from 'react';
import Ticketcontainer from '../containers/TicketsContainer';
import TicketFilter from '../containers/TicketFilter';
import InputTicketForm from '../components/TicketForm';
import { UserContext } from '../context/dbUserContext';
import Dashboard from '../components/DashBoard';

function DashboardContainer({ mysqlUser, ...restProps }) {
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
