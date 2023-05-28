import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillsRoutingModule } from './bills-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BillFormComponent } from './bill-form/bill-form.component';
import { BillService } from './providers/services/bill-http.service';
import { BillsComponent } from './bills.component';
import { CustomerService } from '../customers/providers/services/customer-http.service';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [BillsComponent, BillFormComponent],
  imports: [
    CommonModule,
    BillsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  providers: [BillService, CustomerService],
})
export class BillsModule {}
