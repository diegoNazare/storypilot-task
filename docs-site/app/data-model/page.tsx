import Section from "@/components/Section";
import CodeBlock from "@/components/CodeBlock";
import ERDFlow from "@/components/ERDFlow";

export default function DataModelPage() {
  return (
    <div className="max-w-6xl mx-auto px-8 py-16 page-fade-in">
      <h1 className="font-headline text-5xl uppercase tracking-[0.04em] mb-4">
        Data Model
      </h1>
      <p className="font-body text-lg text-silver mb-12">
        Database schemas, indexes, and retention policies
      </p>

      <Section title="videos" pattern="dots">
        <div className="bg-white p-4">
          <p className="font-body text-sm text-ink mb-6">
            Core table storing video content metadata for all tenants.
          </p>
          
          <CodeBlock 
            code={`CREATE TABLE videos (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id         VARCHAR(50) NOT NULL,
  title             VARCHAR(255) NOT NULL,
  description       TEXT,
  thumbnail_url     VARCHAR(500),
  video_url         VARCHAR(500) NOT NULL,
  duration_seconds  INTEGER NOT NULL,
  category          VARCHAR(50) NOT NULL,
  editorial_boost   FLOAT DEFAULT 1.0,
  maturity_rating   VARCHAR(20) DEFAULT 'general',
  geo_restrictions  JSONB,
  metadata          JSONB,
  created_at        TIMESTAMP DEFAULT NOW(),
  updated_at        TIMESTAMP DEFAULT NOW(),
  deleted_at        TIMESTAMP,
  
  CONSTRAINT videos_tenant_id_fkey 
    FOREIGN KEY (tenant_id) 
    REFERENCES tenants(id) 
    ON DELETE CASCADE
);

-- Indexes for performance
CREATE INDEX idx_videos_tenant_created 
  ON videos(tenant_id, created_at DESC) 
  WHERE deleted_at IS NULL;

CREATE INDEX idx_videos_category 
  ON videos(tenant_id, category) 
  WHERE deleted_at IS NULL;

CREATE INDEX idx_videos_editorial_boost 
  ON videos(editorial_boost DESC) 
  WHERE deleted_at IS NULL;`}
          />

          <div className="mt-6 space-y-3">
            <div className="border-l-2 border-ink pl-4">
              <h3 className="font-body font-bold text-xs uppercase mb-1">Key Fields</h3>
              <ul className="font-body text-xs text-silver space-y-1">
                <li><strong>editorial_boost:</strong> Multiplier set by CMS (1.0-2.0 range)</li>
                <li><strong>maturity_rating:</strong> Content filtering (general, teen, mature)</li>
                <li><strong>geo_restrictions:</strong> JSON array of allowed countries</li>
                <li><strong>metadata:</strong> Flexible JSON for creator info, tags, etc.</li>
              </ul>
            </div>

            <div className="border-l-2 border-ink pl-4">
              <h3 className="font-body font-bold text-xs uppercase mb-1">Index Strategy</h3>
              <ul className="font-body text-xs text-silver space-y-1">
                <li><strong>idx_videos_tenant_created:</strong> Fast recent video lookups per tenant</li>
                <li><strong>idx_videos_category:</strong> Category filtering optimization</li>
                <li><strong>Partial index:</strong> Excludes deleted videos (soft delete pattern)</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <Section title="user_signals" pattern="grid">
        <div className="bg-white p-4">
          <p className="font-body text-sm text-ink mb-6">
            Stores user interaction events for personalization. Auto-expires after 90 days.
          </p>
          
          <CodeBlock 
            code={`CREATE TABLE user_signals (
  id              BIGSERIAL PRIMARY KEY,
  user_id_hash    VARCHAR(64) NOT NULL,
  tenant_id       VARCHAR(50) NOT NULL,
  video_id        UUID NOT NULL,
  event_type      VARCHAR(20) NOT NULL,
  engagement_pct  FLOAT,
  timestamp       TIMESTAMP DEFAULT NOW(),
  demographics    JSONB,
  
  CONSTRAINT user_signals_video_fkey 
    FOREIGN KEY (video_id) 
    REFERENCES videos(id) 
    ON DELETE CASCADE,
    
  CONSTRAINT valid_event_types 
    CHECK (event_type IN ('view', 'complete', 'skip', 'like', 'share'))
);

-- Composite index for user signal lookups
CREATE INDEX idx_user_signals_user_time 
  ON user_signals(user_id_hash, timestamp DESC);

CREATE INDEX idx_user_signals_video 
  ON user_signals(video_id, timestamp DESC);

-- Partition by month for efficient data expiration
CREATE TABLE user_signals_2026_01 PARTITION OF user_signals
  FOR VALUES FROM ('2026-01-01') TO ('2026-02-01');

CREATE TABLE user_signals_2026_02 PARTITION OF user_signals
  FOR VALUES FROM ('2026-02-01') TO ('2026-03-01');

-- Auto-delete old partitions with cron job
-- DROP TABLE user_signals_2025_10; -- 90 days ago`}
          />

          <div className="mt-6 space-y-3">
            <div className="border-l-2 border-ink pl-4">
              <h3 className="font-body font-bold text-xs uppercase mb-1">Event Types</h3>
              <ul className="font-body text-xs text-silver space-y-1">
                <li><strong>view:</strong> User started watching (threshold: 3+ seconds)</li>
                <li><strong>complete:</strong> User watched &gt;80% of video</li>
                <li><strong>skip:</strong> User stopped watching before 20%</li>
                <li><strong>like:</strong> Explicit positive signal</li>
                <li><strong>share:</strong> Strong engagement indicator</li>
              </ul>
            </div>

            <div className="border-l-2 border-ink pl-4">
              <h3 className="font-body font-bold text-xs uppercase mb-1">Privacy & Retention</h3>
              <ul className="font-body text-xs text-silver space-y-1">
                <li><strong>user_id_hash:</strong> SHA-256 hash, never stores raw user IDs</li>
                <li><strong>90-day retention:</strong> Monthly partitions dropped automatically</li>
                <li><strong>No PII:</strong> Demographics are aggregated only (age_group, not age)</li>
              </ul>
            </div>

            <div className="border-l-2 border-ink pl-4">
              <h3 className="font-body font-bold text-xs uppercase mb-1">Partitioning Strategy</h3>
              <ul className="font-body text-xs text-silver space-y-1">
                <li>Monthly partitions for efficient data expiration</li>
                <li>Old partitions dropped instead of DELETE queries (much faster)</li>
                <li>Reduces table bloat and maintains consistent performance</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <Section title="tenant_configs" pattern="crosshatch">
        <div className="bg-white p-4">
          <p className="font-body text-sm text-ink mb-6">
            Per-tenant configuration for personalization weights and feature flags.
          </p>
          
          <CodeBlock 
            code={`CREATE TABLE tenant_configs (
  tenant_id                 VARCHAR(50) PRIMARY KEY,
  personalization_enabled   BOOLEAN DEFAULT true,
  personalization_weights   JSONB NOT NULL,
  content_filters           JSONB,
  rate_limit_rps            INTEGER DEFAULT 600,
  cache_ttl_seconds         INTEGER DEFAULT 60,
  created_at                TIMESTAMP DEFAULT NOW(),
  updated_at                TIMESTAMP DEFAULT NOW(),
  
  CONSTRAINT tenant_configs_tenant_fkey 
    FOREIGN KEY (tenant_id) 
    REFERENCES tenants(id) 
    ON DELETE CASCADE
);

-- Example personalization_weights JSON:
-- {
--   "watch_history": 0.5,
--   "engagement": 0.3,
--   "editorial": 0.2
-- }

-- Example content_filters JSON:
-- {
--   "max_maturity": "teen",
--   "excluded_categories": ["violent", "horror"],
--   "geo_allowed": ["US", "CA", "UK"]
-- }`}
          />

          <div className="mt-6 space-y-3">
            <div className="border-l-2 border-ink pl-4">
              <h3 className="font-body font-bold text-xs uppercase mb-1">Configuration Fields</h3>
              <ul className="font-body text-xs text-silver space-y-1">
                <li><strong>personalization_enabled:</strong> Master kill switch per tenant</li>
                <li><strong>personalization_weights:</strong> Customizable scoring coefficients</li>
                <li><strong>content_filters:</strong> Maturity, category, geo restrictions</li>
                <li><strong>rate_limit_rps:</strong> Per-tenant rate limit override</li>
              </ul>
            </div>

            <div className="border-l-2 border-ink pl-4">
              <h3 className="font-body font-bold text-xs uppercase mb-1">Weight Constraints</h3>
              <ul className="font-body text-xs text-silver space-y-1">
                <li>All weights must sum to 1.0 (validated by application layer)</li>
                <li>Default: watch_history=0.5, engagement=0.3, editorial=0.2</li>
                <li>Tenants can customize to emphasize different signals</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <Section title="tenants">
        <div className="bg-white p-4">
          <p className="font-body text-sm text-ink mb-6">
            Master table for tenant (host app) metadata.
          </p>
          
          <CodeBlock 
            code={`CREATE TABLE tenants (
  id              VARCHAR(50) PRIMARY KEY,
  name            VARCHAR(100) NOT NULL,
  api_key_hash    VARCHAR(64) NOT NULL UNIQUE,
  status          VARCHAR(20) DEFAULT 'active',
  tier            VARCHAR(20) DEFAULT 'standard',
  created_at      TIMESTAMP DEFAULT NOW(),
  updated_at      TIMESTAMP DEFAULT NOW(),
  
  CONSTRAINT valid_status 
    CHECK (status IN ('active', 'suspended', 'deleted')),
    
  CONSTRAINT valid_tier 
    CHECK (tier IN ('standard', 'premium', 'enterprise'))
);

CREATE INDEX idx_tenants_status 
  ON tenants(status) 
  WHERE status = 'active';`}
          />
        </div>
      </Section>

      <Section title="Entity Relationship Diagram">
        <div className="bg-white p-6">
          <p className="font-body text-sm mb-6 text-ink">
            Interactive diagram showing relationships between database tables. 
            Drag to pan and scroll to zoom.
          </p>
          
          <ERDFlow />

          <div className="mt-6 space-y-2">
            <p className="font-body text-xs font-bold uppercase mb-2">Relationships</p>
            <ul className="font-body text-xs text-silver space-y-1 pl-4">
              <li>• Each tenant has many videos (1:N)</li>
              <li>• Each tenant has one config (1:1)</li>
              <li>• Each video has many user signals (1:N)</li>
              <li>• Foreign keys enforce referential integrity</li>
              <li>• Cascade deletes clean up dependent records</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section title="Query Patterns & Performance">
        <div className="bg-white space-y-4">
          <div className="border border-mist p-4 rounded">
            <h3 className="font-body font-bold text-sm uppercase mb-3">Fetch User Signals</h3>
            <CodeBlock 
              code={`-- Retrieves last 30 days of user activity
SELECT video_id, event_type, engagement_pct, timestamp
FROM user_signals
WHERE user_id_hash = 'a3f7b2c9...'
  AND timestamp > NOW() - INTERVAL '30 days'
ORDER BY timestamp DESC
LIMIT 100;

-- Performance: ~5ms with idx_user_signals_user_time
-- Returns: User's recent viewing history for scoring`}
            />
          </div>

          <div className="border border-mist p-4 rounded">
            <h3 className="font-body font-bold text-sm uppercase mb-3">Fetch Video Candidates</h3>
            <CodeBlock 
              code={`-- Get recent videos for a tenant
SELECT id, title, category, editorial_boost, created_at
FROM videos
WHERE tenant_id = 'tenant1'
  AND deleted_at IS NULL
  AND created_at > NOW() - INTERVAL '30 days'
ORDER BY created_at DESC
LIMIT 1000;

-- Performance: ~15ms with idx_videos_tenant_created
-- Returns: Pool of videos to score and rank`}
            />
          </div>

          <div className="border border-mist p-4 rounded">
            <h3 className="font-body font-bold text-sm uppercase mb-3">Category Affinity Analysis</h3>
            <CodeBlock 
              code={`-- Calculate user's category preferences
SELECT v.category, 
       COUNT(*) as view_count,
       AVG(us.engagement_pct) as avg_engagement
FROM user_signals us
JOIN videos v ON us.video_id = v.id
WHERE us.user_id_hash = 'a3f7b2c9...'
  AND us.event_type IN ('view', 'complete')
  AND us.timestamp > NOW() - INTERVAL '30 days'
GROUP BY v.category
ORDER BY view_count DESC, avg_engagement DESC;

-- Performance: ~10ms with proper indexes
-- Used by: Ranking algorithm for category matching`}
            />
          </div>
        </div>
      </Section>

      <Section title="Data Retention & Cleanup">
        <div className="bg-white space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 border border-ink flex items-center justify-center flex-shrink-0 mt-1">
              <span className="font-body text-xs">1</span>
            </div>
            <div>
              <p className="font-body font-bold text-sm mb-1">90-Day User Signal Retention</p>
              <p className="font-body text-xs text-silver">
                Monthly partitions of user_signals table are automatically dropped after 90 days. 
                Scheduled job runs daily to check and remove expired partitions.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 border border-ink flex items-center justify-center flex-shrink-0 mt-1">
              <span className="font-body text-xs">2</span>
            </div>
            <div>
              <p className="font-body font-bold text-sm mb-1">Soft Delete Videos</p>
              <p className="font-body text-xs text-silver">
                Videos are soft-deleted (deleted_at timestamp) rather than hard-deleted to maintain 
                referential integrity with user_signals. Hard delete after user_signals expire.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 border border-ink flex items-center justify-center flex-shrink-0 mt-1">
              <span className="font-body text-xs">3</span>
            </div>
            <div>
              <p className="font-body font-bold text-sm mb-1">Vacuum & Analyze</p>
              <p className="font-body text-xs text-silver">
                PostgreSQL VACUUM and ANALYZE run weekly to reclaim space and update statistics for 
                optimal query planning. Critical for maintaining sub-250ms query performance.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
