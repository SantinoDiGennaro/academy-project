import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { envirorment } from 'src/envirorments/envirorment';
import { Observable } from 'rxjs';
import { Customer } from '../../../customers/models/customer.interface';
import { Bill } from '../../models/bill.interface';

@Injectable({
  providedIn: 'root',
})
export class BillService {
  constructor(private readonly http: HttpClient) {}

  getAllBills(): Observable<Array<Bill>> {
    return this.http.get<Array<Bill>>(`${envirorment.apiUrl}/fattura/getall`);
  }

  getByRange(minAmount: number, maxAmount: number): Observable<Array<Bill>> {
    return this.http.get<Array<Bill>>(
      `${envirorment.apiUrl}/fattura/getbyrange/${minAmount}/${maxAmount}`
    );
  }

  getByCustomer(customer: Customer): Observable<Array<Bill>> {
    return this.http.post<Array<Bill>>(
      `${envirorment.apiUrl}/fattura/getbycliente`,
      customer
    );
  }

  insertBill(bill: Bill): Observable<Bill> {
    return this.http.post<Bill>(
      `${envirorment.apiUrl}/fattura/insertfattura`,
      bill
    );
  }

  updateBill(bill: Bill): Observable<Bill> {
    return this.http.post<Bill>(
      `${envirorment.apiUrl}/fattura/updatefattura`,
      bill
    );
  }

  deleteBill(id: number): Observable<any> {
    return this.http.delete(
      `${envirorment.apiUrl}/fattura/deletefattura/${id}`
    );
  }
}
