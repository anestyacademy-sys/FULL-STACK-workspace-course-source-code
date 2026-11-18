import app from "./app.ts";
import { connectDatabase, disconnectDatabase } from "./config/database.ts";
import { config } from "./config/index.ts";


const startServer = async ()=>{

    try {
        
        await connectDatabase();
        
        app.listen( config.port , ()=>{
            console.log('Server running on port:', config.port );
            
        } )

    } catch (error) {
        console.log('Failed to start server', error);
        process.exit(1)    
    }

}

process.on('SIGTERM', async ()=>{
    console.log('SIGTERM received');
    await disconnectDatabase();
    process.exit(0);
})


process.on('SIGINT', async ()=>{
    console.log('SIGINT received');
    await disconnectDatabase();
    process.exit(0);
})



startServer();