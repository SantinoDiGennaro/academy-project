import { Component, OnChanges } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'academy-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  logged: boolean = false;
  user: string | null = null;

  constructor(private readonly login: LoginService) {
    if (localStorage.getItem('academy_logged_user')) {
      this.logged = true;
      this.user = JSON.parse(
        localStorage.getItem('academy_logged_user')!
      ).username;
    }
  }

  logout(): void {
    this.login.logout();
  }
}
