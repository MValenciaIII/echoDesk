import React, { useState } from 'react';
import fakeTickets from '../fakeTickets';
import Ticket from '../components/Ticket';

export default function TicketsContainer(props) {
  return (
    <div className="mx-auto ">
      {fakeTickets.map((ticket, idx) => (
        <Ticket key={ticket.id}>
          <Ticket.TopRow>
            <Ticket.Status status={ticket.status} />
            <Ticket.Description
              title={ticket.title}
              description={ticket.description}
            />
          </Ticket.TopRow>
          <Ticket.BottomRow>
            <Ticket.AssignedTo assignedTo={ticket.assignedTo} />
            <Ticket.RaisedBy raisedBy={ticket.raisedBy} />
            <Ticket.Priority priority={ticket.priority} />
            <Ticket.Category category={ticket.category} />
            <Ticket.DueIn dueIn={ticket.dueIn} />
          </Ticket.BottomRow>
          <Ticket.ActivityLog>I'm the log</Ticket.ActivityLog>
        </Ticket>
      ))}
    </div>
  );
}
