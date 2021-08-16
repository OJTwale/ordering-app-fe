import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CustomerOrder } from '../customerOrder';
import { CustomerOrderService } from '../customerOrder.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public customerorders: CustomerOrder[] = [];
  
  constructor(private customerorderService: CustomerOrderService) { }

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
}
