import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, map } from 'rxjs';
import { UtilsService } from 'src/app/providers/services/utils.service';
import { LoginService } from '../login.service';

@Injectable()
export class LoggedGuard implements CanActivate {
  constructor(private readonly login: LoginService) {}

  canActivate():
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.login.user$.pipe(
      map((user) => {
        console.log(
          !!user ? 'Accesso eseguito' : 'Non puoi accedere, fai login'
        );
        return !!user;
      })
    );
  }
}
