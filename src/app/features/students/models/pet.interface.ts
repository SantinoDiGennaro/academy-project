import { Gender } from './gender.type';

export interface Pet {
  name: string;
  type: PetType;
  breed: string;
  gender: Gender;
  age: number;
}

export type PetType = 'dog' | 'cat' | 'rabbit' | 'snake' | 'mouse' | 'hamster';
export type PetTypeOption = PetType | '';
