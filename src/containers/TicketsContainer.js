import React, { useState, useContext } from 'react';
import ReactPaginate from 'react-paginate';
import Ticket from '../components/Ticket';
import { UserContext } from '../context/dbUserContext';

export default function TicketsContainer(props) {
  let { mysqlUser, mysqlUserTickets, allTickets, auth0UserMeta } = useContext(
    UserContext
  );

  // ! This one page renders both the Admin and non admin tickets.   This CHOSENTICKETS is used in a conditional to decide which version of the ticket to render by checking their admin status in context
  let chosenTickets = auth0UserMeta.isAdmin ? allTickets : mysqlUserTickets;

  // React paginate stuff...
  // I think adapted from this article --- https://medium.com/how-to-react/create-pagination-in-reactjs-e4326c1b9855
  //~ WK 5/4/2021
  const [currentPage, setCurrentPage] = useState(0);
  const PER_PAGE = 15;
  const offset = currentPage * PER_PAGE;
  const pageCount = Math.ceil(chosenTickets?.length / PER_PAGE);
  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }
  // Render nothing if we don't know which tickets to display
  if (!chosenTickets) {
    return null;
  }
  // ? NOTE: DON'T LOVE THIS IF ELSE;  PROBABLY COULD HAVE CONDITIONALLY RENDERED THE INDIVIDUAL PIECES INSTEAD OF REPLICATING THE WHOLE CONTAINER WITH A CLIENT OR ADMIN VERSION.  FOR NOW, BE SURE CLIENT AND ADMIN MAP PROPS ARE THE SAME AS NEEDED FOR ADJUSTMENTS;   ~WK 4-13-2021
  if (auth0UserMeta.isAdmin) {
    return (
      <div id="TicketsContainer" className="">
        {chosenTickets.slice(offset, offset + PER_PAGE).map((ticket, idx) => (
          <Ticket.Container key={ticket.id}>
            <Ticket
              id={ticket.id}
              tickets={mysqlUserTickets}
              status={ticket.status_id}
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
                files={ticket.files}
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
                files={ticket.files}
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

