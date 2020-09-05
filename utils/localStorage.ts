export const setItemString = (key: string, value: string) =>
  globalThis?.localStorage.setItem(key, value);

export const setItem = (key: string, value: any): void =>
  setItemString(key, JSON.stringify({ ...value }));

export const getItem = <T>(key: string): T =>
  JSON.parse(globalThis?.localStorage?.getItem(key));

export const getItemDefault = <T>(key: string, defaultValue: T): T =>
  getItem(key) ?? defaultValue;

export enum LocalStorage {
  autorization = "autorization",
}
