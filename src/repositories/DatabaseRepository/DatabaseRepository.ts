import {Repository} from '../Repository';
import {SendRequest} from '../../types';
import {
  GetChairsParams,
  GetChairsResult,
  GetCitiesByIdParams,
  GetCitiesByIdResult,
  GetCitiesParams,
  GetCitiesResult,
  GetCountriesByIdParams,
  GetCountriesByIdResult,
  GetCountriesParams,
  GetCountriesResult,
  GetFacultiesParams,
  GetFacultiesResult,
  GetMetroStationsByIdParams,
  GetMetroStationsByIdResult,
  GetMetroStationsParams,
  GetMetroStationsResult,
  GetRegionsParams,
  GetRegionsResult,
  GetSchoolClassesParams,
  GetSchoolClassesResult,
  GetSchoolsParams,
  GetSchoolsResult,
  GetUniversitiesParams,
  GetUniversitiesResult,
} from './types';
import {formatOptionalBoolean, formatOptionalArray} from '../../utils';

export class DatabaseRepository extends Repository {
  constructor(sendRequest: SendRequest) {
    super('database', sendRequest);
  }

  /**
   * @see https://vk.com/dev/database.getChairs
   * @type {RepositoryMethod<GetChairsParams, GetChairsResult>}
   */
  getChairs = this.r<GetChairsParams, GetChairsResult>(
    'getChairs',
  );

  /**
   * @see https://vk.com/dev/database.getCities
   * @type {RepositoryMethod<GetCitiesParams, GetCitiesResult>}
   */
  getCities = this.r<GetCitiesParams, GetCitiesResult>(
    'getCities',
    ({needAll, ...rest}) => ({
      ...rest,
      needAll: formatOptionalBoolean(needAll),
    }),
  );

  /**
   * @see https://vk.com/dev/database.getCitiesById
   * @type {RepositoryMethod<GetCitiesByIdParams, GetCitiesByIdResult>}
   */
  getCitiesById = this.r<GetCitiesByIdParams, GetCitiesByIdResult>(
    'getCitiesById',
    ({cityIds, ...rest}) => ({
      ...rest,
      cityIds: formatOptionalArray(cityIds),
    }),
  );

  /**
   * @see https://vk.com/dev/database.getCountries
   * @type {RepositoryMethod<GetCountriesParams, GetCountriesResult>}
   */
  getCountries = this.r<GetCountriesParams, GetCountriesResult>(
    'getCountries',
    ({code, needAll, ...rest}) => ({
      ...rest,
      needAll: formatOptionalBoolean(needAll),
      code: formatOptionalArray(code),
    }),
  );

  /**
   * @see https://vk.com/dev/database.getCountriesById
   * @type {RepositoryMethod<GetCountriesByIdParams, GetCountriesByIdResult>}
   */
  getCountriesById = this.r<GetCountriesByIdParams,
    GetCountriesByIdResult>(
    'getCountriesById',
    ({countryIds, ...rest}) => ({
      ...rest,
      countryIds: formatOptionalArray(countryIds),
    }),
  );

  /**
   * @see https://vk.com/dev/database.getFaculties
   * @type {RepositoryMethod<GetFacultiesParams, GetFacultiesResult>}
   */
  getFaculties = this.r<GetFacultiesParams, GetFacultiesResult>(
    'getFaculties',
  );

  /**
   * @see https://vk.com/dev/database.getMetroStations
   * @type {RepositoryMethod<GetCountriesParams, GetCountriesResult>}
   */
  getMetroStations = this.r<GetMetroStationsParams,
    GetMetroStationsResult>(
    'getMetroStations',
    ({extended, ...rest}) => ({
      ...rest,
      extended: formatOptionalBoolean(extended),
    }),
  );

  /**
   * @see https://vk.com/dev/database.getMetroStationsById
   * @type {RepositoryMethod<GetMetroStationsByIdParams, GetMetroStationsByIdResult>}
   */
  getMetroStationsById = this.r<GetMetroStationsByIdParams,
    GetMetroStationsByIdResult>(
    'getMetroStationsById',
    ({stationIds, ...rest}) => ({
      ...rest,
      stationIds: formatOptionalArray(stationIds),
    }),
  );

  /**
   * @see https://vk.com/dev/database.getRegions
   * @type {RepositoryMethod<GetRegionsParams, GetRegionsResult>}
   */
  getRegions = this.r<GetRegionsParams, GetRegionsResult>('getRegions');

  /**
   * @see https://vk.com/dev/database.getSchoolClasses
   * @type {RepositoryMethod<GetSchoolClassesParams, GetSchoolClassesResult>}
   */
  getSchoolClasses = this.r<GetSchoolClassesParams,
    GetSchoolClassesResult>('getSchoolClasses');

  /**
   * @see https://vk.com/dev/database.getSchools
   * @type {RepositoryMethod<GetSchoolsParams, GetSchoolsResult>}
   */
  getSchools = this.r<GetSchoolsParams, GetSchoolsResult>('getSchools');

  /**
   * @see https://vk.com/dev/database.getUniversities
   * @type {RepositoryMethod<GetUniversitiesParams, GetUniversitiesResult>}
   */
  getUniversities = this.r<GetUniversitiesParams, GetUniversitiesResult>(
    'getUniversities',
  );
}
