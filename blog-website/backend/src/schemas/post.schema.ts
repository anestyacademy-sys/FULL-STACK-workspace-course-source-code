import { z } from 'zod';


export const createPostSchema = z.object({

    title: z
        .string('title must be a string')
        .min(3, 'title must be at least 3 characters')
        .max(120, 'title cannot exceed 120 characters')
        .trim(),

    slug: z.string('slug must be a string').trim().optional(),

    tag: z.string('tag must be a string').trim().optional(),

    readTime: z.string('read time must be a string').trim().optional(),

    excerpt: z
        .string('excerpt must be a string')
        .min(10, 'excerpt must be at least 10 characters')
        .max(300, 'excerpt cannot exceed 300 characters')
        .trim(),

    body: z
        .string('body must be a string')
        .min(20, 'body must be at least 20 characters')
        .trim(),

    quote: z.string('quote must be a string').trim().optional(),

    status: z.enum(['published', 'draft']).optional()

})


export const editPostSchema = createPostSchema.partial();


export const postIdSchema = z.object({
    id: z
        .string('id must be a string')
        .length(24, 'invalid id format')
        .regex(/^[A-Za-z0-9]{24}$/ , 'Invalid id')
})


export const postSlugSchema = z.object({
    slug: z.string('slug must be a string').min(1, 'slug is required')
})


export type CreatePostInput = z.infer<typeof createPostSchema>;
export type EditPostInput = z.infer<typeof editPostSchema>;
export type PostIdInput = z.infer<typeof postIdSchema>;
export type PostSlugInput = z.infer<typeof postSlugSchema>;