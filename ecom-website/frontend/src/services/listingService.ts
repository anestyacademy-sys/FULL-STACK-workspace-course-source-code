import api from "./api";
import type { Listing } from "../types/Listing";


export const listingService = {

    // every listing. the three filters are optional:
    // cat  -> 'Cars', 'Phones' ... ( 'All' or nothing shows everything )
    // q    -> a word to look for in the title
    // sort -> 'newest' | 'price_asc' | 'price_desc'
    getAll: async ( filters?: { cat?: string, q?: string, sort?: string } ) : Promise<Listing[]> =>{
        const response = await api.get('/listings/list', { params: filters });
        return response.data.data;
    },

    // one listing, for the detail page. this also adds +1 to its views
    getById: async (id: string) : Promise<Listing> =>{
        const response = await api.get('/listings/byid/' + id);
        return response.data.data;
    },

    // the listings of the logged in user, whatever their status
    getMine: async () : Promise<Listing[]> =>{
        const response = await api.get('/listings/mine');
        return response.data.data;
    },

    // we send FormData because a listing can have a photo
    create: async (data: FormData) : Promise<Listing> =>{
        const response = await api.post('/listings/create', data);
        return response.data.data;
    },

    update: async (id: string, data: { status?: string, title?: string, price?: number }) : Promise<Listing> =>{
        const response = await api.put('/listings/edit/' + id, data);
        return response.data.data;
    },

    delete: async (id: string) : Promise<void> =>{
        await api.delete('/listings/delete/' + id);
    }

}