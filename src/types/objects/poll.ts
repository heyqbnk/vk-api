import {IObjectSharedProps, IPhotoSize} from './shared';
import {IPhoto} from './photo';

/**
 * @see https://vk.com/dev/objects/poll
 */
export interface IPoll extends IObjectSharedProps {
  created: number;
  question: string;
  votes: number;
  answers: Array<{
    id: number;
    text: string;
    votes: number;
    rate: number;
  }>;
  anonymous: boolean;
  multiple: boolean;
  answer_ids: number[];
  end_date: number;
  closed: boolean;
  is_board: boolean;
  can_edit: boolean;
  can_vote: boolean;
  can_report: boolean;
  can_share: boolean;
  author_id: number;
  photo: IPhoto;
  background: {
    id: number;
    color: string;
  } & ({
    type: 'gradient';
    angle: number;
    points: Array<{
      position: number;
      color: string;
    }>;
  } | {
    type: 'tile';
    width: number;
    height: number;
    images: IPhotoSize[];
  });
  friends: number[];
}
