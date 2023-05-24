import { Component, Input } from '@angular/core';
import { Language } from 'src/app/models/student.class';

@Component({
  selector: 'academy-student-lang',
  templateUrl: './student-lang.component.html',
  styleUrls: ['./student-lang.component.scss'],
})
export class StudentLangComponent {
  @Input({ required: true }) lingue: Array<Language> | undefined;
}
