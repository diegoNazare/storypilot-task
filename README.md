# Storyteller Tech Lead Assessment - Personalized Video Feeds

This repository contains my submission for the Storyteller Tech Lead technical assessment (Task 1). The assignment was to design and partially implement a backend system for personalized video feeds.

## 📋 What This Is

This is a **technical assessment submission** demonstrating:
- Complete system design for a personalized video feed platform
- Working prototype API with real personalization logic
- Comprehensive documentation of architecture, trade-offs, and decisions
- Honest assessment of AI tool usage in the development process

**This is NOT a production system** - it's a demonstration of system design thinking, backend development skills, and pragmatic engineering approach for a ~10 hour technical task.

## 📁 Repository Structure

```
storyteller/
├── task/                      # Original assignment brief
│   ├── Storyteller_-_Tech_Lead_Task_1.pdf
│   └── Storyteller_-_Tech_Lead_Task_1.md
├── docs-site/                 # System design documentation (Next.js)
│   ├── app/
│   │   ├── page.tsx          # Overview
│   │   ├── architecture/     # System components & data flows
│   │   ├── api/              # API contract & specifications
│   │   ├── data-model/       # Database schemas
│   │   ├── implementation/   # Technical decisions & trade-offs
│   │   ├── rollout/          # Deployment & observability strategy
│   │   └── ai/               # AI usage write-up
│   └── components/           # React components with architecture diagrams
├── prototype/                # Working Node.js API
│   ├── src/
│   │   ├── index.js         # Express server
│   │   ├── routes/          # Feed endpoints
│   │   ├── services/        # Personalization algorithm
│   │   ├── models/          # Mock data (40+ videos, 4 users)
│   │   └── config/          # Configuration
│   └── tests/
│       └── demo.sh          # Automated demo script
├── _temp/                   # Working notes & decision docs
└── verify.sh               # Verification script
```

## 🎯 Assignment Requirements

The task required designing a system to meet these constraints:

| Constraint | Requirement | Implementation |
|------------|-------------|----------------|
| **Scale** | 3k RPS peak | Redis caching + horizontal scaling |
| **Latency** | p95 < 250ms | Cache-first architecture, optimized queries |
| **Freshness** | Content ≤60s, signals ≤5min | TTL-based cache invalidation |
| **Privacy** | Hashed IDs, 90-day retention | SHA-256 hashing, partition-based expiration |
| **Multi-Tenant** | 120 tenants, custom weights | Per-tenant config store |
| **Rollout** | Feature flags, kill switch | Global + per-tenant flags |

## 🚀 Quick Start

### View the Documentation

```bash
cd docs-site
npm install
npm run dev
# Open http://localhost:3000
```

The documentation site includes:
- **Architecture**: System design with visual diagrams
- **API Contract**: Complete endpoint specifications
- **Data Model**: Database schemas with ERD
- **Implementation**: Technical decisions and trade-offs
- **Rollout Strategy**: Feature flags and observability
- **AI Usage**: Honest write-up of AI tools used

### Run the Prototype

```bash
cd prototype
npm install
npm start
# Server at http://localhost:3001
```

### Try the Demo

```bash
cd prototype
./tests/demo.sh
```

The demo shows:
- Gaming fan gets gaming videos (personalized)
- Cooking fan gets cooking videos (personalized)
- New user gets popular content (cold start)
- Feature flag disabled returns non-personalized feed
- Cache performance comparison

## 🔍 Key Features Demonstrated

### System Design (Primary Deliverable)
- ✅ Complete architecture with caching strategy
- ✅ Data model with privacy considerations
- ✅ API contract with proper HTTP semantics
- ✅ Multi-tenant configuration approach
- ✅ Explicit trade-off analysis
- ✅ Rollout strategy with observability plan

### Working Prototype (Secondary Deliverable)
- ✅ Functional personalization algorithm
- ✅ Multi-tenant support with custom weights
- ✅ Feature flags (global + per-tenant)
- ✅ Cold start handling for new users
- ✅ In-memory caching demonstration
- ✅ Clean, documented code structure

### AI Usage Write-up
- ✅ Tools used (Cursor with Claude 3.5 Sonnet)
- ✅ What worked well and what didn't
- ✅ Honest assessment of capabilities and limitations
- ✅ Thoughts on team AI adoption

## 📊 What Was Delivered

**Documentation**: 7 comprehensive sections covering architecture, API, data model, implementation decisions, rollout strategy, and AI usage. Built as a beautiful, minimal Next.js site.

**Prototype**: ~600 lines of clean Node.js code demonstrating core personalization logic with 40+ mock videos, 4 user personas, and 3 tenant configurations.

**Working Demo**: Automated test script showing different scenarios (personalized feeds, cold start, feature flags, caching).

**Time Spent**: ~10 hours total (design, implementation, documentation)

**AI Assistance**: Claude 3.5 Sonnet via Cursor (~50% time savings)

## 🧪 Testing the System

### Example API Calls

```bash
# Gaming enthusiast - gets personalized gaming content
curl "http://localhost:3001/v1/feed?user_id=alice&tenant_id=tenant1&limit=5"

# Cooking enthusiast - gets personalized cooking content
curl "http://localhost:3001/v1/feed?user_id=bob&tenant_id=tenant1&limit=5"

# New user - gets popular content (cold start)
curl "http://localhost:3001/v1/feed?user_id=newuser&tenant_id=tenant1&limit=5"

# Feature flag disabled - non-personalized feed
curl "http://localhost:3001/v1/feed?user_id=alice&tenant_id=tenant3&limit=5"
```

### Verify Everything Works

```bash
./verify.sh
```

This checks:
- Node version
- Project structure
- Docs site builds successfully
- Prototype dependencies installed
- All key files present

## 🎓 What This Demonstrates

### Technical Skills
1. **System Design**: Scalable architecture meeting real-world constraints
2. **Backend Development**: Clean API with proper separation of concerns
3. **Algorithm Design**: Practical personalization without ML complexity
4. **Trade-off Analysis**: Explicit reasoning for decisions
5. **Communication**: Clear technical documentation

### Pragmatic Engineering
1. **Scope Management**: Core requirements prioritized, nice-to-haves documented
2. **Reversible Decisions**: Designed for future evolution
3. **Operational Thinking**: Feature flags, monitoring, graceful degradation
4. **Time Management**: Complete deliverable in ~10 hours
5. **AI Fluency**: Effective tool usage with honest assessment

## 📝 Deliverables Checklist

- ✅ **System Design Document**: Complete with diagrams and trade-offs
- ✅ **Working Prototype**: Functional API with demo script
- ✅ **AI Usage Write-up**: Integrated into documentation site
- ✅ **Clean Code**: Well-structured, commented, production patterns
- ✅ **Setup Instructions**: Clear READMEs for all components
- ✅ **Tested & Verified**: Both docs and prototype build successfully

## 🔧 Technical Stack

**Documentation Site**:
- Next.js 16.1 (App Router)
- React 19.2
- TypeScript 5
- Tailwind CSS v4
- Lucide Icons
- React Flow for diagrams

**Prototype API**:
- Node.js 16+
- Express 5.2
- In-memory caching
- Mock data (no database required)

## 🚧 What's NOT Included (By Design)

This is a **technical assessment**, not production code:

- ❌ Real databases (uses in-memory mock data)
- ❌ Authentication/authorization
- ❌ Rate limiting
- ❌ Comprehensive error handling
- ❌ Unit tests
- ❌ Docker/Kubernetes deployment
- ❌ Production logging/monitoring
- ❌ ML recommendation models

These are documented as "next steps" but were out of scope for the ~10 hour assessment.

## 📈 Performance Characteristics

**Prototype** (with mock data):
- Response time: <50ms cached, ~20ms uncached
- Handles concurrent requests
- Memory footprint: <50MB

**Designed Production System** (documented):
- Target: 3,000 RPS peak load
- Target: p95 < 250ms, p99 < 600ms
- Cache hit ratio: >90% expected
- Horizontal scaling: 6-8 instances @ 500 RPS each

## 🎯 What Would Be Next for Production

If this were a real project (documented in `/docs-site/implementation`):

1. Real databases (PostgreSQL for persistence, Redis for caching)
2. Event ingestion pipeline (Kafka or SQS)
3. Authentication and authorization layer
4. Rate limiting and request validation
5. Comprehensive error handling and retry logic
6. Full test coverage (unit, integration, load tests)
7. Monitoring and alerting (Prometheus, Grafana)
8. CI/CD pipeline
9. Container orchestration (Docker + Kubernetes)
10. ML models for advanced personalization

## 📞 Summary

This submission demonstrates:
- **Complete system design** with production considerations
- **Working prototype** proving core concepts
- **Pragmatic approach** balancing quality and time constraints
- **Clear communication** of technical decisions and trade-offs
- **Effective AI usage** with honest assessment of capabilities

The documentation is comprehensive, the prototype is functional, and everything has been tested and verified. The submission shows how I approach system design, make engineering trade-offs, and deliver quality work within time constraints.
