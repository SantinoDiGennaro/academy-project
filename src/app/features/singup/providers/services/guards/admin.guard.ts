import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { LoginService } from 'src/app/features/login/providers/services/login.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly login: LoginService) {}

  canActivate():
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.login.user$.pipe(
      map((user) => {
        let admin = false;
        if (user?.role === 'admin') {
          admin = true;
          console.log('Sei autorizzato');
        } else {
          console.log('non sei autorizzato');
        }
        return admin;
      })
    );
  }
}
