export const WhatDate = (date: Date, today: Date, yesterday: Date): string => {
  const dateString = date.toLocaleDateString();
  //check today
  if (dateString == today.toLocaleDateString())
    return date.toLocaleTimeString();
  //check yesterday
  if (dateString == yesterday.toLocaleDateString()) return "yesterday";
  return dateString;
};

export const WhatDateToday = (date: Date, today: Date = new Date()): string =>
  WhatDate(date, today, GetYesterdey(today));

export const GetYesterdey = (date: Date): Date =>
  new Date(date.getTime() - 1000 * 60 * 60 * 24);
