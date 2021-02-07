import {IPhoto} from './objects';

interface ICrop {
  x: number;
  y: number;
  x2: number;
  y2: number;
}

export interface ICropPhoto {
  photo: IPhoto;
  crop: ICrop;
  rect: ICrop;
}