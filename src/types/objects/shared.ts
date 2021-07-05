/**
 * Shared object props which could often met in VK objects
 */
export interface IObjectSharedProps {
  id: number;
  owner_id: number;
}

/**
 * Size description of some image
 * @see https://vk.com/dev/photo_sizes
 */
export interface IPhotoSize {
  type: 's' | 'm' | 'x' | 'o' | 'p' | 'q' | 'r' | 'y' | 'z' | 'w';
  width: number;
  height: number;
  url: string;
}

/**
 * Description of image
 */
export interface IImage {
  url: string;
  width: number;
  height: number;
}
