import dotenv from 'dotenv';
dotenv.config();


export const config = {
    port: parseInt( process.env.PORT || '5000' ),
    nodeEnv: process.env.NODE_ENV || 'development',
    mongodb_url: process.env.MONGODB_URL || 'mongodb://localhost:27017/kiosk',
    jwtSecret: process.env.JWT_SECRET || 'AZNHDNETGGGZUUDNNDDUUSNSHEHEHHEBDBDHZ',
    jwtExpireIn: process.env.JWT_EXPIRES_IN || '7d'
}