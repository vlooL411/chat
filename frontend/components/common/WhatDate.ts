export const WhatDate = (
	date: Date,
	today: Date = new Date(),
	yesterday: Date = GetYesterdey(),
): string => {
	const dateString = date.toLocaleDateString();
	//check today
	if (dateString == today.toLocaleDateString()) return getHHMMPA(date);
	//check yesterday
	if (dateString == yesterday.toLocaleDateString()) return 'yesterday';
	return dateString;
};

export const getHHMMPA = (date: Date): string => {
	const minutes = date.getMinutes();
	const localeDate = date.toLocaleTimeString();

	return (
		`${date.getHours()}:` +
		`${minutes < 10 ? '0' : ''}${minutes}` +
		` ${localeDate.slice(localeDate.length - 2, localeDate.length)}`
	);
};

export const getHHMMSSPA = (date: Date): string => {
	const seconds = date.getSeconds();
	const minutes = date.getMinutes();
	const localeDate = date.toLocaleTimeString();

	return (
		`${date.getHours()}:` +
		`${minutes < 10 ? '0' : ''}${minutes}:` +
		`${seconds < 10 ? '0' : ''}${seconds}` +
		` ${localeDate.slice(localeDate.length - 2, localeDate.length)}`
	);
};

export const WhatDateToday = (date: Date, today: Date = new Date()): string =>
	WhatDate(date, today, GetYesterdey(today));

export const GetYesterdey = (date: Date = new Date()): Date =>
	new Date(date.getTime() - 1000 * 60 * 60 * 24);
