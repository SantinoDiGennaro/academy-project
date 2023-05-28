import { FormControl, FormGroup } from '@angular/forms';
import { CustomerForm } from '../../customers/models/customer-form.interface';

export interface FormBill {
  idFattura: FormControl<number>;
  numero: FormControl<number>;
  importo: FormControl<number>;
  cliente: FormGroup<CustomerForm>;
}
