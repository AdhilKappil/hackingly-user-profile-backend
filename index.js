import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/db.js';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import router from './routes/route.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import cors from 'cors';

const app = express();

// cors setup
app.use(
  cors({
    origin: ["https://hackingly.vercel.app","http://localhost:8000"],
    methods: ["GET,PUT,PATCH,POST,DELETE"],
    credentials: true,
    optionsSuccessStatus: 204,
  })
);

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Load environment variables
dotenv.config();

// Connect to database
connectDb();

// Routes
app.use('/api', router);

// Error middleware
app.use(notFound);
app.use(errorHandler);

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
