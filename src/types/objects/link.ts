import {IPhoto} from './photo';

/**
 * @see https://vk.com/dev/objects/link
 */
export interface ILink {
  url: string;
  title: string;
  caption: string;
  description: string;
  photo?: IPhoto;
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
