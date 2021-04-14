import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../context/dbUserContext';
// import { TicketContext } from '../ticketContext.js';
import getTimeFxn from '../utils/timeConverter.js';
import {
  subServiceTypes,
  PrimaryServiceCategories,
  PriorityOptions,
  StatusOptions,
} from '../utils/ticketCategories';
import {
  departmentIdToValue,
  locationIdToWord,
  statusIdToWord,
  priorityIDtoWord,
  AssignToAgentSelect,
  TicketLocationsOptions,
} from '../utils/sqlFormHelpers';
import {
  UserIcon,
  LocationIcon,
  OfficeIcon,
  MailEnvelopeClosed,
  MailEnvelopeOpen,
  AttachmentPaperclipIcon,
} from './Icons';
import { updateTicketRoute, createNoteRoute } from '../constants/apiRoutes';

// @# Large file of compound components for anything on a ticket;  There are agent components and Client only components for ways their ticket might look a little different; The call stack here currently is that the TicketsContainer in containers folder is mapping over ticket data.  The top ticket here is using React Clone Element in order to pass some of its own props and state (namely form methods, editing state) for each ticket down into the individual components below;
//todo: maybe make a flexbox with flex grow version of this one day; Flex presents it's own challenges as well as grid, but might could make it look a bit nicer using flex grow that column widths;
export default function Ticket({
  children,
  id,
  activityLogShown,
  toggleActivityLog,
  status,
  isAdmin,
  ...restProps
}) {
  // ONLY THE TOP OF THE TICKET NEEDS THIS INFO
  const [isEditingTicket, setisEditingTicket] = useState(false);
  const { register, handleSubmit, watch, reset } = useForm();
  const { getDbUsersTickets } = useContext(UserContext);
  const { currentFilterQuery, setAllTickets, getAllTickets } = useContext(
    UserContext
  );

  function grayOutClosedOrResolvedTicket() {
    if (status === 3 || status === 4) {
      return 'closedTicket';
    }
  }

  async function onSubmit(data, event) {
    //todo: remove debugger later;
    debugger;

    event.preventDefault();
    data.id = id; //attaching ticket id to the request to update via id;

    let dataWithNullsRemoved = Object.fromEntries(
      Object.entries(data).filter(([item, val]) => val)
    );

    try {
      let response = await fetch(updateTicketRoute(id), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataWithNullsRemoved),
      });
      let result = await response.json();

      if (isAdmin?.admin && currentFilterQuery) {
        try {
          let filteredResponse = await fetch(currentFilterQuery);
          let filteredTickets = await filteredResponse.json();
          let filteredSorted = filteredTickets.sort((one, two) => {
            return two.id - one.id;
          });
          setAllTickets(filteredSorted);
        } catch (error) {
          console.error(error);
        }
      } else if (isAdmin?.admin) {
        await getAllTickets(); //i.e. no filter query currently set;
      } else {
        await getDbUsersTickets(); //for admin, will return all Tickets since getDbUsersTickets calls its own setter (setmysqlUserTickets) since the useEffect of fetchAllTickets is watching mysqlUserTickets;  The tickets container then decides to render user or all based on admin status
      }
    } catch (error) {
      console.error({ error });
    }
  }

  let childrenWithProps = React.Children.map(children, (child) => {
    return React.cloneElement(child, {
      id,
      activityLogShown,
      toggleActivityLog,
      isEditingTicket,
      setisEditingTicket,
      register: register,
      watch: watch,
      reset,
      handleSubmit,
    });
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onChange={handleSubmit(onSubmit)}
      className={`relative grid w-full grid-cols-12 truncate divide-y divide-gray-300 lg:divide-y-0 ${grayOutClosedOrResolvedTicket()}`}
    >
      {childrenWithProps}
    </form>
  );
}

Ticket.Container = function TicketContainer({ children, ...restprops }) {
  //The activity or notes log state will be accessed by the activity log form and by a ticket component below;  The state will be consumed to either display the log or hide, and to rotate an svg;
  const [activityLogShown, setActivityLogShown] = useState(false);
  function toggleActivityLog() {
    setActivityLogShown(!activityLogShown);
  }
  // mapping with clone Element again to pass along these additional props to children;
  let childrenWithProps = React.Children.map(children, (child) => {
    return React.cloneElement(child, {
      activityLogShown,
      toggleActivityLog,
    });
  });

  return (
    <div
      data-name="SingleTicketContainer" //for easier ID'ING in devtools instead of a long list of classnames; ~wk 3-15-2021
      className={`mt-4 overflow-hidden bg-gray-200 rounded-md shadow-md max-w-screen-2x`}
    >
      {childrenWithProps}
    </div>
  );
};

Ticket.Status = function TicketStatus({
  children,
  id,
  priority,
  tickets,
  setTickets,
  handleChange,
  status,
  register,
  handleSubmit,
  ...restProps
}) {
  let wordStatus = statusIdToWord(String(status));
  let [stylingStatus, setStylingStatus] = useState(wordStatus);

  let wordPriority = priorityIDtoWord(String(priority));
  let [stylingPriority, setstylingPriority] = useState(wordPriority);

  function statusClasses() {
    switch (stylingStatus) {
      case 'Open':
        return 'bg-blue-900 ';
      case 'Pending':
        return 'bg-green-700 ';
      case 'Resolved':
        return 'bg-gray-600 text-gray-200';
      case 'Closed':
        return 'bg-gray-600 text-gray-200';
      default:
        return;
    }
  }

  // COLORS DIV HOLDING PRIORITY SEMANTICALLY
  function priorityClasses(el) {
    let bgRed = 'bg-red-800';
    let bgBlue = 'bg-blue-800';
    let bgYellow = 'bg-yellow-800';
    let bgGreen = 'bg-green-800';

    if (wordStatus === 'Resolved' || wordStatus === 'Closed') {
      return 'bg-gray-600';
    } else
      switch (stylingPriority) {
        case 'Low':
          return `${bgGreen} `;
        case 'Medium':
          return `${bgBlue} `;
        case 'High':
          return `${bgYellow} `;
        case 'Urgent':
          return `${bgRed} `;
        default:
          return;
      }
  }

  return (
    <div
      className={`col-span-12 md:col-span-1 flex md:block relative text-xs w-full justify-self-stretch self-stretch h-full text-center`}
    >
      <div
        data-name="status-container"
        className={`${statusClasses()}  w-full md:h-1/2`}
      >
        <select
          ref={register}
          name="status_id"
          defaultValue={status}
          className={`bg-transparent inline-block align-middle text-white w-full font-bold h-full
        `}
          onChange={(event) =>
            setStylingStatus(statusIdToWord(event.target.value))
          }
        >
          <option value="1" className="bg-gray-800">
            Open
          </option>
          <option value="4" className="bg-gray-800">
            Closed
          </option>
        </select>
      </div>
      {/* //! PRIORITY */}
      <div
        name="PriorityContainer"
        className={`${priorityClasses()}  w-full md:h-1/2`}
      >
        <select
          className={`bg-transparent inline-block align-middle text-white w-full font-bold h-full`}
          name="priority_id"
          title="Priority"
          defaultValue={priority}
          ref={register}
          onChange={(event) =>
            setstylingPriority(priorityIDtoWord(event.target.value))
          }
        >
          <PriorityOptions classNames="bg-gray-700" />
        </select>
      </div>
    </div>
  );
};

Ticket.AgentStatus = function TicketAgentStatus({
  children,
  id,
  priority,
  tickets,
  setTickets,
  handleChange,
  status,
  register,
  handleSubmit,
  ...restProps
}) {
  // debugger;
  let wordStatus = statusIdToWord(String(status));
  let [stylingStatus, setStylingStatus] = useState(wordStatus);

  let wordPriority = priorityIDtoWord(String(priority));
  let [stylingPriority, setstylingPriority] = useState(wordPriority);

  function statusClasses() {
    switch (stylingStatus) {
      case 'Open':
        return 'bg-blue-900 ';
      case 'Pending':
        return 'bg-green-700 ';
      case 'Resolved':
        return 'bg-gray-600 text-gray-200 ';
      case 'Closed':
        return 'bg-gray-600 text-gray-200';
      default:
        return;
    }
  }

  // COLORS DIV HOLDING PRIORITY SEMANTICALLY
  function priorityClasses(el) {
    let bgRed = 'bg-red-800';
    let bgBlue = 'bg-blue-800';
    let bgYellow = 'bg-yellow-800';
    let bgGreen = 'bg-green-800';

    if (wordStatus === 'Resolved' || wordStatus === 'Closed') {
      return 'bg-gray-600';
    }
    switch (stylingPriority) {
      case 'Low':
        return `${bgGreen} `;
      case 'Medium':
        return `${bgBlue} `;
      case 'High':
        return `${bgYellow} `;
      case 'Urgent':
        return `${bgRed} `;
      default:
        return;
    }
  }

  return (
    <div
      className={`col-span-12 md:col-span-1 flex md:block relative text-xs w-full justify-self-stretch self-stretch h-full text-center`}
    >
      <div
        data-name="status-container"
        className={`${statusClasses()}  w-full md:h-1/2`}
      >
        <select
          ref={register}
          name="status_id"
          defaultValue={status}
          className={`bg-transparent inline-block align-middle text-white w-full font-bold h-full
         `}
          onChange={(event) =>
            setStylingStatus(statusIdToWord(event.target.value))
          }
          // onChange={handleSubmit}
        >
          <StatusOptions classNames="bg-gray-700" />
        </select>
      </div>

      {/* //! PRIORITY */}
      <div
        name="PriorityContainer"
        className={`${priorityClasses()}  w-full md:h-1/2`}
      >
        <select
          ref={register}
          className={`bg-transparent inline-block align-middle text-white w-full font-bold h-full`}
          name="priority_id"
          title="Priority"
          defaultValue={priority}
          onChange={(event) =>
            setstylingPriority(priorityIDtoWord(event.target.value))
          }
        >
          <PriorityOptions classNames="bg-gray-700" />
        </select>
      </div>
    </div>
  );
};

Ticket.Description = function TicketDescription({
  children,
  title,
  description,
  department,
  activityLogShown,
  raisedBy,
  timeSubmitted,
  ticketNotes,
  toggleActivityLog,
  files,
  ...restProps
}) {
  let wordDepartment = departmentIdToValue(String(department));

  function showFilesIfPresent() {
    if (files.length) {
      let mapped = files.map((file) => {
        return <Ticket.FileAttachment key={file.id} file={file} />;
      });
      return (
        <>
          <AttachmentPaperclipIcon classNames="w-6 p-1 text-blue stroke-current" />
          <span>({files.length}) </span>
          {mapped}
        </>
      );
    }
  }

  return (
    <div
      data-name="TicketTitleContainer"
      className="flex-grow col-span-12 p-1 bg-gray-100 border border-red-500 md:col-span-11"
    >
      <h2 className="inline-block font-bold text-black text-md">{title}</h2>

      <h3 className="w-11/12 text-xs text-gray-600 break-words whitespace-normal md:text-sm md:w-5/6">
        {description}
      </h3>
      <p
        name="metaTicketInfo"
        className="mt-1 text-xs break-words whitespace-normal sm:mt-auto md:text-sm sm:w-auto"
      >
        By
        <span className="font-bold">{` ${raisedBy} `} </span>
        <span className="text-xs font-light"> ({wordDepartment}) </span>
        on
        <span className="text-xs font-light">{` (${getTimeFxn(
          timeSubmitted
        )}) `}</span>
        <span className="inline-block text-xs ml1">
          (Click to view or manage notes below) (
          {ticketNotes && ticketNotes.length ? ticketNotes.length : '0'})
        </span>
        {/*// todo: relocate this icon to a different place ?? */}
        {activityLogShown ? (
          <MailEnvelopeOpen
            classNames={'text-blue  stroke-current w-8 p-1'}
            onClick={toggleActivityLog}
          />
        ) : (
          <MailEnvelopeClosed
            classNames={'text-blue  stroke-current w-8 p-1'}
            onClick={toggleActivityLog}
          />
        )}
        {showFilesIfPresent()}
      </p>
    </div>
  );
};

Ticket.FileAttachment = function TicketFileAttachment({ file }) {
  return (
    <a
      className={
        'text-decoration-none text-blue-800 hover:text-blue-400 text-xs'
      }
      rel="noreferrer"
      target="_blank"
      href={file.file_name}
    >
      Attachment {file.id}
    </a>
  );
};

//todo: maybe make a modal for seeing file images; Right now it'd be better off as a portal since it needs to live above the dom tree it's in; (hence absolute center class there; There would also be some state in opening the modal that I don't want to muck up this file with at the moment  4-13-2021   ~WK)
// Ticket.FileModal = function TicketFileModal({ file }) {
//   return (
//     <div className="z-10 w-32 h-20 absolute-center">
//       <button>Close Modal X</button>
//       <img className="max-w-full" src={file.file_name} alt="file.file_name" />
//     </div>
//   );
// };

Ticket.AgentAssignedTo = function TicketAgentAssignedTo({
  children,
  handleChange,
  id,
  status,
  register,
  agentAssignedTo,
  ...restProps
}) {
  // debugger;
  return (
    <div
      data-id="agentAssignedTo"
      className="col-span-6 text-xs bg-gray-200 md:text-center md:col-span-3 lg:col-span-3 xl:col-span-2"
    >
      <label className="mx-auto text-center w-max">
        <UserIcon />
        <select
          ref={register}
          name="agent_id"
          defaultValue={String(agentAssignedTo)}
          className={`inline-block w-max p-2 mx-auto mt-1  text-white bg-gray-700
         `}
          // onChange={(event) => }
        >
          {/* //todo:   use latest select options */}
          {<AssignToAgentSelect />}
        </select>
      </label>
    </div>
  );
};

Ticket.AssignedTo = function TicketAssignedTo({
  children,
  assignedTo,
  handleChange,
  id,
  ...restProps
}) {
  return (
    <div className="col-span-6 text-xs bg-gray-200 md:text-center md:col-span-3 lg:col-span-3 xl:col-span-2">
      <span className="inline-block mr-px ">
        Assigned To: <br /> {assignedTo || 'Not Yet Assigned'}
      </span>
    </div>
  );
};

Ticket.Location = function TicketLocation({
  children,
  mainLocation,
  office,
  ...restProps
}) {
  return (
    <div className="col-span-6 text-xs bg-gray-200 md:text-center md:col-span-3 lg:col-span-4 xl:col-span-2 md:text-sm ">
      <span className="inline-block mr-px text-center">
        <LocationIcon /> {locationIdToWord(String(mainLocation))}
      </span>
    </div>
  );
};

Ticket.AgentLocation = function TicketAgentLocation({
  children,
  mainLocation,
  office,
  register,
  ...restProps
}) {
  return (
    <div
      data-id="agentLocation"
      className="col-span-6 text-xs bg-gray-200 md:text-center md:col-span-3 lg:col-span-4 xl:col-span-3"
    >
      <label className="mx-auto mr-px text-center w-max">
        <span className="sr-only">Location</span>
        <LocationIcon />
        <select
          ref={register}
          name="location_id"
          defaultValue={mainLocation}
          className={`inline-block w-max p-2 mx-auto mt-1  text-white bg-gray-700`}
        >
          {TicketLocationsOptions()}
        </select>
      </label>
    </div>
  );
};

Ticket.Category = function TicketCategory({
  children,
  id,
  category,
  subcategory,
  watch,
  register,
  ...restProps
}) {
  // todo:change to form and watch values using technique on ticket input;
  // debugger;
  return (
    <div
      data-id="ticketCategory"
      className="flex flex-wrap content-start col-span-12 text-xs text-center lg:col-span-5 md:flex-row md:col-span-6 lg: 2xl:col-span-3"
    >
      <label htmlFor="service_id" className="w-full text-center sr-only">
        Category:
      </label>
      <OfficeIcon />
      <select
        ref={register}
        className="inline-block p-1 mt-1 mr-px text-xs text-white bg-gray-700 w-28 "
        name="service_id"
        defaultValue={category}
      >
        <PrimaryServiceCategories />
      </select>
      {/* //! SUBCATEGORY DIVIDER */}
      <label htmlFor="service_details_id" className="sr-only">
        Subservice Type
      </label>
      <select
        ref={register}
        className="inline-block p-1 mt-1 mr-px text-xs text-white bg-gray-700 w-max"
        name="service_details_id"
        defaultValue={subcategory}
      >
        {/* //@ REACT HOOK FORM IS PUTTING IN OTHER OPTIONS VIA UTIL PLUS WATCH */}
        {subServiceTypes(String(category))}
      </select>
    </div>
  );
};

Ticket.ContactInfo = function TicketContactInfo({
  children,
  contactPhone,
  contactEmail,
  dueIn,
  title,
  ...restProps
}) {
  return (
    <div className="col-span-6 p-2 md:flex md:col-span-2 lg:col-span-3 xl:col-span-3 lg:text-sm">
      <p className="ml-2">
        Phone:{' '}
        <a className="text-blue-500 underline " href={`tel:${contactPhone}`}>
          {contactPhone}
        </a>
      </p>
      <p className="ml-2">
        Email:{' '}
        <a
          className="text-blue-500 underline "
          href={`mailto:${contactEmail}?subject=Your Echodesk Ticket:${title}`}
        >
          {contactEmail}
        </a>
      </p>
    </div>
  );
};

Ticket.DueIn = function TicketDueIn({ children, dueIn, ...restProps }) {
  return (
    <div className="flex-grow w-1/3 p-2 md:w-auto md:border-0 md:text-lg lg:text-2xl xl:text-3xl">
      <h3>Due in:</h3>
      <h4>{dueIn}</h4>
    </div>
  );
};

// Ticket.MakeChangesButtons = function SubmitChangesButton({
//   isEditingTicket,
//   setisEditingTicket,
//   reset,
//   ...restProps
// }) {
//   if (isEditingTicket) {
//     return (
//       <div className="absolute bottom-0 right-0 flex flex-col border-none md:top-0">
//         <button
//           type="submit"
//           className="block px-2 py-1 text-xs bg-gray-300 border-none hover:bg-green-900 hover:text-white"
//         >
//           Submit Changes
//         </button>
//         <button
//           type="button"
//           className="block px-2 py-1 text-xs text-red-700 bg-gray-300 border-none hover:bg-red-900 hover:text-white"
//           onClick={(event) => {
//             reset();
//             setisEditingTicket(false);
//           }}
//         >
//           Cancel Changes
//         </button>
//       </div>
//     );
//   } else {
//     return null;
//   }
// };

Ticket.ActivityLogContainer = function ActivityLogContainer({
  children,
  activityLogShown,
  ...restProps
}) {
  if (activityLogShown) {
    return (
      <div className="p-4 transition-all duration-200 ease-in-out bg-gray-400 rounded-md col-span-full">
        {children}
      </div>
    );
  } else {
    return (
      <div className="h-0 p-0 duration-200 transform pointer-events-none ">
        {children}
      </div>
    );
  }
};

Ticket.ActivityLogEntry = function ActivityLogEntry({
  children,
  activityLogShown,
  fname,
  lname,
  currentuserId,
  noteById,
  message,
  timestamp,
  ...restProps
}) {
  function alignSide() {
    if (currentuserId === noteById) {
      return 'text-right';
    }
  }
  function whoSaidit() {
    if (currentuserId === noteById) {
      return 'You';
    } else {
      return `${fname} ${lname}`;
    }
  }
  return (
    <p className={`mb-1 ${alignSide()} shadow-sm p-1 m-1`}>
      <span className="text-base font-bold text-black">{whoSaidit()} </span>
      said:
      <span className="text-gray-900"> {message} </span>
      <span className="text-xs text-gray-600">
        ( {getTimeFxn(timestamp)} ){' '}
      </span>
    </p>
  );
};

Ticket.InputNote = function InputNote({
  children,
  ticket_id,
  client_id,
  isAdmin,
  ...restProps
}) {
  const { register, handleSubmit, reset } = useForm();
  const {
    getDbUsersTickets,
    currentFilterQuery,
    setAllTickets,
    getAllTickets,
  } = useContext(UserContext);

  async function onSubmit(data, event) {
    // todo: remove debugger;
    // debugger;
    event.preventDefault();

    if (!data.note_text) {
      return;
    }
    data.ticket_id = ticket_id;
    data.client_id = client_id;
    // PATCHING EXISTING TICKETS

    try {
      let response = await fetch(createNoteRoute, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      let result = await response.json();

      //reseting the textArea
      reset();
      if (isAdmin?.admin && currentFilterQuery) {
        try {
          let filteredResponse = await fetch(currentFilterQuery);
          let filteredTickets = await filteredResponse.json();
          let filteredSorted = filteredTickets.sort((one, two) => {
            return two.id - one.id;
          });
          setAllTickets(filteredSorted);
        } catch (error) {
          console.error(error);
        }
      } else if (isAdmin?.admin) {
        await getAllTickets(); //i.e. no filter query currently set;
      } else {
        await getDbUsersTickets(); //for admin, will return all Tickets since getDbUsersTickets calls its own setter (setmysqlUserTickets) since the useEffect of fetchAllTickets is watching mysqlUserTickets;  The tickets container then decides to render user or all based on admin status
      }
    } catch (error) {
      console.error({ error });
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full p-2 mx-auto mt-1 bg-gray-200 rounded-md shadow-lg md:w-4/5 lg:w-3/5"
    >
      <textarea
        name="note_text"
        ref={register}
        cols="25"
        rows="2"
        className="w-full p-2 text-sm "
        placeholder="leave a note here"
      ></textarea>
      <button className="block px-2 py-1 mx-auto text-sm text-white rounded-md bg-blue hover:bg-green-900">
        Submit Note
      </button>
    </form>
  );
};
