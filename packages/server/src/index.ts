import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import healthRouter from './routes/health';
import usersRouter from './routes/users';
import { errorHandler } from './middleware/errorHandler';
import { initDatabase } from './db/init';
import pool from './db/pool';

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:3000';

// Middleware
app.use(express.json());
app.use(cors({ origin: CLIENT_ORIGIN, credentials: true }));

// Rate limiting — 100 requests per minute per IP across all API routes
const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', apiLimiter);

// Routes
app.use('/api/health', healthRouter);
app.use('/api/users', usersRouter);

// Global error handler
app.use(errorHandler);

/**
 * Initialise the database schema, then start listening.
 */
async function start(): Promise<void> {
  await initDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

start().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

// Graceful shutdown
const shutdown = async () => {
  await pool.end();
  process.exit(0);
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

export default app;

