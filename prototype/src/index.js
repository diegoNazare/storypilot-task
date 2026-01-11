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
      alice: 'GET /v1/feed?user_id=alice&tenant_id=tenant1&limit=5',
      bob: 'GET /v1/feed?user_id=bob&tenant_id=tenant1&limit=5',
      newUser: 'GET /v1/feed?user_id=newuser&tenant_id=tenant1&limit=5',
    },
    demoUsers: ['alice', 'bob', 'charlie', 'diana', 'newuser'],
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
  console.log('Try demo users: alice, bob, charlie, diana');
  console.log('Try tenants: tenant1, tenant2, tenant3');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('');
});
