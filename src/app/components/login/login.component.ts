import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { STUDENTS } from 'src/app/data/studentsClassList';
import { User } from 'src/app/models/user.interface';
import { UtilsService } from 'src/app/providers/services/utils.service';
import { LoginService } from 'src/app/services/login.service';

interface LoginForm {
  username: FormControl<string>;
  password: FormControl<string>;
}

interface LoginDataModel {
  username: string;
  password: string;
}

@Component({
  selector: 'academy-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form: FormGroup<LoginForm> = new FormGroup<LoginForm>({
    username: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    password: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  data: Array<LoginDataModel> = [
    ...STUDENTS.map((student) => ({
      username: student.surname.replaceAll(' ', '') + student.age.toString(),
      password: '12345',
    })),
  ];

  constructor(
    private readonly router: Router,
    private readonly utils: UtilsService,
    private readonly loginservice: LoginService
  ) {}

  login() {
    if (
      this.data.some(
        (el) =>
          el.username.toLocaleLowerCase() ===
            this.form?.value?.username?.toLocaleLowerCase() &&
          el.password === this.form.value.password
      )
    ) {
      alert('Login eseguito');
      this.loginservice.user$.next(this.form.value as User);
      this.router.navigateByUrl('students');
    } else {
      alert('Dati errati');
    }
  }
}
