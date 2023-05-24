import { GenderOption } from './gender.type';
import { Pet } from './pet.interface';
import { Location } from './location.interface';
import * as uuid from 'uuid';

export interface IStudent {
  id?: string;
  name: string;
  surname: string;
  gender: GenderOption;
  age: number;
  location: Location;
  hobbies: Array<Hobby>;
  pets: Array<Pet> | [];
  knownLanguages: Array<Language>;
  jobExperiences: Array<StudentExperience> | [];
  resonance: StudentResonance;
}

export class Student implements IStudent {
  id?: string;
  name: string;
  surname: string;
  gender: GenderOption;
  age: number;
  location: Location;
  hobbies: Array<Hobby>;
  pets: Array<Pet> | [];
  knownLanguages: Array<Language>;
  jobExperiences: Array<StudentExperience> | [];
  resonance: StudentResonance;

  constructor(student?: Partial<IStudent>) {
    this.id = student?.id ?? uuid.v4();
    this.name = student?.name ?? '';
    this.surname = student?.surname ?? '';
    this.gender = student?.gender ?? ('' as GenderOption);
    this.age = student?.age ?? 19;
    this.pets = student?.pets ?? new Array<Pet>();
    this.hobbies = student?.hobbies ?? new Array<Hobby>();
    this.knownLanguages = student?.knownLanguages ?? new Array<Language>();
    this.jobExperiences =
      student?.jobExperiences ?? new Array<StudentExperience>();
    this.location = student?.location ?? this.createLocation();
    this.resonance = student?.resonance ?? this.createResonance();
  }

  private createLocation(): Location {
    return {
      postalCode: '00000',
      city: '',
      address: '',
      state: '',
      country: '',
    };
  }

  private createResonance(): StudentResonance {
    return {
      likes: 0,
      dislikes: 0,
    };
  }
}

export interface Hobby {
  name: string;
  icon: string;
}

export interface Language {
  name: string;
  icon: string;
}

export interface StudentExperience {
  name: string;
  company: string;
  description: string;
  startDate: Date;
  endDate: Date;
  tags: Array<string>;
}

export interface StudentResonance {
  likes: number;
  dislikes: number;
}

export type StudentResoncanceLike = Pick<Student, 'name' | 'surname'> & {
  date: Date;
};
