import { Injectable } from '@angular/core';
import { Signup } from '../../models/singup.interface';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from 'src/app/features/login/providers/services/storage.service';

@Injectable({ providedIn: 'root' })
export class CustomerSignupService {
  clients$: BehaviorSubject<Array<Signup>> = new BehaviorSubject<Array<Signup>>(
    [
      {
        id: '0000',
        username: 'admin',
        password: 'admin',
        email: 'admin@mail.com',
        creationDate: new Date(),
        role: 'admin',
      },
    ]
  );

  constructor(private readonly service: StorageService) {
    if (service.getItem<Array<Signup>>('clienti')) {
      this.clients$.next(service.getItem<Array<Signup>>('clienti')!);
    } else {
      service.setItem<Array<Signup>>('clienti', this.clients$.getValue());
    }
  }

  addClient(client: Signup): void {
    const clients = this.clients$.getValue();
    clients.push(client);
    this.clients$.next(clients);
    this.refreshStorage();
  }

  refreshStorage(): void {
    this.service.setItem<Array<Signup>>('clienti', this.clients$.getValue());
  }
}
