import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';

import { map } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LoginService } from '../../login/providers/services/login.service';
import { Signup } from '../models/singup.interface';

@Directive({
  selector: '[isAdmin]',
  standalone: true,
})
export class isAdminDirective {
  hasView: boolean = false;
  constructor(
    private readonly templateRef: TemplateRef<unknown>,
    private readonly viewContainer: ViewContainerRef,
    private readonly login: LoginService
  ) {
    this.login.user$
      .pipe(
        map((user: Signup | null) => user?.role === 'admin'),
        takeUntilDestroyed()
      )
      .subscribe({
        next: (isAdmin: boolean) => {
          if (isAdmin && !this.hasView) {
            this.viewContainer.createEmbeddedView(this.templateRef);
            this.hasView = true;
          } else if (!isAdmin && this.hasView) {
            this.viewContainer.clear();
            this.hasView = false;
          }
        },
      });
  }
}
