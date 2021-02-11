import React, { useState, useContext } from 'react';
// import { TicketContext } from '../ticketContext.js';
import fakeTickets from '../fakeTickets.js';

export default function Ticket({
  children,
  id,
  tickets,
  setTickets,
  ...restProps
}) {
  const [activityLogShown, setActivityLogShown] = useState(false);

  let childrenWithProps = React.Children.map(children, (child) => {
    return React.cloneElement(child, {
      activityLogShown: activityLogShown,
      id: id,
      tickets: tickets,
      setTickets: setTickets,
      onClick: () =>
        setActivityLogShown((activityLogShown) => !activityLogShown),
    });
  });
  return (
    <div
      {...restProps}
      className="grid grid-cols-10 mx-auto my-4 w-80 md:w-4/5 lg:max-w-screen-xl  border-2 border-black"
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
  tickets,
  setTickets,
  priority,
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
  function handleChange(id, value) {
    let index = tickets.findIndex((ticket) => ticket.id === id);
    let newState = [...tickets];
    newState[index].priority = value;
    setTickets(newState);
  }
  // todo: State updates in handle change, DB updates with put request here; could extract to custom hook to extract DB logic from component presentation logic;
  // useEffect(() => {
  // PUT/POST TO API with stateful tickets in dependency array
  // }, [tickets]);

  // const [showPriority, setshowPriority] = useState(false);
  return (
    <div
      className={`col-span-1  relative text-sm w-full justify-self-stretch self-stretch `}
    >
      <p className="w-full">
        <span className={`${statusClasses()} inline-block p-1 w-full`}>
          {status}
        </span>
      </p>
      <select
        className={`${priorityClasses()} w-full text-center`}
        name="priority"
        id=""
        value={priority}
        onChange={(event) => {
          handleChange(id, event.target.value);
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
  activityLogShown,
  onClick, //drilled from topRow, then from ticket;
  ...restProps
}) {
  function arrowClasses() {
    return activityLogShown && 'transform rotate-180';
  }

  return (
    <div className="col-span-9 p-1 bg-gray-100 border border-red-500 flex-grow">
      <div className="">
        <h2 className="inline-block text-black">{title}</h2>
        <img
          src="/media/icons/arrow-down.svg"
          alt="arrow-down"
          className={`${arrowClasses()} inline-block ml-8 duration-150`}
          onClick={onClick}
        />
        <h3 className=" text-gray-600">{description}</h3>
      </div>
    </div>
  );
};

Ticket.AssignedTo = function TicketAssignedTo({
  children,
  assignedTo,
  ...restProps
}) {
  return (
    <div className="col-span-2">
      <h3>Assigned To:</h3>

      <h4>{assignedTo}</h4>
    </div>
  );
};

Ticket.RaisedBy = function TicketRaisedBy({
  children,
  raisedBy,
  ...restProps
}) {
  return (
    <div className="col-span-2">
      <h3>Raised by:</h3>
      <h4>{raisedBy}</h4>
    </div>
  );
};

Ticket.Priority = function TicketPriority({
  children,
  priority,
  ...restProps
}) {
  function priorityClasses() {
    switch (priority) {
      case 'Urgent':
        return 'bg-red-700 text-red-100';
      case 'Low':
        return 'bg-green-700 text-green-100';
      default:
        return;
    }
  }

  return (
    <div className={`${priorityClasses()} col-span-2`}>
      <h3>Priority:</h3>
      <h4>{priority}</h4>
    </div>
  );
};
Ticket.Category = function TicketCategory({
  children,
  category,
  ...restProps
}) {
  return (
    <div className="col-span-1">
      <h3>Category:</h3>
      <h4>{category}</h4>
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

Ticket.ActivityLog = function TicketActivityLog({
  children,
  activityLogShown,
  ...restProps
}) {
  //todo: see if this use of flex works for a smoother height animation; https://css-tricks.com/using-css-transitions-auto-dimensions/
  if (activityLogShown) {
    return (
      <div className="w-full border border-yellow-700 p-10">{children}</div>
    );
  } else {
    return '';
  }
};
