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
export function formatSunTimeWithAMPM(sunset: number, timezoneOffset: number): string {
  // Create a Date object for the sunset time
  const sunsetDate = new Date(sunset * 1000); // assuming sunset is in seconds

  // Calculate the local time using the timezone offset (in minutes)
  const localTime = new Date(sunsetDate.getTime() + timezoneOffset * 60000);

  // Extract hours and minutes
  let hours = localTime.getUTCHours();
  const minutes = localTime.getUTCMinutes();

  // Determine AM/PM
  const period = hours >= 12 ? 'PM' : 'AM';

  // Convert hours to 12-hour format
  hours = hours % 12 || 12;

  // Return formatted time
  return `${hours}:${minutes.toString().padStart(2, '0')} ${period}`;
}

