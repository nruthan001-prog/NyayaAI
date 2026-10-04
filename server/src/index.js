import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { consultationRouter } from './routes/consultation.js';
import { conversationsRouter } from './routes/conversations.js';
import { sourcesRouter } from './routes/sources.js';
import { metaRouter } from './routes/meta.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from server/.env or root .env
dotenv.config({ path: path.join(__dirname, '../.env') });
dotenv.config({ path: path.join(__dirname, '../../.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Security & Middlewares
app.use(cors({
  origin: '*', // Allow development frontend requests
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS']
}));
app.use(express.json({ limit: '5mb' }));

// Request logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString().substring(11, 19)}] ${req.method} ${req.url}`);
  next();
});

// Mount API Routes
app.use('/api/consultation', consultationRouter);
app.use('/api/conversations', conversationsRouter);
app.use('/api/sources', sourcesRouter);
app.use('/api/meta', metaRouter);

// Health & Info Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'NyayaGuide AI Backend Service',
    tagline: 'Know Your Rights. Know Your Next Step.',
    timestamp: new Date().toISOString(),
    aiEngine: process.env.AI_API_KEY ? 'Gemini Augmented RAG' : 'Verified Statutory RAG Engine',
    version: '1.0.0'
  });
});

// Root friendly response
app.get('/', (req, res) => {
  res.json({
    message: '⚖️ NyayaGuide AI API Service is running.',
    documentation: 'Access endpoints under /api/'
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found on NyayaGuide AI API' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`⚖️  NyayaGuide AI Backend listening on http://localhost:${PORT}`);
  console.log(`📋  Health Check: http://localhost:${PORT}/api/health`);
  console.log(`======================================================\n`);
});
