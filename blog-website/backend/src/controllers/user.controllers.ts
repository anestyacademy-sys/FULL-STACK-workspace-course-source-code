import type { Request, Response } from "express";
import bcrypt from 'bcrypt';

import { User } from '../models/user.models.ts';
import { generateToken } from "../utils/jwt.ts";
import { sendSuccess, sendBadRequest, sendCreated } from "../utils/response.ts";
import type { LoginUserInput, RegisterUserInput } from "../schemas/user.schema.ts";


export const register = async ( req: Request<any, any, RegisterUserInput>, res: Response )=>{

    try {

        const { name, email, password } = req.body;

        // check if user already exists
        const existingUser = await User.findOne({ email });

        if(existingUser){
            return sendBadRequest(res, 'Email already registered');
        }

        const user = new User({ name, email, password });
        await user.save();

        sendCreated(res, {
            _id: user._id,
            name: user.name,
            email: user.email
        }, 'Account created successfully !');

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
            role: 'user'
        })

        const userResponse = {
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            },
            token
        }

        sendSuccess(res, userResponse, 'Login successful !');

    } catch (error) {
        sendBadRequest(res, 'error in login', error);
    }

}
