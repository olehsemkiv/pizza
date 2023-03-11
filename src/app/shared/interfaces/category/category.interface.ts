export interface ICategoryElementRequest {
    name: string;
    path: string;
    imagePath: string;
}

export interface ICategoryElementResponse extends ICategoryElementRequest {
    id: number | string;
}
