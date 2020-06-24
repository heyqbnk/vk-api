import {ObjectSharedProps} from './shared';

/**
 * List of audio genres
 * @see https://vk.com/dev/objects/audio_genres
 */
export enum AudioGenreEnum {
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
export interface Audio extends ObjectSharedProps {
  artist: string;
  title: string;
  duration: number;
  url: string;
  lyricsId?: number;
  albumId?: number;
  genreId: AudioGenreEnum;
  date: number;
  noSearch?: 1;
  isHq?: 1;
}
