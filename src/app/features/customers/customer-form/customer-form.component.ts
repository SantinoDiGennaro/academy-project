import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  catchError,
  combineLatestWith,
  concatMap,
  forkJoin,
  map,
  of,
  switchMap,
  tap,
} from 'rxjs';
import {
  CustomerForm,
  FormComune,
  FormIndirizzo,
  FormProvincia,
  TipoClienteOption,
} from 'src/app/features/customers/models/customer-form.interface';
import { CustomerService } from 'src/app/features/customers/providers/services/customer-http.service';
import { CustomerFacadeService } from '../providers/services/customer-facade.service';
import { Comune, Customer, Provincia } from '../models/customer.interface';

@Component({
  selector: 'academy-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss'],
})
export class CustomerFormComponent implements OnInit {
  form!: FormGroup<CustomerForm>;
  @Input() comuni: Array<Comune> | undefined;
  @Input() customers!: Array<Customer>;
  edit: boolean = false;
  @Input() id: string | undefined;
  @Input() province: Array<Provincia> | undefined;

  constructor(
    private readonly customerservice: CustomerService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly facadeService: CustomerFacadeService
  ) {
    // this.facadeService.comuni$
    //   .pipe(
    //     combineLatestWith(this.facadeService.province$),
    //     switchMap(([comuni, province]) => {
    //       if (comuni.length && province.length) {
    //         return of([comuni, province] as [Array<Comune>, Array<Provincia>]);
    //       } else {
    //         return forkJoin([
    //           this.customerservice.getAllComune(),
    //           this.customerservice.getAllProvincia(),
    //         ]).pipe(
    //           tap(([comuni, province]) => {
    //             this.facadeService.comuni$.next(comuni);
    //             this.facadeService.province$.next(province);
    //           })
    //         );
    //       }
    //     }),
    //     takeUntilDestroyed()
    //   )
    //   .subscribe({
    //     next: ([comuni, province]: [Array<Comune>, Array<Provincia>]) => {
    //       this.comuni = comuni;
    //       this.province = province;
    //     },
    //   });
    // // concatMap
    // this.route.paramMap
    //   .pipe(
    //     // operators built-in o custom
    //     tap((map: ParamMap) => (this.edit = map.has('id'))),
    //     concatMap((paramMap: ParamMap) => {
    //       if (paramMap.has('id')) {
    //         this.id = +paramMap.get('id')!;
    //         return this.customerservice.getAllCustomers().pipe(
    //           map((customers: Array<Customer>) =>
    //             customers.find((c) => c.idCliente === +paramMap.get('id')!)
    //           ),
    //           catchError((error: Error) => of(undefined))
    //         );
    //       } else {
    //         return of(undefined);
    //       }
    //     }),
    //     takeUntilDestroyed()
    //   )
    //   .subscribe({
    //     next: (customer: Customer | undefined) => {
    //       this.form = this.createForm(customer);
    //     },
    //   });
    // const obs = new Subject<Array<{ name: string; x: number }>>();
    // obs
    //   .pipe(
    //     map((value) => value.filter((e) => e.x === 3)),
    //     filter((value) => !!value.length),
    //     takeUntilDestroyed()
    //   )
    //   .subscribe({
    //     next: (value: Array<{ name: string; x: number }>) => {
    //       console.log(value);
    //     },
    //   });
    // obs.next([
    //   { name: 'Marco', x: 1 },
    //   { name: 'Santino', x: 2 },
    // ]);
    // obs.next([
    //   { name: 'Emanuela', x: 1 },
    //   { name: 'Manuel', x: 2 },
    //   { name: 'Alessandro', x: 3 },
    // ]);
    // obs.next([
    //   { name: 'Valentina', x: 1 },
    //   { name: 'Chiara', x: 2 },
    //   { name: 'Giovanni', x: 3 },
    // ]);
    // this.form
    //   .get('ragioneSociale')
    //   ?.valueChanges.pipe(
    //     // l'operatore filter agisce sugli eventi emessi
    //     filter((value: string) => value.length > 4),
    //     debounceTime(500),
    //     distinctUntilChanged()
    //   )
    //   .subscribe({
    //     next: (value: string) => {},
    //   });
  }

  ngOnInit(): void {
    if (this.id) {
      const customer = this.customers?.find((c) => c.idCliente === +this.id!);
      this.edit = true;
      this.form = this.createForm(customer);
    } else {
      this.form = this.createForm();
    }
  }

  createForm(customer?: Customer): FormGroup<CustomerForm> {
    return new FormGroup<CustomerForm>({
      idCliente: new FormControl<number>(customer?.idCliente ?? 0, {
        nonNullable: true,
      }),
      ragioneSociale: new FormControl<string>(customer?.ragioneSociale ?? '', {
        nonNullable: true,
      }),
      partitaIva: new FormControl<string>(customer?.partitaIva ?? '', {
        nonNullable: true,
      }),
      tipoCliente: new FormControl<TipoClienteOption>(
        customer?.tipoCliente ?? '',
        {
          nonNullable: true,
        }
      ),
      email: new FormControl<string>(customer?.email ?? '', {
        nonNullable: true,
      }),
      telefono: new FormControl<string>(customer?.telefono ?? '', {
        nonNullable: true,
      }),
      indirizzo: new FormGroup<FormIndirizzo>({
        idIndirizzo: new FormControl<number>(
          customer?.indirizzo.idIndirizzo ?? 0,
          { nonNullable: true }
        ),
        via: new FormControl<string>(customer?.indirizzo.via ?? '', {
          nonNullable: true,
        }),
        civico: new FormControl<string>(customer?.indirizzo.civico ?? '', {
          nonNullable: true,
        }),
        comune: new FormGroup<FormComune>({
          idComune: new FormControl<number>(
            customer?.indirizzo.comune.idComune ?? 0,
            { nonNullable: true }
          ),
          nome: new FormControl<string>(customer?.indirizzo.comune.nome ?? '', {
            nonNullable: true,
          }),
          provincia: new FormGroup<FormProvincia>({
            idProvincia: new FormControl<number>(
              customer?.indirizzo.comune.provincia.idProvincia ?? 0,
              { nonNullable: true }
            ),
            sigla: new FormControl<string>(
              customer?.indirizzo.comune.provincia.sigla ?? '',
              { nonNullable: true }
            ),
            nome: new FormControl<string>(
              customer?.indirizzo.comune.provincia.nome ?? '',
              { nonNullable: true }
            ),
          }),
        }),
      }),
      fatturato: new FormControl<number>(customer?.fatturato ?? 0, {
        nonNullable: true,
      }),
    });
  }

  save() {
    if (this.edit) {
      this.customerservice
        .updateCliente(this.form.value as Required<Customer>)
        .subscribe({
          next: (c) => {
            alert('Cliente aggiornato con successo');
          },
        });
    } else {
      this.customerservice
        .insertClient(this.form.value as Required<Customer>)
        .subscribe({
          next: (c) => {
            alert('Cliente inserito con successo');
          },
        });
    }
  }

  changeComune(e: any) {
    const comune = e.target.value;
    const objComune = this.comuni!.find((el) => el.nome === comune);
    this.form.controls.indirizzo.controls.comune.setValue(objComune!);
    console.log(this.form.value);
  }

  getAll(): void {
    this.customerservice.getAllCustomers().subscribe({
      next: (customers) => (this.customers = customers),
    });
  }

  delete(): void {
    try {
      // getFatturaByCliente() => if fatture.length => non posso cancellare il cliente perché ha fatture in essere
      // else fa ciò di cui sotto
      if (confirm('Sicuro di voler eliminare il cliente?')) {
        this.customerservice.deleteClient(+this.id!).subscribe({
          next: () => {
            alert('Cliente eliminato');
            this.router.navigateByUrl('/customers');
          },
        });
      } else {
        alert('Eliminazione annullata');
      }
    } catch (error) {
      alert(
        'Non è stato possibile eliminare il cliente.\nSe il problema persiste contattare il servizio clienti.'
      );
    }
  }
}
