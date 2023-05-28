import { NgModule, inject } from '@angular/core';
import { ResolveFn, RouterModule, Routes } from '@angular/router';
import { BillFormComponent } from './bill-form/bill-form.component';
import { BillsComponent } from './bills.component';
import { Bill } from './models/bill.interface';
import { BillService } from './providers/services/bill-http.service';
import { Customer } from '../customers/models/customer.interface';
import { CustomerService } from '../customers/providers/services/customer-http.service';

const getFatture: ResolveFn<Array<Bill>> = () =>
  inject(BillService).getAllBills();

const getClienti: ResolveFn<Array<Customer>> = () =>
  inject(CustomerService).getAllCustomers();

const routes: Routes = [
  {
    path: '',
    component: BillsComponent,
    resolve: {
      bills: getFatture,
      customers: getClienti,
    },
  },
  {
    path: 'add',
    component: BillFormComponent,
    resolve: {
      customers: getClienti,
    },
  },
  {
    path: ':id',
    component: BillFormComponent,
    resolve: {
      bills: getFatture,
      customers: getClienti,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BillsRoutingModule {}
