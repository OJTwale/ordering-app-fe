import { Injectable } from '@angular/core';
import { CustomerOrder } from './customerOrder';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CREATE_ORDER_URL, DELETE_ORDER_BY_ID, GET_ORDERS_BY_ORDERED_USER, GET_ORDER_BY_ID, LIST_ALL_ORDERS, UPDATE_ORDER } from 'src/appConstant';

@Injectable({
    providedIn: 'root'
})
export class CustomerOrderService {
    private apiSeverUrl = environment.apiBaseUrl;
    constructor(private http: HttpClient){}

    public getCustomerOrders(): Observable<CustomerOrder[]>{
        
        return this.http.get<CustomerOrder[]>(`${this.apiSeverUrl}`+ LIST_ALL_ORDERS);
    }

    public createCustomerOrder(customerorder: CustomerOrder): Observable<CustomerOrder>{
        
        return this.http.post<CustomerOrder>(`${this.apiSeverUrl}`+ CREATE_ORDER_URL, customerorder);
    }

    public updateCustomerOrder(customerorder: CustomerOrder): Observable<CustomerOrder>{
        
        return this.http.put<CustomerOrder>(`${this.apiSeverUrl}`+ UPDATE_ORDER, customerorder);
    }

    public getOrderById(id:number):Observable<CustomerOrder>{
        return this.http.get<CustomerOrder>(`${this.apiSeverUrl}` + GET_ORDER_BY_ID + id);
    }

    public deleteOrderById(id?:number){
        return this.http.delete(`${this.apiSeverUrl}`+DELETE_ORDER_BY_ID+id);
    }

    public getOrdersByOrderedUser(orderedBy:string|null):Observable<CustomerOrder[]>{
        return this.http.get<CustomerOrder[]>(`${this.apiSeverUrl}`+ GET_ORDERS_BY_ORDERED_USER + orderedBy)
    }
    
}