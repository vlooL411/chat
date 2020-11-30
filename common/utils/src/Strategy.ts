export class Strategy<T> {
	private actions: ((ctx?) => T)[] = [];
	pushAction = (action: (ctx?) => T): number => this.actions.push(action);

	execute = (): T[] =>
		this.actions.map(action => action()).filter(el => el != null);
}
