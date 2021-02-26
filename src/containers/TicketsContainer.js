import React, { useState, useReducer } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import fakeTickets from '../fakeTickets';
import Ticket from '../components/Ticket';

export default function TicketsContainer(props) {
  const [tickets, setTickets] = useState(fakeTickets);
  const { loginWithPopup, logout, user } = useAuth0();
  console.log({ user });
  console.log(user.metadata);

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
                key={ticket.id}
                user={update.user}
                message={update.message}
                timeStamp={update.timeStamp}
              />
            ))}
          </Ticket.ActivityLogContainer>
        </Ticket>
      ))}
      {/* //! test sectoin */}
      <div className="text-white">{JSON.stringify(user, null, 3)}</div>
    </div>
  );
}
