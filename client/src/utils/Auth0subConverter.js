//! the | get's converted in a query string to a code symbol; Thus, avoiding storing the | and just stoiring the num; ~wk 3-15
export default function auth0SubConverter(user) {
  let barIndex = user.sub.indexOf('|') + 1;
  let userId = user.sub.substring(barIndex);
  return userId;
}
