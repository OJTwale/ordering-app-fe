import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CustomerOrder } from './customerOrder';
import { CustomerOrderService } from './customerOrder.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  

  constructor(private customerorderService: CustomerOrderService){}
  ngOnInit(){
    
  }

  
}
