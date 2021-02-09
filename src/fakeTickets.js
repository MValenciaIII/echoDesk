let fakeData = [
  {
    id: '1',
    status: 'new',
    title: 'Printer does not work',
    description: 'My printer takes forever to print',
    assignedTo: 'Gray',
    raisedBy: 'Jim',
    category: 'Printers',
    priority: 'Urgent',
    dueIn: '3 days',
  },
  {
    id: '2',
    status: 'In Progress',
    title: 'Need new software',
    description: 'Need adobe to do the jobs',
    assignedTo: 'Casey',
    raisedBy: 'Toya',
    category: 'Software',
    priority: 'Low',
    dueIn: '5 days',
    updates: [
      {
        user: null,
        message: 'I worked on it;  Fixed now :)',
        timeStamp: '2/9/2020',
      },
    ],
  },
];

export default fakeData;
