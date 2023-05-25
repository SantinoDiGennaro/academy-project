import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from './providers/services/utils.service';
import { Observable, delay } from 'rxjs';

@Component({
  selector: 'academy-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'academy-project';
  loading$: Observable<boolean>;

  constructor(private readonly utils: UtilsService) {
    this.loading$ = this.utils.loading$.pipe(delay(100));
  }
}
