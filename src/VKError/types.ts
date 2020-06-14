/**
 * List of errors
 * @see https://vk.com/dev/errors
 */
export enum ErrorsEnum {
  Unknown = 1,
  ApplicationDisabled = 2,
  UnknownMethod = 3,
  IncorrectSign = 4,
  AuthorizationFailed = 5,
  TooManyRequests = 6,
  PermissionDenied = 7,
  InvalidRequest = 8,
  FloodControl = 9,
  InternalError = 10,
  ApplicationTestModeRestriction = 11,
  CaptchaRequired = 14,
  AccessDenied = 15,
  HttpAuthFailed = 16,
  ValidationRequired = 17,
  UserDeletedOrBanned = 18,
  PermissionForNonStandaloneDenied = 20,
  PermissionAllowedForStandaloneAndOpenAPI = 21,
  MethodDisabled = 23,
  ConfirmationRequired = 24,
  GroupAuthFailed = 27,
  AppAuthFailed = 28,
  RateLimitReached = 29,
  PrivateProfile = 30,
  NotImplemented= 33,
  ParameterMissingOrInvalid = 100,
  InvalidAppId = 101,
  InvalidUserId = 113,
  InvalidTimestamp = 150,
  AlbumAccessDenied = 200,
  AudioAccessDenied = 201,
  GroupAccessDenied = 203,
  AlbumFull = 300,
  ApplicationVotesDisabled = 500,
  NoAccessToOperationsWithObject = 600,
  Ads = 603,
  CaptchaNeeded = 3300,
  PhoneValidationNeeded = 3301,
  PasswordValidationNeeded = 3302,
  OtpAppValidationNeeded = 3303,
  EmailConfirmationNeeded = 3304,
  AssertVotes = 3305,
  TokenExtensionRequired = 3609,
}

export interface ErrorInfo {
  errorCode: ErrorsEnum | number;
  errorMsg: string;
  requestParams: Array<{key: string; value: string}>;
}
