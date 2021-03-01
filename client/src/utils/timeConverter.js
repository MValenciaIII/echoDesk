export default function convertUnix(unixTimestamp) {
  // Create a new JavaScript Date object based on the timestamp
  // multiplied by 1000 so that the argument is in milliseconds, not seconds.
  let date = new Date(unixTimestamp * 1000);
  let formattedTime =
    date.toDateString() + ' ' + date.toLocaleTimeString('en-US');

  return formattedTime;
}
