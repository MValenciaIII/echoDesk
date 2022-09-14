//ALL API ROUTES ARE DEFINED HERE AS THE SOURCE OF TRUTH FOR API

const baseApiUrl = 'https://www.mema4kids.info/api/';


export const allTicketsRoute = 'https://www.mema4kids.info/api/tickets';


export function departmentTicketsRoute (id) {
  return baseApiUrl.concat(`tickets/departmenttickets/${id}`);
}

// export const departmentTicketsRoute = 'https://www.mema4kids.info/api/tickets/departmenttickets/2'

export function dbUserRoute(id) {
  return baseApiUrl.concat(`users/${id}`);
}
export function dbUsersTicketsRoute(id) {
  return baseApiUrl.concat(`tickets/${id}`);
}
export const createTicketRoute =
  'https://www.mema4kids.info/api/tickets/create';

export const filteringRoute = baseApiUrl.concat('tickets/filter/search?');

export const updateUserRoute = (id) => baseApiUrl.concat(`users/update/${id}`);

export const createAgentRoute = baseApiUrl.concat('agents/create');
export const createUserRoute = baseApiUrl.concat('users/create');
export const createNoteRoute = baseApiUrl.concat('notes/create');
export const updateTicketRoute = (id) =>
  baseApiUrl.concat(`tickets/update/${id}`);

export const quickFilterRoute = baseApiUrl.concat('tickets/quickFilters/find?');

export const imagePostRoute = baseApiUrl.concat('files/post');

// http://10.195.103.107:3075/api/tickets/update/${id}
// http://10.195.103.107:3075/api/notes/create
// http://10.195.103.107:3075/api/agents/create
// http://10.195.103.107:3075/api/users/create
