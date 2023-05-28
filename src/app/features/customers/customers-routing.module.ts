import { NgModule, inject } from '@angular/core';
import { ResolveFn, RouterModule, Routes } from '@angular/router';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { CustomersComponent } from './customers.component';
import { Comune, Customer } from './models/customer.interface';
import { CustomerService } from './providers/services/customer-http.service';

const getClienti: ResolveFn<Array<Customer>> = () =>
  inject(CustomerService).getAllCustomers();

const getComuni: ResolveFn<Array<Comune>> = () =>
  inject(CustomerService).getAllComune();

const routes: Routes = [
  {
    path: '',
    component: CustomersComponent,
    resolve: { customers: getClienti },
  },
  {
    path: 'add',
    component: CustomerFormComponent,
    resolve: { customers: getClienti, comuni: getComuni },
  },
  {
    path: ':id',
    component: CustomerFormComponent,
    resolve: { customers: getClienti, comuni: getComuni },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomersRoutingModule {}
