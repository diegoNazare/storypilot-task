# Storyteller Personalized Feeds - Prototype

A working demonstration of the personalized video feed system designed for the Storyteller platform.

## Overview

This prototype implements a Node.js API that demonstrates core personalization logic for serving video content. It uses in-memory mock data to show how different users receive different personalized feeds based on their viewing history and engagement patterns.

## Features

- ✅ **Personalized Ranking**: Videos scored based on watch history, engagement, and editorial boost
- ✅ **Multi-Tenant Support**: Isolated content and custom weights per tenant
- ✅ **Feature Flags**: Per-tenant enable/disable with global kill switch
- ✅ **Cold Start Handling**: New users receive popular content
- ✅ **Caching**: In-memory cache with TTL for performance
- ✅ **Fast Response Times**: Sub-50ms for cached requests, ~20-50ms for uncached

## Quick Start

### Prerequisites

- Node.js 16+ installed
- npm or yarn

### Installation

```bash
# Navigate to prototype directory
cd prototype

# Install dependencies
npm install

# Start the server
npm start
```

The server will start on `http://localhost:3001`

### Run the Demo

The demo script showcases different scenarios:

```bash
# Make sure server is running, then:
./tests/demo.sh
```

This will demonstrate:
1. Gaming enthusiast user - personalized gaming content
2. Cooking enthusiast user - personalized cooking content
3. New user - cold start with popular content
4. Feature flag disabled - non-personalized editorial feed
5. Cache performance - comparing first vs. cached requests

## API Endpoints

### GET /v1/feed

Returns a personalized video feed for a user.

**Query Parameters:**
- `user_id` (required): Hashed user identifier (UUID format)
- `tenant_id` (required): Tenant identifier (use: tenant1, tenant2, tenant3)
- `limit` (optional): Number of videos to return (default: 20)

**Example:**
```bash
# Gaming enthusiast user
curl "http://localhost:3001/v1/feed?user_id=a3f7c4e9-8b2d-4a1f-9c3e-5d6b8a0e1f2c&tenant_id=tenant1&limit=5"
```

**Response:**
```json
{
  "user_id": "a3f7c4e9-8b2d-4a1f-9c3e-5d6b8a0e1f2c",
  "tenant_id": "tenant1",
  "personalized": true,
  "feed": [
    {
      "id": "vid_001",
      "title": "Advanced Gaming Strategies",
      "category": "gaming",
      "score": 0.89,
      "ranking_reason": "High watch history match + editorial boost"
    }
  ],
  "metadata": {
    "total_candidates": 40,
    "response_time_ms": 12,
    "cache_hit": false,
    "algorithm_version": "personalized_v1.0",
    "ranking_weights": {
      "watch_history": 0.5,
      "engagement": 0.3,
      "editorial": 0.2
    }
  }
}
```

### GET /v1/feed/non-personalized

Returns a non-personalized feed (editorial curation only).

**Query Parameters:**
- `tenant_id` (required): Tenant identifier
- `limit` (optional): Number of videos to return (default: 20)

**Example:**
```bash
curl "http://localhost:3001/v1/feed/non-personalized?tenant_id=tenant1&limit=5"
```

### GET /health

Health check endpoint.

```bash
curl "http://localhost:3001/health"
```

## Project Structure

```
prototype/
├── src/
│   ├── index.js                 # Express server setup
│   ├── config/
│   │   └── constants.js         # Configuration constants
│   ├── models/
│   │   └── mockData.js          # Mock videos, user signals, configs
│   ├── routes/
│   │   └── feed.js              # Feed API endpoints
│   └── services/
│       ├── cache.js             # In-memory cache with TTL
│       └── personalization.js   # Ranking algorithm
├── tests/
│   └── demo.sh                  # Automated demo script
├── package.json
└── README.md
```

## Personalization Algorithm

The ranking algorithm combines three signals:

1. **Watch History (50%)**: Category affinity based on user's viewing patterns
2. **Engagement (30%)**: User's completion rate and engagement quality
3. **Editorial Boost (20%)**: Content team's curation decisions

Formula:
```
score = (watch_history_weight * watch_history_score) +
        (engagement_weight * engagement_score) +
        (editorial_weight * editorial_boost_normalized)
```

Weights are configurable per tenant.

## Mock Data

### Demo Users

The prototype includes several mock users with hashed identifiers (UUIDs):

- **a3f7c4e9-8b2d-4a1f-9c3e-5d6b8a0e1f2c**: Gaming enthusiast (watched 8 gaming videos)
- **b8d2e5f1-3c9a-4e7b-a2f5-6d8c9e1a3b4c**: Cooking enthusiast (watched 5 cooking videos)
- **c1e4b7d2-9f3a-4c8e-b5d9-7e2f4a6c8b1d**: Fitness enthusiast (watched 5 fitness videos)
- **d9a2c5e8-4b7f-4d1a-c3e6-8f1b3d5e7a9c**: Tech enthusiast (watched 5 tech videos)
- **e2f5d8a1-7c4b-4e9d-b6f2-9a3c5e7b1d4f**: New user (no watch history - cold start)

### Tenants

- **tenant1**: Personalization enabled, balanced weights
- **tenant2**: Personalization enabled, heavy watch history weight (70%)
- **tenant3**: Personalization disabled (feature flag off)

### Video Categories

40+ mock videos across 8 categories:
- Gaming, Cooking, Fitness, Tech, Music, Travel, Comedy, Education

## Testing Different Scenarios

### Scenario 1: Personalized Feed (Gaming Enthusiast)
```bash
curl "http://localhost:3001/v1/feed?user_id=a3f7c4e9-8b2d-4a1f-9c3e-5d6b8a0e1f2c&tenant_id=tenant1&limit=10"
```
Expected: Gaming videos ranked highest

### Scenario 2: Different User, Same Tenant (Cooking Enthusiast)
```bash
curl "http://localhost:3001/v1/feed?user_id=b8d2e5f1-3c9a-4e7b-a2f5-6d8c9e1a3b4c&tenant_id=tenant1&limit=10"
```
Expected: Cooking videos ranked highest

### Scenario 3: Cold Start (New User)
```bash
curl "http://localhost:3001/v1/feed?user_id=e2f5d8a1-7c4b-4e9d-b6f2-9a3c5e7b1d4f&tenant_id=tenant1&limit=10"
```
Expected: High editorial boost videos (popular content)

### Scenario 4: Feature Flag Disabled
```bash
curl "http://localhost:3001/v1/feed?user_id=a3f7c4e9-8b2d-4a1f-9c3e-5d6b8a0e1f2c&tenant_id=tenant3&limit=10"
```
Expected: Editorial order only, `personalized: false`

### Scenario 5: Different Tenant Weights
```bash
curl "http://localhost:3001/v1/feed?user_id=a3f7c4e9-8b2d-4a1f-9c3e-5d6b8a0e1f2c&tenant_id=tenant2&limit=10"
```
Expected: Different ranking due to tenant2's 70% watch history weight

## Performance

- **Uncached request**: 15-50ms (with mock data)
- **Cached request**: 1-5ms
- **Cache TTL**: 60 seconds for feeds
- **Memory footprint**: <50MB with mock data

In production with real databases:
- Target: p95 < 250ms, p99 < 600ms
- With Redis and optimized queries: Achievable

## Architecture Notes

This prototype uses in-memory mock data instead of real databases to:
- Simplify setup and demonstration
- Focus on personalization logic rather than infrastructure
- Enable fast iteration and testing

In production, this would be backed by:
- **PostgreSQL**: Videos, user signals, tenant configs
- **Redis**: Distributed caching
- **Kafka/SQS**: Event ingestion pipeline

See the main design documentation for full production architecture.

## What's NOT Implemented (Intentionally)

This is a prototype focused on core logic. Not included:
- ❌ Real database (uses in-memory mock data)
- ❌ Authentication/authorization
- ❌ Rate limiting
- ❌ Comprehensive error handling
- ❌ Unit tests
- ❌ Docker containerization
- ❌ Production monitoring/logging

These would be essential for production but are out of scope for this demonstration.

## Extending the Prototype

### Add More Mock Data

Edit `src/models/mockData.js` to add:
- More videos
- More user viewing histories
- Additional tenants

### Adjust Personalization Weights

Modify `tenantConfigs` in `mockData.js`:
```javascript
'tenant1': {
  personalization_weights: {
    watch_history: 0.6,  // Increase watch history influence
    engagement: 0.25,
    editorial: 0.15,
  },
}
```

### Change Cache TTL

Edit `src/config/constants.js`:
```javascript
CACHE_TTL: {
  FEED: 30,  // Change from 60 to 30 seconds
  // ...
}
```

## Troubleshooting

### Port Already in Use

If port 3001 is busy:
```bash
PORT=3002 npm start
```

### Demo Script Fails

Ensure server is running first:
```bash
# Terminal 1
npm start

# Terminal 2
./tests/demo.sh
```

### Node Version Issues

This requires Node 16+. Check version:
```bash
node --version
```

## Next Steps

For production deployment, this prototype would need:
1. Real database implementation (PostgreSQL)
2. Redis cluster for distributed caching
3. Event ingestion pipeline (Kafka)
4. Authentication and rate limiting
5. Comprehensive error handling and retry logic
6. Monitoring and alerting (Prometheus, Grafana)
7. Load testing and performance optimization
8. CI/CD pipeline and containerization

See the full design documentation at `/docs-site` for production architecture details.

## License

MIT

## Author

Created as part of the Storyteller Tech Lead technical assessment.
