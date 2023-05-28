import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { GenderOption } from './gender.type';
import { PetTypeOption } from './pet.interface';

export interface StudentForm {
  personalInformation: FormGroup<StudentFormPersonalInformation>;
  location: FormGroup<StudentFormLocation>;
  hobbies: FormArray<FormGroup<StudentFormHobby>>;
  knownLanguages: FormArray<FormGroup<StudentFormLanguage>>;
  pets: FormArray<FormGroup<StudentFormPet>>;
  jobExperiences: FormArray<FormGroup<StudentFormJobExperience>>;
}

export interface StudentFormPersonalInformation {
  name: FormControl<string>;
  surname: FormControl<string>;
  gender: FormControl<GenderOption>;
  age: FormControl<number>;
}

export interface StudentFormLocation {
  postalCode: FormControl<string>;
  city: FormControl<string>;
  address: FormControl<string>;
  state: FormControl<string>;
  country: FormControl<string>;
}

interface StudentFormEntity {
  name: FormControl<string>;
  icon: FormControl<string>;
}

export type StudentFormHobby = StudentFormEntity;
export type StudentFormLanguage = StudentFormEntity;

export interface StudentFormPet {
  name: FormControl<string>;
  type: FormControl<PetTypeOption>;
  breed: FormControl<string>;
  gender: FormControl<GenderOption>;
  age: FormControl<number>;
}

export interface StudentFormJobExperience {
  name: FormControl<string>;
  company: FormControl<string>;
  description: FormControl<string>;
  startDate: FormControl<Date>;
  endDate: FormControl<Date>;
  tags: FormArray<FormControl<string>>;
}
