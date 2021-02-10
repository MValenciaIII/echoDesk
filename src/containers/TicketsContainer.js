import React, { useState } from 'react';
import fakeTickets from '../fakeTickets';
import Ticket from '../components/Ticket';

export default function TicketsContainer(props) {
  const [tickets, setTickets] = useState(fakeTickets);

  return (
    <div className="mx-auto ">
      {tickets.map((ticket, idx) => (
        <Ticket
          key={ticket.id}
          id={ticket.id}
          setTickets={setTickets}
          tickets={tickets}
        >
          <Ticket.Status status={ticket.status} priority={ticket.priority} />
          <Ticket.Description
            title={ticket.title}
            description={ticket.description}
          />
          <Ticket.AssignedTo assignedTo={ticket.assignedTo} />
          <Ticket.RaisedBy raisedBy={ticket.raisedBy} />
          <Ticket.Priority priority={ticket.priority} />
          <Ticket.Category category={ticket.category} />
          {/* <Ticket.DueIn dueIn={ticket.dueIn} /> */}
          <Ticket.ActivityLog>I'm the log</Ticket.ActivityLog>
        </Ticket>
      ))}
    </div>
  );
}
