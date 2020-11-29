export const trustPass = (pass: string): boolean =>
	/^[\wа-яА-Я]{8,32}$/.test(pass);

export const trustEmail = (email: string): boolean => /^\S+@\S+$/.test(email);
