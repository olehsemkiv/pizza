export interface IProductTypeRequest {
    name: string;
    path: string;
    imagePath: string;
}

export interface IProductTypeResponse extends IProductTypeRequest {
    id: number;
}
