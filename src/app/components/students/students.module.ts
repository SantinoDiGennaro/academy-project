import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountComponent } from '../count/count.component';
import { ResonanceComponent } from '../resonance/resonance.component';
import { StudentHobbiesComponent } from '../student-hobbies/student-hobbies.component';
import { StudentInfoComponent } from '../student-info/student-info.component';
import { StudentLangComponent } from '../student-lang/student-lang.component';
import { StudentComponent } from '../student/student.component';
import { StudentsComponent } from './students.component';

@NgModule({
  declarations: [
    StudentsComponent,
    StudentComponent,
    StudentInfoComponent,
    StudentHobbiesComponent,
    StudentLangComponent,
    CountComponent,
    ResonanceComponent,
  ],
  imports: [CommonModule],
  exports: [StudentsModule],
})
export class StudentsModule {}
