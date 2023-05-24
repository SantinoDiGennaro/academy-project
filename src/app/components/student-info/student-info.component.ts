import { Component, Input } from '@angular/core';

@Component({
  selector: 'academy-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.scss'],
})
export class StudentInfoComponent {
  @Input({ required: true }) nome: string | undefined;
  @Input({ required: true }) cognome: string | undefined;
  @Input({ required: true }) eta: number | undefined;
}
