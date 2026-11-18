export interface User {
    _id: string;
    name: string;
    email: string;
}

// what POST /users/login sends back
export interface LoginResponse {
    user: User;
    token: string;
}