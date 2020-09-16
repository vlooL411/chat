export const WhatDate = (date: Date, today: Date, yesterday: Date): string => {
  const dateString = date.toLocaleDateString();
  //check today
  if (dateString == today.toLocaleDateString()) return getHHMMPA(date);
  //check yesterday
  if (dateString == yesterday.toLocaleDateString()) return "yesterday";
  return dateString;
};

export const getHHMMPA = (date: Date): string => {
  const minute = date.getMinutes();
  const localeDate = date.toLocaleTimeString();
  return `${date.getHours()}:${
    minute < 10 ? "0" : ""
  }${minute} ${localeDate.slice(localeDate.length - 2, localeDate.length)}`;
};

export const WhatDateToday = (date: Date, today: Date = new Date()): string =>
  WhatDate(date, today, GetYesterdey(today));

export const GetYesterdey = (date: Date): Date =>
  new Date(date.getTime() - 1000 * 60 * 60 * 24);
