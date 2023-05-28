import { Component, Input } from '@angular/core';
import { Hobby } from '../models/student.class';

@Component({
  selector: 'academy-student-hobbies',
  templateUrl: './student-hobbies.component.html',
  styleUrls: ['./student-hobbies.component.scss'],
})
export class StudentHobbiesComponent {
  @Input({ required: true }) hobbies: Array<Hobby> | undefined;
}
