import { NgModule, inject } from '@angular/core';
import { CanActivateFn, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { StudentsComponent } from './components/students/students.component';
import { StudentFormComponent } from './components/student-form/student-form.component';
import { CustomersComponent } from './features/customers/customers.component';
import { BillsComponent } from './features/bills/bills.component';
import { CustomerFormComponent } from './features/customer-form/customer-form.component';
import { BillFormComponent } from './bill-form/bill-form.component';
import { LoggedGuard } from './services/guards/logged.guard';

const loggedIn: CanActivateFn = (route) => {
  return inject(LoggedGuard).canActivate();
};

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'students', component: StudentsComponent },
  {
    path: 'students',
    canActivate: [loggedIn],
    children: [
      { path: ':id', component: StudentFormComponent },
      { path: '', component: StudentFormComponent },
    ],
  },
  { path: 'form', component: StudentFormComponent },
  { path: 'customers/add', component: CustomerFormComponent },
  {
    path: 'customers',
    children: [
      { path: ':id', component: CustomerFormComponent },
      { path: '', component: CustomersComponent },
    ],
  },
  { path: 'bill/add', component: BillFormComponent },
  {
    path: 'bills',
    children: [
      { path: ':id', component: BillFormComponent },
      { path: '', component: BillsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
