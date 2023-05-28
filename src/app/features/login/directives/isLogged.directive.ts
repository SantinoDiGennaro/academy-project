import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';

import { User } from '../models/user.interface';
import { map } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LoginService } from '../providers/services/login.service';

@Directive({
  selector: '[isLogged]',
  standalone: true,
})
export class isLoggedDirective {
  hasView: boolean = false;
  constructor(
    private readonly templateRef: TemplateRef<unknown>,
    private readonly viewContainer: ViewContainerRef,
    private readonly login: LoginService
  ) {
    this.login.user$
      .pipe(
        map((user: User | null) => !!user),
        takeUntilDestroyed()
      )
      .subscribe({
        next: (isLogged: boolean) => {
          if (isLogged && !this.hasView) {
            this.viewContainer.createEmbeddedView(this.templateRef);
            this.hasView = true;
          } else if (!isLogged && this.hasView) {
            this.viewContainer.clear();
            this.hasView = false;
          }
        },
      });
  }
}
