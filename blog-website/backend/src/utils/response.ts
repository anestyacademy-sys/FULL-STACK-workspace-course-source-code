import type { Response } from "express";



export const sendSuccess = ( res: Response, data: any, message?: string )=>{
    res.status(200).json({
        success: true,
        data,
        message: message ? message: 'success!'
    })
}


export const sendCreated = ( res: Response, data: any, message : string = 'Ressource created successfully' )=>{
    res.status(201).json({ success: true, message, data })
}

export const sendNoContent = ( res: Response )=>{
    res.status(204).send();
}

export const sendBadRequest = ( res: Response, message : string = 'Bad request' , details: any = {} )=>{
    res.status(400).json({ success: false, error: message, details })
}

export const sendNotFound = ( res: Response, message : string = 'Ressource not found' )=>{
    res.status(404).json({ success: false, error: message })
}

export const sendForbidden = ( res: Response, message : string = 'you are not allowed to do this' )=>{
    res.status(403).json({ success: false, error:  message })
}