import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import authRouter from './routes/authRoutes.js';
import notesRouter from './routes/notesRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { errors } from 'celebrate';
import { errorHandler } from './middleware/errorHandler.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

const PORT = Number(process.env.PORT) || 3000;

app.use(logger);
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(authRouter);
app.use(notesRouter);
app.use(userRoutes);

app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
