import {IObjectSharedProps} from './shared';

/**
 * List of audio genres.
 * @see https://vk.com/dev/objects/audio_genres
 */
export enum EAudioGenre {
  Rock = 1,
  Pop,
  RapAndHipHop,
  EasyListening,
  HouseAndDance,
  Instrumental,
  Metal,
  Dubstep,
  DrumAndBass = 10,
  Trance,
  Chanson,
  Ethnic,
  AcousticAndVocal,
  Reggae,
  Classical,
  IndiePop,
  Other,
  Speech,
  Alternative = 21,
  ElectropopAndDisco,
  JazzAndBlues = 1001
}

/**
 * @see https://vk.com/dev/objects/audio
 */
export interface IAudio extends IObjectSharedProps {
  artist: string;
  title: string;
  duration: number;
  url: string;
  lyrics_id?: number;
  album_id?: number;
  genre_id: EAudioGenre;
  date: number;
  no_search?: 1;
  is_hq?: 1;
}
