//# takes in a mySql timesamp and give back the below;
export default function convertUnix(mySqlTimestamp) {
  // Create a new JavaScript Date object based on the timestamp
  // multiplied by 1000 so that the argument is in milliseconds, not seconds.
  let time = new Date(mySqlTimestamp);

  let dateString = time.toDateString();
  let dateArray = dateString.split(' ');
  let timeString = time.toLocaleTimeString('en-US');

  let formattedTime = `${dateArray[0]}, ${dateArray[2]} ${dateArray[1]}, ${dateArray[3]} at ${timeString}`;

  // Wed, 10 Feb at 9:11 AM

  return formattedTime;
}
