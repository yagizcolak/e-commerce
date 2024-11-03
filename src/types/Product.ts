export interface Product {
    id: number;
    name: string;
    price: number;
    rating: number;
    image: string;
    images: string[];
    description: string;
    arrivalDate: string; // ISO date string
    comments: Comment[];
}

export interface Comment {
    id: number;
    username: string;
    content: string;
    rating: number;
    date: string; // ISO date string
}