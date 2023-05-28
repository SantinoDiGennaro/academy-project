import { Component, Input } from '@angular/core';

@Component({
  selector: 'academy-count',
  templateUrl: './count.component.html',
  styleUrls: ['./count.component.scss'],
})
export class CountComponent {
  @Input() count: number | undefined;
}
