import React, { useState, useContext } from 'react';
// import { TicketContext } from '../ticketContext.js';

export default function Ticket({ children, ...restProps }) {
  const [activityLogShown, setActivityLogShown] = useState(false);
  let childrenWithProps = React.Children.map(children, (child) => {
    return React.cloneElement(child, {
      activityLogShown: activityLogShown,
      onClick: () =>
        setActivityLogShown((activityLogShown) => !activityLogShown),
    });
  });
  return (
    <div
      {...restProps}
      className="flex flex-wrap mx-auto my-4 w-80 md:w-4/5 lg:max-w-screen-xl  border-2 border-black"
    >
      {childrenWithProps}
    </div>
  );
}

Ticket.TopRow = function TicketTopRow({
  children,
  activityLogShown,
  onClick,
  ...restProps
}) {
  // !: Drilling props through to the down arrow icon;
  let childrenWithProps = React.Children.map(children, (child) => {
    return React.cloneElement(child, {
      activityLogShown: activityLogShown,
      onClick: onClick,
    });
  });
  return (
    <div className="flex border-b-2 border-blue-800 w-full">
      {childrenWithProps}
    </div>
  );
};
Ticket.BottomRow = function TicketBottomRow({ children, ...restProps }) {
  return (
    <div className="flex flex-wrap justify-center text-center md:flex-nowrap divide-y-2 divide-x-2 md:divide-blue-500 md:divide-y-0 w-full">
      {children}
    </div>
  );
};

Ticket.Status = function TicketStatus({ children, status, ...restProps }) {
  function statusClasses() {
    switch (status) {
      case 'new':
        return 'bg-green-700';
      case 'In Progress':
        return 'bg-blue-900 text-white';
      default:
        return;
    }
  }

  return (
    <p
      className={`${statusClasses()}   w-3/12  md:w-2/12 2xl:w-1/12 p-2 md:p-4 2xl:p-6 min-w-max flex items-center text-center justify-center md:text-lg lg:text-2xl xl:text-3xl `}
    >
      {status}
    </p>
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
    <div className="w-9/12  p-2 md:p-4 bg-gray-100 border border-red-500">
      <div className="">
        <h2 className="inline-block md:text-lg lg:text-2xl xl:text-3xl  text-black">
          {title}
        </h2>
        <img
          src="/media/icons/arrow-down.svg"
          alt="arrow-down"
          className={`${arrowClasses()} inline-block ml-8 duration-150`}
          onClick={onClick}
        />
        <h3 className="md:text-base lg:text-xl xl:text-2xl text-gray-600">
          {description}
        </h3>
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
    <div className="w-1/3 md:w-auto md:flex-grow p-2 md:text-lg lg:text-2xl xl:text-3xl">
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
    <div className="w-1/3 p-2   md:border-0  md:w-auto md:flex-grow md:text-lg lg:text-2xl xl:text-3xl">
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
    <div
      className={`${priorityClasses()} w-1/3 md:w-auto md:flex-grow p-2  md:border-0   md:text-lg lg:text-2xl xl:text-3xl`}
    >
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
    <div className="w-1/3 md:w-auto flex-grow p-2  md:text-lg lg:text-2xl xl:text-3xl">
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
  // see if this use of flex works for a smoother height animation; https://css-tricks.com/using-css-transitions-auto-dimensions/
  if (activityLogShown) {
    return (
      <div className="w-full border border-yellow-700 p-10">{children}</div>
    );
  } else {
    return '';
  }
};
