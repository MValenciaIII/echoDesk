import React, { useState } from 'react';
// import { useAuth0 } from '@auth0/auth0-react';

import fakeTickets from '../fakeTickets';
import Ticket from '../components/Ticket';

export default function TicketsContainer(props) {
  const [tickets, setTickets] = useState(fakeTickets);
  // const { user } = useAuth0();

  function handleChange(id, prop, value) {
    let index = tickets.findIndex((ticket) => ticket.id === id);
    let newState = [...tickets];
    newState[index][prop] = value;
    setTickets(newState);
  }

  return (
    <div id="TicketsContainer" className="">
      {tickets.map((ticket, idx) => (
        <Ticket
          key={ticket.id}
          id={ticket.id}
          setTickets={setTickets}
          tickets={tickets}
          handleChange={handleChange}
        >
          <Ticket.Status status={ticket.status} priority={ticket.priority} />
          <Ticket.Description
            title={ticket.title}
            description={ticket.description}
            raisedBy={ticket.raisedBy}
            department={ticket.department}
            timeSubmitted={ticket.timeSubmitted}
            ticketNotes={ticket.updates}
          />
          <Ticket.AssignedTo assignedTo={ticket.assignedTo} />
          <Ticket.Location mainLocation={ticket.mainLocation} />

          <Ticket.Category
            category={ticket.category}
            subcategory={ticket.subcategory}
          />
          <Ticket.ContactInfo
            contactPhone={ticket.contactPhone}
            contactEmail={ticket.contactEmail}
            title={ticket.title}
          />

          <Ticket.ActivityLogContainer>
            {ticket.updates?.map((update) => (
              <Ticket.ActivityLogEntry
                key={ticket.id}
                user={update.user}
                message={update.message}
                timeStamp={update.timeStamp}
              />
            ))}
            <Ticket.InputNote />
          </Ticket.ActivityLogContainer>
        </Ticket>
      ))}
    </div>
  );
}
