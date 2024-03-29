import React, { useContext } from 'react';
import { UserContext } from '../context/dbUserContext';
import {
  FilterDepartmentOptions,
  FilterPriorityOptions,
  FilterLocationOptions,
  FilterPrimaryServiceCategories,
  FilterAgentOptions,
  FilterStatusOptions,
  FilterCreatedAtDate,
} from '../constants/FilteringTicketsOptions';

import AgentTicketFilterForm from '../components/AgentTicketFilter';
import { filteringRoute, allTicketsRoute } from '../constants/apiRoutes';

//! Notice all the constants that have been imported so that the options have a single source of truth in the constants file

export default function AgentTicketFilterContainer({ children, ...restProps }) {
  const { setAllTickets, setcurrentFilterQuery, setWhichFilter } = useContext(
    UserContext
  );
  const defaultValues = {
    agent_id: '',
    created_at: '12 Month',
    Resolution_due_by: '',
    First_Response_due_by: '',
    status_id: '',
    priority_id: '',
    department_id: '',
    location_id: '',
    service_id: '',
    reactSelect: '',
  };

  async function onSubmit(data, event) {
    try {
      // This url will be the filtering route, BUT the query parameters will be appended to the the filtering url...
      let url;
      let formData = new FormData(event.target);
      const dataArray = [...formData.entries()].filter((entry) => entry[1]);
      // Make the filtering query into a string to append to url
      const dataAsString = new URLSearchParams(dataArray).toString();
      console.log(dataAsString);

      //removing the nulls from the object
      let dataArrayWithNullsRemoved = Object.entries(data).filter(
        ([item, val]) => val
      );
      //An empty filter resets the form and just gets all the ticket
      if (dataArrayWithNullsRemoved.length === 0) {
        url = allTicketsRoute;
      } else {
        url = filteringRoute;
        url = url.concat(dataAsString);
      }

      // ! This context state setter is getting stored to context in order to later access it on the refreshing of the ticket when a comment is submitted to determine whether to fetch ALL tickets or to fetch the currently set filtered tickets
      setcurrentFilterQuery(url);
      //This test piece of state is used to determine whether to use the little filter or the bigger more powerful filter
      setWhichFilter('BIG');

      let response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          body: JSON.stringify(data),
        },
      });
      let filteredTickets = await response.json();
      let sortedTickets = filteredTickets.sort((one, two) => {
        return two.id - one.id;
      });
      setAllTickets(sortedTickets);
    } catch (error) {
      console.error({ error });
      setAllTickets([]);
    }
  }

  const formClassname =
    'p-8 mx-auto text-text-base bg-off-base rounded-lg max-w-max sm:max-w-lg';

  const labelClassNames = 'block mt-3';
  const submitLabelClassNames = 'mt-3';
  const inputClassNames =
    'block p-1 rounded-sm text-text-base-inverted w-56  lg:w-72';
  const submitClassNames =
    'inline-block p-1 rounded-sm bg-base w-max text-text-base hover:bg-action hover:text-text-base font-bold';

  return (
    <AgentTicketFilterForm
      onSubmit={onSubmit}
      classNames={formClassname}
      defaultValues={defaultValues}
    >
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
        name="created_at"
        label="Created"
        labelClassNames={labelClassNames}
        inputClassNames={inputClassNames}
        options={<FilterCreatedAtDate />}
      />
      {/* //todo: come back and implement later? */}
      {/* <AgentTicketFilterForm.Select
        name="Resolution_due_by"
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
        name="First_Response_due_by"
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
      /> */}
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

      {/* note the name prop is required even though not an input due to the react.children.map in the component file.  It only renders a child if the component has a name prop, but I added a couple of components that are not inputs (e.g. flex pane and submit button)  */}

      <AgentTicketFilterForm.FlexPane
        classNames="flex justify-between mt-3 items-end"
        name="flexPane"
      >
        <AgentTicketFilterForm.Input
          name="Submit"
          labelClassNames={submitLabelClassNames}
          inputClassNames={submitClassNames}
          type="Submit"
        />

        <AgentTicketFilterForm.Button
          name="ResetButton"
          onSubmit={onSubmit}
          defaultValues={defaultValues}
        />
      </AgentTicketFilterForm.FlexPane>
    </AgentTicketFilterForm>
  );
}
