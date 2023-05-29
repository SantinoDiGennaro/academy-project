import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Signup, SignupForm, role } from './models/singup.interface';
import { CustomerSignupService } from './providers/services/signup-facade.service';
import * as uuid from 'uuid';
import { Router } from '@angular/router';
import { LoginService } from '../login/providers/services/login.service';

@Component({
  selector: 'academy-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.scss'],
})
export class SingupComponent {
  form!: FormGroup<SignupForm>;
  register: boolean = true;

  constructor(
    private readonly service: CustomerSignupService,
    private readonly router: Router,
    private readonly loginService: LoginService
  ) {
    this.form = this.registerForm();
  }

  registerForm(): FormGroup<SignupForm> {
    return new FormGroup<SignupForm>({
      username: new FormControl<string>('', {
        nonNullable: true,
      }),
      password: new FormControl<string>('', {
        nonNullable: true,
      }),
      confPassword: new FormControl<string>('', {
        nonNullable: true,
      }),
      email: new FormControl<string>('', {
        nonNullable: true,
      }),
      confEmail: new FormControl<string>('', {
        nonNullable: true,
      }),
    });
  }

  signup() {
    if (
      this.service.clients$
        .getValue()
        .some(
          (el) =>
            el.username === this.form?.value.username ||
            el.email === this.form?.value.email
        )
    ) {
      alert("L'utente esiste già");
    } else {
      if (
        this.form?.value.password !== this.form?.value.confPassword ||
        this.form?.value.email?.toLocaleLowerCase() !==
          this.form?.value.confEmail?.toLocaleLowerCase()
      ) {
        alert('I dati non combaciano');
      } else {
        this.service.addClient({
          id: uuid.v4(),
          username: this.form?.value.username,
          password: this.form?.value.password,
          email: this.form?.value.email,
          creationDate: new Date(),
          role: 'user',
        } as Signup);
        this.form = this.registerForm();
      }
    }
  }

  login() {
    if (
      this.service.clients$
        .getValue()
        .some(
          (el) =>
            el.username.toLocaleLowerCase() ===
              this.form?.value?.username?.toLocaleLowerCase() &&
            el.password === this.form.value.password
        )
    ) {
      alert('Login eseguito');
      this.loginService.setUser(
        this.service.clients$
          .getValue()
          .find(
            (el) =>
              el.username.toLocaleLowerCase() ===
              this.form?.value?.username?.toLocaleLowerCase()
          ) as Signup
      );
      this.router.navigateByUrl('/students');
    } else {
      alert('Dati errati');
    }
  }
}
