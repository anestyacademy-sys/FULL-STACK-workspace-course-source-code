import type { Request, Response , NextFunction } from 'express';

import { verifyToken } from '../utils/jwt.ts';
import type { JwtPayload } from '../utils/jwt.ts';


export interface AuthRequest extends Request {
    user?: JwtPayload
}


export const authenticate = ( req: AuthRequest, res: Response, next: NextFunction ) : void =>{

    try {

        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith('Bearer ') ){
            res.status(401).json({
                success: false,
                error: 'No token provided, please login'
            })
            return;
        }

        const token = authHeader.substring(7);
        const decoded = verifyToken(token);

        if(!decoded){
            res.status(401).json({
                success: false,
                error: 'Invalid token, please login again'
            })
            return;
        }

        req.user = decoded;
        next();

    } catch (error) {

        res.status(401).json({
            success: false,
            error: 'Authentication failed'
        })
    }

}