import React, { useState, useContext, useReducer } from 'react';
// import { TicketContext } from '../ticketContext.js';
import fakeTickets from '../fakeTickets.js';
import useUpdateTicket from '../hooks/useUpdateTicket';
import getTimeFxn from '../utils/timeConverter.js';
import ticketCategories from '../utils/ticketCategories.js';

export default function Ticket({
  children,
  id,
  tickets,
  setTickets,
  handleChange,
  ...restProps
}) {
  const [activityLogShown, setActivityLogShown] = useState(false);

  let childrenWithProps = React.Children.map(children, (child) => {
    return React.cloneElement(child, {
      activityLogShown: activityLogShown,
      id: id,
      handleChange: handleChange,
      tickets: tickets,
      setTickets: setTickets,
      onClick: () =>
        setActivityLogShown((activityLogShown) => !activityLogShown),
    });
  });

  return (
    <div
      {...restProps}
      className="grid grid-cols-6 lg:grid-cols-10 my-4 w-full border rounded-md border-gray-800 shadow divide-x divide-gray-800 divide-y divide-gray-300 lg:divide-y-0 truncate bg-gray-200 max-w-screen-xl"
    >
      {childrenWithProps}
    </div>
  );
}

// Ticket.TopRow = function TicketTopRow({
//   children,
//   activityLogShown,
//   onClick,
//   ...restProps
// }) {
//   // !: Drilling props through to the down arrow icon;
//   let childrenWithProps = React.Children.map(children, (child) => {
//     return React.cloneElement(child, {
//       activityLogShown: activityLogShown,
//       onClick: onClick,
//     });
//   });
//   return (
//     <div className="flex border-b-2 border-blue-800 w-full">
//       {childrenWithProps}
//     </div>
//   );
// };
// Ticket.BottomRow = function TicketBottomRow({ children, ...restProps }) {
//   return (
//     <div className="flex flex-wrap justify-center text-center md:flex-nowrap divide-y-2 divide-x-2 md:divide-blue-500 md:divide-y-0 w-full">
//       {children}
//     </div>
//   );
// };

Ticket.Status = function TicketStatus({
  children,
  id,
  priority,
  tickets,
  setTickets,
  handleChange,
  status,
  ...restProps
}) {
  function statusClasses() {
    switch (status) {
      case 'Open':
        return 'bg-blue-900 text-white';
      case 'Pending':
        return 'bg-green-700 text-white';
      case 'Resolved':
        return 'text-gray-600 text-white';
      case 'Closed':
        return 'text-gray-600 text-white';
      default:
        return;
    }
  }
  function priorityClasses(el) {
    let bgRed = 'bg-red-800';
    let bgBlue = 'bg-blue-800';
    let bgYellow = 'bg-yellow-800';
    let bgGreen = 'bg-green-800';
    // if (el === 'select') {
    //   bgRed = 'bg-red-900';
    //   bgBlue = 'bg-blue-900';
    //   bgYellow = 'bg-yellow-900';
    //   bgGreen = 'bg-green-900';
    // }
    switch (priority) {
      case 'Low':
        return `${bgGreen} text-white`;
      case 'Medium':
        return `${bgBlue} text-white`;
      case 'High':
        return `${bgYellow} text-white`;
      case 'Urgent':
        return `${bgRed} text-white`;
      default:
        return;
    }
  }

  // todo: State updates in handle change, DB updates with put request here; could extract to custom hook to extract DB logic from component presentation logic;
  // useEffect(() => {
  // PUT/POST TO API with stateful tickets in dependency array
  // }, [tickets]);

  // const [showPriority, setshowPriority] = useState(false);
  return (
    <div
      className={`col-span-6 md:col-span-1 flex md:block relative text-xs w-full justify-self-stretch self-stretch h-full text-center`}
    >
      <p className="w-full md:h-1/2 ">
        <span className={`${statusClasses()} inline-block p-1 h-full w-full`}>
          {status}
        </span>
      </p>
      <div
        name="SelectContainer"
        className={`${priorityClasses()} text-black w-full md:h-1/2`}
      >
        <select
          className={`bg-transparent text-white inline-block align-middle`}
          name="priority"
          title="Priority"
          value={priority}
          onChange={(event) => {
            handleChange(id, 'priority', event.target.value);
          }}
        >
          <option className={`bg-green-800 text-white`} value="Low">
            Low
          </option>
          <option className={`bg-blue-800 text-white`} value="Medium">
            Medium
          </option>
          <option className={`bg-yellow-600 text-white`} value="High">
            High
          </option>
          <option className={`bg-red-800 text-white`} alue="Urgent">
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
  onClick, //drilled from topRow, then from ticket;
  ...restProps
}) {
  function arrowClasses() {
    return activityLogShown && 'transform rotate-180';
  }

  return (
    <div className="col-span-6 md:col-span-5 lg:col-span-9 p-1 bg-gray-100 border border-red-500 flex-grow">
      <div className="">
        <h2 className="inline-block text-black font-bold text-md">{title}</h2>
        {/* todo: relocate this img to a better place */}
        <h3 className=" text-gray-600 text-xs md:text-sm break-words max-w-prose whitespace-normal">
          {description}
        </h3>
        <p
          name="metaTicketInfo"
          className="mt-1 sm:mt-auto text-xs md:text-sm sm:w-auto break-words whitespace-normal"
        >
          submitted by
          <span className="font-bold">{` ${raisedBy} `} </span>
          <span className="font-italic text-xs"> ({department}) </span>
          on
          <span className="text-gray-500">
            {` ${getTimeFxn(timeSubmitted)} `}
            <span className="inline-block ml1 text-xs">
              (Click to see more below)
            </span>
          </span>
          <img
            src="/media/icons/arrow-down.svg"
            alt="arrow-down"
            className={`${arrowClasses()} inline-block w-6 p-1 duration-150`}
            onClick={onClick}
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
    <div className="col-span-3 md:col-span-1 md:text-sm lg:col-span-2 text-center  bg-gray-200">
      <span className="text-sm mr-px inline-block">
        Assigned To: <br /> {assignedTo}
      </span>
    </div>
  );
};

// Ticket.RaisedBy = function TicketRaisedBy({
//   children,
//   raisedBy,
//   ...restProps
// }) {
//   return (
//     <div className="col-span-2">
//       <h3>Raised by:</h3>
//       <h4>{raisedBy}</h4>
//     </div>
//   );
// };

// Ticket.Priority = function TicketPriority({
//   children,
//   priority,
//   ticket,
//   ...restProps
// }) {
//   function priorityClasses() {
//     switch (priority) {
//       case 'Urgent':
//         return 'bg-red-700 text-red-100';
//       case 'Low':
//         return 'bg-green-700 text-green-100';
//       default:
//         return;
//     }
//   }

//   return (
//     <div className={`${priorityClasses()} col-span-2`}>
//       <h3>Priority:</h3>
//       <h4>{priority}</h4>
//     </div>
//   );
// };

Ticket.Location = function TicketLocation({
  children,
  mainLocation,
  office,
  ...restProps
}) {
  return (
    <div className="col-span-3 md:col-span-1 lg:col-span-2 bg-gray-200 text-center">
      <span className="text-sm mr-px inline-block text-center">
        Location: <br /> {mainLocation}
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
  ...restProps
}) {
  return (
    <div className="col-span-6 md:col-span-2 lg:col-span-3 flex justify-center flex-wrap text-center">
      <h3 className="w-full text-center">Category:</h3>
      <select
        className="m-2 p-1 w-32 md:w-24 lg:m-1 bg-gray-700 text-white block text-xs"
        name="category"
        id=""
        value={category}
        onChange={(event) => {
          handleChange(id, 'category', event.target.value);
        }}
      >
        <option value="Building">Building</option>
        <option value="IT">IT</option>
        <option value="Communications">Communications</option>
        <option value="GIS">GIS</option>
        <option value="Employee Setup">Employee Setup</option>
      </select>
      <select
        className="m-2 p-1 w-32 md:w-24  lg:m-1 bg-gray-700 text-white block text-xs"
        name="subcategory"
        id=""
        value={subcategory}
        onChange={(event) => {
          handleChange(id, 'subcategory', event.target.value);
        }}
      >
        {ticketCategories(category)}
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
    <div className="col-span-6 md:col-span-2 lg:col-span-3 lg:text-sm p-2">
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
    <div className="w-1/3 md:w-auto flex-grow p-2  md:border-0   md:text-lg lg:text-2xl xl:text-3xl">
      <h3>Due in:</h3>
      <h4>{dueIn}</h4>
    </div>
  );
};

Ticket.ActivityLogContainer = function ActivityLogContainer({
  children,
  activityLogShown,
  ...restProps
}) {
  //todo: see if this use of flex works for a smoother height animation; https://css-tricks.com/using-css-transitions-auto-dimensions/
  if (activityLogShown) {
    return (
      <div className="col-span-full border border-yellow-700 p-4 ">
        {children}
      </div>
    );
  } else {
    return null;
  }
};

Ticket.ActivityLogEntry = function ActivityLogEntry({
  children,
  user,
  message,
  timeStamp,
  activityLogShown,
  ...restProps
}) {
  return (
    <p>
      {user}: {message} on {timeStamp}
    </p>
  );
};
