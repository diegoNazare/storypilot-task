#!/bin/bash

echo "🎯 Testing Percentage Rollout Feature"
echo "======================================"
echo ""

# Check if server is running
if ! curl -s http://localhost:3001/health > /dev/null; then
    echo "❌ Error: Server is not running on port 3001"
    echo "Please start the server first:"
    echo "  cd prototype && npm start"
    exit 1
fi

echo "✓ Server is running"
echo ""

echo "Testing tenant4 with 50% rollout percentage..."
echo "Users will be consistently assigned based on their user_id hash"
echo ""

# Test multiple user IDs to see which ones fall into the 50% rollout
test_users=("testuser1" "testuser999" "alice" "bob" "charlie" "diana" "user123" "user456" "user789" "admin")

in_rollout=0
not_in_rollout=0

for user in "${test_users[@]}"; do
  response=$(curl -s "http://localhost:3001/v1/feed?user_id=${user}&tenant_id=tenant4&limit=3")
  
  personalized=$(echo "$response" | node -e "
    const data = JSON.parse(require('fs').readFileSync(0, 'utf-8'));
    const reason = data.metadata.reason || '';
    const isPersonalized = !reason.includes('not in rollout');
    console.log(isPersonalized ? 'YES' : 'NO');
    if (!isPersonalized && reason) {
      console.log('REASON:' + reason);
    }
  ")
  
  if echo "$personalized" | grep -q "YES"; then
    echo "  ✅ ${user}: IN rollout (gets personalization)"
    in_rollout=$((in_rollout + 1))
  else
    reason=$(echo "$personalized" | grep "REASON:" | cut -d: -f2-)
    echo "  ⭕ ${user}: NOT in rollout (editorial feed)${reason:+ - $reason}"
    not_in_rollout=$((not_in_rollout + 1))
  fi
done

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Results:"
echo "  In rollout: ${in_rollout}/${#test_users[@]} (${in_rollout}0%)"
echo "  Not in rollout: ${not_in_rollout}/${#test_users[@]} (${not_in_rollout}0%)"
echo ""
echo "Expected: ~50% in rollout, ~50% not in rollout"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Test consistency - same user should always get same result
echo "Testing consistency (same user should always get same result)..."
echo ""

test_user="alice"
echo "Making 3 requests for user '${test_user}':"

for i in {1..3}; do
  response=$(curl -s "http://localhost:3001/v1/feed?user_id=${test_user}&tenant_id=tenant4&limit=3")
  
  result=$(echo "$response" | node -e "
    const data = JSON.parse(require('fs').readFileSync(0, 'utf-8'));
    const reason = data.metadata.reason || '';
    const isPersonalized = !reason.includes('not in rollout');
    console.log(isPersonalized ? 'IN_ROLLOUT' : 'NOT_IN_ROLLOUT');
  ")
  
  echo "  Request ${i}: ${result}"
done

echo ""
echo "✅ If all 3 results are the same, consistency check passed!"
echo ""

# Compare tenant1 (100% rollout) vs tenant4 (50% rollout)
echo "Comparing tenant1 (100% rollout) vs tenant4 (50% rollout)..."
echo ""

response_t1=$(curl -s "http://localhost:3001/v1/feed?user_id=alice&tenant_id=tenant1&limit=3")
response_t4=$(curl -s "http://localhost:3001/v1/feed?user_id=alice&tenant_id=tenant4&limit=3")

echo "Tenant1 (100% rollout):"
echo "$response_t1" | node -e "
  const data = JSON.parse(require('fs').readFileSync(0, 'utf-8'));
  console.log('  Personalized:', data.personalized ? 'YES' : 'NO');
  console.log('  Reason:', data.metadata.reason || 'N/A');
"

echo ""
echo "Tenant4 (50% rollout):"
echo "$response_t4" | node -e "
  const data = JSON.parse(require('fs').readFileSync(0, 'utf-8'));
  console.log('  Personalized:', data.personalized ? 'YES' : 'NO');
  console.log('  Reason:', data.metadata.reason || 'N/A');
"

echo ""
echo "✅ Test complete!"
