#!/bin/bash

echo "🎬 Storyteller Personalization Demo"
echo "====================================="
echo ""

# Check if server is running
if ! curl -s http://localhost:3001/health > /dev/null; then
    echo "❌ Error: Server is not running on port 3001"
    echo "Please start the server first:"
    echo "  npm start"
    exit 1
fi

echo "✓ Server is running"
echo ""

# Scenario 1: Alice (Gaming Fan)
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "1️⃣  Scenario: Alice (Gaming Enthusiast)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Alice has watched many gaming videos. Let's see her personalized feed:"
echo ""
curl -s "http://localhost:3001/v1/feed?user_id=alice&tenant_id=tenant1&limit=5" | \
  node -e "
    const data = JSON.parse(require('fs').readFileSync(0, 'utf-8'));
    console.log('Personalized:', data.personalized ? '✓ Yes' : '✗ No');
    console.log('Response time:', data.metadata.response_time_ms + 'ms');
    console.log('Algorithm:', data.metadata.algorithm_version);
    console.log('');
    console.log('Top 5 Videos:');
    data.feed.slice(0, 5).forEach((v, i) => {
      console.log(\`  \${i+1}. [\${v.score}] \${v.title}\`);
      console.log(\`     Category: \${v.category} | Reason: \${v.ranking_reason}\`);
    });
  "
echo ""
sleep 1

# Scenario 2: Bob (Cooking Enthusiast)
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "2️⃣  Scenario: Bob (Cooking Enthusiast)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Bob loves cooking videos. His feed should be different from Alice's:"
echo ""
curl -s "http://localhost:3001/v1/feed?user_id=bob&tenant_id=tenant1&limit=5" | \
  node -e "
    const data = JSON.parse(require('fs').readFileSync(0, 'utf-8'));
    console.log('Personalized:', data.personalized ? '✓ Yes' : '✗ No');
    console.log('Response time:', data.metadata.response_time_ms + 'ms');
    console.log('');
    console.log('Top 5 Videos:');
    data.feed.slice(0, 5).forEach((v, i) => {
      console.log(\`  \${i+1}. [\${v.score}] \${v.title}\`);
      console.log(\`     Category: \${v.category} | Reason: \${v.ranking_reason}\`);
    });
  "
echo ""
sleep 1

# Scenario 3: New User (Cold Start)
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "3️⃣  Scenario: New User (Cold Start)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "A new user with no watch history gets popular content:"
echo ""
curl -s "http://localhost:3001/v1/feed?user_id=newuser&tenant_id=tenant1&limit=5" | \
  node -e "
    const data = JSON.parse(require('fs').readFileSync(0, 'utf-8'));
    console.log('Personalized:', data.personalized ? '✓ Yes' : '✗ No (Cold Start)');
    console.log('Response time:', data.metadata.response_time_ms + 'ms');
    console.log('Algorithm:', data.metadata.algorithm_version);
    console.log('');
    console.log('Top 5 Videos:');
    data.feed.slice(0, 5).forEach((v, i) => {
      console.log(\`  \${i+1}. [\${v.score}] \${v.title}\`);
      console.log(\`     Category: \${v.category} | Editorial Boost: \${v.editorial_boost}\`);
    });
  "
echo ""
sleep 1

# Scenario 4: Feature Flag Disabled
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "4️⃣  Scenario: Feature Flag Disabled (Tenant3)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Tenant3 has personalization disabled (feature flag):"
echo ""
curl -s "http://localhost:3001/v1/feed?user_id=alice&tenant_id=tenant3&limit=5" | \
  node -e "
    const data = JSON.parse(require('fs').readFileSync(0, 'utf-8'));
    console.log('Personalized:', data.personalized ? '✓ Yes' : '✗ No');
    console.log('Reason:', data.metadata.reason);
    console.log('Algorithm:', data.metadata.algorithm_version);
    console.log('');
    console.log('Top 5 Videos (Editorial Order):');
    data.feed.slice(0, 5).forEach((v, i) => {
      console.log(\`  \${i+1}. [\${v.score}] \${v.title}\`);
      console.log(\`     Category: \${v.category}\`);
    });
  "
echo ""
sleep 1

# Scenario 5: Cache Performance
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "5️⃣  Scenario: Cache Performance"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Second request for Alice should hit cache (faster response):"
echo ""

# First request (cache miss)
RESPONSE1=$(curl -s "http://localhost:3001/v1/feed?user_id=alice&tenant_id=tenant1&limit=5")
TIME1=$(echo $RESPONSE1 | node -e "console.log(JSON.parse(require('fs').readFileSync(0, 'utf-8')).metadata.response_time_ms)")
CACHE1=$(echo $RESPONSE1 | node -e "console.log(JSON.parse(require('fs').readFileSync(0, 'utf-8')).metadata.cache_hit)")

echo "First request:  ${TIME1}ms (cache_hit: ${CACHE1})"

# Second request (cache hit)
RESPONSE2=$(curl -s "http://localhost:3001/v1/feed?user_id=alice&tenant_id=tenant1&limit=5")
TIME2=$(echo $RESPONSE2 | node -e "console.log(JSON.parse(require('fs').readFileSync(0, 'utf-8')).metadata.response_time_ms)")
CACHE2=$(echo $RESPONSE2 | node -e "console.log(JSON.parse(require('fs').readFileSync(0, 'utf-8')).metadata.cache_hit)")

echo "Second request: ${TIME2}ms (cache_hit: ${CACHE2})"
echo ""

# Summary
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Demo Complete!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Key Observations:"
echo "  • Different users get different personalized content"
echo "  • New users receive popular/editorial content (cold start)"
echo "  • Feature flags control personalization per tenant"
echo "  • Cache improves response times significantly"
echo ""
echo "Try it yourself:"
echo "  curl \"http://localhost:3001/v1/feed?user_id=diana&tenant_id=tenant1&limit=10\""
echo ""
