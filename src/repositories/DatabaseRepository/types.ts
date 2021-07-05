import {IIdTitlePair, IPager} from '../../types';

/**
 * Default pager with item as object with id and title
 */
type TDefaultPager = IPager<IIdTitlePair>;

/**
 * @see https://vk.com/dev/database.getChairs
 */
export interface IGetChairsParams {
  faculty_id: number;
  offset?: number;
  count?: number;
}

export type TGetChairsResult = TDefaultPager;

/**
 * @see https://vk.com/dev/database.getCities
 */
export interface IGetCitiesParams {
  country_id: number;
  region_id?: number;
  q?: string;
  need_all?: boolean;
  offset?: number;
  count?: number;
}

export type TGetCitiesResult = IPager<IIdTitlePair & {
  area?: string;
  region?: string;
  important?: boolean;
}>;

/**
 * @see https://vk.com/dev/database.getCitiesById
 */
export interface IGetCitiesByIdParams {
  city_ids?: number[];
}

export type TGetCitiesByIdResult = IIdTitlePair[];

/**
 * @see https://vk.com/dev/database.getCountries
 */
export interface IGetCountriesParams {
  need_all?: boolean;
  code?: string[];
  offset?: number;
  count?: number;
}

export type TGetCountriesResult = TDefaultPager;

/**
 * @see https://vk.com/dev/database.getCountriesById
 */
export interface IGetCountriesByIdParams {
  country_ids?: number[];
}

export type TGetCountriesByIdResult = IIdTitlePair[];

/**
 * @see https://vk.com/dev/database.getFaculties
 */
export interface IGetFacultiesParams {
  university_id: number;
  offset?: number;
  count?: number;
}

export type TGetFacultiesResult = TDefaultPager;

/**
 * @see https://vk.com/dev/database.getMetroStations
 */
export interface IGetMetroStationsParams {
  city_id: number;
  offset?: number;
  count?: number;
  extended?: boolean;
}

export type TGetMetroStationsResult = IPager<{
  id: number;
  name: string;
  color: string;
}>;

/**
 * @see https://vk.com/dev/database.getMetroStationsById
 */
export interface IGetMetroStationsByIdParams {
  station_ids?: number[];
}

export type TGetMetroStationsByIdResult = Array<{
  id: number;
  name: string;
  color: string;
  city_id: number;
}>

/**
 * @see https://vk.com/dev/database.getRegions
 */
export interface IGetRegionsParams {
  country_id: number;
  q?: string;
  offset?: number;
  count?: number;
}

export type TGetRegionsResult = TDefaultPager;

/**
 * @see https://vk.com/dev/database.getSchoolClasses
 */
export interface IGetSchoolClassesParams {
  country_id?: number;
}

type TSchoolClassId = number;
type TSchoolClassLetter = string;

export type TGetSchoolClassesResult = [TSchoolClassId, TSchoolClassLetter][];

/**
 * @see https://vk.com/dev/database.getSchools
 */
export interface IGetSchoolsParams {
  city_id: number;
  q?: string;
  offset?: number;
  count?: number;
}

export type TGetSchoolsResult = TDefaultPager;

/**
 * @see https://vk.com/dev/database.getUniversities
 */
export interface IGetUniversitiesParams {
  country_id?: number;
  city_id: number;
  q?: string;
  offset?: number;
  count?: number;
}

export type TGetUniversitiesResult = TDefaultPager;
