import { Comment } from "./Comment";

export interface Product {
    id: number;
    name: string;
    price: number;
    rating: number;
    images: string[];
    description: string;
    arrivalDate: string;
    comments: Comment[];
}