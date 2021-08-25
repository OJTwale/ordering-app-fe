import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CustomerOrder } from '../customerOrder';
import { CustomerOrderService } from '../customerOrder.service';
import { OrderStatus } from '../orderStatus';
import { OrderStatusService } from '../OrderStatus.service';

@Component({
  selector: 'app-display-order',
  templateUrl: './display-order.component.html',
  styleUrls: ['./display-order.component.css']
})
export class DisplayOrderComponent implements OnInit {

  orders: CustomerOrder[];
  ordersByUser: CustomerOrder[];
  allStatus: OrderStatus[];
  orderStatus: OrderStatus;
  updatedCustomerOrder: CustomerOrder;
  selectedIndex:number;
  userName:string|null;
  
  
  constructor(private http: HttpClient, private customerOrderService:CustomerOrderService, private orderStatusService:OrderStatusService, private router: Router) {
    
    this.isUserAdmin();
   }
  
  ngOnInit(): void {
    // this.getCustomerOrders();
    // this.getAllStatus();
    let username=sessionStorage.getItem('username');
    this.userName=username;
  }

  
  public getOrdersByOrderedUser(username:string|null): void{
    this.customerOrderService.getOrdersByOrderedUser(username).subscribe(
      (response: CustomerOrder[])=>{
        this.orders=response;
      }
    )
  }

  public isUserAdmin(){
    let isAdmin = sessionStorage.getItem('isadmin');
    let username = sessionStorage.getItem('username');
    if(isAdmin==="true"){
      this.getCustomerOrders();
      return true
    }
    else{
      this.customerOrderService.getOrdersByOrderedUser(username).subscribe(
        (response: CustomerOrder[])=>{
          this.orders=response;
        }
      )
      return false
    }
  }

  public getCustomerOrders(): void {
    this.customerOrderService.getCustomerOrders().subscribe(
      (response: CustomerOrder[]) => {
        this.orders = response;
        
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onStatusChange(status: number){
    this.selectedIndex=status+1;
    
  }

  public updateStatus(order:CustomerOrder): void{
    this.updatedCustomerOrder={
      id: order.id,
      orderDate: order.orderDate,
      orderNumber: order.orderNumber,
      orderCost: order.orderCost,
      customerName: order.customerName,
      customerAddress: order.customerAddress,
      orderStatus: this.selectedIndex,
      orderedProducts: order.orderedProducts,
      orderedByUser: order.orderedByUser
    }
    this.customerOrderService.updateCustomerOrder(this.updatedCustomerOrder).subscribe(
      (response: any)=> {
        Swal.fire({
          title: 'Success!',
          text: `Your order status is updated successfully`,
          icon: 'success',
          showConfirmButton: true,
          confirmButtonText: 'OK',
        })
      }
    )
  }

  public getAllStatus(): void{
    this.orderStatusService.getAllStatus().subscribe(
      (response: OrderStatus[]) => {
        this.allStatus=response; 
      }
    )
  }

  public update(id?:number){
    this.router.navigate(['editorder', id]);
  }

  public delete(id?:number){
    Swal.fire({
      title: 'Warning',
      text: `Are you sure you want to delete the order?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'YES',
      cancelButtonText:'NO'
    }).then((result) =>{
      if(result.isConfirmed){
        this.customerOrderService.deleteOrderById(id).subscribe(
          (response: any) => {
            Swal.fire({
                title: 'Success!',
                text: 'Order deleted successfully',
                icon: 'success',
                showConfirmButton:true,
                confirmButtonText:'OK',
            })
          }
        )
      }
    });
  }

}
