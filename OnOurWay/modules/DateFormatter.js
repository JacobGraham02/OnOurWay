const months_formatter = new Map();
const days_formatter = new Map();

months_formatter.set(1, 'January');
months_formatter.set(2, "February");
months_formatter.set(3, "March");
months_formatter.set(4, "April");
months_formatter.set(5, "May");
months_formatter.set(6, "June");
months_formatter.set(7, "July");
months_formatter.set(8, "August");
months_formatter.set(9, "September");
months_formatter.set(10, "October");
months_formatter.set(11, "November");
months_formatter.set(12, "December");

days_formatter.set(1, "Sunday");
days_formatter.set(2, "Monday");
days_formatter.set(3, "Tuesday");
days_formatter.set(4, "Wednesday");
days_formatter.set(5, "Thursday");
days_formatter.set(6, "Friday");
days_formatter.set(7, "Saturday");

/**
 * Returns a date in the form of: day of week, month day of month, year. For example, the following string is a valid return: Wednesday, October 26, 2022 
 * Conversions from an integer to string for month and day of the week is done through a hash map. 
 * @param {integer} day_of_week 
 * @param {integer} month 
 * @param {integer} day_of_month 
 * @param {integer} year 
 * @returns string of the form: day of week, month day of month, year; e.g. Wednesday, October 26, 2022
 */
function getDateAsString(day_of_week, month, day_of_month, year) {
    return `${days_formatter.get(day_of_week)}, ${months_formatter.get(month)} ${day_of_month}, ${year}`;
}

export {getDateAsString};