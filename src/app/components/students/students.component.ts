import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { STUDENTS } from 'src/app/data/studentsClassList';
import { Student } from 'src/app/models/student.class';

@Component({
  selector: 'academy-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent {
  students: Array<Student> | undefined;

  showForms: boolean = true;

  search = '';

  ngOnInit(): void {
    this.students = structuredClone(STUDENTS);
  }

  fill(): void {
    this.students = structuredClone(STUDENTS);
  }

  removeAll(): void {
    this.students = [];
  }

  remove(student: Student): void {
    const studentFullName = student.name + student.surname;
    this.students = this.students?.filter(
      (el) => el.name + el.surname !== studentFullName
    );
  }
}
