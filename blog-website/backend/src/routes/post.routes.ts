import { Router } from "express";

import { listPosts, getPostBySlug, listMyPosts, createPost, editPost, deletePost } from "../controllers/post.controllers.ts";
import { validateBody, validateParams } from "../middleware/validate.middleware.ts";
import { createPostSchema, editPostSchema, postIdSchema, postSlugSchema } from "../schemas/post.schema.ts";
import { authenticate } from "../middleware/auth.middleware.ts";
import { upload } from "../config/multer.ts";


const router = Router();


// public
router.get('/list', listPosts);
router.get('/byslug/:slug', validateParams(postSlugSchema), getPostBySlug);

// private : you need to be logged in
router.get('/mine', authenticate, listMyPosts);
router.post('/create', authenticate, upload.single('image'), validateBody(createPostSchema), createPost);
router.put('/edit/:id', authenticate, upload.single('image'), validateParams(postIdSchema), validateBody(editPostSchema), editPost);
router.delete('/delete/:id', authenticate, validateParams(postIdSchema), deletePost);


export default router;