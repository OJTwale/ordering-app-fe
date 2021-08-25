import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CustomerOrder } from '../customerOrder';
import { CustomerOrderService } from '../customerOrder.service';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css']
})
export class EditOrderComponent implements OnInit {

  id:number;
  order:CustomerOrder;
  newCustomerOrder:CustomerOrder;
  selectedProducts?: Product[];
  dropdownSettings: {};
  totalCost: number;
  products: Product[];
  formModel={
    oCost: 0,
    cName: "",
    cAddress: "",
    selectedProducts: this.selectedProducts
  }
  
  constructor(private route: ActivatedRoute, private router: Router, private customerOrderService: CustomerOrderService, private productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
    this.id = this.route.snapshot.params['id'];

    this.customerOrderService.getOrderById(this.id).subscribe(
      (response: CustomerOrder) => {
        this.order = response;
        
        this.formModel.oCost=this.order.orderCost;
        this.formModel.cName=this.order.customerName;
        this.formModel.cAddress=this.order.customerAddress;
        this.selectedProducts= this.order.orderedProducts;
        this.formModel.selectedProducts=this.selectedProducts;
       
        
      })

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
    this.formModel.oCost=0;
    this.formModel.selectedProducts?.forEach((x: Product) => {
          this.formModel.oCost+=Number(x.productCost);
    });
    
  }
  
  onItemDeSelect(item: any){
    this.formModel.oCost=0;
    
    this.formModel.selectedProducts?.forEach((x: Product) => {
      this.formModel.oCost+=Number(x.productCost);
    });
  }

  public onCreate(order: NgForm){
    if(order.value.oCost===""|| order.value.cName==="" || order.value.cAddress==="" || this.formModel.oCost===0){
      Swal.fire({
        title: "Something Went Wrong",
        text: "Please fill all fields marked as *",
        icon: "warning",
        showCloseButton: true,
      })
    }
    else{
      this.newCustomerOrder = {
      id:this.order.id,
      orderNumber: this.order.orderNumber,  
      orderDate: this.order.orderDate,
      orderCost: this.formModel.oCost,
      customerName: order.value.cName,
      customerAddress: order.value.cAddress,
      orderStatus: this.order.orderStatus,
      orderedProducts: this.order.orderedProducts,
      orderedByUser: this.order.orderedByUser
    }

    this.customerOrderService.updateCustomerOrder(this.newCustomerOrder).subscribe(
      (response: CustomerOrder)=>{
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

  
}
}

