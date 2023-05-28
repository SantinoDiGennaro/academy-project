import { Pipe, PipeTransform } from '@angular/core';
import { Indirizzo } from '../../models/customer.interface';

@Pipe({ name: 'customerAddress' })
export class CustomerAddressPipe implements PipeTransform {
  transform(value: Indirizzo): string {
    return `${value.via} ${value.civico} ${value.comune.nome} (${value.comune.provincia.sigla})`;
  }
}
