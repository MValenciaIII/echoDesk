import React, { useContext, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import sub from 'date-fns/sub';
import differenceInDays from 'date-fns/differenceInDays';
import parseISO from 'date-fns/parseISO';
import format from 'date-fns/format';
import { UserContext } from '../context/dbUserContext';
import HeaderFooter from '../containers/HeaderFooter';

export default function ChartsPage(props) {
  const { allTickets } = useContext(UserContext);
  let today = new Date();

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
  return (
    <HeaderFooter>
      <div className="flex-grow w-full p-8 bg-base ">
        <div
          id="ChartsPageContainer"
          className={'max-w-screen-2xl mx-auto'}
          // flex-grow to make sure it takes up whole height of browser if content is small
        >
          <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
      </div>
    </HeaderFooter>
  );
}
