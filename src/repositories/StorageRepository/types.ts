/**
 * @see https://vk.com/dev/storage.get
 */
interface IGetSharedParams {
  userId?: number;
}

export interface IGetSingleKeyParams extends IGetSharedParams {
  key: string;
}

export interface IGetMultipleKeysParams extends IGetSharedParams {
  keys: string[];
}

export type TGetParams = IGetSingleKeyParams | IGetMultipleKeysParams;

export type TGetSingleKeyResult = string;

export type TGetMultipleKeysResult = { key: string; value: string }[];

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