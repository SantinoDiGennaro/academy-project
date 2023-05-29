import { Component } from '@angular/core';
import { LoginService } from 'src/app/features/login/providers/services/login.service';
import { Signup } from 'src/app/features/singup/models/singup.interface';

@Component({
  selector: 'academy-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  logged: boolean = false;
  user: string | null = null;
  isAdmin: boolean = false;
  id!: string;

  constructor(private readonly login: LoginService) {
    const userItem = localStorage.getItem('academy_logged_user');
    if (userItem) {
      this.logged = true;
      this.user = JSON.parse(userItem).username;
      this.id = JSON.parse(userItem).id;
      if (JSON.parse(userItem).role == 'admin') {
        this.isAdmin = true;
      }
    }
  }

  logout(): void {
    this.login.logout();
  }
}
