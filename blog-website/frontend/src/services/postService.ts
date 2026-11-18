import api from "./api";
import type { Post } from "../types/Post";

export const postService = {

    // every published post, for the public blog
    getAll: async () : Promise<Post[]> =>{
        const response = await api.get('/posts/list');
        return response.data.data;
    },

    // one post, for the article page
    getBySlug: async (slug: string) : Promise<Post> =>{
        const response = await api.get('/posts/byslug/' + slug);
        return response.data.data;
    },

    // the posts of the logged in user, drafts included
    getMine: async () : Promise<Post[]> =>{
        const response = await api.get('/posts/mine');
        return response.data.data;
    },

    // we send FormData because a post can have a cover image
    create: async (data: FormData) : Promise<Post> =>{
        const response = await api.post('/posts/create', data);
        return response.data.data;
    },

    update: async (id: string, data: FormData) : Promise<Post> =>{
        const response = await api.put('/posts/edit/' + id, data);
        return response.data.data;
    },

    delete: async (id: string) : Promise<void> =>{
        await api.delete('/posts/delete/' + id);
    }
}