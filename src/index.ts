import express from 'express';
import taskRoutes from './routes/taskRoutes';
import authRoutes from './routes/authRoutes';
import { authMiddleware } from './middleware/authMiddleware';
import dotenv from 'dotenv';

// Load environment variables from .env.dev when running in development
dotenv.config();

const app = express();

// Parse JSON bodies
app.use(express.json());

// Public routes
app.use('/auth', authRoutes);

// Protected routes
app.use('/tasks', authMiddleware, taskRoutes);

const server = app.listen(3001, () =>
  console.log('Express Backend Server ready at : http://localhost:3001')
);
