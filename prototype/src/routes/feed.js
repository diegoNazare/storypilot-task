const express = require('express');
const crypto = require('crypto');
const { videos, userSignals, tenantConfigs } = require('../models/mockData');
const { rankVideos, getNonPersonalizedFeed, getColdStartFeed } = require('../services/personalization');
const cache = require('../services/cache');
const { PERSONALIZATION_ENABLED, CACHE_TTL } = require('../config/constants');

const router = express.Router();

/**
 * Hash user_id to get a consistent value for percentage-based rollout
 * Returns a number between 0-99 representing the user's percentile
 */
function hashUserId(userId) {
  const hash = crypto.createHash('sha256').update(userId).digest('hex');
  // Take first 8 characters of hash and convert to integer
  const hashInt = parseInt(hash.substring(0, 8), 16);
  return hashInt % 100;
}

/**
 * Determines if personalization should be enabled for a given user
 * Implements multi-level feature flag hierarchy:
 * L1: Global kill switch (environment variable)
 * L2: Per-tenant flag (database configuration)
 * L3: Percentage rollout (gradual A/B testing)
 * 
 * @param {string} tenantId - Tenant identifier
 * @param {string} userId - User identifier
 * @param {object} tenantConfig - Tenant configuration object
 * @returns {object} { enabled: boolean, reason: string }
 */
function shouldPersonalize(tenantId, userId, tenantConfig) {
  // L1: Global kill switch
  if (!PERSONALIZATION_ENABLED) {
    return { 
      enabled: false, 
      reason: 'Global personalization disabled' 
    };
  }
  
  // L2: Tenant-specific flag
  if (!tenantConfig.personalization_enabled) {
    return { 
      enabled: false, 
      reason: 'Personalization disabled for tenant' 
    };
  }
  
  // L3: Percentage rollout
  const userHash = hashUserId(userId);
  const userPercentile = userHash; // userHash is already 0-99
  if (userPercentile >= tenantConfig.rollout_percentage) {
    return { 
      enabled: false, 
      reason: `User not in rollout (percentile: ${userPercentile}, threshold: ${tenantConfig.rollout_percentage})` 
    };
  }
  
  return { 
    enabled: true, 
    reason: 'All checks passed' 
  };
}

/**
 * GET /v1/feed - Personalized video feed
 */
router.get('/feed', (req, res) => {
  const startTime = Date.now();
  
  // Extract query parameters
  const { user_id, tenant_id, limit = 20 } = req.query;
  
  // Validate required parameters
  if (!user_id) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Missing required parameter: user_id',
      code: 'MISSING_PARAMETER',
    });
  }
  
  if (!tenant_id) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Missing required parameter: tenant_id',
      code: 'MISSING_PARAMETER',
    });
  }
  
  // Check if tenant exists
  const tenantConfig = tenantConfigs[tenant_id];
  if (!tenantConfig) {
    return res.status(404).json({
      error: 'Not Found',
      message: `Tenant not found: ${tenant_id}`,
      code: 'TENANT_NOT_FOUND',
    });
  }
  
  // Check cache
  const cacheKey = `feed:${tenant_id}:${user_id}:${limit}`;
  const cachedResult = cache.get(cacheKey);
  
  if (cachedResult) {
    const responseTime = Date.now() - startTime;
    return res.json({
      ...cachedResult,
      metadata: {
        ...cachedResult.metadata,
        response_time_ms: responseTime,
        cache_hit: true,
      },
    });
  }
  
  // Check if personalization should be enabled (multi-level feature flags)
  const personalizationCheck = shouldPersonalize(tenant_id, user_id, tenantConfig);
  
  if (!personalizationCheck.enabled) {
    // Fall back to non-personalized feed
    const candidateVideos = videos.filter(v => v.tenant_id === tenant_id);
    const feed = getNonPersonalizedFeed(candidateVideos, parseInt(limit));
    
    const response = {
      user_id,
      tenant_id,
      personalized: false,
      feed,
      metadata: {
        total_candidates: candidateVideos.length,
        response_time_ms: Date.now() - startTime,
        cache_hit: false,
        algorithm_version: 'editorial_only',
        reason: personalizationCheck.reason,
      },
    };
    
    cache.set(cacheKey, response, CACHE_TTL.FEED);
    return res.json(response);
  }
  
  // Get candidate videos for this tenant
  const candidateVideos = videos.filter(v => v.tenant_id === tenant_id);
  
  // Check if user has any signals (cold start)
  const hasSignals = userSignals[user_id] && userSignals[user_id].length > 0;
  
  let feed;
  let algorithmVersion;
  
  if (!hasSignals) {
    // Cold start - new user
    feed = getColdStartFeed(candidateVideos, parseInt(limit));
    algorithmVersion = 'cold_start_v1.0';
  } else {
    // Personalized ranking
    feed = rankVideos(candidateVideos, user_id, tenantConfig, parseInt(limit));
    algorithmVersion = 'personalized_v1.0';
  }
  
  const response = {
    user_id,
    tenant_id,
    personalized: hasSignals,
    feed,
    metadata: {
      total_candidates: candidateVideos.length,
      response_time_ms: Date.now() - startTime,
      cache_hit: false,
      algorithm_version: algorithmVersion,
      ranking_weights: tenantConfig.personalization_weights,
    },
  };
  
  // Cache the result
  cache.set(cacheKey, response, CACHE_TTL.FEED);
  
  res.json(response);
});

/**
 * GET /v1/feed/non-personalized - Non-personalized feed (fallback)
 */
router.get('/feed/non-personalized', (req, res) => {
  const startTime = Date.now();
  
  const { tenant_id, limit = 20 } = req.query;
  
  if (!tenant_id) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Missing required parameter: tenant_id',
      code: 'MISSING_PARAMETER',
    });
  }
  
  const candidateVideos = videos.filter(v => v.tenant_id === tenant_id);
  const feed = getNonPersonalizedFeed(candidateVideos, parseInt(limit));
  
  res.json({
    tenant_id,
    personalized: false,
    feed,
    metadata: {
      total_candidates: candidateVideos.length,
      response_time_ms: Date.now() - startTime,
      cache_hit: false,
      algorithm_version: 'editorial_only',
    },
  });
});

module.exports = router;
