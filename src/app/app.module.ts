import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentsComponent } from './components/students/students.component';
import { StudentComponent } from './components/student/student.component';
import { StudentInfoComponent } from './components/student-info/student-info.component';
import { StudentHobbiesComponent } from './components/student-hobbies/student-hobbies.component';
import { StudentLangComponent } from './components/student-lang/student-lang.component';
import { CountComponent } from './components/count/count.component';
import { ResonanceComponent } from './components/resonance/resonance.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentFormComponent } from './components/student-form/student-form.component';
import { LoginComponent } from './components/login/login.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CustomersComponent } from './features/customers/customers.component';
import { BillsComponent } from './features/bills/bills.component';
import { CustomerFormComponent } from './features/customer-form/customer-form.component';
import { CustomerAddressPipe } from './features/customers/customer-address.pipe';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingInterceptor } from './providers/interceptors/loading.interceptor';
import { DelayInterceptor } from './providers/interceptors/delay.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BillFormComponent } from './bill-form/bill-form.component';
import { LoggedGuard } from './services/guards/logged.guard';

@NgModule({
  declarations: [
    AppComponent,
    StudentsComponent,
    StudentComponent,
    StudentInfoComponent,
    StudentHobbiesComponent,
    StudentLangComponent,
    CountComponent,
    ResonanceComponent,
    StudentFormComponent,
    LoginComponent,
    CustomersComponent,
    BillsComponent,
    CustomerFormComponent,
    CustomerAddressPipe,
    BillFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: DelayInterceptor, multi: true },
    LoggedGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
