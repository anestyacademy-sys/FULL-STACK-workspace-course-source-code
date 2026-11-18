import api from "./api";
import type { User, LoginResponse } from "../types/User";


export const authService = {

    // the backend logs you in straight away, so we save the token here too
    register: async ( data: { name: string, email: string, phone: string, password: string } ) : Promise<LoginResponse> =>{

        const response = await api.post('/users/register', data);
        const result: LoginResponse = response.data.data;

        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.user));

        return result;
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