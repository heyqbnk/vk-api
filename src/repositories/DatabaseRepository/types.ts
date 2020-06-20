import {IdTitlePair, Pager} from '../../types';

/**
 * Default pager with item as object with id and title
 */
type DefaultPager = Pager<IdTitlePair>;

/**
 * @see https://vk.com/dev/database.getChairs
 */
export interface GetChairsParams {
  facultyId: number;
  offset?: number;
  count?: number;
}

export type GetChairsResult = DefaultPager;

/**
 * @see https://vk.com/dev/database.getCities
 */
export interface GetCitiesParams {
  countryId: number;
  regionId?: number;
  q?: string;
  needAll?: boolean;
  offset?: number;
  count?: number;
}

export type GetCitiesResult = Pager<IdTitlePair & {
  area?: string;
  region?: string;
  important?: boolean;
}>;

/**
 * @see https://vk.com/dev/database.getCitiesById
 */
export interface GetCitiesByIdParams {
  cityIds?: number[];
}

export type GetCitiesByIdResult = IdTitlePair[];

/**
 * @see https://vk.com/dev/database.getCountries
 */
export interface GetCountriesParams {
  needAll?: boolean;
  code?: string[];
  offset?: number;
  count?: number;
}

export type GetCountriesResult = DefaultPager;

/**
 * @see https://vk.com/dev/database.getCountriesById
 */
export interface GetCountriesByIdParams {
  countryIds?: number[];
}

export type GetCountriesByIdResult = IdTitlePair[];

/**
 * @see https://vk.com/dev/database.getFaculties
 */
export interface GetFacultiesParams {
  universityId: number;
  offset?: number;
  count?: number;
}

export type GetFacultiesResult = DefaultPager;

/**
 * @see https://vk.com/dev/database.getMetroStations
 */
export interface GetMetroStationsParams {
  cityId: number;
  offset?: number;
  count?: number;
  extended?: boolean;
}

export type GetMetroStationsResult = Pager<{
  id: number;
  name: string;
  color: string;
}>;

/**
 * @see https://vk.com/dev/database.getMetroStationsById
 */
export interface GetMetroStationsByIdParams {
  stationIds?: number[];
}

export type GetMetroStationsByIdResult = Array<{
  id: number;
  name: string;
  color: string;
  cityId: number;
}>

/**
 * @see https://vk.com/dev/database.getRegions
 */
export interface GetRegionsParams {
  countryId: number;
  q?: string;
  offset?: number;
  count?: number;
}

export type GetRegionsResult = DefaultPager;

/**
 * @see https://vk.com/dev/database.getSchoolClasses
 */
export interface GetSchoolClassesParams {
  countryId?: number;
}

type SchoolClassId = number;
type SchoolClassLetter = string;

export type GetSchoolClassesResult = [SchoolClassId, SchoolClassLetter][];

/**
 * @see https://vk.com/dev/database.getSchools
 */
export interface GetSchoolsParams {
  cityId: number;
  q?: string;
  offset?: number;
  count?: number;
}

export type GetSchoolsResult = DefaultPager;

/**
 * @see https://vk.com/dev/database.getUniversities
 */
export interface GetUniversitiesParams {
  countryId?: number;
  cityId: number;
  q?: string;
  offset?: number;
  count?: number;
}

export type GetUniversitiesResult = DefaultPager;
