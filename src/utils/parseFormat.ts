import dayjs from "dayjs";

export const parseFormat = (date:string) => {
    const parsedDate = dayjs(date, 'YYYY-MM-DDTHH:mm:ssZ');
    return parsedDate.isValid() ? parsedDate.format('MM/DD/YYYY') : date;
}