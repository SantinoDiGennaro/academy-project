import { NgModule, inject } from '@angular/core';
import { CanActivateFn, RouterModule, Routes } from '@angular/router';
import { LoggedGuard } from './features/login/providers/services/guards/logged.guard';
import { UserListComponent } from './features/singup/user-list/user-list.component';
import { UserEditComponent } from './features/singup/user-edit/user-edit.component';
import { SingupComponent } from './features/singup/singup.component';
import { AdminGuard } from './features/singup/providers/services/guards/admin.guard';

const loggedIn: CanActivateFn = (route) => {
  return inject(LoggedGuard).canActivate();
};

const auth: CanActivateFn = (route) => {
  return inject(AdminGuard).canActivate();
};

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: SingupComponent },
  { path: 'users-list', component: UserListComponent, canActivate: [auth] },
  {
    path: 'user-edit/:id',
    component: UserEditComponent,
    canActivate: [loggedIn],
  },
  // {
  //   path: 'login',
  //   loadComponent: () =>
  //     import('./features/login/login.component').then((c) => c.LoginComponent),
  // },

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
