import { ICategoryElementResponse } from "../category/category.interface";

export interface IProductRequest {
    category: ICategoryElementResponse;
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
