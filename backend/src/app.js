import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config({ path: './env' });

const app = express();
app.set('trust proxy', 1);

const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:5173', 
  credentials: true, 
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
};

app.use(cors(corsOptions));


app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended: true, limit: '50mb'}));
app.use(cookieParser());
app.use(express.static('public'));

import userRoutes from './routes/user.route.js';

app.use("/api/", userRoutes);

export default app;