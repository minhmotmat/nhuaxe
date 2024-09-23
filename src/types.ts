export interface PartDetail {
    Ma: string;
    Price: number;
    Part: string;
}
export interface ExPartDetail {
    Ma: string;
    Price: number;
    Part: string;
    name: string;
}
export type PartArray = [string, ExPartDetail][];
export interface PartData {
    Full: string;
    Type: string;
    Model: string;
    Color: string;
    Image: string;
    [key: string]: any;
}
