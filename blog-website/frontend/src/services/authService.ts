import api from "./api";
import type { User, LoginResponse } from "../types/User";

export const authService = {

    register: async ( data: { name: string, email: string, password: string } ) : Promise<User> =>{
        const response = await api.post('/users/register', data);
        return response.data.data;
    },

    login: async ( data: { email: string, password: string } ) : Promise<LoginResponse> =>{
        const response = await api.post('/users/login', data);
        const result: LoginResponse = response.data.data;

        // keep the token and the user in the browser
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.user));

        return result;
    },

    logout: () : void =>{
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    // the user saved at login, or null when nobody is logged in
    getCurrentUser: () : User | null =>{
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },

    isLoggedIn: () : boolean =>{
        return localStorage.getItem('token') !== null;
    }
}