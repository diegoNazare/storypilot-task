import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="page-fade-in">
      {/* Hero Section */}
      <div className="pattern-diagonal border-b border-mist">
        <div className="max-w-4xl mx-auto px-8 py-24">
          <h1 className="font-headline text-6xl uppercase tracking-[0.04em] mb-4">
            Storyteller
          </h1>
          <p className="font-headline text-3xl uppercase tracking-[0.04em] text-silver mb-8">
            Personalized Video Feeds
          </p>
          <p className="font-body text-lg text-ink max-w-2xl mb-8">
            A backend system design for delivering personalized video content at scale. 
            Built to handle 3,000 requests per second with sub-250ms latency while maintaining 
            privacy and multi-tenant flexibility.
          </p>
          <div className="flex gap-4">
            <Link 
              href="/architecture"
              className="inline-flex items-center gap-2 px-6 py-3 bg-ink text-white font-body text-sm uppercase tracking-wide hover:bg-opacity-90 transition-colors"
            >
              View Architecture <ArrowRight size={16} />
            </Link>
            <a 
              href="http://localhost:3001"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-ink text-ink font-body text-sm uppercase tracking-wide hover:bg-cloud transition-colors"
            >
              Try Demo API <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>

      {/* Problem & Solution */}
      <div className="max-w-4xl mx-auto px-8 py-16">
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="border border-mist p-6 rounded">
            <h2 className="font-headline text-2xl uppercase tracking-[0.04em] mb-4">
              The Problem
            </h2>
            <p className="font-body text-sm text-ink leading-relaxed">
              Traditional video feed platforms show the same content to every user. This leads 
              to low engagement, poor user experience, and missed opportunities for content 
              creators to reach their target audience.
            </p>
          </div>
          <div className="border border-mist p-6 rounded bg-cloud">
            <h2 className="font-headline text-2xl uppercase tracking-[0.04em] mb-4">
              The Solution
            </h2>
            <p className="font-body text-sm text-ink leading-relaxed">
              A personalization engine that analyzes user behavior (watch history, engagement) 
              and serves tailored content to each individual. Built with scalability, privacy, 
              and flexibility as core principles.
            </p>
          </div>
        </div>

        {/* Non-Negotiables */}
        <section className="mb-16">
          <h2 className="font-headline text-3xl uppercase tracking-[0.04em] mb-8 border-b border-mist pb-4">
            Non-Negotiable Constraints
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="border border-mist p-5 rounded">
              <h3 className="font-body font-bold text-sm uppercase mb-2">Scale</h3>
              <p className="font-body text-xs text-silver">
                Peak 3,000 RPS to feed endpoint
              </p>
              <p className="font-body text-xs text-silver">
                Average ~600 RPS
              </p>
            </div>
            
            <div className="border border-mist p-5 rounded">
              <h3 className="font-body font-bold text-sm uppercase mb-2">Latency</h3>
              <p className="font-body text-xs text-silver">
                p95 &lt; 250ms
              </p>
              <p className="font-body text-xs text-silver">
                p99 &lt; 600ms for 20-item feed
              </p>
            </div>
            
            <div className="border border-mist p-5 rounded">
              <h3 className="font-body font-bold text-sm uppercase mb-2">Freshness</h3>
              <p className="font-body text-xs text-silver">
                New content visible in ≤60s
              </p>
              <p className="font-body text-xs text-silver">
                User signals lag ≤5 minutes
              </p>
            </div>
            
            <div className="border border-mist p-5 rounded">
              <h3 className="font-body font-bold text-sm uppercase mb-2">Privacy</h3>
              <p className="font-body text-xs text-silver">
                Hashed user IDs only
              </p>
              <p className="font-body text-xs text-silver">
                90-day data retention
              </p>
            </div>
            
            <div className="border border-mist p-5 rounded">
              <h3 className="font-body font-bold text-sm uppercase mb-2">Multi-Tenant</h3>
              <p className="font-body text-xs text-silver">
                120 tenants supported
              </p>
              <p className="font-body text-xs text-silver">
                Per-tenant ranking weights
              </p>
            </div>
            
            <div className="border border-mist p-5 rounded">
              <h3 className="font-body font-bold text-sm uppercase mb-2">Rollout</h3>
              <p className="font-body text-xs text-silver">
                Feature flag control
              </p>
              <p className="font-body text-xs text-silver">
                Safe kill switch to fallback
              </p>
            </div>
          </div>
        </section>

        {/* Quick Navigation */}
        <section>
          <h2 className="font-headline text-3xl uppercase tracking-[0.04em] mb-8 border-b border-mist pb-4">
            Explore the Design
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/architecture" className="border border-mist p-6 rounded hover:bg-cloud transition-colors group">
              <h3 className="font-body font-bold text-sm uppercase mb-2 group-hover:underline">
                Architecture →
              </h3>
              <p className="font-body text-xs text-silver">
                System components, data flows, and caching strategy
              </p>
            </Link>
            
            <Link href="/api" className="border border-mist p-6 rounded hover:bg-cloud transition-colors group">
              <h3 className="font-body font-bold text-sm uppercase mb-2 group-hover:underline">
                API Contract →
              </h3>
              <p className="font-body text-xs text-silver">
                Endpoint specifications, request/response schemas, and examples
              </p>
            </Link>
            
            <Link href="/data-model" className="border border-mist p-6 rounded hover:bg-cloud transition-colors group">
              <h3 className="font-body font-bold text-sm uppercase mb-2 group-hover:underline">
                Data Model →
              </h3>
              <p className="font-body text-xs text-silver">
                Database schemas, indexes, and retention policies
              </p>
            </Link>
            
            <Link href="/implementation" className="border border-mist p-6 rounded hover:bg-cloud transition-colors group">
              <h3 className="font-body font-bold text-sm uppercase mb-2 group-hover:underline">
                Implementation →
              </h3>
              <p className="font-body text-xs text-silver">
                Technical decisions, trade-offs, and future improvements
              </p>
            </Link>
            
            <Link href="/rollout" className="border border-mist p-6 rounded hover:bg-cloud transition-colors group">
              <h3 className="font-body font-bold text-sm uppercase mb-2 group-hover:underline">
                Rollout & Observability →
              </h3>
              <p className="font-body text-xs text-silver">
                Feature flags, monitoring, and gradual deployment strategy
              </p>
            </Link>
            
            <Link href="/ai" className="border border-mist p-6 rounded hover:bg-cloud transition-colors group">
              <h3 className="font-body font-bold text-sm uppercase mb-2 group-hover:underline">
                AI Usage →
              </h3>
              <p className="font-body text-xs text-silver">
                How AI tools were used in this project and lessons learned
              </p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
