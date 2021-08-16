import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GET_STATUS, LIST_ALL_STATUS } from "src/appConstant";
import { environment } from "src/environments/environment";
import { OrderStatus } from "./orderStatus";



@Injectable({
    providedIn: 'root'
})
export class OrderStatusService {
    private apiSeverUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient){}

    public getOrderStatus(id:number):Observable<OrderStatus>{
        return this.http.get<OrderStatus>(`${this.apiSeverUrl}` + GET_STATUS + id);
    }

    public getAllStatus(): Observable<OrderStatus[]>{
        return this.http.get<OrderStatus[]>(`${this.apiSeverUrl}`+ LIST_ALL_STATUS);
    }
}