export class Strategy<T> {
  private actions: ((ctx?) => T)[] = [];
  pushAction = (action) => this.actions.push(action);

  execute = (): T[] =>
    this.actions.map((action) => action()).filter((el) => el != null);
}
