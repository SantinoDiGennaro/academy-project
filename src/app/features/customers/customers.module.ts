import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { CustomersComponent } from './customers.component';
import { CustomerAddressPipe } from './providers/pipes/customer-address.pipe';
import { CustomerFacadeService } from './providers/services/customer-facade.service';
import { CustomerService } from './providers/services/customer-http.service';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    CustomersComponent,
    CustomerFormComponent,
    CustomerAddressPipe,
  ],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  providers: [CustomerService, CustomerFacadeService],
})
export class CustomersModule {}
