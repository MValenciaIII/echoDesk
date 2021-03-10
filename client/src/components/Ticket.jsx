import React, {
  useState,
  useEffect,
  useContext,
  useReducer,
  useRef,
} from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../context/dbUserContext';
// import { TicketContext } from '../ticketContext.js';
import getTimeFxn from '../utils/timeConverter.js';
import subServiceTypes from '../utils/ticketCategories.js';
import {
  departmentIdToValue,
  locationIdToWord,
  serviceIDToWord,
  subserviceIDToWord,
  statusIdToWord,
  priorityIDtoWord,
} from '../utils/sqlFormHelpers';

export default function Ticket({
  children,
  id,
  activityLogShown,
  toggleActivityLog,
  ...restProps
}) {
  // ONLY THE TOP OF THE TICKET NEEDS THIS INFO
  const [isEditingTicket, setisEditingTicket] = useState(false);
  const { register, handleSubmit, watch, errors, reset } = useForm();
  const { getDbUsersTickets } = useContext(UserContext);

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
    });
  });

  function onSubmit(data, event) {
    event.preventDefault();

    // PATCHING EXISTING TICKETS
    fetch(`http://10.195.103.107:3075/api/tickets/update/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((message) => console.log(message))
      .then(() => getDbUsersTickets())
      .then(() => setisEditingTicket(false))
      .catch((error) => console.log({ error }));
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onChange={() => setisEditingTicket(true)}
      className="relative grid w-full grid-cols-6 truncate divide-y divide-gray-300 lg:grid-cols-10 lg:divide-y-0"
    >
      {childrenWithProps}
    </form>
  );
}

Ticket.Container = function TicketContainer({ children, ...restprops }) {
  const [activityLogShown, setActivityLogShown] = useState(false);
  //for activyt LOG AND TICKET;  SHARED STATE FOR EACH TICKET CONTAINER;
  function toggleActivityLog() {
    setActivityLogShown(!activityLogShown);
  }
  let childrenWithProps = React.Children.map(children, (child) => {
    return React.cloneElement(child, {
      activityLogShown,
      toggleActivityLog,
    });
  });

  return (
    <div
      data-name="TicketContainer"
      className="max-w-screen-xl mt-4 overflow-hidden bg-gray-200 rounded-md shadow"
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
  ...restProps
}) {
  let wordStatus = statusIdToWord(String(status));
  let [stylingStatus, setStylingStatus] = useState(wordStatus);

  let wordPriority = priorityIDtoWord(String(priority));
  let [stylingPriority, setstylingPriority] = useState(wordPriority);

  console.log(stylingPriority);

  function statusClasses() {
    switch (stylingStatus) {
      case 'Open':
        return 'bg-blue-900 ';
      case 'Pending':
        return 'bg-green-700 ';
      case 'Resolved':
        return 'text-gray-600 ';
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

  function changeStylingStatus(event) {
    console.log(event);
    console.log(event.target.value);
    setStylingStatus(statusIdToWord(String(event.target.value)));
  }
  function changePriorityStatus(event) {
    setstylingPriority(priorityIDtoWord(event.target.value));
  }

  return (
    <div
      className={`col-span-6 md:col-span-1 flex md:block relative text-xs w-full justify-self-stretch self-stretch h-full text-center`}
    >
      <select
        ref={register()}
        name="status_id"
        defaultValue={status}
        className={`${statusClasses()} text-white w-full md:h-1/2 align-middle
         `}
        onChange={(event) => changeStylingStatus(event)}
      >
        <option value="1" className="bg-gray-800">
          Open
        </option>
        <option value="4" className="bg-gray-800">
          Closed
        </option>
      </select>
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
          onChange={(event) => changePriorityStatus(event)}
        >
          <option className="bg-gray-800" value="1">
            Low
          </option>
          <option className="bg-gray-800" value="2">
            Medium
          </option>
          <option className="bg-gray-800" value="3">
            High
          </option>
          <option className="bg-gray-800" value="4">
            Urgent
          </option>
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
  ...restProps
}) {
  let wordDepartment = departmentIdToValue(String(department));
  function arrowClasses() {
    return activityLogShown && 'transform rotate-180';
  }

  return (
    <div className="flex-grow col-span-6 p-1 bg-gray-100 border border-red-500 md:col-span-5 lg:col-span-9">
      <div className="">
        <h2 className="inline-block font-bold text-black text-md">{title}</h2>
        {/*// todo: relocate this img to a better place */}
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
          <span className="text-xs text-gray-500">{` (${getTimeFxn(
            timeSubmitted
          )})`}</span>
          <span className="inline-block text-xs ml1">
            (Click to view or manage notes below) (
            {ticketNotes && ticketNotes.length ? ticketNotes.length : '0'})
          </span>
          <img
            src="/media/icons/arrow-down.svg"
            alt="arrow-down"
            className={`${arrowClasses()} inline-block w-6 p-1 duration-150`}
            onClick={toggleActivityLog}
          />
        </p>
      </div>
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
    <div className="col-span-3 text-center bg-gray-200 md:col-span-1 md:text-sm lg:col-span-2">
      <span className="inline-block mr-px text-sm">
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
    <div className="col-span-3 text-center bg-gray-200 md:col-span-1 lg:col-span-2">
      <span className="inline-block mr-px text-sm text-center">
        Location: <br /> {locationIdToWord(String(mainLocation))}
      </span>
    </div>
  );
};

Ticket.Category = function TicketCategory({
  children,
  id,
  category,
  subcategory,
  handleChange,
  watch,
  register,
  ...restProps
}) {
  const mainServicetype = watch('service_id', '1');

  // todo:change to form and watch values using technique on ticket input;

  return (
    <div className="flex flex-wrap justify-center col-span-6 text-center md:col-span-2 lg:col-span-3">
      <h3 className="w-full text-sm text-center">Category:</h3>
      <select
        ref={register()}
        className="block w-32 p-1 m-2 text-xs text-white bg-gray-700 md:w-24 lg:w-28 lg:m-1"
        name="service_id"
        id=""
        defaultValue={category}
      >
        <option value="1">Building</option>
        <option value="2">IT</option>
        <option value="3">Communications</option>
        <option value="4">GIS</option>
        <option value="5">Employee Setup</option>
        <option value="6">Wasp Inventory System</option>
        <option value="7">Surveilance Camera System</option>
        <option value="8">Training</option>
        <option value="9">Thermoscan Account</option>
      </select>
      {/* //! SUBCATEGORY DIVIDER */}
      <select
        ref={register()}
        className="block w-32 p-1 m-2 text-xs text-black bg-gray-100 md:w-24 lg:m-1 dark:bg-gray-700 dark:text-white"
        name="service_details_id"
        id=""
        defaultValue={subcategory}
      >
        {/* //@ REACT HOOK FORM IS PUTTING IN OTHER OPTIONS VIA UTIL PLUS WATCH */}
        {subServiceTypes(mainServicetype)}
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
    <div className="col-span-6 p-2 md:col-span-2 lg:col-span-3 lg:text-sm">
      <p>
        Phone:{' '}
        <a className="text-blue-500 underline" href={`tel:${contactPhone}`}>
          {contactPhone}
        </a>
      </p>
      <p>
        Email:{' '}
        <a
          className="text-blue-500 underline"
          href={`mailto:${contactEmail}?subject=${title}`}
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

Ticket.MakeChangesButtons = function SubmitChangesButton({
  isEditingTicket,
  setisEditingTicket,
  reset,
  ...restProps
}) {
  if (isEditingTicket) {
    return (
      <div className="absolute bottom-0 right-0 flex flex-col border-none md:top-0">
        <button
          type="submit"
          className="block px-2 py-1 text-xs bg-gray-300 border-none hover:bg-green-900 hover:text-white"
        >
          Submit Changes
        </button>
        <button
          type="button"
          className="block px-2 py-1 text-xs text-red-700 bg-gray-300 border-none hover:bg-red-900 hover:text-white"
          onClick={(event) => {
            reset();
            setisEditingTicket(false);
          }}
        >
          Cancel Changes
        </button>
      </div>
    );
  } else {
    return null;
  }
};

Ticket.ActivityLogContainer = function ActivityLogContainer({
  children,
  activityLogShown,
  ...restProps
}) {
  //todo: see if this use of flex works for a smoother height animation; https://css-tricks.com/using-css-transitions-auto-dimensions/
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
  let person;
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
    <p className={`mb-1 ${alignSide()}`}>
      <span className="text-base font-bold text-black">{whoSaidit()}</span>{' '}
      said:
      <span className="text-gray-900"> {message} </span>
      <span className="text-xs text-gray-600"> ( {timestamp} ) </span>
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
  const { getDbUsersTickets } = useContext(UserContext);

  function onSubmit(data, event) {
    event.preventDefault();

    if (!data.note_text) {
      return;
    }
    data.ticket_id = ticket_id;
    data.client_id = client_id;
    // PATCHING EXISTING TICKETS
    fetch(`http://10.195.103.107:3075/api/notes/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((message) => console.log(message))
      .then(() => getDbUsersTickets())
      .then(() => reset())
      .catch((error) => console.log({ error }));
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full p-2 mx-auto mt-1 bg-gray-200 rounded-md shadow-lg md:w-4/5 lg:w-3/5"
    >
      <textarea
        name="note_text"
        ref={register()}
        id=""
        cols="30"
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
