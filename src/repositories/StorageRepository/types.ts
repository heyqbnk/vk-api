/**
 * @see https://vk.com/dev/storage.get
 */
interface IGetSharedParams {
  user_id?: number;
}

export interface IGetSingleKeyParams extends IGetSharedParams {
  key: string;
}

export interface IGetMultipleKeysParams extends IGetSharedParams {
  keys: string[];
}

export type TGetParams = IGetSingleKeyParams | IGetMultipleKeysParams;

export type TGetResult = {key: string; value: string}[]

/**
 * @see https://vk.com/dev/storage.getKeys
 */
export interface IGetKeysParams {
  user_id?: number;
  offset?: number;
  count?: number;
}

export type TGetKeysResult = string[];

/**
 * @see https://vk.com/dev/storage.set
 */
export interface ISetParams {
  user_id?: number;
  key: string;
  value: string;
}

export type TSetResult = 1;