/*
  This was borrowed from the module lesson starter code. Comments have been added explaining what it's doing to illustrate understanding.
*/

// receives the numeric calendar day value from below and appends a suffix to it for grammatical purposes
// example: dates that end with the number 1 will have "st" appended so they will read "1st", dates that end with the number 3 with have "rd" appended so they will read "3rd"
// this does not append to dates meeting above criteria if they are 11, 12, or 13 because grammatically saying the "11st" is incorrect, but hilarious to think about
const addDateSuffix = date => {
  let dateStr = date.toString();

  // get last char of date string
  const lastChar = dateStr.charAt(dateStr.length - 1);

  if (lastChar === '1' && dateStr !== '11') {
    dateStr = `${dateStr}st`;
  } else if (lastChar === '2' && dateStr !== '12') {
    dateStr = `${dateStr}nd`;
  } else if (lastChar === '3' && dateStr !== '13') {
    dateStr = `${dateStr}rd`;
  } else {
    dateStr = `${dateStr}th`;
  }

  // returns the date with suffix added to be used as the dayOfMonth
  return dateStr;
};

// function to format a timestamp, accepts the timestamp and an `options` object as optional parameters
module.exports = (
  timestamp,
  { monthLength = 'short', dateSuffix = true } = {}
) => {
  let months;

  if (monthLength === 'short') {
    months = {
      0: 'Jan',
      1: 'Feb',
      2: 'Mar',
      3: 'Apr',
      4: 'May',
      5: 'Jun',
      6: 'Jul',
      7: 'Aug',
      8: 'Sep',
      9: 'Oct',
      10: 'Nov',
      11: 'Dec'
    };
  } else {
    months = {
      0: 'January',
      1: 'February',
      2: 'March',
      3: 'April',
      4: 'May',
      5: 'June',
      6: 'July',
      7: 'August',
      8: 'September',
      9: 'October',
      10: 'November',
      11: 'December'
    };
  }

  // take the createdAtVal supplied in the getter for createdAt and create a dateObj with that timestamp
  const dateObj = new Date(timestamp);
  // use the dateObj and JavaScript's .getMonth() method to return the numeric value for month then format it using the months defined above
  const formattedMonth = months[dateObj.getMonth()];

  let dayOfMonth;

  // if dateSuffix evaluates to truthy grab the dateObj from above and use JavaScript's .getDate() method to pull the numeric value of the calendar day then pass that numeric value to addDateSuffix to append the appropriate suffix to the numeric value
  if (dateSuffix) {
    dayOfMonth = addDateSuffix(dateObj.getDate());
  } else {
    dayOfMonth = dateObj.getDate();
  }

  const year = dateObj.getFullYear();

  let hour;
  // check for 24-hr time
  // dateObj.getHours() was missing the parentheses
  if (dateObj.getHours() > 12) {
    hour = Math.floor(dateObj.getHours() / 2);
  } else {
    hour = dateObj.getHours();
  }
  // if hour is 0 (12:00am), change it to 12
  if (hour === 0) {
    hour = 12;
  }

  const minutes = dateObj.getMinutes();

  // set `am` or `pm`
  let periodOfDay;

  if (dateObj.getHours() >= 12) {
    periodOfDay = 'pm';
  } else {
    periodOfDay = 'am';
  }

  // combines formatted items to produce something like "Feb 1st, 2022 at 2:47pm"
  const formattedTimeStamp = `${formattedMonth} ${dayOfMonth}, ${year} at ${hour}:${minutes} ${periodOfDay}`;

  // returns the formatted timestamp to be viewed in responses
  return formattedTimeStamp;
};
