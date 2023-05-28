import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'academy-resonance',
  templateUrl: './resonance.component.html',
  styleUrls: ['./resonance.component.scss'],
})
export class ResonanceComponent {
  @Input() likes: number | undefined;
  @Input() dislikes: number | undefined;

  @Output() like: EventEmitter<void> = new EventEmitter<void>();
  @Output() dislike: EventEmitter<void> = new EventEmitter<void>();
}
