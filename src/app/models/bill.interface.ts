import { Customer } from './customer.interface';

export interface Bill {
  idFattura: number;
  numero: number;
  importo: number;
  cliente: Customer;
}
