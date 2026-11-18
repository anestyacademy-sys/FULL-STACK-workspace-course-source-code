import type { Request, Response } from 'express';

import { Post } from '../models/post.models.ts';
import type { AuthRequest } from '../middleware/auth.middleware.ts';
import { sendSuccess, sendBadRequest, sendCreated, sendNoContent, sendNotFound, sendForbidden } from "../utils/response.ts";
import type { CreatePostInput, EditPostInput, PostIdInput, PostSlugInput } from '../schemas/post.schema.ts';


// GET /api/posts/list  -> every published post (the public blog)
export const listPosts = async ( req: Request, res: Response )=>{

    try {

        const list = await Post
            .find({ status: 'published' })
            .sort({ createdAt: -1 })
            .populate('authorId', 'name email');

        sendSuccess(res, list, 'list of posts');

    } catch (error) {
        sendBadRequest(res, 'error in list', error);
    }

}


// GET /api/posts/byslug/:slug  -> one post for the article page
export const getPostBySlug = async ( req: Request<PostSlugInput>, res: Response )=>{

    try {

        const { slug } = req.params;

        const post = await Post.findOne({ slug }).populate('authorId', 'name email');

        if(!post){
            return sendNotFound(res, 'post not found');
        }

        sendSuccess(res, post, 'post detail');

    } catch (error) {
        sendBadRequest(res, 'error in detail', error);
    }

}


// GET /api/posts/mine  -> the posts of the logged in user (drafts included)
export const listMyPosts = async ( req: AuthRequest, res: Response )=>{

    try {

        // authenticate() already put the logged in user on the request
        const userId = req.user!.userId;

        const list = await Post
            .find({ authorId: userId })
            .sort({ createdAt: -1 });

        sendSuccess(res, list, 'your posts');

    } catch (error) {
        sendBadRequest(res, 'error in list', error);
    }

}


// POST /api/posts/create
export const createPost = async ( req: AuthRequest, res: Response )=>{

    try {

        const body = req.body as CreatePostInput;

        const imgPath = req.file ? `/uploads/posts/${req.file.filename}` : null;

        const post = new Post({
            ...body,
            image: imgPath,
            authorId: req.user!.userId
        });

        await post.save();

        sendCreated(res, post, 'post created');

    } catch (error) {
        sendBadRequest(res, 'error in creation', error);
    }

}


// PUT /api/posts/edit/:id
export const editPost = async ( req: AuthRequest, res: Response )=>{

    try {

        const { id } = req.params as PostIdInput;
        const updates = req.body as EditPostInput;

        const post = await Post.findById(id);

        if(!post){
            return sendNotFound(res, 'post not found');
        }

        // you can only edit your own posts
        if(post.authorId.toString() !== req.user!.userId){
            return sendForbidden(res, 'this post is not yours');
        }

        Object.assign(post, updates);

        if(req.file){
            post.image = `/uploads/posts/${req.file.filename}`;
        }

        await post.save();

        sendSuccess(res, post, 'post updated');

    } catch (error) {
        sendBadRequest(res, 'error in edit', error);
    }

}


// DELETE /api/posts/delete/:id
export const deletePost = async ( req: AuthRequest, res: Response )=>{

    try {

        const { id } = req.params as PostIdInput;

        const post = await Post.findById(id);

        if(!post){
            return sendNotFound(res, 'post not found');
        }

        // you can only delete your own posts
        if(post.authorId.toString() !== req.user!.userId){
            return sendForbidden(res, 'this post is not yours');
        }

        await post.deleteOne();

        sendNoContent(res);

    } catch (error) {
        sendBadRequest(res, 'error in delete', error);
    }

}