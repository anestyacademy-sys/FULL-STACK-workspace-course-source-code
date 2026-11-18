import { z } from 'zod';

export const registerUserSchema = z.object({

    name: z
        .string('name is required')
        .min(2, 'name must be at least 2 characters')
        .max(50, 'name cannot exceed 50 characters')
        .trim(),

    email: z
        .string('email is required')
        .email('invalid email format')
        .toLowerCase()
        .trim(),

    phone: z
        .string('phone is required')
        .min(6, 'phone must be at least 6 characters')
        .max(20, 'phone cannot exceed 20 characters')
        .trim(),

    password: z
        .string('password is required')
        .min(6, 'password must be at least 6 characters')
        .max(100, 'password cannot exceed 100 characters')
        .trim(),

})


export const loginUserSchema = z.object({

    email: z
        .string('email is required')
        .email('invalid email format')
        .toLowerCase()
        .trim(),

    password: z
        .string('password is required')
        .min(6, 'password must be at least 6 characters')
        .max(100, 'password cannot exceed 100 characters')
        .trim(),

})


export type RegisterUserInput = z.infer<typeof registerUserSchema>;
export type LoginUserInput = z.infer<typeof loginUserSchema>;