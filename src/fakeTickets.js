let fakeData = [
  {
    id: '1',
    status: 'Open',
    title: 'Printer does not work',
    description: 'My printer takes forever to print',
    assignedTo: 'Gray',
    raisedBy: 'Jim',
    department: 'Executive',
    category: 'IT',
    subcategory: 'Email',
    priority: 'Urgent',
    contactEmail: 'Bob@memam.ms.gov',
    contactPhone: '555-555-5555',
    dueIn: '1613082440', //unix epoch seconds;
  },
  {
    id: '3',
    status: 'new',
    title: 'I have problems',
    description: 'Whatever my problem is',
    assignedTo: 'Gray',
    raisedBy: 'Jim',
    category: 'Printers',
    priority: 'Low',
    dueIn: '4 days',
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
