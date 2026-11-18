import { z } from 'zod';
import { CATEGORIES, STATUSES } from '../models/listing.models.ts';


export const createListingSchema = z.object({

    title: z
        .string('title must be a string')
        .min(5, 'title must be at least 5 characters')
        .max(100, 'title cannot exceed 100 characters')
        .trim(),

    // coerce because a multipart form sends every field as text
    price: z
        .coerce
        .number('price must be a number')
        .min(0, 'price cannot be negative'),

    category: z
        .enum(CATEGORIES as [string, ...string[]], 'invalid category'),

    place: z
        .string('location must be a string')
        .min(2, 'location must be at least 2 characters')
        .max(60, 'location cannot exceed 60 characters')
        .trim(),

    description: z
        .string('description must be a string')
        .min(10, 'description must be at least 10 characters')
        .max(2000, 'description cannot exceed 2000 characters')
        .trim(),

})


export const editListingSchema = z.object({

    title: z
        .string('title must be a string')
        .min(5, 'title must be at least 5 characters')
        .max(100, 'title cannot exceed 100 characters')
        .trim()
        .optional(),

    price: z
        .coerce
        .number('price must be a number')
        .min(0, 'price cannot be negative')
        .optional(),

    category: z
        .enum(CATEGORIES as [string, ...string[]], 'invalid category')
        .optional(),

    place: z
        .string('location must be a string')
        .min(2, 'location must be at least 2 characters')
        .max(60, 'location cannot exceed 60 characters')
        .trim()
        .optional(),

    description: z
        .string('description must be a string')
        .min(10, 'description must be at least 10 characters')
        .max(2000, 'description cannot exceed 2000 characters')
        .trim()
        .optional(),

    status: z
        .enum(STATUSES as [string, ...string[]], 'invalid status')
        .optional(),

})


export const listingIdSchema = z.object({
    id: z
        .string('id must be a string')
        .length(24, 'invalid id format')
        .regex(/^[A-Za-z0-9]{24}$/ , 'Invalid id')
})


export type CreateListingInput = z.infer<typeof createListingSchema>;
export type EditListingInput = z.infer<typeof editListingSchema>;
export type ListingIdInput = z.infer<typeof listingIdSchema>;