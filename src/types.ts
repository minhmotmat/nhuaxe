export interface PartDetail {
    Ma: string;
    Price: number;
}

export interface PartData {
    Full: string;
    Type: string;
    Model: string;
    Color: string;
    Image: string;
    [key: string]: any;
}
