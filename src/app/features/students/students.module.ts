import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from './students.component';
import { StudentComponent } from './student/student.component';
import { StudentHobbiesComponent } from './student-hobbies/student-hobbies.component';
import { StudentInfoComponent } from './student-info/student-info.component';
import { StudentLangComponent } from './student-lang/student-lang.component';
import { ResonanceComponent } from './resonance/resonance.component';
import { CountComponent } from './count/count.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentFormComponent } from './student-form/student-form.component';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    StudentsComponent,
    StudentComponent,
    StudentHobbiesComponent,
    StudentInfoComponent,
    StudentLangComponent,
    ResonanceComponent,
    CountComponent,
    StudentFormComponent,
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
  ],
})
export class StudentsModule {}
