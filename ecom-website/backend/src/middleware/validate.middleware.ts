import type { Request, Response , NextFunction } from 'express';
import { sendBadRequest } from '../utils/response.ts';


export const validateBody = <T>(schema: any) =>{

    return (req: Request, res: Response, next: NextFunction): void =>{

        const result = schema.safeParse(req.body);

        if(!result.success){
            const errors = formatZodErrors(result.error);
            return sendBadRequest(res, 'validation failed', errors);
        }

        req.body = result.data as T;
        next();

    }

}


export const validateParams = <T>(schema: any) =>{

    return (req: Request, res: Response, next: NextFunction): void =>{

        const result = schema.safeParse(req.params);

        if(!result.success){
            const errors = formatZodErrors(result.error);
            return sendBadRequest(res, 'invalid params', errors);
        }

        req.params = result.data;
        next();

    }

}


const formatZodErrors = (error: any)=>{

    return error.issues.map((err: any)=>{

        return {
            field: err.path.join('.'),
            message: err.message
        }

    })

}