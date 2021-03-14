import React from 'react';

import AgentTicketFilterForm from '../components/AgentTicketFilter';

export default function agentTicketFilterContainer({ children, ...restProps }) {
  const onSubmit = (data) => console.log(data);

  const formClassname =
    'p-8 mx-auto text-white bg-gray-700 rounded-lg max-w-max sm:max-w-lg';

  const labelClassNames = 'block mt-3';

  const inputClassNames = 'block p-1 rounded-sm text-black w-56 l lg:w-72';

  return (
    <AgentTicketFilterForm onSubmit={onSubmit} classNames={formClassname}>
      <AgentTicketFilterForm.Heading />

      <AgentTicketFilterForm.Select
        name="Agents"
        labelClassNames={labelClassNames}
        inputClassNames={inputClassNames}
        options={['', 'Bob', 'Casey', 'Alisha']}
      />
      <AgentTicketFilterForm.Select
        name="Groups"
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
      />
      <AgentTicketFilterForm.Select
        name="Created"
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
        name="Status"
        labelClassNames={labelClassNames}
        inputClassNames={inputClassNames}
        options={[
          '',
          'All unresolved',
          'Open',
          'Pending',
          'Resolved',
          'Closed',
        ]}
      />
      <AgentTicketFilterForm.Select
        name="Priority"
        labelClassNames={labelClassNames}
        inputClassNames={inputClassNames}
        options={['', 'Low', 'Medium', 'High', 'Urgent']}
      />
      <AgentTicketFilterForm.Select
        name="Type"
        labelClassNames={labelClassNames}
        inputClassNames={inputClassNames}
        options={[
          '',
          'Executive',
          'Preparedness',
          'Mitigation',
          'Warehouse',
          'Support Services',
          'Human Resources',
          'Maintenance',
          'Recovery',
          'Field Services',
          'External Affairs',
          'Logisticis',
          'Operations',
          'Individual Assistance',
          'Information Technology',
          'Service Task',
        ]}
      />
      <AgentTicketFilterForm.Select
        name="Location"
        labelClassNames={labelClassNames}
        inputClassNames={inputClassNames}
        options={[
          '',
          'HQ (Pearl)',
          'SELOC (Byram)',
          'Bolton Building (Biloxi)',
        ]}
      />
      <AgentTicketFilterForm.Select
        name="Service Type"
        labelClassNames={labelClassNames}
        inputClassNames={inputClassNames}
        options={[
          '',
          'None',
          'Building Maintenance',
          'Information Technology (IT)',
          'Communications',
          'GIS/Mapping',
          'Employee Setup',
          'WASP Inventory System',
          'Training Requests',
          'Thermoscan Account',
        ]}
      />
    </AgentTicketFilterForm>
  );
}
