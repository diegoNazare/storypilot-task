# Storyteller Assessment - Working Prototype

This is the **working prototype API** for the Storyteller Tech Lead technical assessment. It demonstrates the core personalization logic for a video feed system with real code that runs and can be tested.

## Purpose

This prototype serves as the **secondary deliverable** for the technical assessment. It demonstrates:
- Practical implementation of personalization algorithms
- Clean code structure and separation of concerns
- Multi-tenant architecture patterns
- Feature flag implementation
- Cache optimization strategies
- Pragmatic engineering approach

**This is NOT production code** - it's a demonstration built in ~3 hours to prove the system design concepts with working, testable code.

## What It Does

The prototype implements a Node.js/Express API that:
- ✅ Returns personalized video feeds based on user viewing history
- ✅ Supports multiple tenants with custom ranking weights
- ✅ Handles cold start scenarios (new users with no history)
- ✅ Uses feature flags to enable/disable personalization
- ✅ Caches responses for performance
- ✅ Returns detailed metadata about ranking decisions

## Quick Start

### Prerequisites

- Node.js 16 or higher
- npm (comes with Node.js)

### Installation & Running

```bash
# Install dependencies
npm install

# Start the server
npm start
```

Server will start on `http://localhost:3001`

### Run the Demo

```bash
# Ensure server is running first, then:
./tests/demo.sh
```

The demo script demonstrates:
1. **Gaming enthusiast** - Gets personalized gaming content
2. **Cooking enthusiast** - Gets personalized cooking content
3. **New user** - Cold start with popular content
4. **Feature flag off** - Non-personalized editorial feed
5. **Cache performance** - First vs cached request comparison

## API Endpoints

### `GET /v1/feed` - Personalized Feed

Returns a personalized video feed for a specific user and tenant.

**Query Parameters**:
- `user_id` (required): User identifier (use: `alice`, `bob`, `charlie`, `diana`, or `newuser`)
- `tenant_id` (required): Tenant identifier (use: `tenant1`, `tenant2`, or `tenant3`)
- `limit` (optional): Number of videos to return (default: 20, max: 50)

**Example Request**:
```bash
curl "http://localhost:3001/v1/feed?user_id=alice&tenant_id=tenant1&limit=5"
```

**Example Response**:
```json
{
  "user_id": "alice",
  "tenant_id": "tenant1",
  "personalized": true,
  "feed": [
    {
      "id": "vid_001",
      "title": "Advanced Gaming Strategies",
      "creator": "ProGamer123",
      "category": "gaming",
      "duration": 245,
      "views": 125000,
      "likes": 8500,
      "published_at": "2024-01-15T10:00:00Z",
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

### `GET /v1/feed/non-personalized` - Editorial Feed

Returns a non-personalized feed (editorial curation only).

**Query Parameters**:
- `tenant_id` (required): Tenant identifier
- `limit` (optional): Number of videos to return (default: 20)

**Example Request**:
```bash
curl "http://localhost:3001/v1/feed/non-personalized?tenant_id=tenant1&limit=5"
```

### `GET /health` - Health Check

Simple health check endpoint.

**Example Request**:
```bash
curl "http://localhost:3001/health"
```

**Response**:
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T12:00:00Z"
}
```

## Testing Scenarios

### Scenario 1: Gaming Enthusiast (Personalized)
```bash
curl "http://localhost:3001/v1/feed?user_id=alice&tenant_id=tenant1&limit=10"
```
**Expected**: Gaming videos ranked highest based on Alice's watch history.

### Scenario 2: Cooking Enthusiast (Personalized)
```bash
curl "http://localhost:3001/v1/feed?user_id=bob&tenant_id=tenant1&limit=10"
```
**Expected**: Cooking videos ranked highest based on Bob's watch history.

### Scenario 3: New User (Cold Start)
```bash
curl "http://localhost:3001/v1/feed?user_id=newuser&tenant_id=tenant1&limit=10"
```
**Expected**: Popular content with high editorial boost (no viewing history available).

### Scenario 4: Feature Flag Disabled
```bash
curl "http://localhost:3001/v1/feed?user_id=alice&tenant_id=tenant3&limit=10"
```
**Expected**: Non-personalized feed, `personalized: false` in response.

### Scenario 5: Different Tenant Weights
```bash
curl "http://localhost:3001/v1/feed?user_id=alice&tenant_id=tenant2&limit=10"
```
**Expected**: Different ranking due to tenant2's heavier watch history weight (70%).

## How Personalization Works

The ranking algorithm combines three signals with configurable weights:

### 1. Watch History Score (Default: 50%)
Measures category affinity based on user's viewing patterns.

```javascript
// Simplified logic
categories = user_watched_videos.map(v => v.category)
category_affinity = {
  gaming: 8/10,  // Watched 8 gaming videos out of 10 total
  cooking: 2/10
}
score = category_affinity[video.category] || 0
```

### 2. Engagement Score (Default: 30%)
User's engagement quality (completion rate, interaction patterns).

```javascript
// In prototype: simplified per-user engagement metric
engagement_score = user_signals.avg_engagement_rate || 0.5
```

### 3. Editorial Boost (Default: 20%)
Content team's curation decisions for promotion.

```javascript
editorial_score = video.editorial_boost / 10  // Normalized 0-1
```

### Final Score Calculation
```javascript
final_score = 
  (watch_history_weight × watch_history_score) +
  (engagement_weight × engagement_score) +
  (editorial_weight × editorial_score)
```

Weights are **configurable per tenant**, allowing different personalization strategies.

## Mock Data

### Demo Users

| User ID | Description | Watch History | Engagement |
|---------|-------------|---------------|------------|
| `alice` | Gaming enthusiast | 8 gaming videos | High |
| `bob` | Cooking enthusiast | 5 cooking videos | Medium |
| `charlie` | Fitness enthusiast | 5 fitness videos | High |
| `diana` | Tech enthusiast | 5 tech videos | Medium |
| `newuser` | New user | None (cold start) | N/A |

### Tenants

| Tenant | Personalization | Watch History | Engagement | Editorial |
|--------|----------------|---------------|------------|-----------|
| `tenant1` | ✅ Enabled | 50% | 30% | 20% |
| `tenant2` | ✅ Enabled | 70% | 20% | 10% |
| `tenant3` | ❌ Disabled | N/A | N/A | N/A |

### Video Library

40+ mock videos across 8 categories:
- **Gaming**: Strategy guides, reviews, gameplay
- **Cooking**: Recipes, techniques, chef interviews
- **Fitness**: Workouts, nutrition, wellness
- **Tech**: Product reviews, tutorials, news
- **Music**: Performances, lessons, industry news
- **Travel**: Destinations, tips, vlogs
- **Comedy**: Stand-up, sketches, reactions
- **Education**: Tutorials, explainers, courses

Each video has:
- Unique ID, title, creator
- Category classification
- View count, like count
- Duration, publish date
- Editorial boost value (0-10)

## Project Structure

```
prototype/
├── src/
│   ├── index.js                 # Express server setup & middleware
│   ├── config/
│   │   └── constants.js         # Configuration constants
│   ├── models/
│   │   └── mockData.js          # Mock videos, users, tenants
│   ├── routes/
│   │   └── feed.js              # Feed API endpoint handlers
│   └── services/
│       ├── cache.js             # In-memory cache with TTL
│       └── personalization.js   # Ranking algorithm
├── tests/
│   └── demo.sh                  # Automated demo script
├── package.json
└── README.md
```

### Key Files

**`src/index.js`**: Express server with CORS, error handling, logging middleware.

**`src/routes/feed.js`**: Feed endpoint handlers with validation, feature flag checks, and response formatting.

**`src/services/personalization.js`**: Core ranking algorithm that scores videos based on user signals and tenant configuration.

**`src/services/cache.js`**: Simple in-memory cache with TTL expiration (would be Redis in production).

**`src/models/mockData.js`**: All mock data including videos, user viewing histories, and tenant configurations.

**`tests/demo.sh`**: Bash script that demonstrates all key scenarios with colored output.

## Performance

**Prototype Performance** (in-memory mock data):
- Uncached request: 15-50ms
- Cached request: 1-5ms
- Cache TTL: 60 seconds
- Memory footprint: <50MB

**Production Targets** (documented in system design):
- Peak load: 3,000 RPS
- p95 latency: <250ms
- p99 latency: <600ms
- Cache hit ratio: >90%
- Horizontal scaling: 6-8 instances @ 500 RPS each

## What's NOT Implemented

This is a **prototype for a technical assessment**, not production code:

- ❌ **No real database** - Uses in-memory mock data
- ❌ **No authentication** - Open endpoints
- ❌ **No rate limiting** - Unlimited requests
- ❌ **No input validation** - Basic checks only
- ❌ **No error handling** - Simplified error responses
- ❌ **No unit tests** - Manual testing via demo script
- ❌ **No logging** - Basic console logs only
- ❌ **No monitoring** - No metrics collection
- ❌ **No Docker** - Run directly with Node.js

These would all be essential for production but are **intentionally out of scope** for a ~3 hour prototype demonstration.

## Extending the Prototype

### Add More Videos

Edit `src/models/mockData.js`:

```javascript
const videos = [
  // Add new video
  {
    id: 'vid_999',
    title: 'Your Video Title',
    category: 'gaming',
    editorial_boost: 7,
    // ... other fields
  }
];
```

### Add New User

Edit `src/models/mockData.js`:

```javascript
const userSignals = {
  'your_user_id': {
    viewed_videos: ['vid_001', 'vid_002'],
    engagement_rate: 0.75,
    // ... other fields
  }
};
```

### Change Tenant Weights

Edit `src/models/mockData.js`:

```javascript
const tenantConfigs = {
  'tenant1': {
    personalization_weights: {
      watch_history: 0.6,  // Increase from 0.5
      engagement: 0.25,    // Decrease from 0.3
      editorial: 0.15,     // Decrease from 0.2
    }
  }
};
```

### Adjust Cache TTL

Edit `src/config/constants.js`:

```javascript
CACHE_TTL: {
  FEED: 30,  // Change from 60 seconds
}
```

## Troubleshooting

### Port Already in Use

If port 3001 is occupied:
```bash
PORT=3002 npm start
```

Then update API calls:
```bash
curl "http://localhost:3002/v1/feed?user_id=alice&tenant_id=tenant1"
```

### Demo Script Fails

Ensure server is running first:
```bash
# Terminal 1: Start server
npm start

# Terminal 2: Run demo
./tests/demo.sh
```

### Node Version Too Old

Check version:
```bash
node --version
```

If <16, upgrade Node.js:
```bash
# Using nvm
nvm install 16
nvm use 16
```

### Dependencies Won't Install

Clear cache and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

## Production Roadmap

If this were to become a real system, the prototype would need:

1. **Database Layer**:
   - PostgreSQL for persistent data (videos, user signals, tenants)
   - Redis cluster for distributed caching
   - Proper migrations and schema management

2. **API Improvements**:
   - Authentication and authorization (JWT or API keys)
   - Rate limiting (per user, per tenant)
   - Comprehensive input validation (Joi, Zod)
   - Structured error responses
   - Request/response logging

3. **Infrastructure**:
   - Docker containerization
   - Kubernetes orchestration
   - Load balancing (Nginx or ALB)
   - Auto-scaling policies
   - Multi-region deployment

4. **Event Pipeline**:
   - Kafka or SQS for event ingestion
   - Stream processing for real-time signals
   - Batch processing for historical analysis

5. **Monitoring & Operations**:
   - Prometheus metrics
   - Grafana dashboards
   - ELK stack for logs
   - PagerDuty alerting
   - Distributed tracing (Jaeger)

6. **Testing**:
   - Unit tests (Jest)
   - Integration tests
   - Load tests (k6, Artillery)
   - A/B testing framework

7. **Advanced Features**:
   - ML recommendation models
   - Real-time collaborative filtering
   - Diversity and exploration
   - Contextual bandits

See full roadmap in `/docs-site/implementation` page.

## What This Demonstrates

This prototype shows:

1. **Clean Code**: Proper separation of concerns, modular structure
2. **Practical Algorithms**: Weighted scoring without ML complexity
3. **Multi-Tenancy**: Per-tenant configuration management
4. **Feature Flags**: Safe rollout patterns
5. **Performance Thinking**: Caching strategy for scale
6. **Testability**: Demo script for validation

## Assessment Context

This is a **working prototype** built as part of a technical assessment that required:

- ✅ Demonstrate core personalization logic
- ✅ Show code quality and structure
- ✅ Prove the system design concepts work
- ✅ Include setup instructions

The prototype took **~3 hours** of the **~10 hour total assessment** time. The primary deliverable is the system design documentation (`/docs-site`), while this prototype proves the concepts with running code.
