import Section from "@/components/Section";
import CodeBlock from "@/components/CodeBlock";

export default function RolloutPage() {
  return (
    <div className="max-w-6xl mx-auto px-8 py-16 page-fade-in">
      <h1 className="font-headline text-5xl uppercase tracking-[0.04em] mb-4">
        Rollout & Observability
      </h1>
      <p className="font-body text-lg text-silver mb-12">
        Feature flags, monitoring strategy, and gradual deployment plan
      </p>

      <Section title="Feature Flag Architecture">
        <div className="bg-white space-y-6">
          <p className="font-body text-sm text-ink mb-4">
            Personalization is controlled via a multi-level feature flag system that allows 
            fine-grained control over rollout and instant kill switches.
          </p>

          <div className="border border-mist p-6 rounded pattern-grid">
            <h3 className="font-body font-bold text-sm uppercase mb-4">Flag Hierarchy</h3>
            <div className="bg-white p-4 space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-ink text-white flex items-center justify-center flex-shrink-0 font-body text-xs">
                  L1
                </div>
                <div>
                  <p className="font-body font-bold text-sm mb-1">Global Kill Switch</p>
                  <p className="font-body text-xs text-silver">
                    <code className="bg-cloud px-1">PERSONALIZATION_ENABLED=true/false</code>
                    <br />
                    Environment variable. Disables all personalization system-wide. Used for emergencies.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-ink text-white flex items-center justify-center flex-shrink-0 font-body text-xs">
                  L2
                </div>
                <div>
                  <p className="font-body font-bold text-sm mb-1">Per-Tenant Flag</p>
                  <p className="font-body text-xs text-silver">
                    <code className="bg-cloud px-1">tenant_configs.personalization_enabled</code>
                    <br />
                    Database configuration. Allows selective enablement per tenant. Can be toggled via CMS.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-ink text-white flex items-center justify-center flex-shrink-0 font-body text-xs">
                  L3
                </div>
                <div>
                  <p className="font-body font-bold text-sm mb-1">Percentage Rollout</p>
                  <p className="font-body text-xs text-silver">
                    <code className="bg-cloud px-1">tenant_configs.rollout_percentage=0-100</code>
                    <br />
                    Gradual rollout within a tenant. Hash user_id to determine eligibility. Allows A/B testing.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-body font-bold text-sm uppercase mb-3">Flag Evaluation Logic</h3>
            <CodeBlock 
              code={`function shouldPersonalize(tenantId, userId) {
  // L1: Global kill switch
  if (!env.PERSONALIZATION_ENABLED) {
    return false;
  }
  
  // L2: Tenant-specific flag
  const tenantConfig = await getTenantConfig(tenantId);
  if (!tenantConfig.personalization_enabled) {
    return false;
  }
  
  // L3: Percentage rollout
  const userHash = hashUserId(userId);
  const userPercentile = (userHash % 100);
  if (userPercentile >= tenantConfig.rollout_percentage) {
    return false;
  }
  
  return true; // All checks passed
}`}
            />
          </div>
        </div>
      </Section>

      <Section title="Gradual Rollout Plan">
        <div className="bg-white space-y-4">
          <div className="border-l-4 border-ink pl-4 bg-cloud p-4">
            <h3 className="font-body font-bold text-sm uppercase mb-2">Phase 1: Internal Testing (Week 1)</h3>
            <ul className="font-body text-xs text-silver space-y-1">
              <li>• Enable for 1-2 internal test tenants</li>
              <li>• rollout_percentage=100 (all users)</li>
              <li>• Monitor latency, error rates, cache performance</li>
              <li>• Validate data pipeline and signal accuracy</li>
              <li>• Goal: Identify critical bugs, performance issues</li>
            </ul>
          </div>

          <div className="border-l-4 border-ink pl-4 bg-cloud p-4">
            <h3 className="font-body font-bold text-sm uppercase mb-2">Phase 2: Beta Tenants (Week 2-3)</h3>
            <ul className="font-body text-xs text-silver space-y-1">
              <li>• Enable for 5-10 volunteer beta tenants</li>
              <li>• rollout_percentage=50 (A/B test)</li>
              <li>• Compare engagement metrics: CTR, completion rate, session length</li>
              <li>• Collect qualitative feedback from tenant partners</li>
              <li>• Goal: Validate business value, gather UX feedback</li>
            </ul>
          </div>

          <div className="border-l-4 border-ink pl-4 bg-cloud p-4">
            <h3 className="font-body font-bold text-sm uppercase mb-2">Phase 3: Gradual Expansion (Week 4-6)</h3>
            <ul className="font-body text-xs text-silver space-y-1">
              <li>• Enable for 25% of tenants (30 tenants)</li>
              <li>• rollout_percentage=100 for enabled tenants</li>
              <li>• Monitor system load, database performance</li>
              <li>• Scale infrastructure as needed (add Redis nodes, DB replicas)</li>
              <li>• Goal: Stress test at moderate scale</li>
            </ul>
          </div>

          <div className="border-l-4 border-ink pl-4 bg-cloud p-4">
            <h3 className="font-body font-bold text-sm uppercase mb-2">Phase 4: Full Rollout (Week 7-8)</h3>
            <ul className="font-body text-xs text-silver space-y-1">
              <li>• Enable for all 120 tenants</li>
              <li>• rollout_percentage=100</li>
              <li>• Monitor closely for first 48 hours</li>
              <li>• Keep global kill switch ready</li>
              <li>• Goal: Achieve stable 3k RPS with p95 &lt; 250ms</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section title="Kill Switch Procedure">
        <div className="bg-white space-y-4">
          <div className="border border-mist p-4 rounded bg-cloud">
            <h3 className="font-body font-bold text-sm uppercase mb-3">When to Activate</h3>
            <ul className="font-body text-xs text-silver space-y-1">
              <li>• p99 latency exceeds 1000ms for 5+ minutes</li>
              <li>• Error rate exceeds 1% for any endpoint</li>
              <li>• Database or Redis cluster experiencing failures</li>
              <li>• Significant drop in engagement metrics (&gt;20%)</li>
              <li>• Security incident requiring immediate isolation</li>
            </ul>
          </div>

          <div className="border border-mist p-4 rounded">
            <h3 className="font-body font-bold text-sm uppercase mb-3">Activation Steps</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="font-mono text-xs bg-cloud px-2 py-1 rounded">1</span>
                <p className="font-body text-xs text-silver">
                  Set <code className="bg-cloud px-1">PERSONALIZATION_ENABLED=false</code> in environment config
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-mono text-xs bg-cloud px-2 py-1 rounded">2</span>
                <p className="font-body text-xs text-silver">
                  Restart API instances (or wait for config hot-reload ~30 seconds)
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-mono text-xs bg-cloud px-2 py-1 rounded">3</span>
                <p className="font-body text-xs text-silver">
                  Verify all traffic routes to non-personalized feed endpoint
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-mono text-xs bg-cloud px-2 py-1 rounded">4</span>
                <p className="font-body text-xs text-silver">
                  Investigate root cause while system operates in safe mode
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-mono text-xs bg-cloud px-2 py-1 rounded">5</span>
                <p className="font-body text-xs text-silver">
                  Re-enable gradually starting with single test tenant
                </p>
              </div>
            </div>
          </div>

          <div className="border border-mist p-4 rounded bg-cloud">
            <h3 className="font-body font-bold text-sm uppercase mb-3">Fallback Behavior</h3>
            <p className="font-body text-xs text-silver mb-2">
              When personalization is disabled, the system automatically falls back to editorial curation:
            </p>
            <ul className="font-body text-xs text-silver space-y-1">
              <li>• Videos sorted by editorial_boost DESC, created_at DESC</li>
              <li>• No user signals queried (reduces database load)</li>
              <li>• Cache TTL extended to 5 minutes (higher reuse)</li>
              <li>• Response time drops to ~30ms (vs ~150ms personalized)</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section title="Key Metrics & Dashboards" pattern="dots">
        <div className="bg-white space-y-6">
          <div>
            <h3 className="font-body font-bold text-sm uppercase mb-4">Performance Metrics</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="border border-mist p-4 rounded">
                <p className="font-body font-bold text-xs uppercase mb-2">Latency</p>
                <ul className="font-body text-xs text-silver space-y-1">
                  <li>• p50, p95, p99 response times</li>
                  <li>• Target: p95 &lt; 250ms</li>
                  <li>• Alert: p95 &gt; 300ms for 5 min</li>
                </ul>
              </div>
              <div className="border border-mist p-4 rounded">
                <p className="font-body font-bold text-xs uppercase mb-2">Throughput</p>
                <ul className="font-body text-xs text-silver space-y-1">
                  <li>• Requests per second</li>
                  <li>• Target: Support 3k RPS peak</li>
                  <li>• Alert: RPS &gt; 3.5k (capacity risk)</li>
                </ul>
              </div>
              <div className="border border-mist p-4 rounded">
                <p className="font-body font-bold text-xs uppercase mb-2">Error Rate</p>
                <ul className="font-body text-xs text-silver space-y-1">
                  <li>• 5xx errors per minute</li>
                  <li>• Target: &lt; 0.1%</li>
                  <li>• Alert: &gt; 1% for 2 min</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-body font-bold text-sm uppercase mb-4">System Health Metrics</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="border border-mist p-4 rounded">
                <p className="font-body font-bold text-xs uppercase mb-2">Cache Performance</p>
                <ul className="font-body text-xs text-silver space-y-1">
                  <li>• Cache hit rate</li>
                  <li>• Target: &gt; 90%</li>
                  <li>• Redis latency (p99)</li>
                  <li>• Memory usage</li>
                </ul>
              </div>
              <div className="border border-mist p-4 rounded">
                <p className="font-body font-bold text-xs uppercase mb-2">Database Health</p>
                <ul className="font-body text-xs text-silver space-y-1">
                  <li>• Query latency (p95)</li>
                  <li>• Connection pool usage</li>
                  <li>• Slow query log</li>
                  <li>• Replication lag</li>
                </ul>
              </div>
              <div className="border border-mist p-4 rounded">
                <p className="font-body font-bold text-xs uppercase mb-2">Event Pipeline</p>
                <ul className="font-body text-xs text-silver space-y-1">
                  <li>• Kafka lag per partition</li>
                  <li>• Events processed/sec</li>
                  <li>• Processing errors</li>
                  <li>• Signal freshness</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-body font-bold text-sm uppercase mb-4">Business Metrics</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="border border-mist p-4 rounded">
                <p className="font-body font-bold text-xs uppercase mb-2">Adoption</p>
                <ul className="font-body text-xs text-silver space-y-1">
                  <li>• % tenants enabled</li>
                  <li>• % users receiving personalized feeds</li>
                  <li>• Feature usage trend</li>
                </ul>
              </div>
              <div className="border border-mist p-4 rounded">
                <p className="font-body font-bold text-xs uppercase mb-2">Engagement</p>
                <ul className="font-body text-xs text-silver space-y-1">
                  <li>• Click-through rate (CTR)</li>
                  <li>• Video completion rate</li>
                  <li>• Session length</li>
                  <li>• Personalized vs. non-personalized</li>
                </ul>
              </div>
              <div className="border border-mist p-4 rounded">
                <p className="font-body font-bold text-xs uppercase mb-2">Cold Start</p>
                <ul className="font-body text-xs text-silver space-y-1">
                  <li>• New user engagement</li>
                  <li>• Time to first personalized feed</li>
                  <li>• Default recommendations CTR</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section title="Alerting Strategy">
        <div className="bg-white space-y-4">
          <div className="border border-mist p-4 rounded">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-ink text-white px-2 py-1 font-body text-xs uppercase">Critical</span>
              <h3 className="font-body font-bold text-sm uppercase">Page On-Call Immediately</h3>
            </div>
            <ul className="font-body text-xs text-silver space-y-1">
              <li>• p99 latency &gt; 1000ms for 5 minutes</li>
              <li>• Error rate &gt; 5% for 2 minutes</li>
              <li>• Redis cluster down or &gt;90% memory usage</li>
              <li>• Database replication lag &gt; 60 seconds</li>
              <li>• Event pipeline stopped (no events for 10 minutes)</li>
            </ul>
          </div>

          <div className="border border-mist p-4 rounded">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-silver text-white px-2 py-1 font-body text-xs uppercase">Warning</span>
              <h3 className="font-body font-bold text-sm uppercase">Slack Notification</h3>
            </div>
            <ul className="font-body text-xs text-silver space-y-1">
              <li>• p95 latency &gt; 300ms for 5 minutes</li>
              <li>• Cache hit rate &lt; 80% for 10 minutes</li>
              <li>• Error rate &gt; 1% for 5 minutes</li>
              <li>• Kafka lag &gt; 10 minutes</li>
              <li>• Database connection pool &gt; 80% used</li>
            </ul>
          </div>

          <div className="border border-mist p-4 rounded bg-cloud">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-cloud border border-mist text-ink px-2 py-1 font-body text-xs uppercase">Info</span>
              <h3 className="font-body font-bold text-sm uppercase">Dashboard Only</h3>
            </div>
            <ul className="font-body text-xs text-silver space-y-1">
              <li>• p95 latency &gt; 250ms (tracked for trends)</li>
              <li>• Unusual traffic patterns (sudden 2x spike)</li>
              <li>• New slow queries detected</li>
              <li>• Feature flag changes</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section title="Logging & Debugging">
        <div className="bg-white space-y-4">
          <div className="border-l-2 border-ink pl-4">
            <h3 className="font-body font-bold text-sm uppercase mb-2">Structured Logging</h3>
            <p className="font-body text-xs text-silver mb-3">
              All logs are JSON-formatted with consistent fields for easy querying and analysis.
            </p>
            <CodeBlock 
              code={`{
  "timestamp": "2026-01-12T10:30:45.123Z",
  "level": "info",
  "service": "feed-api",
  "request_id": "req_abc123",
  "user_id_hash": "a3f7b2c9...",
  "tenant_id": "tenant1",
  "endpoint": "/v1/feed",
  "response_time_ms": 142,
  "cache_hit": false,
  "personalized": true,
  "video_count": 20,
  "ranking_time_ms": 45
}`}
            />
          </div>

          <div className="border-l-2 border-ink pl-4">
            <h3 className="font-body font-bold text-sm uppercase mb-2">Tracing</h3>
            <p className="font-body text-xs text-silver mb-2">
              Distributed tracing with unique request_id propagated through all services:
            </p>
            <ul className="font-body text-xs text-silver space-y-1">
              <li>• API Gateway → Feed Service → Cache → Database</li>
              <li>• Identify bottlenecks in request pipeline</li>
              <li>• Debug timeouts and cascading failures</li>
            </ul>
          </div>

          <div className="border-l-2 border-ink pl-4">
            <h3 className="font-body font-bold text-sm uppercase mb-2">Debug Mode</h3>
            <p className="font-body text-xs text-silver mb-2">
              Optional query parameter for detailed debugging information:
            </p>
            <CodeBlock 
              code={`GET /v1/feed?user_id=a3f7b2c9&tenant_id=tenant1&debug=true

Response includes:
- Detailed scoring breakdown per video
- Cache hit/miss per data source
- Query execution times
- Applied filters and weights
- Candidate pool size before/after ranking`}
            />
          </div>
        </div>
      </Section>
    </div>
  );
}
