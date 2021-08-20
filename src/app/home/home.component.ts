import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerOrder } from '../customerOrder';
import { CustomerOrderService } from '../customerOrder.service';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public customerorders: CustomerOrder[] = [];
  userName:string|null;
  
  constructor(private customerorderService: CustomerOrderService, public authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  
  }


  public getCustomerOrders(): void {
    this.customerorderService.getCustomerOrders().subscribe(
      (response: CustomerOrder[]) => {
        this.customerorders = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public ifLoggedIn(){
    let username=sessionStorage.getItem('username');
    this.userName=username;
    return true
  }

  public isUserAdmin(){
    let isAdmin = sessionStorage.getItem('isadmin');
    
    if(isAdmin==="true"){
      return true
    }
    else{
      return false
    }
  }

  public logout(){
    sessionStorage.removeItem('username')
    sessionStorage.removeItem('isadmin')
    this.router.navigate([''])
  }
}
