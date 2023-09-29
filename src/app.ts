import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();
import {connectToDB} from './config/db';

const app = express();

app.use(bodyParser.json());

export default app;
