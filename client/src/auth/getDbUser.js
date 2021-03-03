export default async function getDbUser(auth0sub) {
  let url = `http://10.195.103.107:3075/api/users/${auth0sub}`;
  let response = await fetch(url);
  let user = await response.json();
  return user;
}
