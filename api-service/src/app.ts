import express, { Application } from 'express';
import cors from 'cors';
import propertyRoutes from './routes/property.routes';


const app: Application = express();

app.use(cors());
app.use(express.json());


app.use('/api/', propertyRoutes);

export default app;
