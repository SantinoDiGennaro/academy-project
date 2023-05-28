import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Comune, Provincia } from '../../models/customer.interface';

@Injectable({ providedIn: 'root' })
export class CustomerFacadeService {
  comuni$: BehaviorSubject<Array<Comune>> = new BehaviorSubject<Array<Comune>>(
    []
  );
  province$: BehaviorSubject<Array<Provincia>> = new BehaviorSubject<
    Array<Provincia>
  >([]);
}
