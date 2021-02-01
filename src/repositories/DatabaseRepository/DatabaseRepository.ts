import {Repository} from '../Repository';
import {TSendRequest} from '../../types';
import {
  IGetChairsParams,
  TGetChairsResult,
  IGetCitiesByIdParams,
  TGetCitiesByIdResult,
  IGetCitiesParams,
  TGetCitiesResult,
  IGetCountriesByIdParams,
  TGetCountriesByIdResult,
  IGetCountriesParams,
  TGetCountriesResult,
  IGetFacultiesParams,
  TGetFacultiesResult,
  IGetMetroStationsByIdParams,
  TGetMetroStationsByIdResult,
  IGetMetroStationsParams,
  TGetMetroStationsResult,
  IGetRegionsParams,
  TGetRegionsResult,
  IGetSchoolClassesParams,
  TGetSchoolClassesResult,
  IGetSchoolsParams,
  TGetSchoolsResult,
  IGetUniversitiesParams,
  TGetUniversitiesResult,
} from './types';
import {formatOptionalBoolean, formatOptionalArray} from '../../utils';

export class DatabaseRepository extends Repository {
  constructor(sendRequest: TSendRequest) {
    super('database', sendRequest);
  }

  /**
   * @see https://vk.com/dev/database.getChairs
   * @type {TRepositoryMethod<IGetChairsParams, TGetChairsResult>}
   */
  getChairs = this.r<IGetChairsParams, TGetChairsResult>(
    'getChairs',
  );

  /**
   * @see https://vk.com/dev/database.getCities
   * @type {TRepositoryMethod<IGetCitiesParams, TGetCitiesResult>}
   */
  getCities = this.r<IGetCitiesParams, TGetCitiesResult>(
    'getCities',
    ({needAll, ...rest}) => ({
      ...rest,
      needAll: formatOptionalBoolean(needAll),
    }),
  );

  /**
   * @see https://vk.com/dev/database.getCitiesById
   * @type {TRepositoryMethod<IGetCitiesByIdParams, TGetCitiesByIdResult>}
   */
  getCitiesById = this.r<IGetCitiesByIdParams, TGetCitiesByIdResult>(
    'getCitiesById',
    ({cityIds, ...rest}) => ({
      ...rest,
      cityIds: formatOptionalArray(cityIds),
    }),
  );

  /**
   * @see https://vk.com/dev/database.getCountries
   * @type {TRepositoryMethod<IGetCountriesParams, TGetCountriesResult>}
   */
  getCountries = this.r<IGetCountriesParams, TGetCountriesResult>(
    'getCountries',
    ({code, needAll, ...rest}) => ({
      ...rest,
      needAll: formatOptionalBoolean(needAll),
      code: formatOptionalArray(code),
    }),
  );

  /**
   * @see https://vk.com/dev/database.getCountriesById
   * @type {TRepositoryMethod<IGetCountriesByIdParams, TGetCountriesByIdResult>}
   */
  getCountriesById = this.r<IGetCountriesByIdParams,
    TGetCountriesByIdResult>(
    'getCountriesById',
    ({countryIds, ...rest}) => ({
      ...rest,
      countryIds: formatOptionalArray(countryIds),
    }),
  );

  /**
   * @see https://vk.com/dev/database.getFaculties
   * @type {TRepositoryMethod<IGetFacultiesParams, TGetFacultiesResult>}
   */
  getFaculties = this.r<IGetFacultiesParams, TGetFacultiesResult>(
    'getFaculties',
  );

  /**
   * @see https://vk.com/dev/database.getMetroStations
   * @type {TRepositoryMethod<IGetCountriesParams, TGetCountriesResult>}
   */
  getMetroStations = this.r<IGetMetroStationsParams,
    TGetMetroStationsResult>(
    'getMetroStations',
    ({extended, ...rest}) => ({
      ...rest,
      extended: formatOptionalBoolean(extended),
    }),
  );

  /**
   * @see https://vk.com/dev/database.getMetroStationsById
   * @type {TRepositoryMethod<IGetMetroStationsByIdParams, TGetMetroStationsByIdResult>}
   */
  getMetroStationsById = this.r<IGetMetroStationsByIdParams,
    TGetMetroStationsByIdResult>(
    'getMetroStationsById',
    ({stationIds, ...rest}) => ({
      ...rest,
      stationIds: formatOptionalArray(stationIds),
    }),
  );

  /**
   * @see https://vk.com/dev/database.getRegions
   * @type {TRepositoryMethod<IGetRegionsParams, TGetRegionsResult>}
   */
  getRegions = this.r<IGetRegionsParams, TGetRegionsResult>('getRegions');

  /**
   * @see https://vk.com/dev/database.getSchoolClasses
   * @type {TRepositoryMethod<IGetSchoolClassesParams, TGetSchoolClassesResult>}
   */
  getSchoolClasses = this.r<IGetSchoolClassesParams,
    TGetSchoolClassesResult>('getSchoolClasses');

  /**
   * @see https://vk.com/dev/database.getSchools
   * @type {TRepositoryMethod<IGetSchoolsParams, TGetSchoolsResult>}
   */
  getSchools = this.r<IGetSchoolsParams, TGetSchoolsResult>('getSchools');

  /**
   * @see https://vk.com/dev/database.getUniversities
   * @type {TRepositoryMethod<IGetUniversitiesParams, TGetUniversitiesResult>}
   */
  getUniversities = this.r<IGetUniversitiesParams, TGetUniversitiesResult>(
    'getUniversities',
  );
}
