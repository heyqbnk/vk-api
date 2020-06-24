/**
 * Shared object props which could often met in VK objects
 */
export interface ObjectSharedProps {
  id: number;
  ownerId: number;
}

/**
 * Size description of some image
 * @see https://vk.com/dev/photo_sizes
 */
export interface PhotoSize {
  type: 's' | 'm' | 'x' | 'o' | 'p' | 'q' | 'r' | 'y' | 'z' | 'w';
  width: number;
  height: number;
  url: string;
}

/**
 * Description of image
 */
export interface Image {
  url: string;
  width: number;
  height: number;
}
