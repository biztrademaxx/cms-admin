export function convert12HrToISO(datetimeStr: string): string {
  const [datePart, timePart, ampm] = datetimeStr.split(/[\s:]+/); // Split by space/colon

  const [day, month, year] = datePart.split("-").map(Number);
  let [hour, minute] = [
    parseInt(timePart, 10),
    parseInt(datetimeStr.split(/[\s:]+/)[2], 10),
  ];

  if (ampm.toUpperCase() === "PM" && hour < 12) hour += 12;
  if (ampm.toUpperCase() === "AM" && hour === 12) hour = 0;

  const date = new Date(year, month - 1, day, hour, minute);
  return date.toISOString();
}

export function convertD24HrToISO(datetimeStr: string): string {
  const [datePart, timePart] = datetimeStr.split(" ");
  const [day, month, year] = datePart.split("-").map(Number);
  const [hour, minute] = timePart.split(":").map(Number);

  const date = new Date(year, month - 1, day, hour, minute);
  return date.toISOString();
}

export function convertISOtoNormal(datetimeStr: string): string {
  const date = new Date(datetimeStr);

  // Convert to IST using Asia/Kolkata timezone
  const options: Intl.DateTimeFormatOptions = {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  const formatter = new Intl.DateTimeFormat("en-IN", options);
  const parts = formatter.formatToParts(date);

  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";

  return `${get("day")}-${get("month")}-${get("year")} ${get("hour")}:${get(
    "minute"
  )} ${get("dayPeriod")}`;
}
