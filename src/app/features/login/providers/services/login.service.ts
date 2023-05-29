import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';
import { Signup } from 'src/app/features/singup/models/singup.interface';

@Injectable({ providedIn: 'root' })
export class LoginService {
  user$: BehaviorSubject<Signup | null> = new BehaviorSubject<Signup | null>(
    null
  );
  constructor(
    private readonly storage: StorageService,
    private readonly router: Router
  ) {
    const user = this.storage.getItem<Signup>('academy_logged_user');
    if (user) {
      this.setUser(user);
    }
  }

  setUser(user: Signup): void {
    this.user$.next(user);
    this.storage.setItem('academy_logged_user', user);
  }

  logout(): void {
    this.user$.next(null);
    this.storage.removeItem('academy_logged_user');
    this.router.navigateByUrl('/login');
  }
}
