// The seller is populated by the backend, so userId comes back as an object
export interface Seller {
    _id: string;
    name: string;
    phone: string;
    createdAt: string;
}

export interface Listing {
    _id: string;
    title: string;
    price: number;
    category: string;
    place: string;
    description: string;
    image?: string | null;
    status: 'Live' | 'Paused' | 'Sold';
    views: number;
    userId: Seller;
    createdAt: string;
    updatedAt: string;
}