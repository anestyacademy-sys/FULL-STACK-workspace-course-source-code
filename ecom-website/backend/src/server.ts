import app from './app.ts';
import { connectDatabase } from './config/database.ts';
import { config } from './config/index.ts';


const startServer = async ()=>{

    try {

        // 1 connect to db
        await connectDatabase();

        // 2 start express server
        app.listen(config.port, ()=>{
            console.log(`Server running on http://localhost:${config.port}`);
        })

    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }

}


startServer();