import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { consultationRouter } from './routes/consultation.js';
import { conversationsRouter } from './routes/conversations.js';
import { sourcesRouter } from './routes/sources.js';
import { metaRouter } from './routes/meta.js';
import { renderHealthHtml } from './utils/htmlViews.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from server/.env or root .env
dotenv.config({ path: path.join(__dirname, '../.env') });
dotenv.config({ path: path.join(__dirname, '../../.env') });

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL;

// Production-Safe CORS Configuration
const allowedOrigins = CLIENT_URL 
  ? [CLIENT_URL, 'http://localhost:5173', 'http://127.0.0.1:5173']
  : ['http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:5000', 'http://127.0.0.1:5000'];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, or server-to-server)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    }
    return callback(new Error('CORS policy: Request origin not allowed.'));
  },
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-admin-key']
}));

app.use(express.json({ limit: '1mb' }));

// Lightweight in-memory rate limiter to protect endpoints from abuse
const ipRequestCounts = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 60;

app.use((req, res, next) => {
  // Always allow health checks, root, and metadata probes without rate limiting
  if (req.path === '/api/health' || req.path === '/' || req.path.startsWith('/api/meta')) {
    return next();
  }

  const ip = req.ip || req.socket?.remoteAddress || 'unknown';
  const now = Date.now();
  
  let record = ipRequestCounts.get(ip);
  if (!record || now - record.startTime > RATE_LIMIT_WINDOW_MS) {
    record = { count: 1, startTime: now };
  } else {
    record.count++;
  }
  ipRequestCounts.set(ip, record);

  if (record.count > MAX_REQUESTS_PER_WINDOW) {
    return res.status(429).json({
      error: 'Too many requests. Please wait a moment before trying again.'
    });
  }
  next();
});

// Periodic cleanup of rate limiter map
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of ipRequestCounts.entries()) {
    if (now - record.startTime > RATE_LIMIT_WINDOW_MS) {
      ipRequestCounts.delete(ip);
    }
  }
}, 5 * 60 * 1000);

// Privacy-conscious request logging (Never log user queries or personal body data)
app.use((req, res, next) => {
  const sanitizedUrl = req.originalUrl.split('?')[0];
  console.log(`[${new Date().toISOString().substring(11, 19)}] ${req.method} ${sanitizedUrl}`);
  next();
});

// Mount API Routes
app.use('/api/consultation', consultationRouter);
app.use('/api/conversations', conversationsRouter);
app.use('/api/sources', sourcesRouter);
app.use('/api/meta', metaRouter);

// Health & System Info Endpoint
app.get('/api/health', (req, res) => {
  const healthData = {
    status: 'online',
    service: 'NyayaGuide AI Backend Service',
    tagline: 'Know Your Rights. Know Your Next Step.',
    timestamp: new Date().toISOString(),
    aiEngine: process.env.AI_API_KEY ? 'Gemini Augmented Grounded RAG' : 'Curated Official Statutory Knowledge Base',
    version: '1.1.0'
  };

  // If accessed directly from browser address bar without ?format=json
  if (req.headers.accept?.includes('text/html') && req.query.format !== 'json') {
    return res.send(renderHealthHtml({ ...healthData, port: PORT }));
  }

  return res.json(healthData);
});

// Root friendly response (HTML dashboard in browser, JSON for APIs)
app.get('/', (req, res) => {
  if (req.headers.accept?.includes('text/html') && req.query.format !== 'json') {
    return res.send(renderHealthHtml({
      status: 'online',
      service: 'NyayaGuide AI Backend API',
      tagline: 'Know Your Rights. Know Your Next Step.',
      timestamp: new Date().toISOString(),
      aiEngine: process.env.AI_API_KEY ? 'Gemini Augmented Grounded RAG' : 'Curated Official Statutory Knowledge Base',
      version: '1.1.0',
      port: PORT
    }));
  }

  res.json({
    message: '⚖️ NyayaGuide AI API Service is running.',
    documentation: 'Access endpoints under /api/',
    health: `http://localhost:${PORT}/api/health`,
    sources: `http://localhost:${PORT}/api/sources`
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found on NyayaGuide AI API' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err.message);
  res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

const HOST = process.env.HOST || '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`\n======================================================`);
  console.log(`⚖️  NyayaGuide AI Backend listening on http://localhost:${PORT}`);
  console.log(`🌐  Dual-Stack Binding: http://127.0.0.1:${PORT}`);
  console.log(`📋  Health Check: http://localhost:${PORT}/api/health`);
  console.log(`======================================================\n`);
});
