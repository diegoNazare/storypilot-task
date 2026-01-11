const { videos, userSignals } = require('../models/mockData');

/**
 * Calculate personalized scores for videos based on user signals and tenant weights
 */
function calculatePersonalizedScores(candidateVideos, userId, tenantConfig) {
  const signals = userSignals[userId] || [];
  const weights = tenantConfig.personalization_weights;
  
  // Analyze user's category preferences
  const categoryAffinity = calculateCategoryAffinity(signals);
  const engagementPatterns = calculateEngagementPatterns(signals);
  
  // Score each video
  return candidateVideos.map(video => {
    const watchHistoryScore = calculateWatchHistoryScore(video, categoryAffinity, signals);
    const engagementScore = calculateEngagementScore(video, engagementPatterns);
    const editorialScore = video.editorial_boost;
    
    // Weighted combination
    const finalScore = 
      (weights.watch_history * watchHistoryScore) +
      (weights.engagement * engagementScore) +
      (weights.editorial * (editorialScore / 2.0)); // Normalize editorial boost
    
    // Determine ranking reason
    const reason = determineRankingReason(watchHistoryScore, engagementScore, editorialScore, weights);
    
    return {
      ...video,
      score: parseFloat(finalScore.toFixed(2)),
      ranking_reason: reason,
      scoring_details: {
        watch_history: parseFloat(watchHistoryScore.toFixed(2)),
        engagement: parseFloat(engagementScore.toFixed(2)),
        editorial: parseFloat(editorialScore.toFixed(2)),
      }
    };
  });
}

/**
 * Calculate category affinity based on user's viewing history
 */
function calculateCategoryAffinity(signals) {
  const affinity = {};
  
  signals.forEach(signal => {
    const video = videos.find(v => v.id === signal.video_id);
    if (!video) return;
    
    const category = video.category;
    if (!affinity[category]) {
      affinity[category] = { views: 0, totalEngagement: 0 };
    }
    
    affinity[category].views += 1;
    affinity[category].totalEngagement += signal.engagement_pct || 0;
  });
  
  // Normalize to 0-1 scale
  const maxViews = Math.max(...Object.values(affinity).map(a => a.views), 1);
  Object.keys(affinity).forEach(category => {
    const avgEngagement = affinity[category].totalEngagement / affinity[category].views;
    affinity[category].score = (affinity[category].views / maxViews) * (avgEngagement / 100);
  });
  
  return affinity;
}

/**
 * Calculate engagement patterns
 */
function calculateEngagementPatterns(signals) {
  const completes = signals.filter(s => s.event_type === 'complete').length;
  const views = signals.filter(s => s.event_type === 'view').length;
  const skips = signals.filter(s => s.event_type === 'skip').length;
  const total = signals.length || 1;
  
  return {
    completionRate: completes / total,
    viewRate: views / total,
    skipRate: skips / total,
    avgEngagement: signals.reduce((sum, s) => sum + (s.engagement_pct || 0), 0) / total,
  };
}

/**
 * Calculate watch history score for a video
 */
function calculateWatchHistoryScore(video, categoryAffinity, signals) {
  const categoryScore = categoryAffinity[video.category]?.score || 0;
  
  // Check if user has seen this specific video
  const hasWatched = signals.some(s => s.video_id === video.id);
  
  // Penalize already-watched videos
  const watchedPenalty = hasWatched ? 0.3 : 1.0;
  
  // Boost newer content slightly
  const recencyBoost = calculateRecencyBoost(video.created_at);
  
  return categoryScore * watchedPenalty * recencyBoost;
}

/**
 * Calculate engagement score
 */
function calculateEngagementScore(video, engagementPatterns) {
  // Videos with higher editorial boost tend to have better engagement
  // Combined with user's general engagement patterns
  const editorialFactor = Math.min(video.editorial_boost / 1.5, 1.0);
  const userEngagementFactor = engagementPatterns.avgEngagement / 100;
  
  return (editorialFactor + userEngagementFactor) / 2;
}

/**
 * Calculate recency boost (newer content gets slight advantage)
 */
function calculateRecencyBoost(createdAt) {
  const now = new Date();
  const created = new Date(createdAt);
  const daysOld = (now - created) / (1000 * 60 * 60 * 24);
  
  // Videos less than 3 days old get a small boost
  if (daysOld < 3) return 1.2;
  if (daysOld < 7) return 1.1;
  return 1.0;
}

/**
 * Determine the primary reason for ranking
 */
function determineRankingReason(watchHistoryScore, engagementScore, editorialScore, weights) {
  const scores = {
    'High watch history match': watchHistoryScore * weights.watch_history,
    'Strong engagement signal': engagementScore * weights.engagement,
    'Editorial boost': (editorialScore / 2.0) * weights.editorial,
  };
  
  const maxReason = Object.entries(scores).reduce((a, b) => a[1] > b[1] ? a : b);
  
  // Add secondary factors
  if (editorialScore >= 1.3) {
    return maxReason[0] + ' + editorial boost';
  }
  
  return maxReason[0];
}

/**
 * Rank videos and return top N
 */
function rankVideos(candidateVideos, userId, tenantConfig, limit = 20) {
  const scoredVideos = calculatePersonalizedScores(candidateVideos, userId, tenantConfig);
  
  // Sort by score descending
  const ranked = scoredVideos.sort((a, b) => b.score - a.score);
  
  // Return top N
  return ranked.slice(0, limit);
}

/**
 * Get non-personalized feed (editorial order only)
 */
function getNonPersonalizedFeed(candidateVideos, limit = 20) {
  return candidateVideos
    .sort((a, b) => {
      // Sort by editorial_boost DESC, then created_at DESC
      if (b.editorial_boost !== a.editorial_boost) {
        return b.editorial_boost - a.editorial_boost;
      }
      return new Date(b.created_at) - new Date(a.created_at);
    })
    .slice(0, limit)
    .map(video => ({
      ...video,
      score: video.editorial_boost,
      ranking_reason: 'Editorial curation',
    }));
}

/**
 * Handle cold start (new users with no history)
 */
function getColdStartFeed(candidateVideos, limit = 20) {
  // For new users, show popular content with high editorial boost
  return candidateVideos
    .filter(v => v.editorial_boost >= 1.2)
    .sort((a, b) => {
      if (b.editorial_boost !== a.editorial_boost) {
        return b.editorial_boost - a.editorial_boost;
      }
      return new Date(b.created_at) - new Date(a.created_at);
    })
    .slice(0, limit)
    .map(video => ({
      ...video,
      score: video.editorial_boost,
      ranking_reason: 'Popular content (cold start)',
    }));
}

module.exports = {
  rankVideos,
  getNonPersonalizedFeed,
  getColdStartFeed,
};
