export interface discountElementRequest {
    title: string;
    description: string;
    imagePath: string;
}

export interface discountElementResponse extends discountElementRequest {
    id: number;
}