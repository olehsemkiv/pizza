export interface newsElementRequest {
    title: string;
    description: string;
    imagePath: string;
}

export interface newsElementResponse extends newsElementRequest {
    id: number;
}