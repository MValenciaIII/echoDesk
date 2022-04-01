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
  AssignApprovalBereau
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
import { data } from 'autoprefixer';

// @# Large file of compound components for anything on a ticket;  There are agent components and Client only components for ways their ticket might look a little different; The call stack here currently is that the TicketsContainer in containers folder is mapping over ticket data.  The top ticket here is using React Clone Element in order to pass some of its own props and state (namely form methods, editing state) for each ticket down into the individual components below;

export default function Ticket({
  children,
  id,
  activityLogShown,
  toggleActivityLog,
  status,
  ...restProps
}) {
  // ONLY THE TOP OF THE TICKET NEEDS THIS INFO
  const { register, handleSubmit, watch, reset } = useForm();
  const { getDbUsersTickets } = useContext(UserContext);
  const {
    currentFilterQuery,
    setAllTickets,
    getAllTickets,
    auth0UserMeta,
  } = useContext(UserContext);

  function grayOutClosedOrResolvedTicket() {
    if (status === 3 || status === 4) {
      return 'closedTicket';
    } else {
      return '';
    }
  }

  async function onSubmit(data, event) {
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

      if (auth0UserMeta.isAdmin && currentFilterQuery) {
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
      } else if (auth0UserMeta.isAdmin) {
        await getAllTickets(); //i.e. no filter query currently set;
      } else {
        await getDbUsersTickets(); //for admin, will return all Tickets since getDbUsersTickets calls its own setter (setmysqlUserTickets) since the useEffect of fetchAllTickets is watching mysqlUserTickets;  The tickets container then decides to render user or all based on admin status
      }
    } catch (error) {
      console.error({ error });
    }
  }

  // THE COMPONENT RENDERS ITS CHILDREN, BUT THERE IS SOME STATE TO KEPT AT THIS LEVEL (IE NOT THE CONTAINER LEVEL) AND I PREFERRED TO PASS THOSE PROPS TO CHILDREN VIA MAP INSTEAD OF RENDER PROP
  let childrenWithProps = React.Children.map(children, (child) => {
    return React.cloneElement(child, {
      id,
      activityLogShown,
      toggleActivityLog,
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
      className={`relative grid w-full grid-cols-12 truncate divide-y divide-gray-300 lg:divide-y-0 items-center ${grayOutClosedOrResolvedTicket()}`}
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
      className={`mt-4 overflow-hidden bg-light-base rounded-md shadow-md max-w-screen-2x`}
    >
      {childrenWithProps}
    </div>
  );
};

Ticket.Status = function TicketStatus({
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
        return 'bg-medium ';
      case 'Pending':
        return 'bg-pending';
      case 'Resolved':
        return 'bg-gray-600 text-text-muted';
      case 'Closed':
        return 'bg-gray-600 text-text-muted';
      default:
        return;
    }
  }

  // COLORS DIV HOLDING PRIORITY SEMANTICALLY
  function priorityClasses(el) {
    let bgRed = 'bg-urgent';
    let bgBlue = 'bg-medium';
    let bgYellow = 'bg-high';
    let bgGreen = 'bg-low';

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
          className={`bg-transparent inline-block align-middle text-text-base w-full font-bold h-full rounded-lg
        `}
          onChange={(event) =>
            setStylingStatus(statusIdToWord(event.target.value))
          }
        >
          <option value="1" className="bg-base">
            Open
          </option>
          <option value="4" className="bg-base">
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
          className={`bg-transparent inline-block align-middle text-text-base w-full font-bold h-full  rounded-lg`}
          name="priority_id"
          title="Priority"
          defaultValue={priority}
          ref={register}
          onChange={(event) =>
            setstylingPriority(priorityIDtoWord(event.target.value))
          }
        >
          <PriorityOptions classNames="bg-off-base" />
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
  // ;
  let wordStatus = statusIdToWord(String(status));
  let [stylingStatus, setStylingStatus] = useState(wordStatus);

  let wordPriority = priorityIDtoWord(String(priority));
  let [stylingPriority, setstylingPriority] = useState(wordPriority);

  function statusClasses() {
    switch (stylingStatus) {
      case 'Open':
        return 'bg-medium ';
      case 'Pending':
        return 'bg-pending ';
      case 'Resolved':
        return 'bg-gray-600 text-text-muted ';
      case 'Closed':
        return 'bg-gray-600 text-text-muted ';
      default:
        return;
    }
  }

  // COLORS DIV HOLDING PRIORITY SEMANTICALLY
  function priorityClasses(el) {
    let bgRed = 'bg-urgent';
    let bgBlue = 'bg-medium';
    let bgYellow = 'bg-high';
    let bgGreen = 'bg-low';

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
          className={`bg-transparent inline-block align-middle text-text-base w-full font-bold h-full  rounded-lg
         `}
          onChange={(event) =>
            setStylingStatus(statusIdToWord(event.target.value))
          }
          // onChange={handleSubmit}
        >
          <StatusOptions classNames="bg-off-base" />
        </select>
      </div>

      {/* //! PRIORITY */}
      <div
        name="PriorityContainer"
        className={`${priorityClasses()}  w-full md:h-1/2`}
      >
        <select
          ref={register}
          className={`bg-transparent inline-block align-middle text-text-base w-full font-bold h-full  rounded-lg`}
          name="priority_id"
          title="Priority"
          defaultValue={priority}
          onChange={(event) =>
            setstylingPriority(priorityIDtoWord(event.target.value))
          }
        >
          <PriorityOptions classNames="bg-off-base" />
        </select>
      </div>
    </div>
  );
};

Ticket.Description = function TicketDescription({
  id,
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
      let mapped = files.map((file, idx) => {
        return <Ticket.FileAttachment key={file.id} file={file} idx={idx} />;
      });
      return (
        <>
          <AttachmentPaperclipIcon classNames="w-6 p-1 text-text-base-inverted stroke-current" />
          <span>({files.length}) </span>
          {mapped}
        </>
      );
    }
  }

  return (
    <div
      data-name="TicketTitleContainer"
      className="flex-grow col-span-12 p-1 border border-red-500 bg-light-base md:col-span-11"
    >
      <h2 className="inline-block font-bold text-text-base-inverted text-md">
        #{id}-{title}
      </h2>


      <h3 className="w-11/12 text-xs break-words whitespace-normal text-text-base-inverted-muted md:text-sm md:w-5/6">
        {description}
      </h3>
      <p
        name="metaTicketInfo"
        className="mt-1 text-xs break-words whitespace-normal sm:mt-auto sm:w-auto md:text-sm"
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
        {activityLogShown ? (
          <MailEnvelopeOpen
            classNames={'text-text-base-inverted  stroke-current w-8 p-1'}
            onClick={toggleActivityLog}
          />
        ) : (
          <MailEnvelopeClosed
            classNames={'text-text-base-inverted  stroke-current w-8 p-1'}
            onClick={toggleActivityLog}
          />
        )}
        {showFilesIfPresent()}
      </p>
    </div>
  );
};

Ticket.FileAttachment = function TicketFileAttachment({ file, idx }) {
  return (
    <a
      className={`text-decoration-none text-blue-800 hover:text-blue-400 text-xs inline-block ${
        idx > 0 ? 'ml-1' : ''
      }`}
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
  // ;
  return (
    <div
      data-id="agentAssignedTo"
      className="col-span-6 text-xs bg-light-base md:text-center md:col-span-3 lg:col-span-3 xl:col-span-2"
    >
      <label className="mx-auto text-center w-max">
        <UserIcon />
        <select
          ref={register}
          name="agent_id"
          defaultValue={String(agentAssignedTo)}
          className={`inline-block w-max p-2 mx-auto mt-1  text-text-base bg-off-base rounded-lg
         `}
          // onChange={(event) => }
        >
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
    <span className="inline-block col-span-6 p-1 m-2 text-xs text-center rounded-lg bg-off-base text-text-base md:col-span-3 lg:col-span-3 xl:col-span-2">
      Assigned To: <br /> {assignedTo || 'Not Yet Assigned'}
    </span>
  );
};

Ticket.Location = function TicketLocation({
  children,
  mainLocation,
  office,
  ...restProps
}) {
  return (
    <span className="inline-block col-span-6 m-2 text-xs text-center rounded-lg bg-off-base text-text-base md:col-span-3 lg:col-span-4 xl:col-span-2">
      <LocationIcon /> {locationIdToWord(String(mainLocation))}
    </span>
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
      className="col-span-6 text-xs md:text-center md:col-span-3 lg:col-span-4 xl:col-span-3"
    >
      <label className="mx-auto mr-px text-center w-max">
        <span className="sr-only">Location</span>
        <LocationIcon />
        <select
          ref={register}
          name="location_id"
          defaultValue={mainLocation}
          className={`inline-block w-max p-2 mx-auto mt-1  text-text-base bg-off-base  rounded-lg`}
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
  return (
    <div
      data-id="ticketCategory"
      className="flex flex-wrap content-start col-span-12 text-xs text-center md:flex-row md:col-span-6 lg:col-span-5 lg: 2xl:col-span-3"
    >
      <label htmlFor="service_id" className="w-full text-center sr-only">
        Category:
      </label>
      <OfficeIcon />
      <select
        ref={register}
        className="inline-block p-1 mt-1 mr-px text-xs rounded-lg bg-off-base text-text-base w-28"
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
        className="inline-block p-1 mt-1 mr-px text-xs rounded-lg bg-off-base text-text-base w-max"
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
    <div className="col-span-6 p-2 md:flex md:col-span-2 lg:text-sm lg:col-span-3 xl:col-span-3">
      <p className="ml-2">
        Mobile Phone:{' '}
        <a className="text-blue-500 underline" href={`tel:${contactPhone}`}>
          {contactPhone}
        </a>
      </p>
      <p className="ml-2">
        Email:{' '}
        <a
          className="text-blue-500 underline"
          href={`mailto:${contactEmail}?subject=Your Echodesk Ticket:${title}`}
        >
          {contactEmail}
        </a>
      </p>
    </div>
  );
};

function approvalBoxShow() {
  
}  

Ticket.ApprovalInfo = function TicketApprovalInfo({
children,
handleChange,
id,
status,
register,
ifapproved,
approveBureau,
...restprops
}) { return (
  <div className="col-span-6 p-2">
    <input className="ml-2 inline-block" type="checkbox" name="Approval" id="approve" value={ifapproved || 0}  onChange={approvalBoxShow} />
    <p className="ml-2 inline-block" >Needs Approval</p>
    <select name="MitsDir" id="mitsApprove"></select>
    <select name="Cio" id="cioApprove"></select>

    <label className="mx-auto text-center w-max">
        <UserIcon />
        <select
          ref={register}
          name="BureauDirs"
          defaultValue={String(approveBureau)}
          className={`inline-block w-max p-2 mx-auto mt-1  text-text-base bg-off-base rounded-lg
         `}
          // onChange={(event) => }
        >
          {<AssignApprovalBereau />}
        </select>
      </label>
  </div>
)
};

Ticket.DueIn = function TicketDueIn({ children, dueIn, ...restProps }) {
  return (
    <div className="flex-grow w-1/3 p-2 md:border-0 md:text-lg md:w-auto lg:text-2xl xl:text-3xl">
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
//           className="block px-2 py-1 text-xs bg-gray-300 border-none hover:bg-green-900 hover:text-text-base"
//         >
//           Submit Changes
//         </button>
//         <button
//           type="button"
//           className="block px-2 py-1 text-xs text-red-700 bg-gray-300 border-none hover:bg-red-900 hover:text-text-base"
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
      <div className="p-4 transition-all duration-200 ease-in-out rounded-md bg-off-base-lighter col-span-full">
        {children}
      </div>
    );
  } else {
    return (
      <div className="h-0 p-0 duration-200 transform pointer-events-none">
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
    <p className={`mb-1 ${alignSide()} text-text-base shadow-sm p-1 m-1`}>
      <span className="font-bold text-text-base">{whoSaidit()} </span>
      said:
      <span className="text-text-muted"> {message} </span>
      <span className="text-xs text-text-muted">
        ( {getTimeFxn(timestamp)} ){' '}
      </span>
    </p>
  );
};

Ticket.InputNote = function InputNote({
  children,
  ticket_id,
  client_id,
  ...restProps
}) {
  const { register, handleSubmit, reset } = useForm();
  const {
    getDbUsersTickets,
    currentFilterQuery,
    setAllTickets,
    getAllTickets,
    auth0UserMeta,
  } = useContext(UserContext);

  async function onSubmit(data, event) {
    // todo: remove ;
    // ;
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
      if (auth0UserMeta?.isAdmin && currentFilterQuery) {
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
      } else if (auth0UserMeta?.isAdmin) {
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
      className="w-full p-2 mx-auto mt-1 rounded-md shadow-lg bg-off-base md:w-4/5 lg:w-3/5"
    >
      <textarea
        name="note_text"
        ref={register}
        cols="25"
        rows="2"
        className="w-full p-2 text-sm"
        placeholder="leave a note here"
      ></textarea>
      <button className="block px-2 py-1 mx-auto text-sm rounded-md bg-medium text-text-base hover:bg-action">
        Submit Note
      </button>
    </form>
  );
};
