import { IStudent } from './student.class';

export interface IJobExperiences {
  experiences: Array<string>;

  hasExperiences(): boolean;
  addExperience(experience: string): number; // arr.push() => returns new length
  updateExperience(
    prev_experience: string,
    new_experience: string
  ): Array<string>;
  deleteExperience(experience: string): Array<string>; // arr.splice() => return deleted element
  getExperienceIndex(experience: string): number;
}

export abstract class AbstractJobExperience implements IJobExperiences {
  experiences: Array<string> = new Array<string>();

  hasExperiences(): boolean {
    return !!this.experiences.length;
  }

  addExperience(experience: string): number {
    return this.experiences.push(experience);
  }

  updateExperience(
    prev_experience: string,
    new_experience: string
  ): Array<string> {
    return [];
  }

  deleteExperience(experience: string): Array<string> {
    const experience_index: number = this.getExperienceIndex(experience);
    if (experience_index >= 0) {
      return this.experiences.splice(experience_index, 1);
    } else {
      throw new Error("Experience doesn't exist");
    }
  }

  getExperienceIndex(experience: string): number {
    return this.experiences.findIndex((exp) => exp === experience); // funzione anonima, callback e un predicato
  }
}

export class JobExperiences extends AbstractJobExperience {
  constructor(experiences?: Array<string>) {
    super();

    this.experiences.push(...(experiences || []));
  }

  override updateExperience(
    prev_experience: string,
    new_experience: string
  ): Array<string> {
    const experience_index: number = this.getExperienceIndex(prev_experience);
    if (experience_index >= 0) {
      return this.experiences.splice(experience_index, 1, new_experience);
    } else {
      throw new Error("Experience doesn't exist");
    }
  }
}

export interface IStudentsWithJobExperiences
  extends IStudent,
    IJobExperiences {}

export type PopupHorizontalPositioning = 'left' | 'right';
export type PopupVerticalPositioning = 'top' | 'bottom';
