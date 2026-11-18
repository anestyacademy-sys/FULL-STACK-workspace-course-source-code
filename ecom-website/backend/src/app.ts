import express from 'express';
import cors from 'cors';
import routes from './routes/index.ts';


const app = express();

// the react app runs on another port, so it needs permission to call us
app.use(cors());

// read json bodies
app.use(express.json());


app.use('/uploads', express.static('./uploads'));

app.use('/api', routes);

// quick test route, we will remove it later
app.get('/api/health', (req, res)=>{
    res.json({ ok: true });
})


export default app;