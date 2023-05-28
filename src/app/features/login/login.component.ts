import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { STUDENTS } from 'src/app/features/students/models/studentsClassList';
import { User } from 'src/app/features/login/models/user.interface';
import { LoginService } from './providers/services/login.service';

interface LoginForm {
  username: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'academy-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule],
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

  data: Array<User> = [
    ...STUDENTS.map((student) => ({
      username: student.surname.replaceAll(' ', '') + student.age.toString(),
      password: '12345',
    })),
  ];

  constructor(
    private readonly router: Router,
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
      this.loginservice.setUser(this.form.value as User);
      this.router.navigateByUrl('students');
    } else {
      alert('Dati errati');
    }
  }
}
