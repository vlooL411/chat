export const first = <T>(arr: T[]): T => (arr?.length > 0 ? arr[0] : null);
export const last = <T>(arr: T[]): T =>
	arr?.length > 0 ? arr[arr.length - 1] : null;
