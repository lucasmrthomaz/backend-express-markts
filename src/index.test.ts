import request from 'supertest';
import express from 'express';
import taskRoutes from './routes/taskRoutes';
import authRoutes from './routes/authRoutes';
import { authMiddleware } from './middleware/authMiddleware';
import dotenv from 'dotenv';

// Mock dependencies
jest.mock('./routes/taskRoutes');
jest.mock('./routes/authRoutes');
jest.mock('./middleware/authMiddleware');

// Load environment variables
dotenv.config();

describe('Express App', () => {
	let app: express.Application;

	beforeAll(() => {
		app = express();
		app.use(express.json());
		app.use('/auth', authRoutes);
		app.use('/tasks', authMiddleware, taskRoutes);
	});

	it('should load environment variables', () => {
		expect(process.env).toBeDefined();
	});

	it('should handle /auth routes', async () => {
		(authRoutes as unknown as jest.Mock).mockImplementation((req, res) => res.status(200).send('Auth Route'));
		const response = await request(app).get('/auth');
		expect(response.status).toBe(200);
		expect(response.text).toBe('Auth Route');
	});

	it('should handle /tasks routes with authMiddleware', async () => {
		(authMiddleware as jest.Mock).mockImplementation((req, res, next) => next());
		(taskRoutes as unknown as jest.Mock).mockImplementation((req, res) => res.status(200).send('Task Route'));
		const response = await request(app).get('/tasks');
		expect(response.status).toBe(200);
		expect(response.text).toBe('Task Route');
	});

	it('should return 404 for unknown routes', async () => {
		const response = await request(app).get('/unknown');
		expect(response.status).toBe(404);
	});
});