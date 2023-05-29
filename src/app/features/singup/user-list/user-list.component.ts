import { Component } from '@angular/core';
import { CustomerSignupService } from '../providers/services/signup-facade.service';
import { Signup, role } from '../models/singup.interface';

@Component({
  selector: 'academy-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent {
  users: Array<Signup> | undefined;
  newRole: role = 'user';

  constructor(private readonly service: CustomerSignupService) {
    this.users = this.service.clients$.getValue();
  }

  save(id: string) {
    this.users?.map((el) =>
      el.id === id ? (el.role = this.newRole) : el.role
    );
    this.service.clients$.next(this.users!);
    this.service.refreshStorage();
    console.log(this.users);
  }

  selectRole(e: any): void {
    this.newRole = e.target.value;
  }
}
