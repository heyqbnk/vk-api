import {Photo} from './photo';

/**
 * @see https://vk.com/dev/objects/link
 */
export interface Link {
  url: string;
  title: string;
  caption: string;
  description: string;
  photo?: Photo;
  product?: {
    price: {
      amount: number;
      currency: {
        id: number;
        name: string;
      };
      text: string;
    };
  };
  button?: {
    title: string;
    action: {
      type: 'open_url';
      url: string;
    };
  };
  previewPage: string;
  previewUrl: string;
}
