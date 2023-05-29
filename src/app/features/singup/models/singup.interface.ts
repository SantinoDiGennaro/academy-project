import { FormControl } from '@angular/forms';

export interface Signup {
  id: string;
  username: string;
  password: string;
  email: string;
  creationDate: Date;
  role: role;
}

export type role = 'user' | 'admin';

export interface SignupForm {
  username: FormControl<string>;
  password: FormControl<string>;
  confPassword: FormControl<string>;
  email: FormControl<string>;
  confEmail: FormControl<string>;
}
