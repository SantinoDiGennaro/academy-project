import { Component } from '@angular/core';
import { Bill } from 'src/app/models/bill.interface';
import { Customer } from 'src/app/models/customer.interface';
import { BillService } from 'src/app/services/bill.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'academy-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.scss'],
})
export class BillsComponent {
  bills: Array<Bill> | undefined;
  minValue: number = 0;
  maxValue: number = 0;
  customers: Array<Customer> | undefined;

  constructor(
    private readonly billservice: BillService,
    private readonly customerservice: CustomerService
  ) {}

  ngOnInit(): void {
    this.getAll();
    this.getAllCustomer();
  }

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
}
