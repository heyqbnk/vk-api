import {Repository} from '../Repository';
import {RepositoryMethod, SendRequest} from '../../types';
import {
  FormatBooleansOverridable, FormatBooleansOverridden,
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
import {arrayToString, toBoolean} from '../../utils';

/**
 * Repository to work with users
 */
export class DatabaseRepository extends Repository {
  constructor(sendRequest: SendRequest) {
    super('database', sendRequest);
  }

  /**
   * Creates repo method
   * @param {string} name
   * @param {(params: Params) => any} prepare
   * @returns {RepositoryMethod<Params, Response>}
   */
  private createMethod<Params, Response>(
    name: string,
    prepare?: (params: Params) => any,
  ): RepositoryMethod<Params, Response> {
    return params => this.sendRequest({
      method: name,
      params: prepare ? prepare(params) : params,
    });
  }

  private formatBooleans = <P extends FormatBooleansOverridable>(
    params: P,
  ): FormatBooleansOverridden<P> => {
    const {needAll, extended, ...rest} = params;
    const result: FormatBooleansOverridden<P> = rest;

    if (typeof needAll !== 'undefined') {
      result.needAll = toBoolean(needAll);
    }
    if (typeof extended !== 'undefined') {
      result.extended = toBoolean(extended);
    }
    return result;
  };

  /**
   * @see https://vk.com/dev/database.getChairs
   * @type {RepositoryMethod<GetChairsParams, GetChairsResult>}
   */
  public getChairs = this.createMethod<GetChairsParams, GetChairsResult>(
    'getChairs',
  );

  /**
   * @see https://vk.com/dev/database.getCities
   * @type {RepositoryMethod<GetCitiesParams, GetCitiesResult>}
   */
  public getCities = this.createMethod<GetCitiesParams, GetCitiesResult>(
    'getCities',
    params => this.formatBooleans(params),
  );

  /**
   * @see https://vk.com/dev/database.getCitiesById
   * @type {RepositoryMethod<GetCitiesByIdParams, GetCitiesByIdResult>}
   */
  public getCitiesById = this.createMethod<GetCitiesByIdParams,
    GetCitiesByIdResult>(
    'getCitiesById',
    ({cityIds, ...rest}) => ({
      ...rest,
      cityIds: typeof cityIds === 'undefined'
        ? cityIds
        : arrayToString(cityIds),
    }),
  );

  /**
   * @see https://vk.com/dev/database.getCountries
   * @type {RepositoryMethod<GetCountriesParams, GetCountriesResult>}
   */
  public getCountries = this.createMethod<GetCountriesParams,
    GetCountriesResult>(
    'getCountries',
    ({code, ...rest}) => this.formatBooleans({
      ...rest,
      code: typeof code === 'undefined'
        ? code
        : arrayToString(code),
    }),
  );

  /**
   * @see https://vk.com/dev/database.getCountriesById
   * @type {RepositoryMethod<GetCountriesByIdParams, GetCountriesByIdResult>}
   */
  public getCountriesById = this.createMethod<GetCountriesByIdParams,
    GetCountriesByIdResult>(
    'getCountriesById',
    ({countryIds, ...rest}) => ({
      ...rest,
      countryIds: typeof countryIds === 'undefined'
        ? countryIds
        : arrayToString(countryIds),
    }),
  );

  /**
   * @see https://vk.com/dev/database.getFaculties
   * @type {RepositoryMethod<GetFacultiesParams, GetFacultiesResult>}
   */
  public getFaculties = this.createMethod<GetFacultiesParams,
    GetFacultiesResult>('getFaculties');

  /**
   * @see https://vk.com/dev/database.getMetroStations
   * @type {RepositoryMethod<GetCountriesParams, GetCountriesResult>}
   */
  public getMetroStations = this.createMethod<GetMetroStationsParams,
    GetMetroStationsResult>('getMetroStations', this.formatBooleans);

  /**
   * @see https://vk.com/dev/database.getMetroStationsById
   * @type {RepositoryMethod<GetMetroStationsByIdParams, GetMetroStationsByIdResult>}
   */
  public getMetroStationsById = this.createMethod<GetMetroStationsByIdParams,
    GetMetroStationsByIdResult>(
    'getMetroStationsById',
    ({stationIds, ...rest}) => ({
      ...rest,
      stationIds: typeof stationIds === 'undefined'
        ? stationIds
        : arrayToString(stationIds),
    }),
  );

  /**
   * @see https://vk.com/dev/database.getRegions
   * @type {RepositoryMethod<GetRegionsParams, GetRegionsResult>}
   */
  public getRegions = this.createMethod<GetRegionsParams,
    GetRegionsResult>('getRegions');

  /**
   * @see https://vk.com/dev/database.getSchoolClasses
   * @type {RepositoryMethod<GetSchoolClassesParams, GetSchoolClassesResult>}
   */
  public getSchoolClasses = this.createMethod<GetSchoolClassesParams,
    GetSchoolClassesResult>('getSchoolClasses');

  /**
   * @see https://vk.com/dev/database.getSchools
   * @type {RepositoryMethod<GetSchoolsParams, GetSchoolsResult>}
   */
  public getSchools = this.createMethod<GetSchoolsParams,
    GetSchoolsResult>('getSchools');

  /**
   * @see https://vk.com/dev/database.getUniversities
   * @type {RepositoryMethod<GetUniversitiesParams, GetUniversitiesResult>}
   */
  public getUniversities = this.createMethod<GetUniversitiesParams,
    GetUniversitiesResult>('getUniversities');
}
