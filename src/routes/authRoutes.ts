import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Router, Request, Response } from 'express';

// Load environment variables from .env.dev
dotenv.config();

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in the environment variables.');
}

// For development purposes, mocking user database (in production, use a real database)
const users = [
  {
    id: '1',
    email: 'user.test@awesome.com',
    password: bcrypt.hashSync('teste1234', 10),
  },
];

// Login route
router.post('/login', async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  // Validate all necessary fields are present '-'
  if (!email || !password) {
    res.status(400).json({ error: 'Email and password are required' });
    return;
  }

  // Find user by email '-'
  const user = users.find((u) => u.email === email);
  if (!user) {
    res.status(401).json({ error: 'Invalid email or password' });
    return;
  }

  // Verify password  '-'
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    res.status(401).json({ error: 'Invalid email or password' });
    return;
  }

  // Finally is time to celebrate, Generate an JWT token
  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: '24h', // Token expires in 24 hours
  });

  // Returns the token
  res.json({ token });
});

export default router;