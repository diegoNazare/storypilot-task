import Section from "@/components/Section";

export default function AIPage() {
  return (
    <div className="max-w-6xl mx-auto px-8 py-16 page-fade-in">
      <h1 className="font-headline text-5xl uppercase tracking-[0.04em] mb-4">
        AI Usage
      </h1>
      <p className="font-body text-lg text-silver mb-12">
        How AI tools were used in this project and lessons learned
      </p>

      <Section title="AI Tools Used">
        <div className="bg-white space-y-4">
          <div className="border border-mist p-6 rounded">
            <h3 className="font-body font-bold text-sm uppercase mb-2">Claude 3.5 Sonnet (via Cursor)</h3>
            <p className="font-body text-xs text-silver mb-3">
              Primary AI assistant for this entire project. Used through Cursor AI IDE with context 
              awareness of the codebase.
            </p>
            <div className="border-l-2 border-ink pl-4">
              <p className="font-body text-xs font-bold mb-1">Usage Breakdown:</p>
              <ul className="font-body text-xs text-silver space-y-1">
                <li>• System design discussions and architecture decisions (~20% of time)</li>
                <li>• Code generation for prototype API and documentation site (~60% of time)</li>
                <li>• Documentation writing and structuring (~15% of time)</li>
                <li>• Debugging and refinement (~5% of time)</li>
              </ul>
            </div>
          </div>

          <div className="border border-mist p-6 rounded bg-cloud">
            <h3 className="font-body font-bold text-sm uppercase mb-2">Approach</h3>
            <p className="font-body text-xs text-silver">
              Started with exploratory conversation to understand requirements and constraints. 
              AI helped clarify technical terms (CMS, RPS, p95 latency) and validate understanding 
              before implementation began. Iterative approach: design → implement → review → refine.
            </p>
          </div>
        </div>
      </Section>

      <Section title="What Worked Well" pattern="dots">
        <div className="bg-white space-y-4">
          <div className="border-l-4 border-ink pl-4">
            <h3 className="font-body font-bold text-sm uppercase mb-2">1. Rapid Prototyping</h3>
            <p className="font-body text-xs text-silver mb-2">
              AI excelled at generating boilerplate code and project structure. What would typically 
              take 2-3 hours of setup was completed in minutes.
            </p>
            <p className="font-body text-xs text-silver">
              <strong>Example:</strong> The entire Next.js documentation site structure, navigation 
              component, and reusable UI components were generated quickly with consistent styling.
            </p>
          </div>

          <div className="border-l-4 border-ink pl-4">
            <h3 className="font-body font-bold text-sm uppercase mb-2">2. Design Exploration</h3>
            <p className="font-body text-xs text-silver mb-2">
              AI facilitated thinking through trade-offs without needing to research each option 
              extensively. Presented pros/cons for different approaches (weighted scoring vs. ML, 
              PostgreSQL vs. NoSQL, sync vs. async event processing).
            </p>
            <p className="font-body text-xs text-silver">
              <strong>Value:</strong> Accelerated decision-making by quickly surfacing considerations 
              that might take hours of research to uncover.
            </p>
          </div>

          <div className="border-l-4 border-ink pl-4">
            <h3 className="font-body font-bold text-sm uppercase mb-2">3. Code Quality & Consistency</h3>
            <p className="font-body text-xs text-silver mb-2">
              Generated code followed consistent patterns and conventions. TypeScript interfaces, 
              React component structure, and API endpoint organization were uniform throughout.
            </p>
            <p className="font-body text-xs text-silver">
              <strong>Benefit:</strong> Reduced cognitive load when reviewing code. Everything looked 
              like it was written by the same person with clear standards.
            </p>
          </div>

          <div className="border-l-4 border-ink pl-4">
            <h3 className="font-body font-bold text-sm uppercase mb-2">4. Documentation Writing</h3>
            <p className="font-body text-xs text-silver mb-2">
              AI transformed rough technical notes into clear, structured documentation. Particularly 
              strong at explaining complex concepts (caching strategy, database partitioning) in 
              accessible language.
            </p>
            <p className="font-body text-xs text-silver">
              <strong>Time saved:</strong> Documentation that would normally take 4-5 hours was 
              completed in under 2 hours, with higher quality and better structure.
            </p>
          </div>

          <div className="border-l-4 border-ink pl-4">
            <h3 className="font-body font-bold text-sm uppercase mb-2">5. Design System Consistency</h3>
            <p className="font-body text-xs text-silver mb-2">
              After showing AI the nazfer project's design language, it accurately reproduced the 
              aesthetic across all new pages—minimal, brutalist styling with consistent typography 
              and pattern backgrounds.
            </p>
            <p className="font-body text-xs text-silver">
              <strong>Impressive:</strong> Captured design intent from examples and applied it 
              systematically without explicit instruction for each component.
            </p>
          </div>
        </div>
      </Section>

      <Section title="What Didn't Work / Limitations">
        <div className="bg-white space-y-4">
          <div className="border-l-4 border-silver pl-4">
            <h3 className="font-body font-bold text-sm uppercase mb-2">1. Domain-Specific Business Logic</h3>
            <p className="font-body text-xs text-silver mb-2">
              AI needed guidance on personalization algorithm specifics. It could suggest general 
              approaches, but the actual scoring formula and weight distribution required human 
              judgment based on product goals.
            </p>
            <p className="font-body text-xs text-silver">
              <strong>Takeaway:</strong> AI accelerates implementation of decisions, but strategic 
              product choices still need human expertise.
            </p>
          </div>

          <div className="border-l-4 border-silver pl-4">
            <h3 className="font-body font-bold text-sm uppercase mb-2">2. Context Window Limitations</h3>
            <p className="font-body text-xs text-silver mb-2">
              While Claude has a large context window, there were moments where earlier decisions 
              needed to be re-explained when working on later components. The AI doesn't retain 
              project memory across sessions.
            </p>
            <p className="font-body text-xs text-silver">
              <strong>Workaround:</strong> Keeping a running document of key decisions helped 
              maintain consistency without needing to re-derive reasoning.
            </p>
          </div>

          <div className="border-l-4 border-silver pl-4">
            <h3 className="font-body font-bold text-sm uppercase mb-2">3. Over-Engineering Tendency</h3>
            <p className="font-body text-xs text-silver mb-2">
              Initial suggestions sometimes included unnecessary complexity (extensive error handling 
              for prototype, overly detailed documentation). Needed explicit guidance to "keep it 
              simple" and focus on core requirements.
            </p>
            <p className="font-body text-xs text-silver">
              <strong>Lesson:</strong> Be explicit about scope and constraints. AI will fill 
              ambiguity with more features unless told otherwise.
            </p>
          </div>

          <div className="border-l-4 border-silver pl-4">
            <h3 className="font-body font-bold text-sm uppercase mb-2">4. Testing Edge Cases</h3>
            <p className="font-body text-xs text-silver mb-2">
              AI-generated code tends to handle happy paths well but sometimes misses edge cases 
              (empty arrays, null values, race conditions). Human review and testing still essential.
            </p>
            <p className="font-body text-xs text-silver">
              <strong>Reality:</strong> AI reduces time to first draft, but validation and hardening 
              require human expertise.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Recommendations for Teams" pattern="grid">
        <div className="bg-white space-y-6">
          <div className="border border-mist p-6 rounded">
            <h3 className="font-body font-bold text-sm uppercase mb-3">For Individual Contributors</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <span className="text-ink">✓</span>
                <p className="font-body text-xs text-silver">
                  <strong>Use for boilerplate:</strong> Let AI handle repetitive code (CRUD operations, 
                  API routes, database schemas) so you can focus on unique business logic.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-ink">✓</span>
                <p className="font-body text-xs text-silver">
                  <strong>Pair with AI for exploration:</strong> Talk through design decisions to 
                  quickly surface pros/cons and alternatives before committing to implementation.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-ink">✓</span>
                <p className="font-body text-xs text-silver">
                  <strong>Review everything:</strong> Treat AI output as a smart junior developer's 
                  work—good foundation but needs validation and refinement.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-ink">✓</span>
                <p className="font-body text-xs text-silver">
                  <strong>Iterate explicitly:</strong> If first output isn't quite right, give specific 
                  feedback. "Make it simpler" works better than "this is wrong."
                </p>
              </div>
            </div>
          </div>

          <div className="border border-mist p-6 rounded bg-cloud">
            <h3 className="font-body font-bold text-sm uppercase mb-3">For Tech Leads</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <span className="text-ink">✓</span>
                <p className="font-body text-xs text-silver">
                  <strong>Define clear standards:</strong> AI will follow patterns it sees. Establish 
                  coding conventions, architecture principles, and documentation templates upfront.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-ink">✓</span>
                <p className="font-body text-xs text-silver">
                  <strong>Use for spike work:</strong> Rapid prototyping to validate technical 
                  feasibility before committing resources to full implementation.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-ink">✓</span>
                <p className="font-body text-xs text-silver">
                  <strong>Level up junior devs:</strong> AI can help juniors produce more sophisticated 
                  code, but ensure they understand what's generated (not just copy-paste).
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-ink">✓</span>
                <p className="font-body text-xs text-silver">
                  <strong>Document AI-generated code:</strong> Add comments explaining why (business 
                  logic, trade-offs) since AI typically only documents what.
                </p>
              </div>
            </div>
          </div>

          <div className="border border-mist p-6 rounded">
            <h3 className="font-body font-bold text-sm uppercase mb-3">What AI Cannot Replace</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <span className="text-silver">✗</span>
                <p className="font-body text-xs text-silver">
                  <strong>Product intuition:</strong> Understanding user needs, prioritizing features, 
                  and making strategic trade-offs requires human judgment.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-silver">✗</span>
                <p className="font-body text-xs text-silver">
                  <strong>System-wide architecture:</strong> AI can suggest patterns but doesn't have 
                  the context to design an entire system that balances all concerns.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-silver">✗</span>
                <p className="font-body text-xs text-silver">
                  <strong>Team communication:</strong> Explaining technical decisions to stakeholders, 
                  mentoring engineers, and building consensus still require human skills.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-silver">✗</span>
                <p className="font-body text-xs text-silver">
                  <strong>Production debugging:</strong> When things break at 3am, you need deep 
                  understanding of the system. AI helps, but experience is irreplaceable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section title="Honest Assessment">
        <div className="bg-white space-y-4">
          <div className="border-l-2 border-ink pl-4">
            <h3 className="font-body font-bold text-sm uppercase mb-2">Productivity Impact</h3>
            <p className="font-body text-xs text-silver mb-3">
              This project took approximately <strong>9-10 hours</strong> with heavy AI assistance. 
              Without AI, estimate would be <strong>18-25 hours</strong> for equivalent quality and 
              completeness.
            </p>
            <p className="font-body text-xs text-silver">
              Biggest time savings: boilerplate code generation, documentation writing, and iterating 
              on design decisions without extensive manual research.
            </p>
          </div>

          <div className="border-l-2 border-ink pl-4">
            <h3 className="font-body font-bold text-sm uppercase mb-2">Code Quality</h3>
            <p className="font-body text-xs text-silver mb-3">
              AI-generated code is <strong>consistently good</strong> but rarely <strong>great</strong> 
              without refinement. It follows best practices and is maintainable, but lacks the subtle 
              optimizations and edge case handling that come from experience.
            </p>
            <p className="font-body text-xs text-silver">
              Treat AI as an accelerator, not a replacement for engineering judgment.
            </p>
          </div>

          <div className="border-l-2 border-ink pl-4">
            <h3 className="font-body font-bold text-sm uppercase mb-2">Learning Curve</h3>
            <p className="font-body text-xs text-silver mb-3">
              Effective AI usage requires skill. You need to:
            </p>
            <ul className="font-body text-xs text-silver space-y-1">
              <li>• Ask clear, specific questions</li>
              <li>• Recognize when output is wrong or incomplete</li>
              <li>• Iterate with constructive feedback</li>
              <li>• Know when to stop using AI and solve manually</li>
            </ul>
            <p className="font-body text-xs text-silver mt-3">
              Junior engineers may struggle to evaluate AI output quality. Senior guidance still critical.
            </p>
          </div>

          <div className="border-l-2 border-ink pl-4">
            <h3 className="font-body font-bold text-sm uppercase mb-2">Would I Use It Again?</h3>
            <p className="font-body text-xs text-silver mb-2">
              <strong>Absolutely yes.</strong> The productivity gains are real and substantial.
            </p>
            <p className="font-body text-xs text-silver">
              AI doesn't replace software engineering—it amplifies it. The best results come from 
              combining AI's speed with human expertise, judgment, and creativity. This project 
              demonstrates that hybrid approach effectively.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Specific Examples from This Project">
        <div className="bg-white space-y-4">
          <div className="border border-mist p-4 rounded">
            <h3 className="font-body font-bold text-xs uppercase mb-2">Requirements Clarification</h3>
            <p className="font-body text-xs text-silver">
              Before starting implementation, had conversation with AI to understand technical terms 
              (CMS, multi-tenant, p95 latency, RPS). This foundational understanding prevented 
              misaligned implementation.
            </p>
          </div>

          <div className="border border-mist p-4 rounded">
            <h3 className="font-body font-bold text-xs uppercase mb-2">Time Budget Planning</h3>
            <p className="font-body text-xs text-silver">
              Discussed realistic time estimates for completing the task. AI helped break down 
              deliverables into manageable chunks and identify where to optimize (skip HTML demo, 
              use mock data instead of real DB).
            </p>
          </div>

          <div className="border border-mist p-4 rounded">
            <h3 className="font-body font-bold text-xs uppercase mb-2">Design Documentation</h3>
            <p className="font-body text-xs text-silver">
              AI transformed bullet-point architectural decisions into clear, well-structured 
              documentation pages. The "Implementation" page's pros/cons tables and the "Architecture" 
              page's data flow diagrams were AI-generated from rough outlines.
            </p>
          </div>

          <div className="border border-mist p-4 rounded">
            <h3 className="font-body font-bold text-xs uppercase mb-2">Code Generation</h3>
            <p className="font-body text-xs text-silver">
              Entire Next.js site structure, navigation component, reusable UI components, and all 
              documentation pages were generated in ~2 hours. Manual implementation would take 6-8 hours.
            </p>
          </div>
        </div>
      </Section>
    </div>
  );
}
