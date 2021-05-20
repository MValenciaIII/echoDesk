import React, { useContext, useEffect } from 'react';
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

export default function ChartsPage(props) {
  const { allTickets, auth0UserMeta } = useContext(UserContext);
  let onlyOpenTickets = allTickets.filter(
    (ticket) => ticket.status_id !== 3 && ticket.status_id !== 4
  );
  console.dir(allTickets);
  // debugger;
  let history = useHistory();
  let today = new Date();

  useEffect(() => {
    if (auth0UserMeta && !auth0UserMeta.isAdmin) {
      history.push('/');
    }
  }, [auth0UserMeta]);

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

  const options = {
    title: {
      text: 'Ticket Volume',
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

  for (let i = 0; i < 6; i++) {
    //   arbitrary 5 day view fo tickets...
    let newTickets = allTickets?.filter((ticket) =>
      CreatedDaysAgoFilter(ticket, i)
    );
    let length = newTickets?.length;
    options.series[0].data.unshift(length); //unshift to front of array

    //  Closed by day view
    let closedResolvedArr = allTickets?.filter((ticket) =>
      ClosedByDayFilter(ticket, i)
    );
    options.series[1].data.unshift(closedResolvedArr?.length);

    //  Adding categories for X axis date and formatting it
    let xAxisDate = sub(today, {
      days: i,
    });
    let xFormatted = format(xAxisDate, 'MM/dd/uu');
    options.xAxis.categories.unshift(xFormatted);
  }
  // todo: style
  if (!allTickets) {
    return <LoaderIcon />;
  }

  return (
    <HeaderFooter>
      <div className="flex-grow w-full p-8 bg-base ">
        <div
          id="ChartsPageContainer"
          className={'max-w-screen-2xl mx-auto'}
          // flex-grow to make sure it takes up whole height of browser if content is small
        >
          <div className="flex flex-wrap justify-around gap-4 mb-3">
            <ChartsWidget
              category="Unresolved"
              number={onlyOpenTickets.length}
            />
            <ChartsWidget
              category="Open"
              number={
                onlyOpenTickets.filter((ticket) => ticket.status_id === 1)
                  .length
              }
            />
            <ChartsWidget
              category="Pending"
              number={
                onlyOpenTickets.filter((ticket) => ticket.status_id === 2)
                  .length
              }
            />
            <ChartsWidget
              category="Urgent"
              number={
                onlyOpenTickets.filter((ticket) => ticket.priority_id === 4)
                  .length
              }
            />
            <ChartsWidget
              category="Unassigned"
              number={
                onlyOpenTickets.filter((ticket) => !ticket.agent_id).length
              }
            />
          </div>
          <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
      </div>
    </HeaderFooter>
  );
}
