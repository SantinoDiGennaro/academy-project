import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.interface';
import { StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class LoginService {
  user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  constructor(private readonly storage: StorageService) {
    const user = this.storage.getItem<User>('academy_logged_user');
    if (user) {
      this.setUser(user);
    }
  }

  setUser(user: User): void {
    this.user$.next(user);
    this.storage.setItem('academy_logged_user', user);
  }
}
