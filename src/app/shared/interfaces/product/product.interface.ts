import { ICategoryElementResponse } from "../category/category.interface";
import { IProductTypeResponse } from "./productType.interface";

export interface IProductRequest {
    category: ICategoryElementResponse;
    type: IProductTypeResponse
    name: string;
    path: string;
    description: string;
    weight: string;
    price: number;
    imagePath: string;
    count: number;
}

export interface IProductResponse extends IProductRequest {
    id: number;
}
