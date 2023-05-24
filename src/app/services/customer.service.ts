import { HttpClient, HttpParams } from '@angular/common/http';
import { ENVIRONMENT_INITIALIZER, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { envirorment } from 'src/envirorments/envirorment';
import { Comune, Customer, Provincia } from '../models/customer.interface';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private readonly http: HttpClient) {}

  getAllCustomers(): Observable<Array<Customer>> {
    return this.http.get<Array<Customer>>(
      `${envirorment.apiUrl}/cliente/getall`
    );
  }

  getByAmount(amount: number): Observable<Array<Customer>> {
    return this.http.get<Array<Customer>>(
      `${envirorment.apiUrl}/cliente/clientibyfatturato/${amount}`
    );
  }

  getByName(name: string): Observable<Array<Customer>> {
    return this.http.get<Array<Customer>>(
      `${envirorment.apiUrl}/cliente/clientibyragionesociale/${name}`
    );
  }

  insertClient(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(
      `${envirorment.apiUrl}/cliente/insertclient`,
      customer
    );
  }

  getAllComune(): Observable<Array<Comune>> {
    return this.http.get<Array<Comune>>(`${envirorment.apiUrl}/comune/getall`);
  }

  getAllProvincia(): Observable<Array<Provincia>> {
    return this.http.get<Array<Provincia>>(
      `${envirorment.apiUrl}/provincia/getall`
    );
  }

  updateCliente(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(
      `${envirorment.apiUrl}/cliente/updateclient`,
      customer
    );
  }

  deleteClient(id: number): Observable<any> {
    return this.http.delete(`${envirorment.apiUrl}/cliente/deleteclient/${id}`);
  }
}
