import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { DisplayOrderComponent } from './display-order/display-order.component';
import { EditOrderComponent } from './edit-order/edit-order.component';
import { ErrorComponent } from './error/error.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

const routes: Routes= [
  {path: 'home', component: HomeComponent},
  {path: 'editorder/:id', component:EditOrderComponent},
  {path: 'orders', component: DisplayOrderComponent},
  {path: 'create', component: CreateComponent},
  {path: '', component: LoginComponent},
  {path: 'forgetpass', component:ForgotpasswordComponent},
  {path: '**', component: ErrorComponent},
  {path: 'login', component:LoginComponent}
  
  
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
