export type IndexedObject<V = any> = { [k: string]: V };

export type TAction<T> = {
  type: string;
  payload: IndexedObject<T>;
};

export type Locale = { code: string; name: string; bidi: boolean };

export type TOption<T = string | number> = {
  label: string;
  value?: T;
};

export type TCallback = { callback?: () => void };
