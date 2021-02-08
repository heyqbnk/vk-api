type TDefault = ('on' | 'off')[];
type TWithDefault<T> = (T | 'on' | 'off')[];

type TNoSoundNoText = TWithDefault<'no_sound' | 'no_text'>;
type TFrOfFr = TWithDefault<'fr_of_fr'>;

export type TPushSetting =
  | 'on'
  | 'off'
  | 'no_sound'
  | 'no_text'
  | 'fr_of_fr'
  | 'mutual';

export interface IPushSettings {
  msg?: TNoSoundNoText;
  chat?: TNoSoundNoText;
  friend?: TWithDefault<'mutual'>;
  friendAccepted?: TDefault;
  reply?: TDefault;
  comment?: TFrOfFr;
  mention?: TFrOfFr;
  like?: TFrOfFr;
  repost?: TFrOfFr;
  wallPost?: TDefault;
  wallPublish?: TDefault;
  groupInvite?: TDefault;
  groupAccepted?: TDefault;
  eventSoon?: TDefault;
  tagPhoto?: TFrOfFr;
  appRequest?: TDefault;
  sdkOpen?: TDefault;
  newPost?: TDefault;
  birthday?: TDefault;
}