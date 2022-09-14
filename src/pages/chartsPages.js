import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import sub from 'date-fns/sub';
import differenceInDays from 'date-fns/differenceInDays';
import parseISO from 'date-fns/parseISO';
import format from 'date-fns/format';
import { UserContext } from '../context/dbUserContext';
import HeaderFooter from '../containers/HeaderFooter';
import ChartsWidget from '../components/ChartsWidgets';
import LoaderIcon from '../components/Loading';
import { differenceInMonths } from 'date-fns';
import { departmentTicketSelect } from '../utils/sqlFormHelpers';

export default function ChartsPage(props) {
  const { allTickets, allDepartmentTickets, getDepartmentTickets, auth0UserMeta } = useContext(UserContext);
  let onlyOpenDepartmentTickets = allDepartmentTickets
  let onlyOpenTickets = allTickets
  //using this state to change branches.
  const [departmentBranch, setDepartmentBranch] = useState("");
  const [trackButton, setTrackButton] = useState("weekly");


  let history = useHistory();
  let today = new Date();


  useEffect(() => {
    if (auth0UserMeta && !auth0UserMeta.isAdmin) {
      history.push('/');
    }
  }, [auth0UserMeta]);

  useEffect(() => {chartChange(departmentBranch) }, [departmentBranch])


  function CreatedDaysAgoFilter(ticket, number) {
    let difference = differenceInDays(today, parseISO(ticket.created_at));
    return difference === number ? ticket : null;
  }
  function ClosedByDayFilter(ticket, number) {
    let ticketByDay = differenceInDays(today, parseISO(ticket.updated_at));
    return ticketByDay === number &&
      (ticket.status_id === 3 || ticket.status_id === 4)
      ? ticket
      : null;
  }
  function createdMonthlyFilter(ticket, number) {
    let difference = differenceInMonths(today, parseISO(ticket.created_at));
    return difference === number ? ticket : null;
  }

  function closedByMonthFilter(ticket, number) {
    let ticketByDay = differenceInMonths(today, parseISO(ticket.updated_at));
    return ticketByDay === number &&
      (ticket.status_id === 3 || ticket.status_id === 4)
      ? ticket
      : null;
  }

  const weeklyOptions = {
    title: {
      text: 'Weekly Ticket Volume',
      style: {
        fontFamily: 'monospace',
      },
    },

    chart: {
      spacingBottom: 15,
      spacingTop: 10,
      spacingLeft: 5,
      spacingRight: 5,
      marginRight: 175,
      marginLeft: 175,
    },
    yAxis: {
      title: {
        text: 'Number of Tickets',
      },
    },
    xAxis: {
      type: 'datetime',
      categories: [],
    },

    series: [
      { name: 'New Tickets', data: [] },
      { name: 'Closed/Resolved Tickets', data: [] },
    ],
  };




  const annualDepartmentOptions = {
    title: {
      text: 'Annual Ticket Volume',
      style: {
        fontFamily: 'monospace',
      },
    },

    chart: {
      spacingBottom: 15,
      spacingTop: 10,
      spacingLeft: 5,
      spacingRight: 5,
      marginRight: 175,
      marginLeft: 175,
    },
    yAxis: {
      title: {
        text: 'Number of Tickets',
      },
    },
    xAxis: {
      type: 'datetime',
      categories: [],
    },

    series: [
      { name: 'New Tickets', data: [] },
      { name: 'Closed/Resolved Tickets', data: [] },
    ],
  };



if (trackButton === 'weekly') {

  if (departmentBranch === "") {
    for (let i = 0; i < 6; i++) {
      //   arbitrary 5 day view fo tickets...
      let newTickets = allTickets?.filter((ticket) =>
        CreatedDaysAgoFilter(ticket, i)
      );
      let length = newTickets?.length;
      weeklyOptions.series[0].data.unshift(length); //unshift to front of array
  
      //  Closed by day view
      let closedResolvedArr = allTickets?.filter((ticket) =>
        ClosedByDayFilter(ticket, i)
      );
      weeklyOptions.series[1].data.unshift(closedResolvedArr?.length);
  
      //  Adding categories for X axis date and formatting it
      let xAxisDate = sub(today, {
        days: i,
      });
      let xFormatted = format(xAxisDate, 'MM/dd/uu');
      weeklyOptions.xAxis.categories.unshift(xFormatted);
    }
    // todo: style
    if (!allTickets) {
      return <LoaderIcon />;
    }

  } else if ( departmentBranch > 0) {
    
        for (let i = 0; i < 6; i++) {
          //   arbitrary 5 day view fo tickets...
          let newTickets = allDepartmentTickets?.filter((ticket) =>
            CreatedDaysAgoFilter(ticket, i)
          );
          let length = newTickets?.length;
          weeklyOptions.series[0].data.unshift(length); //unshift to front of array
        
          //  Closed by day view
          let closedResolvedArr = allDepartmentTickets?.filter((ticket) =>
            ClosedByDayFilter(ticket, i)
          );
          weeklyOptions.series[1].data.unshift(closedResolvedArr?.length);
        
          //  Adding categories for X axis date and formatting it
          let xAxisDate = sub(today, {
            days: i,
          });
          let xFormatted = format(xAxisDate, 'MM/dd/uu');
          weeklyOptions.xAxis.categories.unshift(xFormatted);
        }
        // todo: style
        if (!allDepartmentTickets) {
          return <LoaderIcon />;
        }
  
  }
 

} else if (trackButton === 'annual') {

  if (departmentBranch === "") {
    for (let i = 0; i < 13; i++) {
      //   arbitrary 5 day view fo tickets...
      let newTickets = allTickets?.filter((ticket) =>
      createdMonthlyFilter(ticket, i)
      );
      let length = newTickets?.length;
      annualDepartmentOptions.series[0].data.unshift(length); //unshift to front of array
  
      //  Closed by day view
      let closedResolvedArr = allTickets?.filter((ticket) =>
      closedByMonthFilter(ticket, i)
      );
      annualDepartmentOptions.series[1].data.unshift(closedResolvedArr?.length);
  
      //  Adding categories for X axis date and formatting it
      let xAxisDate = sub(today, {
        months: i,
      });
      let xFormatted = format(xAxisDate, 'MM/dd/uu');
      annualDepartmentOptions.xAxis.categories.unshift(xFormatted);
    }
    // todo: style
    if (!allTickets) {
      return <LoaderIcon />;
    }

  } else if ( departmentBranch > 0) {
    
    for (let i = 0; i < 13; i++) {
      //   arbitrary 5 day view fo tickets...
      let newdepartmentTickets = allDepartmentTickets?.filter((ticket) =>
        createdMonthlyFilter(ticket, i)
      );
      let length = newdepartmentTickets?.length;
      annualDepartmentOptions.series[0].data.unshift(length); //unshift to front of array

      //  Closed by day view
      let closedResolvedArr = allDepartmentTickets?.filter((ticket) =>
        closedByMonthFilter(ticket, i)
      );
      annualDepartmentOptions.series[1].data.unshift(closedResolvedArr?.length);

      //  Adding categories for X axis date and formatting it
      let xAxisDate = sub(today, {
        months: i,
      });
      let xFormatted = format(xAxisDate, 'MM/dd/uu');
      annualDepartmentOptions.xAxis.categories.unshift(xFormatted);
    }
    // todo: style
    if (!allDepartmentTickets) {
      return <LoaderIcon />;
    }
  }
}

//? Default Tickets to weekly 
//? Default to show ALL tickets

//! THOUGHTS FOR LOOPING THROUGH ALLTICKETS OR DEPARTMENT TICKETS
//? Do I use a function under me to handle looping through either Annual/Weekly
//? IF i do that I have to KEEP TRACK of whether the admin is on Annual/weekly.
//? Maybe keep a temp variable OR localstorage? 
//?

 function chartChange(departmentValue) {

  getDepartmentTickets(departmentValue)


}




  return (
    <HeaderFooter>
      <div className="flex-grow w-full p-8 bg-base ">
        <div>
          {/* look at Ticket.jsx buttons/dropdowns for examples to handle change */}
            <button onClick={(e) => setTrackButton(e.target.value)} value="weekly" className='inline-block w-max p-2 ml-4 mx-auto mt-1  text-text-base bg-off-base rounded-lg'>
              Total Weekly Tickets
            </button>
            <button onClick={(e) => setTrackButton(e.target.value)} value="annual" className='inline-block w-max p-2 ml-4 mx-auto mt-1  text-text-base bg-off-base rounded-lg'>
              Total Annual Tickets
            </button>
        </div>
      </div>
      <div className="flex-grow w-full p-8 bg-base ">
        <div
        className={'max-w-screen-2xl mx-auto'}
        >
          <select 
          value={departmentBranch}
          defaultValue={""}
          onChange={(e) => setDepartmentBranch(e.target.value)}
          className={`inline-block w-max p-2 mb-3 mx-auto mt-1  text-text-base bg-off-base rounded-lg
         `}
          >
          {departmentTicketSelect()}
          </select>
        </div>
        <div
          id="ChartsPageContainer"
          className={'max-w-screen-2xl mx-auto'}
          // flex-grow to make sure it takes up whole height of browser if content is small
        >
          <div className="flex flex-wrap justify-around gap-4 mb-3">
            <ChartsWidget
              category="All"
              number={ departmentBranch === "" ? onlyOpenTickets.length : onlyOpenDepartmentTickets.length }
            />
            <ChartsWidget
              category="Open"
              number={
                departmentBranch === "" ? onlyOpenTickets.filter((ticket) => ticket.status_id === 1)
                .length : onlyOpenDepartmentTickets.filter((ticket) => ticket.status_id === 1)
                .length
              }
            />
            <ChartsWidget
              category="Pending"
              number={
                departmentBranch === "" ? onlyOpenTickets.filter((ticket) => ticket.status_id === 2)
                .length : onlyOpenDepartmentTickets.filter((ticket) => ticket.status_id === 2)
                .length
              }
            />
            <ChartsWidget
              category="Urgent"
              number={
                departmentBranch === "" ? onlyOpenTickets.filter((ticket) => ticket.status_id === 4)
                .length : onlyOpenDepartmentTickets.filter((ticket) => ticket.status_id === 4)
                .length
              }
            />
            <ChartsWidget
              category="Unassigned"
              number={
                departmentBranch === "" ? onlyOpenTickets.filter((ticket) => !ticket.agent_id).length : onlyOpenDepartmentTickets.filter((ticket) => !ticket.agent_id).length
              }
            />
              <ChartsWidget
              category="Resolved"
              number={
                departmentBranch === "" ? onlyOpenTickets.filter((ticket) => ticket.status_id === 3)
                .length : onlyOpenDepartmentTickets.filter((ticket) => ticket.status_id === 3)
                .length
              }
            />
          </div>
          <div className=''>
            <div id="weeklyChartDiv" className={`${trackButton === "weekly" ? '' : 'hidden'}`}>
              <HighchartsReact highcharts={Highcharts} options={weeklyOptions} />
            </div>
            <div id="annualChartDiv" className={`${trackButton === "annual" ? '' : 'hidden'}`}>
              <HighchartsReact className="" highcharts={Highcharts} options={annualDepartmentOptions} />
            </div> {/*END of ANNUAL CHART DIV */}
          </div>{/*END of CHARTS DIV */}
        </div> {/*END of CHARTS WIDGETS DIV */}
      </div>
    </HeaderFooter>
  );
}
