import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Signup, SignupForm } from '../models/singup.interface';
import { CustomerSignupService } from '../providers/services/signup-facade.service';

@Component({
  selector: 'academy-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit {
  @Input() id!: string;
  form!: FormGroup<SignupForm>;
  users!: Array<Signup>;
  user!: Signup;

  constructor(private readonly service: CustomerSignupService) {
    this.users = this.service.clients$.getValue();
  }

  ngOnInit(): void {
    this.user = this.service.clients$
      .getValue()
      .find((el) => el.id === this.id) as Signup;
    this.form = this.editForm(this.user as Signup);
  }

  editForm(user: Signup): FormGroup<SignupForm> {
    return new FormGroup<SignupForm>({
      username: new FormControl<string>(user.username ?? '', {
        nonNullable: true,
      }),
      password: new FormControl<string>(user.password ?? '', {
        nonNullable: true,
      }),
      confPassword: new FormControl<string>(user.password ?? '', {
        nonNullable: true,
      }),
      email: new FormControl<string>(user.email ?? '', {
        nonNullable: true,
      }),
      confEmail: new FormControl<string>(user.email ?? '', {
        nonNullable: true,
      }),
    });
  }

  save() {
    console.log(this.form.value.username);
    if (
      this.form?.value.password !== this.form?.value.confPassword ||
      this.form?.value.email?.toLocaleLowerCase() !==
        this.form?.value.confEmail?.toLocaleLowerCase()
    ) {
      alert('I dati non combaciano');
    } else {
      const newUser = {
        id: this.id,
        username: this.form.value.username,
        password: this.form.value.password,
        email: this.form.value.email,
        creationDate: this.user.creationDate,
        role: this.user.role,
      };
      this.users = this.users.map((el) =>
        el.id === this.id ? newUser : el
      ) as Array<Signup>;
      this.service.clients$.next(this.users);
      this.service.refreshStorage();
      alert('Modifica eseguita');
    }
  }
}
