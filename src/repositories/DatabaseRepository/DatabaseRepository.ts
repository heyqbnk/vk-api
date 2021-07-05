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
      */
  getChairs = this.r<IGetChairsParams, TGetChairsResult>(
    'getChairs',
  );

  /**
   * @see https://vk.com/dev/database.getCities
      */
  getCities = this.r<IGetCitiesParams, TGetCitiesResult>(
    'getCities',
    ({need_all, ...rest}) => ({
      ...rest,
      need_all: formatOptionalBoolean(need_all),
    }),
  );

  /**
   * @see https://vk.com/dev/database.getCitiesById
      */
  getCitiesById = this.r<IGetCitiesByIdParams, TGetCitiesByIdResult>(
    'getCitiesById',
    ({city_ids, ...rest}) => ({
      ...rest,
      city_ids: formatOptionalArray(city_ids),
    }),
  );

  /**
   * @see https://vk.com/dev/database.getCountries
      */
  getCountries = this.r<IGetCountriesParams, TGetCountriesResult>(
    'getCountries',
    ({code, need_all, ...rest}) => ({
      ...rest,
      need_all: formatOptionalBoolean(need_all),
      code: formatOptionalArray(code),
    }),
  );

  /**
   * @see https://vk.com/dev/database.getCountriesById
      */
  getCountriesById = this.r<IGetCountriesByIdParams,
    TGetCountriesByIdResult>(
    'getCountriesById',
    ({country_ids, ...rest}) => ({
      ...rest,
      country_ids: formatOptionalArray(country_ids),
    }),
  );

  /**
   * @see https://vk.com/dev/database.getFaculties
      */
  getFaculties = this.r<IGetFacultiesParams, TGetFacultiesResult>(
    'getFaculties',
  );

  /**
   * @see https://vk.com/dev/database.getMetroStations
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
      */
  getMetroStationsById = this.r<IGetMetroStationsByIdParams,
    TGetMetroStationsByIdResult>(
    'getMetroStationsById',
    ({station_ids, ...rest}) => ({
      ...rest,
      station_ids: formatOptionalArray(station_ids),
    }),
  );

  /**
   * @see https://vk.com/dev/database.getRegions
      */
  getRegions = this.r<IGetRegionsParams, TGetRegionsResult>('getRegions');

  /**
   * @see https://vk.com/dev/database.getSchoolClasses
      */
  getSchoolClasses = this.r<IGetSchoolClassesParams,
    TGetSchoolClassesResult>('getSchoolClasses');

  /**
   * @see https://vk.com/dev/database.getSchools
      */
  getSchools = this.r<IGetSchoolsParams, TGetSchoolsResult>('getSchools');

  /**
   * @see https://vk.com/dev/database.getUniversities
      */
  getUniversities = this.r<IGetUniversitiesParams, TGetUniversitiesResult>(
    'getUniversities',
  );
}
