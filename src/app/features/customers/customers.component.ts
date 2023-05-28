import { Component, Input, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/features/customers/providers/services/customer-http.service';
import { Customer } from './models/customer.interface';

@Component({
  selector: 'academy-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent implements OnInit {
  @Input() customers: Array<Customer> | undefined;
  amount: number = 0;
  name: string = '';

  constructor(private readonly customerservice: CustomerService) {}

  ngOnInit(): void {}

  getAll(): void {
    this.customerservice.getAllCustomers().subscribe({
      next: (customers) => (this.customers = customers),
    });
  }

  getByAmount(amount: number): void {
    this.customerservice.getByAmount(amount).subscribe({
      next: (customers) => (this.customers = customers),
    });
  }

  getByName(name: string): void {
    this.customerservice.getByName(name).subscribe({
      next: (customers) => (this.customers = customers),
    });
  }
}
