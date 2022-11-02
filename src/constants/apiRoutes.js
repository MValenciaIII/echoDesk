//ALL API ROUTES ARE DEFINED HERE AS THE SOURCE OF TRUTH FOR API

const baseApiUrl = 'http://10.250.138.65:3075/api/';


export const allTicketsRoute = 'http://10.250.138.65:3075/api/tickets';


export function departmentTicketsRoute (id) {
  return baseApiUrl.concat(`tickets/departmenttickets/${id}`);
}

// export const departmentTicketsRoute = 'http://10.250.138.65:3075/api/tickets/departmenttickets/2'

export function dbUserRoute(id) {
  return baseApiUrl.concat(`users/${id}`);
}
export function dbUsersTicketsRoute(id) {
  return baseApiUrl.concat(`tickets/${id}`);
}
export const createTicketRoute =
  'http://10.250.138.65:3075/api/tickets/create';

export const filteringRoute = baseApiUrl.concat('tickets/filter/search?');

export const updateUserRoute = (id) => baseApiUrl.concat(`users/update/${id}`);

export const createAgentRoute = baseApiUrl.concat('agents/create');
export const createUserRoute = baseApiUrl.concat('users/create');
export const createNoteRoute = baseApiUrl.concat('notes/create');
export const updateTicketRoute = (id) =>
  baseApiUrl.concat(`tickets/update/${id}`);

export const quickFilterRoute = baseApiUrl.concat('tickets/quickFilters/find?');

export const imagePostRoute = baseApiUrl.concat('files/post');

export const sendEmailRoute = baseApiUrl.concat('mail/sendNotification');
// http://10.195.103.107:3075/api/tickets/update/${id}
// http://10.195.103.107:3075/api/notes/create
// http://10.195.103.107:3075/api/agents/create
// http://10.195.103.107:3075/api/users/create
