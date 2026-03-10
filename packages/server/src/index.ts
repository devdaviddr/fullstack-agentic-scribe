import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import type { HealthResponse, UsersResponse, ApiError } from '@shared/index';

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:3000';

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: CLIENT_ORIGIN,
    credentials: true,
  })
);

/**
 * Health check endpoint - returns server and database status.
 */
app.get('/api/health', async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    const response: HealthResponse = {
      status: 'ok',
      database: 'connected',
      timestamp: new Date().toISOString(),
    };
    res.json(response);
  } catch {
    const response: HealthResponse = {
      status: 'ok',
      database: 'disconnected',
      timestamp: new Date().toISOString(),
    };
    res.status(503).json(response);
  }
});

/**
 * Get all users from the database.
 */
app.get('/api/users', async (_req, res) => {
  try {
    const users = await prisma.user.findMany();
    const response: UsersResponse = { users };
    res.json(response);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Internal server error', message: 'Failed to fetch users' } satisfies ApiError);
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
