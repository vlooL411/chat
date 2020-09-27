export type Store = "Panel" | "ChatLastMes" | "" | string;

export default class LocalStorage {
  static localStorage = globalThis?.localStorage;

  static get = <T>(
    local: Store,
    localValue: string,
    defaultValue: T = null
  ) => {
    const postsLocal = LocalStorage?.localStorage?.getItem(local + localValue);
    return postsLocal ? (JSON.parse(postsLocal) as T) : defaultValue;
  };

  static getString = (
    local: Store,
    localValue: string,
    defaultValue: string = null
  ) => {
    const postsLocal = LocalStorage?.localStorage?.getItem(local + localValue);
    return postsLocal ? postsLocal : defaultValue;
  };

  static set = (local: Store, localValue: string, value): void =>
    LocalStorage?.setString(local, localValue, JSON.stringify({ ...value }));

  static setString = (local: Store, localValue: string, value: string): void =>
    LocalStorage?.localStorage?.setItem(local + localValue, value);
}

globalThis.LocalStorage = LocalStorage;
