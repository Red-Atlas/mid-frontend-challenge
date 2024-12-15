import express from 'express';
import propertyRoutes from './routes/property.routes';
import cors from 'cors';

const app = express();

app.use(cors());

app.use(express.json()); 

app.use('/api/', propertyRoutes);


export default app