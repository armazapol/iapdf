import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/es";

export const parseFormat = (date: string) => {
  const parsedDate = dayjs(date, "YYYY-MM-DDTHH:mm:ssZ");
  return parsedDate.isValid() ? parsedDate.format("MM/DD/YYYY") : date;
};

export const parseFormatToPayload = (date: string) => {
  const parsedDate = dayjs(date, "YYYY-MM-DDTHH:mm:ssZ");
  return parsedDate.isValid() ? parsedDate.format("YYYY-MM-DD") : date;
};

export const parseFormatTimestampToDate = (timestamp: number) => {
  const date = timestamp * 1000; // Convert seconds to milliseconds
  const parsedDate = dayjs(date);
  return parsedDate.format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
};

export const parseFormatRelativeTime = (date: string) => {
  dayjs.extend(relativeTime);
  dayjs.locale("en");

  const fechaNotification = dayjs(date);
  return fechaNotification.fromNow();
};
