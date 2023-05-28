import { FormControl, FormGroup } from '@angular/forms';

export interface CustomerForm {
  idCliente?: FormControl<number>;
  ragioneSociale: FormControl<string>;
  partitaIva: FormControl<string>;
  tipoCliente: FormControl<TipoClienteOption>;
  email: FormControl<string>;
  telefono: FormControl<string>;
  indirizzo: FormGroup<FormIndirizzo>;
  fatturato: FormControl<number>;
}

export type TipoCliente = 'SRL' | 'SPA' | 'SAS' | 'SNC' | 'PA';
export type TipoClienteOption = 'SRL' | 'SPA' | 'SAS' | 'SNC' | 'PA' | '';

export interface FormIndirizzo {
  idIndirizzo?: FormControl<number>;
  via: FormControl<string>;
  civico: FormControl<string>;
  comune: FormGroup<FormComune>;
}

export interface FormComune {
  idComune?: FormControl<number>;
  nome: FormControl<string>;
  provincia: FormGroup<FormProvincia>;
}

export interface FormProvincia {
  idProvincia: FormControl<number>;
  sigla: FormControl<string>;
  nome: FormControl<string>;
}
