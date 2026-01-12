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
      gamingUser: 'GET /v1/feed?user_id=06d6cbdcfc221d2f4460c17193442b9db221f30950f1c17af4e73e6e1788002b&tenant_id=tenant1&limit=5',
      cookingUser: 'GET /v1/feed?user_id=3e0e7f64a2495659941e0b704069bcb310d8dfcab850ba1aa992669ef6f55bcb&tenant_id=tenant1&limit=5',
      newUser: 'GET /v1/feed?user_id=6f015e465db03f8a847292bf8624f567167f87f0ea0aa223d1e31779cad855c7&tenant_id=tenant1&limit=5',
    },
    demoUsers: [
      '06d6cbdcfc221d2f4460c17193442b9db221f30950f1c17af4e73e6e1788002b (gaming)',
      '3e0e7f64a2495659941e0b704069bcb310d8dfcab850ba1aa992669ef6f55bcb (cooking)',
      'b1ee9a41806228f09f41651528d41bce8f3da70ebd5af4bc386eedc89d8e511b (fitness)',
      '4911e04c8147846b1cea5eddfb251c8b694d62b2416a2a0007bd9a50d8407d68 (tech)',
      '6f015e465db03f8a847292bf8624f567167f87f0ea0aa223d1e31779cad855c7 (new user)',
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
  console.log('Demo user IDs (SHA-256 hashed):');
  console.log('  Gaming:  06d6cbdcfc221d2f4460c17193442b9db221f30950f1c17af4e73e6e1788002b');
  console.log('  Cooking: 3e0e7f64a2495659941e0b704069bcb310d8dfcab850ba1aa992669ef6f55bcb');
  console.log('  Fitness: b1ee9a41806228f09f41651528d41bce8f3da70ebd5af4bc386eedc89d8e511b');
  console.log('  Tech:    4911e04c8147846b1cea5eddfb251c8b694d62b2416a2a0007bd9a50d8407d68');
  console.log('  New:     6f015e465db03f8a847292bf8624f567167f87f0ea0aa223d1e31779cad855c7');
  console.log('');
  console.log('Try tenants: tenant1, tenant2, tenant3, tenant4');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('');
});
