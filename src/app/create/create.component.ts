import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AppComponent } from '../app.component';
import { CustomerOrder } from '../customerOrder';
import { CustomerOrderService } from '../customerOrder.service';

import { ProductService } from '../product.service';
import { Product } from '../product';
import { OrderStatus } from '../orderStatus';
import { OrderStatusService } from '../OrderStatus.service';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  orderStatuss: OrderStatus[];
  newCustomerOrder: CustomerOrder;
  orderNumber: string;
  orderDate: Date;
  orderCost: number;
  customerName: string;
  customerAddress: string;
  products: any=[];
  selectedItems: Product[];
  dropdownSettings: {};
  totalCost: number;
  latestOrderNumber?: string;
  formModel = {
    selectedProducts: [],
    oCost: '',
    cName: '',
    cAddress:'',
  }
  
  
  constructor(private customerOrderService: CustomerOrderService,private router: Router, private productService:ProductService, private orderStatusService:OrderStatusService){
  
  }

  ngOnInit(): void {
    
    this.getProducts();
    this.dropdownSettings = {
      selectAllText: "Select All",
      unSelectAllText: "Unselect All",
      primaryKey: "id",
      labelKey: "productName",
      classes: "myclass custom-class",
      enableSearchFilter: false,
    };
  }

  public getProducts(): void{
    this.productService.getProducts().subscribe(
      (response: Product[]) => {
        this.products=response;
      }
    )
  }

  
  onItemSelect(item: any){
    this.totalCost=0;
    this.formModel.selectedProducts.forEach((x: Product) => {
          this.totalCost+=Number(x.productCost);
    });
    
  }
  onItemDeSelect(item: any){
    this.totalCost=0;
    this.formModel.selectedProducts.forEach((x: Product) => {
      this.totalCost+=Number(x.productCost);

    });
  }

  onCreate(order: NgForm){
    console.log(order.value.cName, order.value.cAddress, this.totalCost);
    
    if(order.value.cName==="" || order.value.cAddress==="" || this.totalCost==0){
      Swal.fire({
        title: "Something Went Wrong",
        text: "Please fill all fields marked as *",
        icon: "warning",
        showCloseButton: true,
      })
    }
    else{
      
      this.newCustomerOrder = {
      orderDate: new Date(),
      orderCost: this.totalCost,
      customerName: order.value.cName,
      customerAddress: order.value.cAddress,
      orderStatus: 1,
      orderedProducts: this.formModel.selectedProducts
      
    }
    this.customerOrderService.createCustomerOrder(this.newCustomerOrder).subscribe(
      (response: CustomerOrder) => {
        this.latestOrderNumber = response.orderNumber
        Swal.fire({
          title: 'Success!',
          text: `Your order have been placed successfully with order number ${this.latestOrderNumber}`,
          icon: 'success',
          showConfirmButton: true,
          confirmButtonText: 'OK',
        }

        )
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
        Swal.fire({
          title: "Something Went Wrong",
          text: "Please fill all fields marked as *",
          icon: "warning",
          showCloseButton: true,
        })
      }
    )
    
  }
  
  }
  
}
