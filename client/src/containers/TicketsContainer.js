import React, { useState, useContext } from 'react';
// import { useAuth0 } from '@auth0/auth0-react';
import {
  priorityIDtoWord,
  serviceIDToWord,
  departmentIdToValue,
} from '../utils/sqlFormHelpers';

import fakeTickets from '../fakeTickets';
import Ticket from '../components/Ticket';

import { UserContext } from '../context/dbUserContext';

export default function TicketsContainer(props) {
  //   "id": 10,
  // "client_id": "6046476c0d9f710070ee8814",
  // "client_full_name": "George Washington",
  // "department_id": 3,
  // "location_id": 3,
  // "email": "president@email.com",
  // "client_phone_number": "888",
  // "subject": "George's Important Ticket",
  // "service_id": 1,
  // "service_details_id": 1,
  // "status_id": 1,
  // "priority_id": 4,
  // "description": "The country is at war with Britain;  Need reinforcements plz;",
  // "created_at": "2021-03-08T15:58:18.000Z",
  // "delete_at": "0000-00-00 00:00:00",
  // "updated_at": "2021-03-08T15:58:18.000Z",
  // "file_id": null

  // todo: ID'S NEEDING CONVERTING TO WORDS ON DISPLAY
  let { mysqlUser, mysqlUserTickets, setmysqlUserTickets } = useContext(
    UserContext
  );

  const [tickets, setTickets] = useState(fakeTickets);
  // const { user } = useAuth0();

  function handleChange(id, prop, value) {
    let index = tickets.findIndex((ticket) => ticket.id === id);
    let newState = [...tickets];
    newState[index][prop] = value;
    setTickets(newState);
  }

  // fakeTickets for when api is down;
  // mysqlUserTickets
  return (
    <div id="TicketsContainer" className="">
      {mysqlUserTickets.map((ticket, idx) => (
        <Ticket
          key={ticket.id}
          id={ticket.id}
          setTickets={setTickets}
          tickets={mysqlUserTickets}
          handleChange={handleChange}
        >
          <Ticket.Status
            status={ticket.status_id}
            priority={ticket.priority_id}
          />
          <Ticket.Description
            title={ticket.subject}
            description={ticket.description}
            raisedBy={ticket.client_full_name}
            department={ticket.department_id}
            timeSubmitted={ticket.created_at}
            ticketNotes={ticket.updates}
          />
          <Ticket.AssignedTo assignedTo={ticket.assignedTo} />
          <Ticket.Location mainLocation={ticket.location_id} />

          <Ticket.Category
            category={ticket.service_id}
            subcategory={ticket.service_details_id}
          />
          <Ticket.ContactInfo
            contactPhone={ticket.client_phone_number}
            contactEmail={ticket.email}
          />
          <Ticket.MakeChangesButtons />

          {/* <Ticket.ActivityLogContainer>
            {ticket.updates?.map((update) => (
              <Ticket.ActivityLogEntry
                key={ticket.id}
                user={update.user}
                message={update.message}
                timeStamp={update.timeStamp}
              />
            ))}
            <Ticket.InputNote />
          </Ticket.ActivityLogContainer> */}
        </Ticket>
      ))}
    </div>
  );
}
