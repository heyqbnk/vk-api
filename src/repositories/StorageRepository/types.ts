/**
 * @see https://vk.com/dev/storage.get
 */
export type TGetParams =
  { userId?: number; }
  & ({ key: string } | { keys: string[] })

export type TGetResult = { key: string; value: string }[];

/**
 * @see https://vk.com/dev/storage.getKeys
 */
export interface IGetKeysParams {
  userId?: number;
  offset?: number;
  count?: number;
}

export type TGetKeysResult = string[];

/**
 * @see https://vk.com/dev/storage.set
 */
export interface ISetParams {
  userId?: number;
  key: string;
  value: string;
}

export type TSetResult = 1;