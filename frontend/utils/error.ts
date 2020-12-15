export const ErrorMessage = <T>(name: string, mes: T): void =>
	mes && console.error(name, mes);

export const Errors = <T>(name: string, ...messages: T[]): void => {
	const mess = messages.filter(mes => mes);
	if (mess.length == 0) return;

	console.groupCollapsed(`%cError ${name}`, 'background: red');
	mess.forEach(mes => console.error(mes));
	console.groupEnd();
};
