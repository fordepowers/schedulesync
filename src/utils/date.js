const DAYS_OF_WEEK = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
]

export function parseDate(dateObject) {
  return `${DAYS_OF_WEEK[dateObject.getDay()]}, ${MONTHS[dateObject.getMonth()]} ${dateObject.getDate()}, ${dateObject.getFullYear()}`
}

export function parseTableTime(dateObject) {
  let hours;
  let suffix;
  let minutes;

  if (dateObject.getHours() == 0) {
    hours = "12"
  } else if (dateObject.getHours() > 12) {
    let adjusted = dateObject.getHours() - 12;
    hours = String(adjusted);
  } else {
    hours = String(dateObject.getHours());
  }

  if (dateObject.getHours() < 12) {
    suffix = "AM"
  } else {
    suffix = "PM"
  }

  if (dateObject.getMinutes() == 0) {
    minutes = "00";
  } else {
    minutes = String(dateObject.getMinutes());
  } 

  return `${hours}:${minutes} ${suffix}`;
}