import { Component, Input } from '@angular/core';
import { BillService } from 'src/app/features/bills/providers/services/bill-http.service';
import { CustomerService } from 'src/app/features/customers/providers/services/customer-http.service';
import { Customer } from '../customers/models/customer.interface';
import { Bill } from './models/bill.interface';

@Component({
  selector: 'academy-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.scss'],
})
export class BillsComponent {
  @Input() bills: Array<Bill> | undefined;
  @Input() customers: Array<any> | undefined;
  minValue: number = 0;
  maxValue: number = 0;

  constructor(
    private readonly billservice: BillService,
    private readonly customerservice: CustomerService
  ) {}

  getAll(): void {
    this.billservice.getAllBills().subscribe({
      next: (bills) => (this.bills = bills),
    });
  }

  getAllCustomer(): void {
    this.customerservice.getAllCustomers().subscribe({
      next: (clienti) => (this.customers = clienti),
    });
  }

  getByRange(min: number, max: number): void {
    this.billservice.getByRange(min, max).subscribe({
      next: (bills) => (this.bills = bills),
    });
  }

  getByCustomer(customer: Customer): void {
    this.billservice.getByCustomer(customer).subscribe({
      next: (bills) => (this.bills = bills),
    });
  }

  filterByName(e: any): void {
    this.bills = this.bills?.filter((el) =>
      el.cliente.ragioneSociale.includes(e.target.value)
    );
  }
}
