import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LIST_ALL_PRODUCTS } from "src/appConstant";
import { environment } from "src/environments/environment";
import { Product } from "./product";


@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private apiSeverUrl = environment.apiBaseUrl;
    constructor(private http: HttpClient){}

    public getProducts(): Observable<Product[]>{
        return this.http.get<Product[]>(`${this.apiSeverUrl}`+ LIST_ALL_PRODUCTS);
    }
    
}