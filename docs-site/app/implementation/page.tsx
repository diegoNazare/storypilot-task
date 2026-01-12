import Section from "@/components/Section";

export default function ImplementationPage() {
  return (
    <div className="max-w-6xl mx-auto px-8 py-16 page-fade-in">
      <h1 className="font-headline text-5xl uppercase tracking-[0.04em] mb-4">
        Implementation
      </h1>
      <p className="font-body text-lg text-silver mb-12">
        Technical decisions, trade-offs, and future improvements
      </p>

      <Section title="Key Technical Decisions">
        <div className="bg-white space-y-6">
          <div className="border border-mist p-6 rounded pattern-dots">
            <h3 className="font-body font-bold text-sm uppercase mb-3">
              Decision 1: Weighted Scoring vs. Machine Learning
            </h3>
            <div className="bg-white p-4 mb-4">
              <p className="font-body text-sm text-ink mb-4">
                <strong>Choice:</strong> Implemented a weighted scoring algorithm rather than ML-based recommendations.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="border-l-2 border-ink pl-4">
                  <p className="font-body font-bold text-xs uppercase mb-2 text-ink">Pros</p>
                  <ul className="font-body text-xs text-silver space-y-1">
                    <li>✓ Predictable, debuggable behavior</li>
                    <li>✓ No training data requirements</li>
                    <li>✓ Sub-50ms computation time</li>
                    <li>✓ Easy to tune per tenant</li>
                    <li>✓ Works well with cold start</li>
                    <li>✓ Small team can maintain</li>
                  </ul>
                </div>
                <div className="border-l-2 border-silver pl-4">
                  <p className="font-body font-bold text-xs uppercase mb-2 text-silver">Cons</p>
                  <ul className="font-body text-xs text-silver space-y-1">
                    <li>✗ Less sophisticated than ML</li>
                    <li>✗ Manual weight tuning needed</li>
                    <li>✗ Limited pattern discovery</li>
                    <li>✗ No collaborative filtering</li>
                  </ul>
                </div>
              </div>
            </div>
            <p className="font-body text-xs text-silver">
              <strong>Rationale:</strong> For a small team with 120 tenants, simplicity and maintainability 
              outweigh the marginal accuracy gains of ML. The system meets all performance requirements 
              and is reversible—we can add ML later without architectural changes.
            </p>
          </div>

          <div className="border border-mist p-6 rounded pattern-grid">
            <h3 className="font-body font-bold text-sm uppercase mb-3">
              Decision 2: Asynchronous Event Processing
            </h3>
            <div className="bg-white p-4 mb-4">
              <p className="font-body text-sm text-ink mb-4">
                <strong>Choice:</strong> User events processed asynchronously with up to 5-minute lag.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="border-l-2 border-ink pl-4">
                  <p className="font-body font-bold text-xs uppercase mb-2 text-ink">Pros</p>
                  <ul className="font-body text-xs text-silver space-y-1">
                    <li>✓ Decouples writes from reads</li>
                    <li>✓ Batch processing efficiency</li>
                    <li>✓ Handles traffic spikes</li>
                    <li>✓ Reduced database load</li>
                    <li>✓ Easier to scale writes</li>
                  </ul>
                </div>
                <div className="border-l-2 border-silver pl-4">
                  <p className="font-body font-bold text-xs uppercase mb-2 text-silver">Cons</p>
                  <ul className="font-body text-xs text-silver space-y-1">
                    <li>✗ Not real-time personalization</li>
                    <li>✗ Eventual consistency complexity</li>
                    <li>✗ Additional infrastructure (Kafka/SQS)</li>
                  </ul>
                </div>
              </div>
            </div>
            <p className="font-body text-xs text-silver">
              <strong>Rationale:</strong> The 5-minute lag is acceptable per requirements. Async processing 
              is critical for scale—synchronous writes would bottleneck at 3k RPS. Kafka provides reliable 
              event delivery and natural backpressure handling.
            </p>
          </div>

          <div className="border border-mist p-6 rounded pattern-crosshatch">
            <h3 className="font-body font-bold text-sm uppercase mb-3">
              Decision 3: Redis for Caching vs. In-Memory
            </h3>
            <div className="bg-white p-4 mb-4">
              <p className="font-body text-sm text-ink mb-4">
                <strong>Choice:</strong> Redis cluster for distributed caching rather than application-level caching.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="border-l-2 border-ink pl-4">
                  <p className="font-body font-bold text-xs uppercase mb-2 text-ink">Pros</p>
                  <ul className="font-body text-xs text-silver space-y-1">
                    <li>✓ Shared cache across instances</li>
                    <li>✓ Sub-ms lookup times</li>
                    <li>✓ Built-in TTL support</li>
                    <li>✓ Persistence options</li>
                    <li>✓ Scales horizontally</li>
                  </ul>
                </div>
                <div className="border-l-2 border-silver pl-4">
                  <p className="font-body font-bold text-xs uppercase mb-2 text-silver">Cons</p>
                  <ul className="font-body text-xs text-silver space-y-1">
                    <li>✗ Network hop overhead (~1-2ms)</li>
                    <li>✗ Additional infrastructure cost</li>
                    <li>✗ Single point of failure (mitigated by clustering)</li>
                  </ul>
                </div>
              </div>
            </div>
            <p className="font-body text-xs text-silver">
              <strong>Rationale:</strong> Distributed caching is essential when running multiple API instances. 
              In-memory caching would cause cache misses on different instances, negating benefits. Redis 
              cluster provides HA and sufficient performance for our latency targets.
            </p>
          </div>

          <div className="border border-mist p-6 rounded pattern-diagonal">
            <h3 className="font-body font-bold text-sm uppercase mb-3">
              Decision 4: PostgreSQL vs. NoSQL for User Signals
            </h3>
            <div className="bg-white p-4 mb-4">
              <p className="font-body text-sm text-ink mb-4">
                <strong>Choice:</strong> PostgreSQL with monthly partitioning for time-series event data.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="border-l-2 border-ink pl-4">
                  <p className="font-body font-bold text-xs uppercase mb-2 text-ink">Pros</p>
                  <ul className="font-body text-xs text-silver space-y-1">
                    <li>✓ ACID guarantees</li>
                    <li>✓ Powerful JOIN queries</li>
                    <li>✓ Mature ecosystem</li>
                    <li>✓ Built-in partitioning</li>
                    <li>✓ Team expertise</li>
                  </ul>
                </div>
                <div className="border-l-2 border-silver pl-4">
                  <p className="font-body font-bold text-xs uppercase mb-2 text-silver">Cons</p>
                  <ul className="font-body text-xs text-silver space-y-1">
                    <li>✗ Slower than specialized time-series DBs</li>
                    <li>✗ Vertical scaling limits</li>
                    <li>✗ Partition maintenance overhead</li>
                  </ul>
                </div>
              </div>
            </div>
            <p className="font-body text-xs text-silver">
              <strong>Rationale:</strong> PostgreSQL handles our query patterns efficiently and the team 
              has deep expertise. Monthly partitioning solves the retention problem elegantly. We can 
              migrate to Cassandra or TimescaleDB later if write volume becomes problematic.
            </p>
          </div>
        </div>
      </Section>

      <Section title="What Was Prioritized">
        <div className="bg-white space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 border border-ink flex items-center justify-center shrink-0 mt-1">
              <span className="font-body text-xs">1</span>
            </div>
            <div>
              <p className="font-body font-bold text-sm mb-1">Meeting Non-Negotiables</p>
              <p className="font-body text-xs text-silver">
                Every architectural decision was evaluated against the six core constraints. Latency, 
                scale, and privacy requirements drove technology choices and caching strategy.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 border border-ink flex items-center justify-center shrink-0 mt-1">
              <span className="font-body text-xs">2</span>
            </div>
            <div>
              <p className="font-body font-bold text-sm mb-1">Operational Simplicity</p>
              <p className="font-body text-xs text-silver">
                Chose proven technologies (PostgreSQL, Redis, Kafka) over cutting-edge solutions. 
                Prioritized debuggability and team expertise to enable fast iteration.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 border border-ink flex items-center justify-center shrink-0 mt-1">
              <span className="font-body text-xs">3</span>
            </div>
            <div>
              <p className="font-body font-bold text-sm mb-1">Safe Rollout</p>
              <p className="font-body text-xs text-silver">
                Feature flags and graceful degradation were first-class concerns. Every component has a 
                fallback path to ensure system stability during deployment.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 border border-ink flex items-center justify-center shrink-0 mt-1">
              <span className="font-body text-xs">4</span>
            </div>
            <div>
              <p className="font-body font-bold text-sm mb-1">Tenant Flexibility</p>
              <p className="font-body text-xs text-silver">
                Per-tenant configuration allows experimentation. Tenants can adjust weights, test 
                personalization, and maintain editorial control without code changes.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section title="What Was Deferred">
        <div className="bg-white space-y-3">
          <div className="border-l-2 border-silver pl-4">
            <h3 className="font-body font-bold text-sm uppercase mb-2">Machine Learning Recommendations</h3>
            <p className="font-body text-xs text-silver mb-2">
              <strong>Why deferred:</strong> Insufficient data initially, small team, complexity not justified yet.
            </p>
            <p className="font-body text-xs text-silver">
              <strong>When to add:</strong> Once we have 6+ months of signal data and proven product-market fit. 
              Can be introduced gradually as a secondary scoring signal.
            </p>
          </div>

          <div className="border-l-2 border-silver pl-4">
            <h3 className="font-body font-bold text-sm uppercase mb-2">Real-Time Signal Processing</h3>
            <p className="font-body text-xs text-silver mb-2">
              <strong>Why deferred:</strong> 5-minute lag is acceptable per requirements. Real-time adds complexity.
            </p>
            <p className="font-body text-xs text-silver">
              <strong>When to add:</strong> If A/B tests show significant engagement lift from sub-second signal updates. 
              Would require streaming architecture (Flink/Spark).
            </p>
          </div>

          <div className="border-l-2 border-silver pl-4">
            <h3 className="font-body font-bold text-sm uppercase mb-2">Collaborative Filtering</h3>
            <p className="font-body text-xs text-silver mb-2">
              <strong>Why deferred:</strong> Requires sufficient user overlap and data density. Cold start problem.
            </p>
            <p className="font-body text-xs text-silver">
              <strong>When to add:</strong> When user base reaches critical mass (~1M+ active users per tenant). 
              Implement as "users like you also watched" feature.
            </p>
          </div>

          <div className="border-l-2 border-silver pl-4">
            <h3 className="font-body font-bold text-sm uppercase mb-2">A/B Testing Framework</h3>
            <p className="font-body text-xs text-silver mb-2">
              <strong>Why deferred:</strong> Feature flags provide basic testing. Full framework is premature optimization.
            </p>
            <p className="font-body text-xs text-silver">
              <strong>When to add:</strong> Once core personalization is stable and we're optimizing for incremental gains. 
              Integrate with analytics platform.
            </p>
          </div>

          <div className="border-l-2 border-silver pl-4">
            <h3 className="font-body font-bold text-sm uppercase mb-2">Contextual Signals (Time, Location, Device)</h3>
            <p className="font-body text-xs text-silver mb-2">
              <strong>Why deferred:</strong> Focus on core signals first. Contextual adds complexity without proven value.
            </p>
            <p className="font-body text-xs text-silver">
              <strong>When to add:</strong> After validating that basic personalization works. Can be added incrementally 
              as additional scoring factors.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Reversible vs. Irreversible Decisions">
        <div className="bg-white space-y-4">
          <div>
            <h3 className="font-body font-bold text-sm uppercase mb-3 text-ink">Reversible (Low Risk)</h3>
            <div className="space-y-2">
              <div className="border border-mist p-3 rounded bg-cloud">
                <p className="font-body text-xs">
                  <strong>Scoring algorithm weights:</strong> Can be adjusted per tenant at any time via config changes.
                </p>
              </div>
              <div className="border border-mist p-3 rounded bg-cloud">
                <p className="font-body text-xs">
                  <strong>Cache TTLs:</strong> Tunable via configuration without code changes. Easy to experiment.
                </p>
              </div>
              <div className="border border-mist p-3 rounded bg-cloud">
                <p className="font-body text-xs">
                  <strong>Feature flags:</strong> Can enable/disable personalization per tenant instantly.
                </p>
              </div>
              <div className="border border-mist p-3 rounded bg-cloud">
                <p className="font-body text-xs">
                  <strong>Adding ML layer:</strong> Can run alongside weighted scoring as A/B test before full migration.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-body font-bold text-sm uppercase mb-3 text-ink">Irreversible (High Risk)</h3>
            <div className="space-y-2">
              <div className="border border-ink p-3 rounded">
                <p className="font-body text-xs mb-2">
                  <strong>Privacy model (hashed user IDs):</strong> Cannot add raw PII later without major privacy review 
                  and potential GDPR violations.
                </p>
                <p className="font-body text-xs text-silver">
                  <em>Mitigation:</em> Decision aligns with privacy-first requirements. No regrets.
                </p>
              </div>
              <div className="border border-ink p-3 rounded">
                <p className="font-body text-xs mb-2">
                  <strong>90-day retention policy:</strong> Can't recover data after deletion. Difficult to extend 
                  without user consent.
                </p>
                <p className="font-body text-xs text-silver">
                  <em>Mitigation:</em> Requirement is clear. Documented in tenant agreements.
                </p>
              </div>
              <div className="border border-ink p-3 rounded">
                <p className="font-body text-xs mb-2">
                  <strong>API contract:</strong> Breaking changes impact 120 tenants and their mobile apps.
                </p>
                <p className="font-body text-xs text-silver">
                  <em>Mitigation:</em> Versioned API (/v1/feed). Can introduce /v2 with new features later.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section title="Future Improvements" pattern="dots">
        <div className="bg-white space-y-4">
          <div className="border-l-4 border-ink pl-4">
            <h3 className="font-body font-bold text-sm uppercase mb-2">Short Term (3-6 months)</h3>
            <ul className="font-body text-xs text-silver space-y-2">
              <li>
                <strong>• Engagement metrics dashboard:</strong> Build internal analytics to track CTR, 
                completion rates, and personalization lift per tenant.
              </li>
              <li>
                <strong>• Cold start optimization:</strong> Implement better default recommendations for new users 
                using popularity and editorial signals.
              </li>
              <li>
                <strong>• Cache warming:</strong> Pre-compute popular feeds during off-peak hours to reduce 
                cache misses during traffic spikes.
              </li>
              <li>
                <strong>• Query optimization:</strong> Add database query profiling and optimize slow queries 
                identified in production.
              </li>
            </ul>
          </div>

          <div className="border-l-4 border-ink pl-4">
            <h3 className="font-body font-bold text-sm uppercase mb-2">Medium Term (6-12 months)</h3>
            <ul className="font-body text-xs text-silver space-y-2">
              <li>
                <strong>• ML-based scoring:</strong> Train lightweight models (collaborative filtering, matrix 
                factorization) on accumulated data.
              </li>
              <li>
                <strong>• A/B testing framework:</strong> Systematic experimentation to optimize weights and 
                test new signals.
              </li>
              <li>
                <strong>• Real-time stream processing:</strong> Reduce signal lag from 5 minutes to seconds 
                for high-engagement tenants.
              </li>
              <li>
                <strong>• Content-based filtering:</strong> Analyze video metadata (transcripts, tags) for 
                better semantic matching.
              </li>
            </ul>
          </div>

          <div className="border-l-4 border-ink pl-4">
            <h3 className="font-body font-bold text-sm uppercase mb-2">Long Term (12+ months)</h3>
            <ul className="font-body text-xs text-silver space-y-2">
              <li>
                <strong>• Deep learning recommendations:</strong> Neural collaborative filtering, sequence 
                models for session-based recommendations.
              </li>
              <li>
                <strong>• Multi-armed bandits:</strong> Exploration/exploitation balance to surface new content 
                while maintaining engagement.
              </li>
              <li>
                <strong>• Cross-tenant insights:</strong> (Privacy-preserving) Learn patterns across tenants 
                to improve cold start for new customers.
              </li>
              <li>
                <strong>• Contextual personalization:</strong> Time of day, device type, session history as 
                additional ranking signals.
              </li>
            </ul>
          </div>
        </div>
      </Section>
    </div>
  );
}
