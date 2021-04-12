import React, { useState, useContext } from 'react';
// import { useAuth0 } from '@auth0/auth0-react';

// import fakeTickets from '../fakeTickets';
import ReactPaginate from 'react-paginate';
import Ticket from '../components/Ticket';

import { UserContext } from '../context/dbUserContext';

export default function TicketsContainer(props) {
  let {
    mysqlUser,
    mysqlUserTickets,
    auth0UserMeta,
    allTickets,
    isAdmin,
  } = useContext(UserContext);

  // todo: change to mysql isAdmin status to keep source of truth with our db instead of with auth0???;

  // debugger;
  let chosenTickets = isAdmin.admin ? allTickets : mysqlUserTickets;

  // React paginate
  const [currentPage, setCurrentPage] = useState(0);
  const PER_PAGE = 15;
  const offset = currentPage * PER_PAGE;
  const pageCount = Math.ceil(chosenTickets?.length / PER_PAGE);
  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }
  // fakeTickets for when api is down;
  // mysqlUserTickets
  if (!chosenTickets) {
    return null;
  }
  if (isAdmin?.admin) {
    return (
      <div id="TicketsContainer" className="">
        {chosenTickets.slice(offset, offset + PER_PAGE).map((ticket, idx) => (
          <Ticket.Container key={ticket.id}>
            <Ticket
              id={ticket.id}
              tickets={mysqlUserTickets}
              status={ticket.status_id}
              isAdmin={isAdmin}
            >
              <Ticket.AgentStatus
                status={ticket.status_id}
                priority={ticket.priority_id}
              />
              <Ticket.Description
                title={ticket.subject}
                description={ticket.description}
                raisedBy={ticket.client_full_name}
                department={ticket.department_id}
                timeSubmitted={ticket.created_at}
                ticketNotes={ticket.notes}
              />
              <Ticket.AgentAssignedTo agentAssignedTo={ticket.agent_id} />
              <Ticket.AgentLocation mainLocation={ticket.location_id} />

              <Ticket.Category
                category={ticket.service_id}
                subcategory={ticket.service_details_id}
              />
              <Ticket.ContactInfo
                contactPhone={ticket.client_phone_number}
                contactEmail={ticket.email}
                title={ticket.subject}
              />
            </Ticket>
            <Ticket.ActivityLogContainer>
              {ticket.notes?.map((note) => (
                <Ticket.ActivityLogEntry
                  key={note.id}
                  fname={note.fname}
                  lname={note.lname}
                  currentuserId={mysqlUser.id}
                  noteById={note.client_id}
                  message={note.note_text}
                  timestamp={note.created_at}
                />
              ))}
              <Ticket.InputNote
                ticket_id={ticket.id}
                client_id={mysqlUser.id}
                isAdmin={isAdmin}
              />
            </Ticket.ActivityLogContainer>
          </Ticket.Container>
        ))}
        {chosenTickets.length > PER_PAGE && (
          <ReactPaginate
            previousLabel={'← Previous'}
            nextLabel={'Next →'}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            pageRangeDisplayed={6}
            breakLabel={'...'}
            containerClassName={'pagination'}
            pageLinkClassName={'pagination__link'} //a tag in li
            activeLinkClassName={'pagination__link--active'} //active a tag
            disabledClassName={'pagination__link--disabled'} //disabled next or prev button
            previousLinkClassName={'pagination__word'} //previous li
            nextLinkClassName={'pagination__word'} //next li
            // activeClassName={'pagination__link--active'}
          />
        )}
      </div>
    );
  } else {
    return (
      <div id="TicketsContainer" className="">
        {chosenTickets.slice(offset, offset + PER_PAGE).map((ticket, idx) => (
          <Ticket.Container key={ticket.id}>
            <Ticket
              id={ticket.id}
              tickets={mysqlUserTickets}
              status={ticket.status_id}
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
                ticketNotes={ticket.notes}
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
            </Ticket>
            <Ticket.ActivityLogContainer>
              {ticket.notes?.map((note) => (
                <Ticket.ActivityLogEntry
                  key={note.id}
                  fname={note.fname}
                  lname={note.lname}
                  currentuserId={mysqlUser.id}
                  noteById={note.client_id}
                  message={note.note_text}
                  timestamp={note.created_at}
                />
              ))}
              <Ticket.InputNote
                ticket_id={ticket.id}
                client_id={mysqlUser.id}
                isAdmin={isAdmin}
              />
            </Ticket.ActivityLogContainer>
          </Ticket.Container>
        ))}
        {chosenTickets.length > PER_PAGE && (
          <ReactPaginate
            previousLabel={'← Previous'}
            nextLabel={'Next →'}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            pageRangeDisplayed={6}
            breakLabel={'...'}
            containerClassName={'pagination'}
            pageLinkClassName={'pagination__link'} //a tag in li
            activeLinkClassName={'pagination__link--active'} //active a tag
            disabledClassName={'pagination__link--disabled'} //disabled next or prev button
            previousLinkClassName={'pagination__word'} //previous li
            nextLinkClassName={'pagination__word'} //next li
            // activeClassName={'pagination__link--active'}
          />
        )}
      </div>
    );
  }
}

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
