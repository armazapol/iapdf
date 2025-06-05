import dayjs from "dayjs";

export const parseFormat = (date:string) => {
    const parsedDate = dayjs(date, 'YYYY-MM-DDTHH:mm:ssZ');
    return parsedDate.isValid() ? parsedDate.format('MM/DD/YYYY') : date;
}

export const parseFormatToPayload = (date:string) => {
    const parsedDate = dayjs(date, 'YYYY-MM-DDTHH:mm:ssZ');
    return parsedDate.isValid() ? parsedDate.format('YYYY-MM-DD') : date;
}
