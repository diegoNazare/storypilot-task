import Section from "@/components/Section";
import CodeBlock from "@/components/CodeBlock";

export default function APIPage() {
  return (
    <div className="max-w-6xl mx-auto px-8 py-16 page-fade-in">
      <h1 className="font-headline text-5xl uppercase tracking-[0.04em] mb-4">
        API Contract
      </h1>
      <p className="font-body text-lg text-silver mb-12">
        Endpoint specifications, request/response schemas, and error handling
      </p>

      <Section title="GET /v1/feed">
        <div className="bg-white space-y-6">
          <p className="font-body text-sm text-ink">
            Primary endpoint for fetching personalized video feeds. Returns a ranked list of videos 
            tailored to the user's viewing history and engagement patterns.
          </p>

          <div>
            <h3 className="font-body font-bold text-sm uppercase mb-3">Request Parameters</h3>
            <div className="border border-mist rounded overflow-hidden">
              <table className="w-full">
                <thead className="bg-cloud">
                  <tr>
                    <th className="font-body text-xs uppercase p-3 text-left">Parameter</th>
                    <th className="font-body text-xs uppercase p-3 text-left">Type</th>
                    <th className="font-body text-xs uppercase p-3 text-left">Required</th>
                    <th className="font-body text-xs uppercase p-3 text-left">Description</th>
                  </tr>
                </thead>
                <tbody className="font-body text-sm">
                  <tr className="border-t border-mist">
                    <td className="p-3 font-mono text-xs">user_id</td>
                    <td className="p-3 text-xs">string</td>
                    <td className="p-3 text-xs">Yes</td>
                    <td className="p-3 text-xs text-silver">Hashed user identifier (SHA-256)</td>
                  </tr>
                  <tr className="border-t border-mist">
                    <td className="p-3 font-mono text-xs">tenant_id</td>
                    <td className="p-3 text-xs">string</td>
                    <td className="p-3 text-xs">Yes</td>
                    <td className="p-3 text-xs text-silver">Tenant identifier (host app)</td>
                  </tr>
                  <tr className="border-t border-mist">
                    <td className="p-3 font-mono text-xs">limit</td>
                    <td className="p-3 text-xs">integer</td>
                    <td className="p-3 text-xs">No</td>
                    <td className="p-3 text-xs text-silver">Number of videos (default: 20, max: 100)</td>
                  </tr>
                  <tr className="border-t border-mist">
                    <td className="p-3 font-mono text-xs">demographics</td>
                    <td className="p-3 text-xs">JSON</td>
                    <td className="p-3 text-xs">No</td>
                    <td className="p-3 text-xs text-silver">Optional demographic hints (age_group, interests)</td>
                  </tr>
                  <tr className="border-t border-mist">
                    <td className="p-3 font-mono text-xs">offset</td>
                    <td className="p-3 text-xs">integer</td>
                    <td className="p-3 text-xs">No</td>
                    <td className="p-3 text-xs text-silver">Pagination offset (default: 0)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="font-body font-bold text-sm uppercase mb-3">Example Request</h3>
            <CodeBlock 
              code={`curl -X GET "https://api.storyteller.com/v1/feed?user_id=a3f7b2c9d8e1f6a5&tenant_id=tenant1&limit=20" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`}
            />
          </div>

          <div>
            <h3 className="font-body font-bold text-sm uppercase mb-3">Success Response (200 OK)</h3>
            <CodeBlock 
              code={`{
  "user_id": "a3f7b2c9d8e1f6a5",
  "tenant_id": "tenant1",
  "personalized": true,
  "feed": [
    {
      "video_id": "vid_9k3m2l1a",
      "title": "Advanced Gaming Strategies",
      "thumbnail_url": "https://cdn.storyteller.com/thumbs/vid_9k3m2l1a.jpg",
      "duration_seconds": 180,
      "category": "gaming",
      "score": 0.89,
      "editorial_boost": 1.2,
      "created_at": "2026-01-10T14:30:00Z",
      "metadata": {
        "creator": "ProGamer123",
        "views": 125000,
        "likes": 8500
      },
      "ranking_reason": "High watch history match + editorial boost"
    },
    {
      "video_id": "vid_7j8k5n2b",
      "title": "eSports Tournament Highlights",
      "thumbnail_url": "https://cdn.storyteller.com/thumbs/vid_7j8k5n2b.jpg",
      "duration_seconds": 240,
      "category": "gaming",
      "score": 0.82,
      "editorial_boost": 1.0,
      "created_at": "2026-01-11T09:15:00Z",
      "metadata": {
        "creator": "ESportsDaily",
        "views": 250000,
        "likes": 15000
      },
      "ranking_reason": "Category affinity match"
    }
  ],
  "metadata": {
    "total_candidates": 1247,
    "response_time_ms": 142,
    "cache_hit": false,
    "algorithm_version": "v1.2.0",
    "ranking_weights": {
      "watch_history": 0.5,
      "engagement": 0.3,
      "editorial": 0.2
    }
  },
  "pagination": {
    "limit": 20,
    "offset": 0,
    "has_more": true
  }
}`}
            />
          </div>
        </div>
      </Section>

      <Section title="GET /v1/feed/non-personalized">
        <div className="bg-white space-y-6">
          <p className="font-body text-sm text-ink">
            Fallback endpoint that returns editorial-curated content without personalization. Used when 
            feature flag is disabled or as a kill switch fallback.
          </p>

          <div>
            <h3 className="font-body font-bold text-sm uppercase mb-3">Request Parameters</h3>
            <div className="border border-mist rounded overflow-hidden">
              <table className="w-full">
                <thead className="bg-cloud">
                  <tr>
                    <th className="font-body text-xs uppercase p-3 text-left">Parameter</th>
                    <th className="font-body text-xs uppercase p-3 text-left">Type</th>
                    <th className="font-body text-xs uppercase p-3 text-left">Required</th>
                    <th className="font-body text-xs uppercase p-3 text-left">Description</th>
                  </tr>
                </thead>
                <tbody className="font-body text-sm">
                  <tr className="border-t border-mist">
                    <td className="p-3 font-mono text-xs">tenant_id</td>
                    <td className="p-3 text-xs">string</td>
                    <td className="p-3 text-xs">Yes</td>
                    <td className="p-3 text-xs text-silver">Tenant identifier</td>
                  </tr>
                  <tr className="border-t border-mist">
                    <td className="p-3 font-mono text-xs">limit</td>
                    <td className="p-3 text-xs">integer</td>
                    <td className="p-3 text-xs">No</td>
                    <td className="p-3 text-xs text-silver">Number of videos (default: 20)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="font-body font-bold text-sm uppercase mb-3">Example Response</h3>
            <CodeBlock 
              code={`{
  "tenant_id": "tenant1",
  "personalized": false,
  "feed": [
    {
      "video_id": "vid_1a2b3c4d",
      "title": "Editor's Pick: Top Video Today",
      "score": 1.5,
      "editorial_boost": 1.5
    }
  ],
  "metadata": {
    "response_time_ms": 45,
    "cache_hit": true,
    "algorithm_version": "editorial_only"
  }
}`}
            />
          </div>
        </div>
      </Section>

      <Section title="Error Responses">
        <div className="bg-white space-y-4">
          <div className="border border-mist p-4 rounded">
            <div className="flex items-start gap-3 mb-3">
              <span className="font-mono text-xs bg-cloud px-2 py-1 rounded">400</span>
              <h3 className="font-body font-bold text-sm uppercase">Bad Request</h3>
            </div>
            <p className="font-body text-xs text-silver mb-3">
              Missing required parameters or invalid parameter values.
            </p>
            <CodeBlock 
              code={`{
  "error": "Bad Request",
  "message": "Missing required parameter: user_id",
  "code": "MISSING_PARAMETER"
}`}
            />
          </div>

          <div className="border border-mist p-4 rounded">
            <div className="flex items-start gap-3 mb-3">
              <span className="font-mono text-xs bg-cloud px-2 py-1 rounded">404</span>
              <h3 className="font-body font-bold text-sm uppercase">Not Found</h3>
            </div>
            <p className="font-body text-xs text-silver mb-3">
              Tenant ID not found or user has no accessible content.
            </p>
            <CodeBlock 
              code={`{
  "error": "Not Found",
  "message": "Tenant not found: tenant999",
  "code": "TENANT_NOT_FOUND"
}`}
            />
          </div>

          <div className="border border-mist p-4 rounded">
            <div className="flex items-start gap-3 mb-3">
              <span className="font-mono text-xs bg-cloud px-2 py-1 rounded">429</span>
              <h3 className="font-body font-bold text-sm uppercase">Too Many Requests</h3>
            </div>
            <p className="font-body text-xs text-silver mb-3">
              Rate limit exceeded (more than 3000 RPS).
            </p>
            <CodeBlock 
              code={`{
  "error": "Too Many Requests",
  "message": "Rate limit exceeded. Try again in 60 seconds.",
  "code": "RATE_LIMIT_EXCEEDED",
  "retry_after_seconds": 60
}`}
            />
          </div>

          <div className="border border-mist p-4 rounded">
            <div className="flex items-start gap-3 mb-3">
              <span className="font-mono text-xs bg-cloud px-2 py-1 rounded">500</span>
              <h3 className="font-body font-bold text-sm uppercase">Internal Server Error</h3>
            </div>
            <p className="font-body text-xs text-silver mb-3">
              Unexpected server error. System will automatically fall back to non-personalized feed.
            </p>
            <CodeBlock 
              code={`{
  "error": "Internal Server Error",
  "message": "An unexpected error occurred",
  "code": "INTERNAL_ERROR",
  "fallback_available": true
}`}
            />
          </div>

          <div className="border border-mist p-4 rounded">
            <div className="flex items-start gap-3 mb-3">
              <span className="font-mono text-xs bg-cloud px-2 py-1 rounded">503</span>
              <h3 className="font-body font-bold text-sm uppercase">Service Unavailable</h3>
            </div>
            <p className="font-body text-xs text-silver mb-3">
              Service temporarily degraded. Kill switch activated or maintenance mode.
            </p>
            <CodeBlock 
              code={`{
  "error": "Service Unavailable",
  "message": "Personalization service degraded. Using fallback.",
  "code": "SERVICE_DEGRADED",
  "fallback_enabled": true
}`}
            />
          </div>
        </div>
      </Section>

      <Section title="Caching Headers">
        <div className="bg-white space-y-4">
          <p className="font-body text-sm text-ink mb-4">
            Responses include standard HTTP caching headers to enable CDN and client-side caching.
          </p>

          <div className="border border-mist rounded overflow-hidden">
            <table className="w-full">
              <thead className="bg-cloud">
                <tr>
                  <th className="font-body text-xs uppercase p-3 text-left">Header</th>
                  <th className="font-body text-xs uppercase p-3 text-left">Value</th>
                  <th className="font-body text-xs uppercase p-3 text-left">Purpose</th>
                </tr>
              </thead>
              <tbody className="font-body text-sm">
                <tr className="border-t border-mist">
                  <td className="p-3 font-mono text-xs">Cache-Control</td>
                  <td className="p-3 font-mono text-xs">max-age=60, private</td>
                  <td className="p-3 text-xs text-silver">Cache for 60s, user-specific</td>
                </tr>
                <tr className="border-t border-mist">
                  <td className="p-3 font-mono text-xs">ETag</td>
                  <td className="p-3 font-mono text-xs">"a3f7b2c9d8e1f6a5"</td>
                  <td className="p-3 text-xs text-silver">Conditional requests</td>
                </tr>
                <tr className="border-t border-mist">
                  <td className="p-3 font-mono text-xs">Vary</td>
                  <td className="p-3 font-mono text-xs">Accept-Encoding</td>
                  <td className="p-3 text-xs text-silver">Vary by encoding</td>
                </tr>
                <tr className="border-t border-mist">
                  <td className="p-3 font-mono text-xs">X-Cache-Status</td>
                  <td className="p-3 font-mono text-xs">HIT | MISS</td>
                  <td className="p-3 text-xs text-silver">Debug cache performance</td>
                </tr>
                <tr className="border-t border-mist">
                  <td className="p-3 font-mono text-xs">X-Response-Time</td>
                  <td className="p-3 font-mono text-xs">142ms</td>
                  <td className="p-3 text-xs text-silver">Monitor latency</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      <Section title="Rate Limiting">
        <div className="bg-white space-y-3">
          <p className="font-body text-sm text-ink mb-4">
            Rate limits are enforced per tenant to ensure fair usage and system stability.
          </p>

          <div className="border-l-2 border-ink pl-4">
            <h3 className="font-body font-bold text-sm uppercase mb-2">Per-Tenant Limits</h3>
            <ul className="font-body text-xs text-silver space-y-1">
              <li>• 3,000 requests per second (peak burst)</li>
              <li>• 600 requests per second (sustained average)</li>
              <li>• Exceeded requests return 429 status code</li>
              <li>• Rate limit resets every 60 seconds</li>
            </ul>
          </div>

          <div className="border-l-2 border-ink pl-4">
            <h3 className="font-body font-bold text-sm uppercase mb-2">Response Headers</h3>
            <CodeBlock 
              code={`X-RateLimit-Limit: 3000
X-RateLimit-Remaining: 2847
X-RateLimit-Reset: 1704985200`}
            />
          </div>
        </div>
      </Section>
    </div>
  );
}
