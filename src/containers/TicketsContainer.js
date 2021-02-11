import React, { useState, useReducer } from 'react';
import fakeTickets from '../fakeTickets';
import Ticket from '../components/Ticket';

export default function TicketsContainer(props) {
  const [tickets, setTickets] = useState(fakeTickets);

  function handleChange(id, prop, value) {
    let index = tickets.findIndex((ticket) => ticket.id === id);
    let newState = [...tickets];
    newState[index][prop] = value;
    setTickets(newState);
  }

  return (
    <div className="mx-auto ">
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
          />
          <Ticket.AssignedTo assignedTo={ticket.assignedTo} />
          <Ticket.Location mainLocation={ticket.mainLocation} />
          {/* <Ticket.RaisedBy raisedBy={ticket.raisedBy} />
          <Ticket.Priority priority={ticket.priority} /> */}
          <Ticket.Category
            category={ticket.category}
            subcategory={ticket.subcategory}
          />
          <Ticket.ContactInfo
            contactPhone={ticket.contactPhone}
            contactEmail={ticket.contactEmail}
            title={ticket.title}
          />
          {/* <Ticket.DueIn dueIn={ticket.dueIn} /> */}
          <Ticket.ActivityLogContainer>
            {ticket.updates?.map((update) => (
              <Ticket.ActivityLogEntry
                user={update.user}
                message={update.message}
                timeStamp={update.timeStamp}
              />
            ))}
          </Ticket.ActivityLogContainer>
        </Ticket>
      ))}
    </div>
  );
}
