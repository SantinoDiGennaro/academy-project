import { Component } from '@angular/core';
import { FormBill } from '../models/bill-form.interface';
import { Bill } from '../models/bill.interface';
import { FormGroup, FormControl } from '@angular/forms';
import {
  TipoClienteOption,
  FormIndirizzo,
  FormComune,
  FormProvincia,
  CustomerForm,
} from '../models/customer-form.interface';
import { Customer } from '../models/customer.interface';
import { CustomerService } from '../services/customer.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap, concatMap, map, catchError, of } from 'rxjs';
import { BillService } from '../services/bill.service';

@Component({
  selector: 'academy-bill-form',
  templateUrl: './bill-form.component.html',
  styleUrls: ['./bill-form.component.scss'],
})
export class BillFormComponent {
  form!: FormGroup<FormBill>;
  customers!: Array<Customer>;
  bills!: Array<Bill>;
  edit: boolean = false;
  id: number | undefined;

  constructor(
    private readonly customerservice: CustomerService,
    private readonly billservice: BillService,
    private readonly route: ActivatedRoute
  ) {
    this.form = this.createForm();
    this.getAllCustomer();
    this.getAllBills();

    this.route.paramMap
      .pipe(
        tap((map: ParamMap) => (this.edit = map.has('id'))),
        concatMap((paramMap: ParamMap) => {
          if (paramMap.has('id')) {
            this.id = +paramMap.get('id')!;
            return this.billservice.getAllBills().pipe(
              map((bills: Array<Bill>) =>
                bills.find((b) => b.idFattura === +paramMap.get('id')!)
              ),
              catchError((error: Error) => of(undefined))
            );
          } else {
            return of(undefined);
          }
        }),
        takeUntilDestroyed()
      )
      .subscribe({
        next: (bill: Bill | undefined) => {
          this.form = this.createForm(bill);
        },
      });
  }

  createForm(bill?: Bill): FormGroup<FormBill> {
    return new FormGroup<FormBill>({
      idFattura: new FormControl<number>(bill?.idFattura ?? 0, {
        nonNullable: true,
      }),
      numero: new FormControl<number>(bill?.numero ?? 0, { nonNullable: true }),
      importo: new FormControl<number>(bill?.importo ?? 0, {
        nonNullable: true,
      }),
      cliente: new FormGroup<CustomerForm>({
        idCliente: new FormControl<number>(bill?.cliente?.idCliente ?? 0, {
          nonNullable: true,
        }),
        ragioneSociale: new FormControl<string>(
          bill?.cliente?.ragioneSociale ?? '',
          {
            nonNullable: true,
          }
        ),
        partitaIva: new FormControl<string>(bill?.cliente?.partitaIva ?? '', {
          nonNullable: true,
        }),
        tipoCliente: new FormControl<TipoClienteOption>(
          bill?.cliente?.tipoCliente ?? '',
          {
            nonNullable: true,
          }
        ),
        email: new FormControl<string>(bill?.cliente?.email ?? '', {
          nonNullable: true,
        }),
        telefono: new FormControl<string>(bill?.cliente?.telefono ?? '', {
          nonNullable: true,
        }),
        indirizzo: new FormGroup<FormIndirizzo>({
          idIndirizzo: new FormControl<number>(
            bill?.cliente?.indirizzo.idIndirizzo ?? 0,
            { nonNullable: true }
          ),
          via: new FormControl<string>(bill?.cliente?.indirizzo.via ?? '', {
            nonNullable: true,
          }),
          civico: new FormControl<string>(
            bill?.cliente?.indirizzo.civico ?? '',
            {
              nonNullable: true,
            }
          ),
          comune: new FormGroup<FormComune>({
            idComune: new FormControl<number>(
              bill?.cliente?.indirizzo.comune.idComune ?? 0,
              { nonNullable: true }
            ),
            nome: new FormControl<string>(
              bill?.cliente?.indirizzo.comune.nome ?? '',
              {
                nonNullable: true,
              }
            ),
            provincia: new FormGroup<FormProvincia>({
              idProvincia: new FormControl<number>(
                bill?.cliente?.indirizzo.comune.provincia.idProvincia ?? 0,
                { nonNullable: true }
              ),
              sigla: new FormControl<string>(
                bill?.cliente?.indirizzo.comune.provincia.sigla ?? '',
                { nonNullable: true }
              ),
              nome: new FormControl<string>(
                bill?.cliente?.indirizzo.comune.provincia.nome ?? '',
                { nonNullable: true }
              ),
            }),
          }),
        }),
        fatturato: new FormControl<number>(bill?.cliente?.fatturato ?? 0, {
          nonNullable: true,
        }),
      }),
    });
  }

  getAllCustomer(): void {
    this.customerservice.getAllCustomers().subscribe({
      next: (clienti) => (this.customers = clienti),
    });
  }

  selectClient(e: any) {
    const client = this.customers.find(
      (c) => c.ragioneSociale === e.target.value
    );
    this.form.controls.cliente.setValue(client!);
  }

  getAllBills(): void {
    this.billservice.getAllBills().subscribe({
      next: (bills) => (this.bills = bills),
    });
  }

  save() {
    if (this.edit) {
      this.billservice.updateBill(this.form.value as Required<Bill>).subscribe({
        next: (c) => {
          alert('Fattura aggiornata con successo');
        },
      });
    } else {
      this.billservice.insertBill(this.form.value as Required<Bill>).subscribe({
        next: (c) => {
          alert('Fattura inserita con successo');
        },
      });
    }
  }

  delete(): void {
    if (confirm('Sicuro di voler eliminare la fattura?')) {
      this.billservice.deleteBill(this.id!).subscribe({
        next: () => alert('Fattura eliminata'),
      });
    } else {
      alert('Eliminazione annullata');
    }
  }
}
