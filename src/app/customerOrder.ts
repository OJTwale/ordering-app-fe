import { Product } from "./product";

export interface CustomerOrder {
    id?:number;
    orderNumber?: string;
    orderDate: Date;
    orderCost: number;
    customerName: string;
    customerAddress: string;
    orderStatus: number;
    orderedProducts:Product[];
}