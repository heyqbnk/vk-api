/**
 * @see https://vk.com/dev/objects/place
 */
export interface IPlace {
  id: number;
  title: string;
  latitude: number;
  longitude: number;
  created: number;
  icon: string;
  checkins: number;
  updated: number;
  type: number;
  country: number;
  city: number;
  address: string;
}
