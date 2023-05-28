import { Customer } from '../../customers/models/customer.interface';

export interface Bill {
  idFattura: number;
  numero: number;
  importo: number;
  cliente: Customer;
}
