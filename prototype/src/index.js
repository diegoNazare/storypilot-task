const express = require('express');
const cors = require('cors');
const feedRoutes = require('./routes/feed');
const { PORT } = require('./config/constants');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Request logging
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.path} - ${res.statusCode} - ${duration}ms`);
  });
  next();
});

// Root endpoint - API welcome page
app.get('/', (req, res) => {
  res.json({
    service: 'Storyteller Feed API',
    version: '1.0.0',
    status: 'running',
    documentation: 'http://localhost:3000',
    endpoints: {
      health: 'GET /health',
      personalizedFeed: 'GET /v1/feed?user_id={id}&tenant_id={id}&limit={n}',
      nonPersonalizedFeed: 'GET /v1/feed/non-personalized?tenant_id={id}&limit={n}',
    },
    examples: {
      gamingUser: 'GET /v1/feed?user_id=a3f7c4e9-8b2d-4a1f-9c3e-5d6b8a0e1f2c&tenant_id=tenant1&limit=5',
      cookingUser: 'GET /v1/feed?user_id=b8d2e5f1-3c9a-4e7b-a2f5-6d8c9e1a3b4c&tenant_id=tenant1&limit=5',
      newUser: 'GET /v1/feed?user_id=e2f5d8a1-7c4b-4e9d-b6f2-9a3c5e7b1d4f&tenant_id=tenant1&limit=5',
    },
    demoUsers: [
      'a3f7c4e9-8b2d-4a1f-9c3e-5d6b8a0e1f2c (gaming)',
      'b8d2e5f1-3c9a-4e7b-a2f5-6d8c9e1a3b4c (cooking)',
      'c1e4b7d2-9f3a-4c8e-b5d9-7e2f4a6c8b1d (fitness)',
      'd9a2c5e8-4b7f-4d1a-c3e6-8f1b3d5e7a9c (tech)',
      'e2f5d8a1-7c4b-4e9d-b6f2-9a3c5e7b1d4f (new user)',
    ],
    demoTenants: ['tenant1', 'tenant2', 'tenant3'],
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// API routes
app.use('/v1', feedRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.method} ${req.path} not found`,
    code: 'ROUTE_NOT_FOUND',
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: 'An unexpected error occurred',
    code: 'INTERNAL_ERROR',
  });
});

// Start server
app.listen(PORT, () => {
  console.log('');
  console.log('🎬 Storyteller Feed API');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`✓ Server running on http://localhost:${PORT}`);
  console.log(`✓ Health check: http://localhost:${PORT}/health`);
  console.log('');
  console.log('Available endpoints:');
  console.log(`  GET /v1/feed?user_id=<id>&tenant_id=<id>&limit=<n>`);
  console.log(`  GET /v1/feed/non-personalized?tenant_id=<id>&limit=<n>`);
  console.log('');
  console.log('Demo user IDs (hashed):');
  console.log('  Gaming:  a3f7c4e9-8b2d-4a1f-9c3e-5d6b8a0e1f2c');
  console.log('  Cooking: b8d2e5f1-3c9a-4e7b-a2f5-6d8c9e1a3b4c');
  console.log('  Fitness: c1e4b7d2-9f3a-4c8e-b5d9-7e2f4a6c8b1d');
  console.log('  Tech:    d9a2c5e8-4b7f-4d1a-c3e6-8f1b3d5e7a9c');
  console.log('  New:     e2f5d8a1-7c4b-4e9d-b6f2-9a3c5e7b1d4f');
  console.log('');
  console.log('Try tenants: tenant1, tenant2, tenant3, tenant4');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('');
});
