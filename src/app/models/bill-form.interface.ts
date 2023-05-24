import { FormControl, FormGroup } from '@angular/forms';
import { CustomerForm } from './customer-form.interface';

export interface FormBill {
  idFattura: FormControl<number>;
  numero: FormControl<number>;
  importo: FormControl<number>;
  cliente: FormGroup<CustomerForm>;
}
