let fakeData = [
  {
    id: '1',
    status: 'Open',
    title: 'Printer does not work',
    description:
      'My printer takes forever to print Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut molestias non odio natus ex cumque, ab excepturi. Quo, quae vel?',
    assignedTo: 'Gray',
    raisedBy: 'Jim',
    department: 'Executive',
    category: 'IT',
    subcategory: 'Email',
    priority: 'Urgent',
    mainLocation: 'office101',
    contactEmail: 'Bob@memam.ms.gov',
    contactPhone: '555-555-5555',
    timeSubmitted: '1613082440',
    dueIn: '1613082440', //unix epoch seconds;
  },
  {
    id: '3',
    status: 'new',
    title: 'I have problems',
    description: 'Whatever my problem is',
    assignedTo: 'Gray',
    raisedBy: 'Jim',
    category: 'IT',
    subcategory: 'Email',
    priority: 'Low',
    dueIn: '4 days',
  },
  {
    id: '2',
    status: 'Resolved',
    title: 'Need new software',
    description: 'Need adobe to do the jobs',
    assignedTo: 'Casey',
    raisedBy: 'Toya',
    category: 'IT',
    subcategory: 'Email',
    priority: 'Low',
    dueIn: '5 days',
    updates: [
      {
        user: 'Gray Mccoy',
        message: 'I worked on it;  Fixed now :)',
        timeStamp: '2/9/2020',
      },
    ],
  },
];

export default fakeData;
