import type { Request, Response } from "express";
import bcrypt from 'bcrypt';

import { User } from '../models/user.models.ts';
import { generateToken } from "../utils/jwt.ts";
import { sendSuccess, sendBadRequest, sendCreated } from "../utils/response.ts";
import type { LoginUserInput, RegisterUserInput } from "../schemas/user.schema.ts";


export const register = async ( req: Request<any, any, RegisterUserInput>, res: Response )=>{

    try {

        const { name, email, phone, password } = req.body;

        // one account per email
        const existingUser = await User.findOne({ email });
        if(existingUser){
            return sendBadRequest(res, 'Email already registered');
        }

        const user = new User({ name, email, phone, password });
        await user.save();

        // log the new user in straight away
        const token = generateToken({
            userId: user._id.toString(),
            email: user.email,
            role: user.role
        })

        sendCreated(res, { user: publicUser(user), token }, 'Account created successfully!');

    } catch (error) {
        sendBadRequest(res, 'error in registration', error);
    }

}


export const login = async ( req: Request<any, any, LoginUserInput>, res: Response )=>{

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if(!user){
            return sendBadRequest(res, 'Invalid email or password');
        }

        const comparePassword = await bcrypt.compare(password, user.password);
        if(!comparePassword){
            return sendBadRequest(res, 'Invalid email or password');
        }

        const token = generateToken({
            userId: user._id.toString(),
            email: user.email,
            role: user.role
        })

        sendSuccess(res, { user: publicUser(user), token }, 'Login successful!');

    } catch (error) {
        sendBadRequest(res, 'error in login', error);
    }

}


// never send the password back to the browser
const publicUser = (user: any)=>{

    return {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        createdAt: user.createdAt
    }

}