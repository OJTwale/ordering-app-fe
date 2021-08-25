import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerOrderService } from './customerOrder.service';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { CreateComponent } from './create/create.component';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { DisplayOrderComponent } from './display-order/display-order.component';
import { DataTablesModule } from 'angular-datatables';
import { EditOrderComponent } from './edit-order/edit-order.component';
import { LoginComponent } from './login/login.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';

const routes: Routes= [
  {path: 'home', component: HomeComponent},
  {path: 'create', component: CreateComponent},
  {path: 'forgetpassword', component: ForgotpasswordComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ErrorComponent,
    CreateComponent,
    DisplayOrderComponent,
    EditOrderComponent,
    LoginComponent,
    ForgotpasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    MultiSelectModule,
    AngularMultiSelectModule,
    DataTablesModule
  ],
  providers: [CustomerOrderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
