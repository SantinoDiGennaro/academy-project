import { NgModule, inject } from '@angular/core';
import { CanActivateFn, RouterModule, Routes } from '@angular/router';
import { LoggedGuard } from './features/login/providers/services/guards/logged.guard';

const loggedIn: CanActivateFn = (route) => {
  return inject(LoggedGuard).canActivate();
};

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'login',
    loadComponent: () =>
      import('./features/login/login.component').then((c) => c.LoginComponent),
  },

  {
    path: 'students',
    loadChildren: () =>
      import('./features/students/students.module').then(
        (m) => m.StudentsModule
      ),
    canActivate: [loggedIn],
  },

  {
    path: 'customers',
    loadChildren: () =>
      import('./features/customers/customers.module').then(
        (m) => m.CustomersModule
      ),
    canActivate: [loggedIn],
  },

  {
    path: 'bills',
    loadChildren: () =>
      import('./features/bills/bills.module').then((m) => m.BillsModule),
    canActivate: [loggedIn],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { bindToComponentInputs: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
