import { IProductResponse } from "../product/product.interface";

export interface IOrderRequest {
    name: string;
    phone: string;
    email: string;
    house: string;
    street: string;
    entrance: string;
    paymentMethod: string;
    totalPrice: number;
    callback: boolean;
    message?: string;
    date: string;
    orders: Array<IProductResponse>;
    status: string;
}

export interface IOrderResponse extends IOrderRequest {
    id: string;
}