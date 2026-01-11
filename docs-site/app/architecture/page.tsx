import Section from "@/components/Section";
import ArchitectureFlow from "@/components/ArchitectureFlow";

export default function ArchitecturePage() {
  return (
    <div className="max-w-6xl mx-auto px-8 py-16 page-fade-in">
      <h1 className="font-headline text-5xl uppercase tracking-[0.04em] mb-4">
        Architecture
      </h1>
      <p className="font-body text-lg text-silver mb-12">
        System design and component overview for personalized video feeds
      </p>

      <Section title="Interactive Architecture Diagram">
        <div className="bg-white p-6">
          <p className="font-body text-sm mb-6 text-ink">
            The system is designed around a request-driven architecture with intelligent caching 
            and asynchronous event processing to meet stringent latency and scale requirements.
            Drag to pan, scroll to zoom, and explore the interactive diagram below.
          </p>
          
          <ArchitectureFlow />
          
          <div className="mt-6 p-4 bg-cloud border border-mist rounded">
            <p className="font-body text-xs font-bold uppercase mb-2">Legend</p>
            <div className="grid grid-cols-2 gap-2 font-body text-xs">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-ink" style={{ backgroundColor: '#FAFAFA' }}></div>
                <span>Primary Service</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-ink" style={{ backgroundColor: '#E5E5E5' }}></div>
                <span>Core Logic</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-0.5" style={{ backgroundColor: '#1A1A1A' }}></div>
                <span>Sync Flow (solid)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  <div className="w-1 h-0.5" style={{ backgroundColor: '#8A8A8A' }}></div>
                  <div className="w-0.5 h-0.5"></div>
                  <div className="w-1 h-0.5" style={{ backgroundColor: '#8A8A8A' }}></div>
                </div>
                <span>Async Flow (dashed)</span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section title="Component Descriptions">
        <div className="space-y-6 bg-white">
          <div className="border-l-2 border-ink pl-4">
            <h3 className="font-body font-bold text-sm uppercase mb-2">Mobile SDK</h3>
            <p className="font-body text-sm text-silver">
              Embedded in host applications (fitness apps, cooking apps, etc.). Sends hashed user IDs 
              and optional demographic hints. Tracks user events (views, completions, skips, likes) 
              and sends them asynchronously to the event pipeline.
            </p>
          </div>

          <div className="border-l-2 border-ink pl-4">
            <h3 className="font-body font-bold text-sm uppercase mb-2">API Gateway</h3>
            <p className="font-body text-sm text-silver">
              Entry point for all feed requests. Performs rate limiting (3k RPS peak), request validation, 
              and feature flag checks. Routes to personalized or non-personalized service based on 
              tenant configuration and feature flags.
            </p>
          </div>

          <div className="border-l-2 border-ink pl-4">
            <h3 className="font-body font-bold text-sm uppercase mb-2">Personalized Feed Service</h3>
            <p className="font-body text-sm text-silver">
              Core personalization logic. Fetches user signals, tenant configs, and video metadata. 
              Calls ranking engine to score and sort videos. Returns personalized feed with metadata 
              explaining ranking reasons.
            </p>
          </div>

          <div className="border-l-2 border-ink pl-4">
            <h3 className="font-body font-bold text-sm uppercase mb-2">Cache Layer (Redis)</h3>
            <p className="font-body text-sm text-silver">
              High-performance caching for frequently accessed data. User signals cached for 5 minutes, 
              tenant configs cached for 15 minutes, video metadata cached for 60 seconds. Cache keys 
              include tenant_id and user_id_hash for isolation.
            </p>
          </div>

          <div className="border-l-2 border-ink pl-4">
            <h3 className="font-body font-bold text-sm uppercase mb-2">Ranking Engine</h3>
            <p className="font-body text-sm text-silver">
              Scoring algorithm that combines multiple signals: watch history match (category affinity), 
              engagement patterns (completion rate), editorial boosts (CMS-set), and demographic hints. 
              Uses tenant-specific weights to calculate final scores.
            </p>
          </div>

          <div className="border-l-2 border-ink pl-4">
            <h3 className="font-body font-bold text-sm uppercase mb-2">Event Pipeline</h3>
            <p className="font-body text-sm text-silver">
              Asynchronous event processing using Kafka or SQS. Batches user events and writes to 
              user_signals database. 5-minute lag is acceptable, allowing for efficient batching and 
              reducing write load on the database.
            </p>
          </div>

          <div className="border-l-2 border-ink pl-4">
            <h3 className="font-body font-bold text-sm uppercase mb-2">Databases</h3>
            <p className="font-body text-sm text-silver">
              PostgreSQL for videos, user_signals, and tenant_configs. Videos table indexed by 
              (tenant_id, created_at) for fast lookups. User_signals indexed by (user_id_hash, timestamp) 
              with automatic 90-day retention via TTL or scheduled jobs.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Data Flow: Feed Request" pattern="dots">
        <div className="bg-white p-4 space-y-4">
          <div className="border border-mist p-4 rounded">
            <p className="font-body font-bold text-xs uppercase mb-2">Step 1: Request Arrives</p>
            <p className="font-body text-xs text-silver">
              SDK sends GET /v1/feed?user_id=hash_abc&tenant_id=tenant1&limit=20
            </p>
          </div>

          <div className="border border-mist p-4 rounded">
            <p className="font-body font-bold text-xs uppercase mb-2">Step 2: Feature Flag Check</p>
            <p className="font-body text-xs text-silver">
              API Gateway checks if personalization is enabled for tenant1. If disabled, route to 
              non-personalized feed (editorial order only).
            </p>
          </div>

          <div className="border border-mist p-4 rounded">
            <p className="font-body font-bold text-xs uppercase mb-2">Step 3: Cache Lookup</p>
            <p className="font-body text-xs text-silver">
              Check Redis for cached feed result (key: feed:tenant1:hash_abc). If hit, return 
              immediately (~5ms). Cache miss continues to step 4.
            </p>
          </div>

          <div className="border border-mist p-4 rounded">
            <p className="font-body font-bold text-xs uppercase mb-2">Step 4: Fetch User Signals</p>
            <p className="font-body text-xs text-silver">
              Query user_signals table for hash_abc's recent activity (last 30 days). Cache miss 
              queries database (~20ms), cache hit from Redis (~2ms).
            </p>
          </div>

          <div className="border border-mist p-4 rounded">
            <p className="font-body font-bold text-xs uppercase mb-2">Step 5: Fetch Tenant Config</p>
            <p className="font-body text-xs text-silver">
              Get tenant1's personalization weights (watch_history: 0.5, engagement: 0.3, editorial: 0.2). 
              Cached for 15 minutes.
            </p>
          </div>

          <div className="border border-mist p-4 rounded">
            <p className="font-body font-bold text-xs uppercase mb-2">Step 6: Fetch Video Candidates</p>
            <p className="font-body text-xs text-silver">
              Query videos table for tenant1's active videos (last 30 days, not deleted). Apply 
              maturity filters and geo-restrictions (~30ms with proper indexes).
            </p>
          </div>

          <div className="border border-mist p-4 rounded">
            <p className="font-body font-bold text-xs uppercase mb-2">Step 7: Ranking</p>
            <p className="font-body text-xs text-silver">
              Ranking engine scores each video based on user signals and tenant weights. Sorts by 
              score descending, takes top 20 (~50ms for 1000 candidates).
            </p>
          </div>

          <div className="border border-mist p-4 rounded">
            <p className="font-body font-bold text-xs uppercase mb-2">Step 8: Cache & Return</p>
            <p className="font-body text-xs text-silver">
              Store result in Redis with 60-second TTL. Return JSON response with video list and 
              metadata. Total time: ~150ms (well under 250ms p95 target).
            </p>
          </div>
        </div>
      </Section>

      <Section title="Caching Strategy">
        <div className="bg-white space-y-4">
          <div className="border border-mist p-4 rounded">
            <h3 className="font-body font-bold text-sm uppercase mb-2">Feed Results</h3>
            <p className="font-body text-xs text-silver mb-2">
              <strong>TTL:</strong> 60 seconds | <strong>Key:</strong> feed:&#123;tenant_id&#125;:&#123;user_id_hash&#125;
            </p>
            <p className="font-body text-xs text-silver">
              Short TTL ensures content freshness (≤60s requirement). Handles most traffic at peak, 
              reducing database load by ~95%.
            </p>
          </div>

          <div className="border border-mist p-4 rounded">
            <h3 className="font-body font-bold text-sm uppercase mb-2">User Signals</h3>
            <p className="font-body text-xs text-silver mb-2">
              <strong>TTL:</strong> 5 minutes | <strong>Key:</strong> signals:&#123;user_id_hash&#125;
            </p>
            <p className="font-body text-xs text-silver">
              Matches the acceptable lag for user signal updates. Balances freshness with cache efficiency.
            </p>
          </div>

          <div className="border border-mist p-4 rounded">
            <h3 className="font-body font-bold text-sm uppercase mb-2">Tenant Configs</h3>
            <p className="font-body text-xs text-silver mb-2">
              <strong>TTL:</strong> 15 minutes | <strong>Key:</strong> config:&#123;tenant_id&#125;
            </p>
            <p className="font-body text-xs text-silver">
              Infrequently changed, so longer TTL is acceptable. Reduces config lookup overhead.
            </p>
          </div>

          <div className="border border-mist p-4 rounded">
            <h3 className="font-body font-bold text-sm uppercase mb-2">Video Metadata</h3>
            <p className="font-body text-xs text-silver mb-2">
              <strong>TTL:</strong> 60 seconds | <strong>Key:</strong> video:&#123;video_id&#125;
            </p>
            <p className="font-body text-xs text-silver">
              Ensures new videos appear quickly. Individual video caching reduces repeated queries.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Scalability Considerations">
        <div className="bg-white space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 border border-ink flex items-center justify-center flex-shrink-0 mt-1">
              <span className="font-body text-xs">1</span>
            </div>
            <p className="font-body text-sm text-ink">
              <strong>Horizontal Scaling:</strong> Feed service is stateless and can scale horizontally 
              behind a load balancer. Each instance connects to shared Redis and PostgreSQL.
            </p>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 border border-ink flex items-center justify-center flex-shrink-0 mt-1">
              <span className="font-body text-xs">2</span>
            </div>
            <p className="font-body text-sm text-ink">
              <strong>Database Sharding:</strong> User_signals table can be sharded by user_id_hash 
              for write scalability. Videos table sharded by tenant_id for isolation.
            </p>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 border border-ink flex items-center justify-center flex-shrink-0 mt-1">
              <span className="font-body text-xs">3</span>
            </div>
            <p className="font-body text-sm text-ink">
              <strong>Redis Cluster:</strong> Redis can run in cluster mode for high availability and 
              additional capacity. Separate read replicas for hot data.
            </p>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 border border-ink flex items-center justify-center flex-shrink-0 mt-1">
              <span className="font-body text-xs">4</span>
            </div>
            <p className="font-body text-sm text-ink">
              <strong>CDN Edge Caching:</strong> For popular content, CDN can cache feed responses at 
              the edge (30-second TTL), further reducing backend load.
            </p>
          </div>
        </div>
      </Section>
    </div>
  );
}
