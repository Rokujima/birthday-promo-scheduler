import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import promoRoutes from './routes/promoRoutes';
dotenv.config();
import connectToDB from './config/db';

const app = express();

connectToDB();

app.use('/users', userRoutes);
app.use('/promos', promoRoutes);

app.use(bodyParser.json());

export default app;
