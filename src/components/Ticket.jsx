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
      className="grid sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-10 mx-auto my-4 w-80 md:w-4/5 lg:max-w-screen-xl  border rounded-md border-gray-300 shadow divide-x-2 divide-gray-200 truncate"
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
  function priorityClasses() {
    switch (priority) {
      case 'Low':
        return 'bg-green-800 text-white';
      case 'Medium':
        return 'bg-blue-800 text-white';
      case 'High':
        return 'bg-yellow-600 text-white';
      case 'Urgent':
        return 'bg-red-800 text-white';
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
      className={`col-span-1  relative text-sm w-full justify-self-stretch self-stretch h-full`}
    >
      <p className="w-full h-1/2">
        <span className={`${statusClasses()} inline-block p-1 h-full w-full`}>
          {status}
        </span>
      </p>
      <select
        className={`${priorityClasses()} w-full text-center h-1/2`}
        name="priority"
        id=""
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
    <div className="col-span-9 p-1 bg-gray-100 border border-red-500 flex-grow">
      <div className="">
        <h2 className="inline-block text-black font-bold text-md">{title}</h2>
        {/* todo: relocate this img to a better place */}
        <h3 className=" text-gray-600 text-sm">
          {description}
          <p className="">
            submitted by
            <span className="font-bold">{` ${raisedBy} `} </span>
            <span className="font-italic text-xs"> ({department}) </span>
            on
            <span className="text-sm text-gray-500">
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
        </h3>
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
    <div className="col-span-2 lg:col-span-1 text-center p-1">
      <span className="text-sm mr-px inline-block">
        Assigned To: {assignedTo}
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
    <div className="col-span-1">
      <span className="text-sm mr-px inline-block">
        Location: {mainLocation}
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
    <div className="col-span-2 text-center">
      <h3>Category:</h3>
      <select
        className="bg-gray-200"
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
        className="bg-gray-200 ml-2"
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
    <div className="col-span-2">
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
=======
import React from "react";
import { Link } from "react-router-dom";

function Ticket() {
  return (
  <>
    <div class="main-background">
      <div class="container">
        <div className="grid md:grid-cols-12 gap-2">
          <div class="col-span-12 px-8 pt-6 pb-8 mb-4 flex flex-wrap content-center flex flex-col bg-white shadow-md rounded">
            <div class="mb-4">
              <label class="block text-grey-darker text-sm font-bold mb-2" for="username">
                Full Name
              </label>
              <input class="w-full py-2 px-3 shadow appearance-none border rounded text-grey-darker" id="username" type="text" placeholder="Username"/>
           </div>
             <div class="mb-4">
              <label class="block text-grey-darker text-sm font-bold mb-2" for="username"> 
              Type
              <select class="w-full py-2 px-3 shadow appearance-none border rounded text-grey-darker">
              <option name="na"> --</option>
                <option name="executive"> Executive</option>
                <option name="preparedness">Preparedness</option>
                <option name="mitigation">Mitigation</option>
                <option name="warehouse">Warehouse</option>
                <option name="support">Support Services</option>
                <option name="human">Human Resources</option>
                <option name="maintenance">Maintenance</option>
                <option name="recovery">Recovery</option>
                <option name="field">Field Services</option>
                <option name="external">External Affairs</option>
                <option name="logistics">Logistics</option>
                <option name="operations">Operations</option>
                <option name="assistance">Individual Assistance</option>
                <option name="technolog">Information Technology</option>
                </select> 
              </label>
           </div>
           <div class="mb-4">
              <label class="block text-grey-darker text-sm font-bold mb-2" for="username"> 
              Location
              <select class="w-full py-2 px-3 shadow appearance-none border rounded text-grey-darker">
                <option name="na"> --</option>
                <option name="pearl"> HQ (Pearl)</option>
                <option name="warehouse">Warehouse (Byram)</option>
                <option name="bolton">Bolton Building (Biloxi)</option>
                </select> 
              </label>
           </div>
           <div class="mb-4">
              <label class="block text-grey-darker text-sm font-bold mb-2" for="username">
               Contact
              </label>
              <input class="w-full py-2 px-3 shadow appearance-none border rounded text-grey-darker" id="username" type="text" placeholder=""/>
           </div>
           <div class="mb-4">
              <label class="block text-grey-darker text-sm font-bold mb-2" for="username">
               Phone Number
              </label>
              <input class="w-full py-2 px-3 shadow appearance-none border rounded text-grey-darker" id="phoneNum" type="number" placeholder=""/>
           </div>
           <div class="mb-4">
              <label class="block text-grey-darker text-sm font-bold mb-2" for="username">
               Subject
              </label>
              <input class="w-full py-2 px-3 shadow appearance-none border rounded text-grey-darker" id="username" type="text" placeholder=""/>
           </div>
           <div class="mb-4">
              <label class="block text-grey-darker text-sm font-bold mb-2" for="username"> 
              Service Type
              <select class="w-full py-2 px-3 shadow appearance-none border rounded text-grey-darker">
                <option name="na"> --</option>
                <option name="executive"> Executive</option>
                <option name="preparedness">Preparedness</option>
                <option name="mitigation">Mitigation</option>
                <option name="warehouse">Warehouse</option>
                <option name="support">Support Services</option>
                <option name="human">Human Resources</option>
                <option name="maintenance">Maintenance</option>
                <option name="recovery">Recovery</option>
                <option name="field">Field Services</option>
                <option name="external">External Affairs</option>
                <option name="logistics">Logistics</option>
                <option name="operations">Operations</option>
                <option name="assistance">Individual Assistance</option>
                <option name="technolog">Information Technology</option>
                </select> 
              </label>
           </div>
           <div class="mb-4">
              <label class="block text-grey-darker text-sm font-bold mb-2" for="username"> 
              Status
              <select class="w-full py-2 px-3 shadow appearance-none border rounded text-grey-darker">
                <option name="na"> Open</option>
                <option name="pending"> Pending</option>
                <option name="resolved">Resolved</option>
                <option name="closed">Closed</option>
                </select> 
              </label>
           </div>
           <div class="mb-4">
              <label class="block text-grey-darker text-sm font-bold mb-2" for="username"> 
              Priority
              <select class="w-full py-2 px-3 shadow appearance-none border rounded text-grey-darker">
                <option name="na"> Low</option>
                <option name="medium"> Medium</option>
                <option name="high">High</option>
                <option name="urgent">Urgent</option>
                </select> 
              </label>
           </div>
           <div class="mb-4">
              <label class="block text-grey-darker text-sm font-bold mb-2" for="username"> 
              Group
              <select class="w-full py-2 px-3 shadow appearance-none border rounded text-grey-darker">
                <option name="na"> --</option>
                <option name="maintenance"> Building Maintenance</option>
                <option name="commmunications">Communications</option>
                <option name="gis">GIS</option>
                <option name="info">IT Department</option>
                </select> 
              </label>
           </div>
            <div class="flex items-center justify-between">
              <button class="py-2 px-4 rounded font-bold bg-blue hover:bg-blue-dark text-white" type="button">
               <div>
                  <Link>Cancel </Link>
                </div>
              </button>
              <button class="py-2 px-4 rounded font-bold bg-blue hover:bg-blue-dark text-white" type="button">
               <div>
                  <Link>Create</Link>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  );
}
export default Ticket;

