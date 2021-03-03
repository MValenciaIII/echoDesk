export default async function getUsersTickets(auth0sub) {
  let url = `http://10.195.103.107:3075/api/tickets/${auth0sub}`;
  let response = await fetch(url);
  let tickets = await response.json();
  return tickets;
}
