import React from 'react';

// @# SET OF COMPOUND COMPONENTS THAT ARE MOSTLY CONTAINERS FOR RENDERING TICKET PARTS AND FORMS ON SIDE OF PAGE;
export default function Dashboard({ children }) {
  return (
    <div className="box-border flex-grow py-4 bg-gray-800">{children}</div>
  );
}

Dashboard.InnerContainer = function DashboardInnerContainer({ children }) {
  return <div className="flex flex-col lg:flex-row"> {children} </div>;
};

Dashboard.TicketsContainer = function DashboardTicketsContainer({ children }) {
  return (
    <div
      id="dashboardTicketsContainer"
      className="order-2 h-full p-4 md:w-full lg:order-none lg:w-3/4 ticketPanel lg:mx-2"
    >
      {children}
    </div>
  );
};

Dashboard.Header = function DashboardHeader({ children, mysqlUser, isAgent }) {
  if (isAgent) {
    return (
      <h2 className="mx-auto my-2 mb-2 text-2xl font-bold text-center text-white">
        {mysqlUser &&
          `Welcome ${mysqlUser.fname} ${mysqlUser.lname}.  Here are the tickets`}
      </h2>
    );
  } else
    return (
      <h2 className="mx-auto my-2 mb-2 text-2xl font-bold text-center text-white">
        {mysqlUser
          ? `Welcome ${mysqlUser.fname} ${mysqlUser.lname}.  Here are your tickets`
          : 'Welcome, here are your current tickets'}
      </h2>
    );
};

Dashboard.FormContainer = function DashboardFormContainer({ children }) {
  return (
    <div id="formContainer" className="order-1 md:order-none">
      {children}
    </div>
  );
};
