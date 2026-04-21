import dayjs from "dayjs";

export const formatDate = (date, format = "DD MMM YYYY") => {
  if (!date) return "";
  return dayjs(date).format(format);
};

export const formatDateTime = (date, time) => {
  if (!date) return "";
  const d = dayjs(date).format("dddd, DD MMMM YYYY");
  return time ? `${d} at ${time}` : d;
};

export const formatDateLong = (date) => {
  if (!date) return "";
  return dayjs(date).format("dddd, DD MMMM YYYY");
};

export const formatDateShort = (date) => {
  if (!date) return "";
  return dayjs(date).format("DD MMM");
};

export const isToday = (date) => {
  return dayjs(date).isSame(dayjs(), "day");
};

export const isPast = (date) => {
  return dayjs(date).isBefore(dayjs(), "day");
};

export const getDaysInMonth = (year, month) => {
  const days = [];
  const date = new Date(year, month, 1);
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
};

export const getFirstDayOfMonth = (year, month) => {
  return new Date(year, month, 1).getDay();
};
