import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer.interface';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'academy-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent implements OnInit {
  customers: Array<Customer> | undefined;
  amount: number = 0;
  name: string = '';

  constructor(private readonly customerservice: CustomerService) {}

  ngOnInit(): void {
    this.getAll();
  }

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
