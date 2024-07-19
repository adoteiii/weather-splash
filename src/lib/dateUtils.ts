// src/lib/dateUtils.ts

/**
 * Convert epoch time to a formatted date string.
 * @param {string} localtime - The local time in string format.
 * @param {number} dateEpoch - The epoch time in seconds.
 * @param {string} format - The format for the date string.
 * @returns {string} - The formatted date string.
 */
export function convertToDate(localtime: string, dateEpoch: number, format: string): string {
  // Convert dateEpoch to a JavaScript Date object
  const date = new Date(dateEpoch * 1000);

  // Format the date as needed based on the `format` parameter
  // For simplicity, we will use 'short' format as an example
  if (format === "short") {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  // Add more formatting options as needed
  return date.toLocaleDateString('en-US');
}

/**
 * Convert a time string in 'HH:MM' format to 'h:MM AM/PM' format.
 * @param {string} time - The time string in 'HH:MM' format.
 * @returns {string} - The formatted time string in 'h:MM AM/PM' format.
 */


export function formatSunTimeWithAMPM(sunTime: string, timezoneOffset: number): string {
  // Log the raw sun time
  console.log('Raw Sun Time (string):', sunTime);

  // Create a Date object for the sun time
  const [time, period] = sunTime.split(' '); // assuming sunTime is in "hh:mm AM/PM" format
  const [hours, minutes] = time.split(':').map(Number);

  let sunDate = new Date();
  sunDate.setHours(hours + (period === 'PM' && hours !== 12 ? 12 : 0));
  sunDate.setMinutes(minutes);
  sunDate.setSeconds(0);

  // Log the initial sun time in UTC
  console.log('Sun Time UTC Date:', sunDate.toUTCString());

  // Calculate the local time using the timezone offset (in minutes)
  const localTime = new Date(sunDate.getTime() + timezoneOffset * 60000);

  // Log the local time after applying timezone offset
  console.log('Local Time Date:', localTime.toString());

  // Extract hours and minutes
  let localHours = localTime.getHours();
  const localMinutes = localTime.getMinutes();

  // Log extracted hours and minutes
  console.log('Extracted Hours:', localHours);
  console.log('Extracted Minutes:', localMinutes);

  // Determine AM/PM
  const localPeriod = localHours >= 12 ? 'PM' : 'AM';

  // Convert hours to 12-hour format
  localHours = localHours % 12 || 12;

  // Return formatted time
  const formattedTime = `${localHours}:${localMinutes.toString().padStart(2, '0')} ${localPeriod}`;

  // Log the final formatted time
  console.log('Formatted Time:', formattedTime);

  return formattedTime;
}
