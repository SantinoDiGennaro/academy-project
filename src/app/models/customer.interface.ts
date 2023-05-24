import { TipoCliente } from './customer-form.interface';

export interface Customer {
  idCliente: number;
  ragioneSociale: string;
  partitaIva: string;
  tipoCliente: TipoCliente;
  email: string;
  telefono: string;
  indirizzo: Indirizzo;
  fatturato: number;
}

export interface Indirizzo {
  idIndirizzo: number;
  via: string;
  civico: string;
  comune: Comune;
}

export interface Comune {
  idComune: number;
  nome: string;
  provincia: Provincia;
}

export interface Provincia {
  idProvincia: number;
  sigla: string;
  nome: string;
}
