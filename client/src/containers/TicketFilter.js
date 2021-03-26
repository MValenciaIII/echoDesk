import React, { useContext } from 'react';
import { UserContext } from '../context/dbUserContext';
import {
  FilterDepartmentOptions,
  FilterPriorityOptions,
  FilterLocationOptions,
  FilterPrimaryServiceCategories,
  FilterAgentOptions,
  FilterStatusOptions,
} from '../constants/FilteringTicketsOptions';

import AgentTicketFilterForm from '../components/AgentTicketFilter';

export default function AgentTicketFilterContainer({ children, ...restProps }) {
  const { setAllTickets } = useContext(UserContext);

  async function onSubmit(data, event) {
    // todo: DEFINE API ROUTES IN A CONSTANTS FOLDER LATER; remove
    // todo: remove debugger too
    // debugger;
    try {
      let formData = new FormData(event.target);
      const dataArray = [...formData.entries()].filter((entry) => entry[1]);
      const asString = new URLSearchParams(dataArray).toString();
      console.log(asString);

      const url = 'http://10.195.103.107:3075/api/tickets/filter/search?';
      const query = url.concat(asString);
      let response = await fetch(query, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          body: JSON.stringify(data),
        },
      });
      console.log(response);
      let filteredTickets = await response.json();
      console.log(filteredTickets);
      setAllTickets(filteredTickets);
    } catch (error) {
      console.error({ error });
      setAllTickets([]);
    }
  }

  const formClassname =
    'p-8 mx-auto text-white bg-gray-700 rounded-lg max-w-max sm:max-w-lg';

  const labelClassNames = 'block mt-3';
  const inputClassNames = 'block p-1 rounded-sm text-black w-56  lg:w-72';
  const submitClassNames =
    'block p-1 rounded-sm w-max text-black hover:bg-green-800 hover:text-white ';

  return (
    <AgentTicketFilterForm onSubmit={onSubmit} classNames={formClassname}>
      <AgentTicketFilterForm.Heading />

      <AgentTicketFilterForm.Select
        name="agent_id"
        label="Agent Assigned To"
        labelClassNames={labelClassNames}
        inputClassNames={inputClassNames}
        options={<FilterAgentOptions />}
      />

      {/* //todo: add groups filter */}
      {/* <AgentTicketFilterForm.Select
        name="Groups"
        label="Groups"
        labelClassNames={labelClassNames}
        inputClassNames={inputClassNames}
        options={[
          '',
          'Maintenance',
          'Communications',
          'GIS',
          'IT',
          'Unassigned',
        ]}
      /> */}

      <AgentTicketFilterForm.Select
        name="Created"
        label="Created"
        labelClassNames={labelClassNames}
        inputClassNames={inputClassNames}
        options={[
          '',
          'Within 15 minutes',
          'Within 30 minutes',
          'Within 1 hour',
          'Within 4 hours',
          'Within 12 hours',
          'Within 24 hours',
          'Today',
          'Yesterday',
          'This week',
          'Last 7 days',
          'Last 30 days',
          'Last 60 days',
          'Last 180 days',
        ]}
      />
      <AgentTicketFilterForm.Select
        name="Resolution due by"
        label="Resolution due by"
        labelClassNames={labelClassNames}
        inputClassNames={inputClassNames}
        options={[
          '',
          'Overdue',
          'Today',
          'Tomorrow',
          'Next 8 hours',
          'Next 4 hours',
          'Next 2 hours',
          'Next hour',
          'Next 30 minutes',
        ]}
      />
      <AgentTicketFilterForm.Select
        name="First Response due by"
        label="First Response due by"
        labelClassNames={labelClassNames}
        inputClassNames={inputClassNames}
        options={[
          '',
          'Overdue',
          'Today',
          'Tomorrow',
          'Next 8 hours',
          'Next 4 hours',
          'Next 2 hours',
          'Next hour',
          'Next 30 minutes',
        ]}
      />
      <AgentTicketFilterForm.Select
        name="status_id"
        label="Status"
        labelClassNames={labelClassNames}
        inputClassNames={inputClassNames}
        options={<FilterStatusOptions />}
      />
      <AgentTicketFilterForm.Select
        name="priority_id"
        label="Priority"
        labelClassNames={labelClassNames}
        inputClassNames={inputClassNames}
        options={<FilterPriorityOptions />}
      />
      <AgentTicketFilterForm.Select
        name="department_id"
        label="Department"
        labelClassNames={labelClassNames}
        inputClassNames={inputClassNames}
        options={<FilterDepartmentOptions />}
      />
      <AgentTicketFilterForm.Select
        name="location_id"
        label="Locations"
        labelClassNames={labelClassNames}
        inputClassNames={inputClassNames}
        options={<FilterLocationOptions />}
      />
      <AgentTicketFilterForm.Select
        name="service_id"
        label="Service Type"
        labelClassNames={labelClassNames}
        inputClassNames={inputClassNames}
        options={<FilterPrimaryServiceCategories />}
      />
      <AgentTicketFilterForm.Input
        name="Submit"
        labelClassNames={labelClassNames}
        inputClassNames={submitClassNames}
        type="Submit"
      />
    </AgentTicketFilterForm>
  );
}
