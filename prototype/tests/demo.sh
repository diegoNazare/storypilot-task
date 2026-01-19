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

# Scenario 1: Gaming Enthusiast
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "1️⃣  Scenario: Gaming Enthusiast User"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "User 06d6cbdc... has watched many gaming videos. Let's see their personalized feed:"
echo ""
curl -s "http://localhost:3001/v1/feed?user_id=06d6cbdcfc221d2f4460c17193442b9db221f30950f1c17af4e73e6e1788002b&tenant_id=tenant1&limit=5" | \
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

# Scenario 2: Cooking Enthusiast
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "2️⃣  Scenario: Cooking Enthusiast User"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "User 3e0e7f64... loves cooking videos. Their feed should be different:"
echo ""
curl -s "http://localhost:3001/v1/feed?user_id=3e0e7f64a2495659941e0b704069bcb310d8dfcab850ba1aa992669ef6f55bcb&tenant_id=tenant1&limit=5" | \
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
echo "A new user (6f015e46...) with no watch history gets popular content:"
echo ""
curl -s "http://localhost:3001/v1/feed?user_id=6f015e465db03f8a847292bf8624f567167f87f0ea0aa223d1e31779cad855c7&tenant_id=tenant1&limit=5" | \
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
curl -s "http://localhost:3001/v1/feed?user_id=06d6cbdcfc221d2f4460c17193442b9db221f30950f1c17af4e73e6e1788002b&tenant_id=tenant3&limit=5" | \
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
echo "Testing cache performance with a unique user (cache miss vs cache hit):"
echo ""

# Use a unique user_id that hasn't been cached yet
CACHE_TEST_USER="a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456"
echo "Testing with user: ${CACHE_TEST_USER:0:8}..."

# First request (cache miss)
RESPONSE1=$(curl -s "http://localhost:3001/v1/feed?user_id=${CACHE_TEST_USER}&tenant_id=tenant1&limit=5")
TIME1=$(echo $RESPONSE1 | node -e "console.log(JSON.parse(require('fs').readFileSync(0, 'utf-8')).metadata.response_time_ms)")
CACHE1=$(echo $RESPONSE1 | node -e "console.log(JSON.parse(require('fs').readFileSync(0, 'utf-8')).metadata.cache_hit)")

echo "First request:  ${TIME1}ms (cache_hit: ${CACHE1})"

# Small delay to ensure cache is set
sleep 0.1

# Second request (cache hit)
RESPONSE2=$(curl -s "http://localhost:3001/v1/feed?user_id=${CACHE_TEST_USER}&tenant_id=tenant1&limit=5")
TIME2=$(echo $RESPONSE2 | node -e "console.log(JSON.parse(require('fs').readFileSync(0, 'utf-8')).metadata.response_time_ms)")
CACHE2=$(echo $RESPONSE2 | node -e "console.log(JSON.parse(require('fs').readFileSync(0, 'utf-8')).metadata.cache_hit)")

echo "Second request: ${TIME2}ms (cache_hit: ${CACHE2})"

if [ "$CACHE1" = "false" ] && [ "$CACHE2" = "true" ]; then
  SPEEDUP=$(echo "scale=1; $TIME1 / $TIME2" | bc 2>/dev/null || echo "N/A")
  echo ""
  echo "✓ Cache working correctly! Speedup: ${SPEEDUP}x"
elif [ "$CACHE1" = "true" ]; then
  echo ""
  echo "⚠ Warning: First request hit cache (may have been cached from previous run)"
else
  echo ""
  echo "⚠ Warning: Cache behavior unexpected"
fi
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
echo "  # Tech enthusiast user"
echo "  curl \"http://localhost:3001/v1/feed?user_id=4911e04c8147846b1cea5eddfb251c8b694d62b2416a2a0007bd9a50d8407d68&tenant_id=tenant1&limit=10\""
echo ""
