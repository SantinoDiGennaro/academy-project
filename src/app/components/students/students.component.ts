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
    if (localStorage.getItem('academy_students')) {
      this.students = JSON.parse(localStorage.getItem('academy_students')!);
    } else {
      this.fill();
    }
  }

  fill(): void {
    this.students = structuredClone(STUDENTS);
    localStorage.setItem('academy_students', JSON.stringify(this.students));
  }

  removeAll(): void {
    localStorage.removeItem('academy_students');
    this.students = [];
  }

  remove(student: Student): void {
    const studentId = student.id;
    this.students = this.students?.filter((el) => el.id !== studentId);
    localStorage.setItem('academy_students', JSON.stringify(this.students));
  }
}
