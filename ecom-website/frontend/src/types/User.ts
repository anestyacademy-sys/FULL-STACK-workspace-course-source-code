export interface User {
    _id: string;
    name: string;
    email: string;
    phone: string;
    createdAt: string;
}

export interface LoginResponse {
    user: User;
    token: string;
}