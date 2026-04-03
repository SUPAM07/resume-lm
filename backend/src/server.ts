import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import chatRouter from './api/chat';
import webhooksRouter from './api/webhooks';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));

// Use raw body for Stripe webhooks (must come before express.json())
app.use('/api/webhooks/stripe', express.raw({ type: 'application/json' }));

app.use(express.json());

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/chat', chatRouter);
app.use('/api/webhooks', webhooksRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});

export default app;
