import React, { useContext, useRef, useEffect } from 'react';
// import { HideClosedTickets } from '../utils/quickFilterFunctions';
import { useForm } from 'react-hook-form';
import { UserContext } from '../context/dbUserContext';
import { allTicketsRoute, quickFilterRoute } from '../constants/apiRoutes';
import { FilterIcon } from './Icons';

// @# SET OF COMPOUND COMPONENTS THAT ARE MOSTLY CONTAINERS FOR RENDERING TICKET PARTS AND FORMS ON SIDE OF PAGE;
export default function Dashboard({ children }) {
  return <div className="box-border flex-grow py-4 bg-base">{children}</div>;
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

Dashboard.Header = function DashboardHeader({
  children,
  mysqlUser,
  isAgent,
  showFilters,
  setShowFilters,
}) {
  function toggleFilter() {
    setShowFilters(!showFilters);
  }
  if (isAgent) {
    return (
      <>
        <h2 className="mx-auto my-2 mb-2 text-2xl font-bold text-center text-text-base">
          {mysqlUser &&
            `Welcome ${mysqlUser.fname} ${mysqlUser.lname}.  Here are the tickets`}
          <FilterIcon
            title="Toggle Quick Filter"
            classNames="text-text-base fill-current cursor-pointer ml-1 w-6"
            onClick={toggleFilter}
          />
        </h2>
      </>
    );
  } else
    return (
      <h2 className="mx-auto my-2 mb-2 text-2xl font-bold text-center text-text-base">
        {mysqlUser
          ? `Welcome ${mysqlUser.fname} ${mysqlUser.lname}.  Here are your tickets`
          : 'Welcome, here are your current tickets'}
      </h2>
    );
};

Dashboard.FormContainer = function DashboardFormContainer({ children }) {
  return (
    <div id="formContainer" className="order-1 m-3 md:order-none">
      {children}
    </div>
  );
};

Dashboard.QuickFilters = function DashboardQuickFilters({ showFilters }) {
  let {
    setAllTickets,
    mysqlUser,
    setcurrentFilterQuery,
    setWhichFilter,
    whichFilter,
  } = useContext(UserContext);
  let quickFilterButtonRef = useRef();

  const { handleSubmit, register, reset } = useForm();

  // same logic as the big filter, just smaller...
  async function onSubmit(data, event) {
    let url;

    let formData = new FormData(event.target);
    const dataArray = [...formData.entries()].filter((entry) => entry[1]);
    let dataAsString = new URLSearchParams(dataArray).toString();
    console.log(dataAsString);
    dataAsString = dataAsString.replaceAll('on', 'true');

    let dataArrayWithNullsRemoved = Object.entries(data).filter(
      ([item, val]) => val
    );

    if (dataArrayWithNullsRemoved.length === 0) {
      url = allTicketsRoute;
    } else {
      url = quickFilterRoute;
      url = url.concat(dataAsString);
    }

    try {
      let response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          body: JSON.stringify(data),
        },
      });
      if (response.ok) {
        let filteredTickets = await response.json();
        let sortedTickets = filteredTickets.sort((one, two) => {
          return two.id - one.id;
        });
        setAllTickets(sortedTickets);
        setcurrentFilterQuery(url);
        setWhichFilter('QUICK');
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(
    //This will clear the quick filters checkbox whichFilter var is changed from big to quick or vice versa.
    (e) => {
      reset();
    },
    [reset, whichFilter]
  );

  return (
    <div id="filtersContainer" className={showFilters ? 'block' : 'hidden'}>
      {/* <img src="https://www.mema4kids.info/file-1617989280638.jpg" alt="test" /> */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`bg-light-base py-2 px-4 text-center rounded-md`}
      >
        <h2>Quick filters for last month of tickets</h2>
        <label className="mx-2" htmlFor="urgent">
          Urgent Tickets
          <input
            ref={register}
            type="checkbox"
            name="urgent"
            id="urgent"
            className="mx-1"
          />
        </label>
        <label className="mx-2" htmlFor="hideClosed">
          Hide Closed/Resolved
          <input
            ref={register}
            type="checkbox"
            name="hideClosed"
            id="hideClosed"
            className="mx-1"
          />
        </label>
        <label className="mx-2" htmlFor="assignedToMe">
          Assigned to Me
          <input
            ref={register}
            type="checkbox"
            id="assignedToMe"
            name="assignedToMe"
            className="mx-1"
            value={mysqlUser && mysqlUser.agent_id}
          />
        </label>
        <button
          ref={quickFilterButtonRef}
          type="submit"
          className="inline-block p-1 ml-2 rounded-md text-text-muted bg-action w-max hover:text-text-base"
        >
          Apply Quick Filters
        </button>
      </form>
    </div>
  );
};
