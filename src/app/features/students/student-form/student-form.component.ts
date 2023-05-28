import { Component, EventEmitter, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { STUDENTS } from 'src/app/features/students/models/studentsClassList';
import { GenderOption } from 'src/app/features/students/models/gender.type';
import { Pet, PetTypeOption } from '../models/pet.interface';
import {
  StudentForm,
  StudentFormHobby,
  StudentFormLanguage,
  StudentFormPet,
  StudentFormJobExperience,
  StudentFormPersonalInformation,
  StudentFormLocation,
} from '../models/student-form.interface';
import {
  Student,
  Hobby,
  Language,
  StudentExperience,
} from '../models/student.class';

@Component({
  selector: 'academy-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss'],
})
export class StudentFormComponent {
  form!: FormGroup<StudentForm>;
  edit: boolean = false;
  @Output() saveStudent: EventEmitter<Student> = new EventEmitter<Student>();
  students!: Array<Student>;

  get hobbies(): FormArray<FormGroup<StudentFormHobby>> {
    return this.form.get('hobbies') as FormArray<FormGroup<StudentFormHobby>>;
  }

  get knownLanguages(): FormArray<FormGroup<StudentFormLanguage>> {
    return this.form.get('knownLanguages') as FormArray<
      FormGroup<StudentFormLanguage>
    >;
  }

  get pets(): FormArray<FormGroup<StudentFormPet>> {
    return this.form.get('pets') as FormArray<FormGroup<StudentFormPet>>;
  }

  get jobExperiences(): FormArray<FormGroup<StudentFormJobExperience>> {
    return this.form.get('jobExperiences') as FormArray<
      FormGroup<StudentFormJobExperience>
    >;
  }

  constructor(private readonly route: ActivatedRoute) {
    this.route.paramMap.subscribe({
      next: (map: ParamMap) => {
        if (map.has('id')) {
          this.edit = true;
          const name = map.get('id');
          const student = STUDENTS.find((el) => el.name === name);
          console.log(student);

          this.form = this.createForm(student);
        } else {
          console.log('nada');
          this.form = this.createForm();
        }
      },
    });
    this.students = JSON.parse(localStorage.getItem('academy_students')!);
  }

  createForm(student?: Student): FormGroup<StudentForm> {
    return new FormGroup<StudentForm>({
      personalInformation: new FormGroup<StudentFormPersonalInformation>({
        name: new FormControl<string>(student?.name ?? '', {
          nonNullable: true,
        }),
        surname: new FormControl<string>(student?.surname ?? '', {
          nonNullable: true,
        }),
        age: new FormControl<number>(student?.age ?? 18, { nonNullable: true }),
        gender: new FormControl<GenderOption>(student?.gender ?? '', {
          nonNullable: true,
        }),
      }),
      location: new FormGroup<StudentFormLocation>({
        address: new FormControl<string>(student?.location.address ?? '', {
          nonNullable: true,
        }),
        city: new FormControl<string>(student?.location.city ?? '', {
          nonNullable: true,
        }),
        country: new FormControl<string>(student?.location.country ?? '', {
          nonNullable: true,
        }),
        postalCode: new FormControl<string>(
          student?.location.postalCode ?? '',
          {
            nonNullable: true,
          }
        ),
        state: new FormControl<string>(student?.location.state ?? '', {
          nonNullable: true,
        }),
      }),
      hobbies: new FormArray(
        student?.hobbies.length
          ? student?.hobbies.map((hobby) => this.initHobby(hobby))
          : [this.initHobby()]
      ),
      knownLanguages: new FormArray(
        student?.knownLanguages.length
          ? student?.knownLanguages.map((language) => this.initHobby(language))
          : [this.initLanguage()]
      ),
      pets: new FormArray(
        student?.knownLanguages.length
          ? student?.pets.map((pet) => this.initPet(pet))
          : [this.initPet()]
      ),
      jobExperiences: new FormArray(
        student?.jobExperiences.length
          ? student?.jobExperiences.map((job) => this.initJobExperience(job))
          : [this.initJobExperience()]
      ),
    });
  }

  private initHobby(hobby?: Hobby): FormGroup<StudentFormHobby> {
    return new FormGroup<StudentFormHobby>({
      name: new FormControl<string>(hobby?.name ?? '', { nonNullable: true }),
      icon: new FormControl<string>(hobby?.icon ?? '', { nonNullable: true }),
    });
  }

  private initLanguage(language?: Language): FormGroup<StudentFormLanguage> {
    return new FormGroup<StudentFormLanguage>({
      name: new FormControl<string>(language?.name ?? '', {
        nonNullable: true,
      }),
      icon: new FormControl<string>(language?.icon ?? '', {
        nonNullable: true,
      }),
    });
  }

  private initPet(pet?: Pet): FormGroup<StudentFormPet> {
    return new FormGroup<StudentFormPet>({
      name: new FormControl<string>(pet?.name ?? '', { nonNullable: true }),
      type: new FormControl<PetTypeOption>(pet?.type ?? '', {
        nonNullable: true,
      }),
      breed: new FormControl<string>(pet?.breed ?? '', { nonNullable: true }),
      age: new FormControl<number>(pet?.age ?? 0, { nonNullable: true }),
      gender: new FormControl<GenderOption>(pet?.gender ?? '', {
        nonNullable: true,
      }),
    });
  }

  private initJobExperience(
    experience?: StudentExperience
  ): FormGroup<StudentFormJobExperience> {
    return new FormGroup<StudentFormJobExperience>({
      name: new FormControl<string>(experience?.name ?? '', {
        nonNullable: true,
      }),
      description: new FormControl<string>(experience?.description ?? '', {
        nonNullable: true,
      }),
      company: new FormControl<string>(experience?.company ?? '', {
        nonNullable: true,
      }),
      startDate: new FormControl<Date>(experience?.startDate ?? new Date(), {
        nonNullable: true,
      }),
      endDate: new FormControl<Date>(experience?.endDate ?? new Date(), {
        nonNullable: true,
      }),
      tags: new FormArray(
        experience?.tags.length
          ? experience?.tags.map((tag) => this.initJobExperienceTag(tag))
          : [this.initJobExperienceTag()]
      ),
    });
  }

  private initJobExperienceTag(tag?: string): FormControl<string> {
    return new FormControl<string>(tag ?? '', { nonNullable: true });
  }

  save(): void {
    const newValue: Student = new Student({
      name: this.form.value.personalInformation?.name as Required<string>,
      surname: this.form.value.personalInformation?.surname as Required<string>,
      gender: this.form.value.personalInformation
        ?.gender as Required<GenderOption>,
      age: this.form.value.personalInformation?.age as Required<number>,
      location: {
        city: this.form.value.location?.city as Required<string>,
        postalCode: this.form.value.location?.postalCode as Required<string>,
        address: this.form.value.location?.address as Required<string>,
        state: this.form.value.location?.state as Required<string>,
        country: this.form.value.location?.country as Required<string>,
      },
      hobbies: this.form.value.hobbies as Required<Hobby[]>,
      pets: this.form.value.pets as Required<Pet[]>,
      knownLanguages: this.form.value.knownLanguages as Required<Language[]>,
      jobExperiences: this.form.value.jobExperiences as Required<
        StudentExperience[]
      >,
    });

    this.route.paramMap.subscribe({
      next: (map: ParamMap) => {
        if (map.has('id')) {
          const name = map.get('id');
          const index = this.students.indexOf(
            this.students.filter((el) => el.name === name)[0]
          );
          this.students[index] = newValue;
        } else {
          this.students.push(new Student(newValue));
        }
      },
    });
    localStorage.setItem('academy_students', JSON.stringify(this.students));
  }

  addHobby(): void {
    this.hobbies.push(this.initHobby());
  }

  addLanguage(): void {
    this.knownLanguages.push(this.initLanguage());
  }

  addPet(): void {
    this.pets.push(this.initPet());
  }

  addJobExperience(): void {
    this.jobExperiences.push(this.initJobExperience());
  }

  addTag(experienceControl: FormGroup<StudentFormJobExperience>): void {
    const tags: FormArray<FormControl<string>> = experienceControl.get(
      'tags'
    ) as FormArray<FormControl<string>>;
    tags.push(this.initJobExperienceTag());
  }

  removeHobby(i: number): void {
    const hobbies = this.form.get('hobbies') as FormArray<
      FormGroup<StudentFormHobby>
    >;
    hobbies?.removeAt(i);
  }

  removePet(i: number): void {
    const pets = this.form.get('pets') as FormArray<FormGroup<StudentFormPet>>;
    pets?.removeAt(i);
  }

  removeLanguage(i: number): void {
    const languages = this.form.get('knownLanguages') as FormArray<
      FormGroup<StudentFormLanguage>
    >;
    languages?.removeAt(i);
  }

  removeJob(i: number): void {
    const jobs = this.form.get('jobExperiences') as FormArray<
      FormGroup<StudentFormJobExperience>
    >;
    jobs?.removeAt(i);
  }

  removeTag(
    experienceControl: FormGroup<StudentFormJobExperience>,
    i: number
  ): void {
    const tags: FormArray<FormControl<string>> = experienceControl.get(
      'tags'
    ) as FormArray<FormControl<string>>;
    tags?.removeAt(i);
  }
}
