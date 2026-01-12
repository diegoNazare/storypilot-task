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
test_users=("f1a8c3e6-2b9d-4f7a-c5e8-1d3b6f9a2c4e" "f9c2e5a8-7d4b-4a1f-e3c6-8b1d5f2a7c9e" "1a2b3c4d-5e6f-4a7b-8c9d-0e1f2a3b4c5d" "2b3c4d5e-6f7a-4b8c-9d0e-1f2a3b4c5d6e" "3c4d5e6f-7a8b-4c9d-0e1f-2a3b4c5d6e7f" "4d5e6f7a-8b9c-4d0e-1f2a-3b4c5d6e7f8a" "5e6f7a8b-9c0d-4e1f-2a3b-4c5d6e7f8a9b" "6f7a8b9c-0d1e-4f2a-3b4c-5d6e7f8a9b0c" "7a8b9c0d-1e2f-4a3b-4c5d-6e7f8a9b0c1d" "8b9c0d1e-2f3a-4b4c-5d6e-7f8a9b0c1d2e")

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
  
  # Show abbreviated user ID (first 8 chars)
  user_short="${user:0:8}..."
  
  if echo "$personalized" | grep -q "YES"; then
    echo "  ✅ ${user_short}: IN rollout (gets personalization)"
    in_rollout=$((in_rollout + 1))
  else
    reason=$(echo "$personalized" | grep "REASON:" | cut -d: -f2-)
    echo "  ⭕ ${user_short}: NOT in rollout (editorial feed)${reason:+ - $reason}"
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

test_user="06d6cbdcfc221d2f4460c17193442b9db221f30950f1c17af4e73e6e1788002b"
test_user_short="${test_user:0:8}..."
echo "Making 3 requests for user '${test_user_short}':"

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

response_t1=$(curl -s "http://localhost:3001/v1/feed?user_id=06d6cbdcfc221d2f4460c17193442b9db221f30950f1c17af4e73e6e1788002b&tenant_id=tenant1&limit=3")
response_t4=$(curl -s "http://localhost:3001/v1/feed?user_id=06d6cbdcfc221d2f4460c17193442b9db221f30950f1c17af4e73e6e1788002b&tenant_id=tenant4&limit=3")

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
