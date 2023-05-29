import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LoadingInterceptor } from './providers/interceptors/loading.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoggedGuard } from './features/login/providers/services/guards/logged.guard';
import { NavbarComponent } from './components/navbar/navbar.component';
import { isLoggedDirective } from './features/login/directives/isLogged.directive';
import { SingupComponent } from './features/singup/singup.component';
import { UserListComponent } from './features/singup/user-list/user-list.component';
import { UserEditComponent } from './features/singup/user-edit/user-edit.component';
import { isAdminDirective } from './features/singup/directives/isAdmin.directive';
import { AdminGuard } from './features/singup/providers/services/guards/admin.guard';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SingupComponent,
    UserListComponent,
    UserEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    isLoggedDirective,
    isAdminDirective,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: DelayInterceptor, multi: true },
    LoggedGuard,
    AdminGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
