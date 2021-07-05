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
  friend_accepted?: TDefault;
  reply?: TDefault;
  comment?: TFrOfFr;
  mention?: TFrOfFr;
  like?: TFrOfFr;
  repost?: TFrOfFr;
  wall_post?: TDefault;
  wall_publish?: TDefault;
  group_invite?: TDefault;
  group_accepted?: TDefault;
  event_soon?: TDefault;
  tag_photo?: TFrOfFr;
  app_request?: TDefault;
  sdk_open?: TDefault;
  new_post?: TDefault;
  birthday?: TDefault;
}