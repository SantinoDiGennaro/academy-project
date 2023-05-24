import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from 'src/app/models/student.class';

@Component({
  selector: 'academy-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss'],
})
export class StudentComponent {
  @Input({ required: true }) student: Student | undefined;
  @Output() remove: EventEmitter<Student> = new EventEmitter<Student>();

  constructor(private readonly route: Router) {}

  goTo() {
    this.route.navigateByUrl(`students/${this.student!.name}`);
  }
}
