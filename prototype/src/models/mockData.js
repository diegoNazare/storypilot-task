// Mock video data across different categories
const videos = [
  // Gaming videos
  { id: 'vid_001', tenant_id: 'tenant1', title: 'Advanced Gaming Strategies', category: 'gaming', duration_seconds: 180, editorial_boost: 1.2, created_at: '2026-01-10T14:30:00Z' },
  { id: 'vid_002', tenant_id: 'tenant1', title: 'eSports Tournament Highlights', category: 'gaming', duration_seconds: 240, editorial_boost: 1.0, created_at: '2026-01-11T09:15:00Z' },
  { id: 'vid_003', tenant_id: 'tenant1', title: 'Gaming Setup Tour 2026', category: 'gaming', duration_seconds: 300, editorial_boost: 1.1, created_at: '2026-01-09T16:20:00Z' },
  { id: 'vid_004', tenant_id: 'tenant1', title: 'Pro Player Interview', category: 'gaming', duration_seconds: 420, editorial_boost: 1.3, created_at: '2026-01-08T11:00:00Z' },
  { id: 'vid_005', tenant_id: 'tenant1', title: 'FPS Tips and Tricks', category: 'gaming', duration_seconds: 200, editorial_boost: 1.0, created_at: '2026-01-12T08:30:00Z' },
  
  // Cooking videos
  { id: 'vid_006', tenant_id: 'tenant1', title: 'Easy Pasta Recipe', category: 'cooking', duration_seconds: 180, editorial_boost: 1.5, created_at: '2026-01-10T12:00:00Z' },
  { id: 'vid_007', tenant_id: 'tenant1', title: '5 Minute Breakfast Ideas', category: 'cooking', duration_seconds: 300, editorial_boost: 1.2, created_at: '2026-01-11T07:00:00Z' },
  { id: 'vid_008', tenant_id: 'tenant1', title: 'Italian Cooking Masterclass', category: 'cooking', duration_seconds: 600, editorial_boost: 1.4, created_at: '2026-01-09T14:00:00Z' },
  { id: 'vid_009', tenant_id: 'tenant1', title: 'Baking Perfect Bread', category: 'cooking', duration_seconds: 450, editorial_boost: 1.1, created_at: '2026-01-08T09:30:00Z' },
  { id: 'vid_010', tenant_id: 'tenant1', title: 'Healthy Meal Prep', category: 'cooking', duration_seconds: 360, editorial_boost: 1.3, created_at: '2026-01-12T10:00:00Z' },
  
  // Fitness videos
  { id: 'vid_011', tenant_id: 'tenant1', title: '10 Minute Home Workout', category: 'fitness', duration_seconds: 600, editorial_boost: 1.2, created_at: '2026-01-10T06:00:00Z' },
  { id: 'vid_012', tenant_id: 'tenant1', title: 'Yoga for Beginners', category: 'fitness', duration_seconds: 900, editorial_boost: 1.1, created_at: '2026-01-11T06:30:00Z' },
  { id: 'vid_013', tenant_id: 'tenant1', title: 'HIIT Cardio Blast', category: 'fitness', duration_seconds: 720, editorial_boost: 1.0, created_at: '2026-01-09T07:00:00Z' },
  { id: 'vid_014', tenant_id: 'tenant1', title: 'Strength Training Guide', category: 'fitness', duration_seconds: 540, editorial_boost: 1.3, created_at: '2026-01-08T06:45:00Z' },
  { id: 'vid_015', tenant_id: 'tenant1', title: 'Stretching Routine', category: 'fitness', duration_seconds: 480, editorial_boost: 1.0, created_at: '2026-01-12T06:15:00Z' },
  
  // Tech videos
  { id: 'vid_016', tenant_id: 'tenant1', title: 'iPhone 16 Review', category: 'tech', duration_seconds: 720, editorial_boost: 1.5, created_at: '2026-01-10T15:00:00Z' },
  { id: 'vid_017', tenant_id: 'tenant1', title: 'Best Laptops 2026', category: 'tech', duration_seconds: 540, editorial_boost: 1.2, created_at: '2026-01-11T14:00:00Z' },
  { id: 'vid_018', tenant_id: 'tenant1', title: 'AI Tools for Productivity', category: 'tech', duration_seconds: 420, editorial_boost: 1.4, created_at: '2026-01-09T13:00:00Z' },
  { id: 'vid_019', tenant_id: 'tenant1', title: 'Coding Tutorial: React', category: 'tech', duration_seconds: 1200, editorial_boost: 1.1, created_at: '2026-01-08T16:00:00Z' },
  { id: 'vid_020', tenant_id: 'tenant1', title: 'Smart Home Setup', category: 'tech', duration_seconds: 600, editorial_boost: 1.0, created_at: '2026-01-12T15:30:00Z' },
  
  // Music videos
  { id: 'vid_021', tenant_id: 'tenant1', title: 'Top 10 Songs This Week', category: 'music', duration_seconds: 180, editorial_boost: 1.3, created_at: '2026-01-10T18:00:00Z' },
  { id: 'vid_022', tenant_id: 'tenant1', title: 'Guitar Tutorial: Beginner', category: 'music', duration_seconds: 900, editorial_boost: 1.0, created_at: '2026-01-11T17:00:00Z' },
  { id: 'vid_023', tenant_id: 'tenant1', title: 'Behind the Music', category: 'music', duration_seconds: 480, editorial_boost: 1.2, created_at: '2026-01-09T19:00:00Z' },
  { id: 'vid_024', tenant_id: 'tenant1', title: 'Live Concert Performance', category: 'music', duration_seconds: 3600, editorial_boost: 1.5, created_at: '2026-01-08T20:00:00Z' },
  { id: 'vid_025', tenant_id: 'tenant1', title: 'Music Production Tips', category: 'music', duration_seconds: 720, editorial_boost: 1.1, created_at: '2026-01-12T18:30:00Z' },
  
  // Travel videos
  { id: 'vid_026', tenant_id: 'tenant1', title: 'Tokyo Travel Guide', category: 'travel', duration_seconds: 840, editorial_boost: 1.4, created_at: '2026-01-10T10:00:00Z' },
  { id: 'vid_027', tenant_id: 'tenant1', title: 'Budget Travel Tips', category: 'travel', duration_seconds: 360, editorial_boost: 1.2, created_at: '2026-01-11T11:00:00Z' },
  { id: 'vid_028', tenant_id: 'tenant1', title: 'European Road Trip', category: 'travel', duration_seconds: 1200, editorial_boost: 1.1, created_at: '2026-01-09T12:00:00Z' },
  { id: 'vid_029', tenant_id: 'tenant1', title: 'Hidden Gems in Paris', category: 'travel', duration_seconds: 600, editorial_boost: 1.3, created_at: '2026-01-08T13:00:00Z' },
  { id: 'vid_030', tenant_id: 'tenant1', title: 'Adventure Sports in New Zealand', category: 'travel', duration_seconds: 720, editorial_boost: 1.0, created_at: '2026-01-12T11:30:00Z' },
  
  // Comedy videos
  { id: 'vid_031', tenant_id: 'tenant1', title: 'Stand-Up Comedy Special', category: 'comedy', duration_seconds: 3600, editorial_boost: 1.5, created_at: '2026-01-10T21:00:00Z' },
  { id: 'vid_032', tenant_id: 'tenant1', title: 'Funny Animal Compilation', category: 'comedy', duration_seconds: 300, editorial_boost: 1.2, created_at: '2026-01-11T20:00:00Z' },
  { id: 'vid_033', tenant_id: 'tenant1', title: 'Office Pranks', category: 'comedy', duration_seconds: 240, editorial_boost: 1.0, created_at: '2026-01-09T21:30:00Z' },
  { id: 'vid_034', tenant_id: 'tenant1', title: 'Sketch Comedy Show', category: 'comedy', duration_seconds: 600, editorial_boost: 1.3, created_at: '2026-01-08T22:00:00Z' },
  { id: 'vid_035', tenant_id: 'tenant1', title: 'Funny Moments 2026', category: 'comedy', duration_seconds: 420, editorial_boost: 1.1, created_at: '2026-01-12T20:30:00Z' },
  
  // Educational videos
  { id: 'vid_036', tenant_id: 'tenant1', title: 'History of Ancient Rome', category: 'education', duration_seconds: 900, editorial_boost: 1.1, created_at: '2026-01-10T13:00:00Z' },
  { id: 'vid_037', tenant_id: 'tenant1', title: 'Science Explained: Quantum Physics', category: 'education', duration_seconds: 720, editorial_boost: 1.4, created_at: '2026-01-11T12:00:00Z' },
  { id: 'vid_038', tenant_id: 'tenant1', title: 'Learn Spanish in 10 Minutes', category: 'education', duration_seconds: 600, editorial_boost: 1.2, created_at: '2026-01-09T15:00:00Z' },
  { id: 'vid_039', tenant_id: 'tenant1', title: 'Math Made Easy', category: 'education', duration_seconds: 540, editorial_boost: 1.0, created_at: '2026-01-08T14:00:00Z' },
  { id: 'vid_040', tenant_id: 'tenant1', title: 'Art History Masterclass', category: 'education', duration_seconds: 1200, editorial_boost: 1.3, created_at: '2026-01-12T13:00:00Z' },
  
  // Tenant 2 videos (different content)
  { id: 'vid_041', tenant_id: 'tenant2', title: 'Product Launch Event', category: 'business', duration_seconds: 1800, editorial_boost: 1.5, created_at: '2026-01-10T10:00:00Z' },
  { id: 'vid_042', tenant_id: 'tenant2', title: 'Marketing Strategy Tips', category: 'business', duration_seconds: 600, editorial_boost: 1.2, created_at: '2026-01-11T11:00:00Z' },
  { id: 'vid_043', tenant_id: 'tenant2', title: 'CEO Interview', category: 'business', duration_seconds: 900, editorial_boost: 1.4, created_at: '2026-01-09T12:00:00Z' },
  
  // Tenant 4 videos (for rollout percentage testing)
  { id: 'vid_044', tenant_id: 'tenant4', title: 'Gaming Highlights', category: 'gaming', duration_seconds: 240, editorial_boost: 1.3, created_at: '2026-01-10T14:00:00Z' },
  { id: 'vid_045', tenant_id: 'tenant4', title: 'Cooking Tutorial', category: 'cooking', duration_seconds: 360, editorial_boost: 1.2, created_at: '2026-01-11T10:00:00Z' },
  { id: 'vid_046', tenant_id: 'tenant4', title: 'Fitness Challenge', category: 'fitness', duration_seconds: 480, editorial_boost: 1.4, created_at: '2026-01-09T07:00:00Z' },
];

// Demo user ID mapping (for reference only - NOT exposed in API):
// a3f7c4e9-8b2d-4a1f-9c3e-5d6b8a0e1f2c = Gaming enthusiast
// b8d2e5f1-3c9a-4e7b-a2f5-6d8c9e1a3b4c = Cooking enthusiast
// c1e4b7d2-9f3a-4c8e-b5d9-7e2f4a6c8b1d = Fitness enthusiast
// d9a2c5e8-4b7f-4d1a-c3e6-8f1b3d5e7a9c = Tech enthusiast
// e2f5d8a1-7c4b-4e9d-b6f2-9a3c5e7b1d4f = New user (cold start)
// f1a8c3e6-2b9d-4f7a-c5e8-1d3b6f9a2c4e = Test user 1 (for rollout testing)
// f9c2e5a8-7d4b-4a1f-e3c6-8b1d5f2a7c9e = Test user 2 (for rollout testing)
// 1a2b3c4d-5e6f-4a7b-8c9d-0e1f2a3b4c5d = Test user 3 (for rollout testing)
// 2b3c4d5e-6f7a-4b8c-9d0e-1f2a3b4c5d6e = Test user 4 (for rollout testing)
// 3c4d5e6f-7a8b-4c9d-0e1f-2a3b4c5d6e7f = Test user 5 (for rollout testing)
// 4d5e6f7a-8b9c-4d0e-1f2a-3b4c5d6e7f8a = Test user 6 (for rollout testing)
// 5e6f7a8b-9c0d-4e1f-2a3b-4c5d6e7f8a9b = Test user 7 (for rollout testing)
// 6f7a8b9c-0d1e-4f2a-3b4c-5d6e7f8a9b0c = Test user 8 (for rollout testing)
// 7a8b9c0d-1e2f-4a3b-4c5d-6e7f8a9b0c1d = Test user 9 (for rollout testing)
// 8b9c0d1e-2f3a-4b4c-5d6e-7f8a9b0c1d2e = Test user 10 (for rollout testing)

// Mock user signals (watch history and engagement)
const userSignals = {
  // Gaming enthusiast
  'a3f7c4e9-8b2d-4a1f-9c3e-5d6b8a0e1f2c': [
    { video_id: 'vid_001', event_type: 'complete', engagement_pct: 95, timestamp: '2026-01-09T15:00:00Z' },
    { video_id: 'vid_002', event_type: 'complete', engagement_pct: 100, timestamp: '2026-01-09T15:10:00Z' },
    { video_id: 'vid_003', event_type: 'complete', engagement_pct: 90, timestamp: '2026-01-09T15:20:00Z' },
    { video_id: 'vid_004', event_type: 'view', engagement_pct: 70, timestamp: '2026-01-10T14:00:00Z' },
    { video_id: 'vid_005', event_type: 'complete', engagement_pct: 100, timestamp: '2026-01-10T14:30:00Z' },
    { video_id: 'vid_006', event_type: 'skip', engagement_pct: 10, timestamp: '2026-01-10T15:00:00Z' },
    { video_id: 'vid_016', event_type: 'view', engagement_pct: 60, timestamp: '2026-01-11T10:00:00Z' },
    { video_id: 'vid_021', event_type: 'complete', engagement_pct: 85, timestamp: '2026-01-11T18:00:00Z' },
  ],
  
  // Cooking enthusiast
  'b8d2e5f1-3c9a-4e7b-a2f5-6d8c9e1a3b4c': [
    { video_id: 'vid_006', event_type: 'complete', engagement_pct: 100, timestamp: '2026-01-09T16:00:00Z' },
    { video_id: 'vid_007', event_type: 'complete', engagement_pct: 95, timestamp: '2026-01-09T16:10:00Z' },
    { video_id: 'vid_008', event_type: 'complete', engagement_pct: 100, timestamp: '2026-01-09T16:20:00Z' },
    { video_id: 'vid_009', event_type: 'view', engagement_pct: 80, timestamp: '2026-01-10T12:00:00Z' },
    { video_id: 'vid_010', event_type: 'complete', engagement_pct: 92, timestamp: '2026-01-10T13:00:00Z' },
    { video_id: 'vid_001', event_type: 'skip', engagement_pct: 5, timestamp: '2026-01-10T14:00:00Z' },
    { video_id: 'vid_011', event_type: 'view', engagement_pct: 50, timestamp: '2026-01-11T08:00:00Z' },
    { video_id: 'vid_026', event_type: 'complete', engagement_pct: 75, timestamp: '2026-01-11T19:00:00Z' },
  ],
  
  // Fitness enthusiast
  'c1e4b7d2-9f3a-4c8e-b5d9-7e2f4a6c8b1d': [
    { video_id: 'vid_011', event_type: 'complete', engagement_pct: 100, timestamp: '2026-01-09T07:00:00Z' },
    { video_id: 'vid_012', event_type: 'complete', engagement_pct: 100, timestamp: '2026-01-09T07:30:00Z' },
    { video_id: 'vid_013', event_type: 'complete', engagement_pct: 95, timestamp: '2026-01-10T06:30:00Z' },
    { video_id: 'vid_014', event_type: 'complete', engagement_pct: 98, timestamp: '2026-01-10T07:00:00Z' },
    { video_id: 'vid_015', event_type: 'complete', engagement_pct: 90, timestamp: '2026-01-10T08:00:00Z' },
    { video_id: 'vid_010', event_type: 'complete', engagement_pct: 85, timestamp: '2026-01-11T10:00:00Z' },
    { video_id: 'vid_006', event_type: 'view', engagement_pct: 60, timestamp: '2026-01-11T12:00:00Z' },
    { video_id: 'vid_037', event_type: 'skip', engagement_pct: 15, timestamp: '2026-01-11T20:00:00Z' },
  ],
  
  // Tech enthusiast
  'd9a2c5e8-4b7f-4d1a-c3e6-8f1b3d5e7a9c': [
    { video_id: 'vid_016', event_type: 'complete', engagement_pct: 100, timestamp: '2026-01-09T15:30:00Z' },
    { video_id: 'vid_017', event_type: 'complete', engagement_pct: 95, timestamp: '2026-01-09T16:00:00Z' },
    { video_id: 'vid_018', event_type: 'complete', engagement_pct: 100, timestamp: '2026-01-10T14:00:00Z' },
    { video_id: 'vid_019', event_type: 'view', engagement_pct: 75, timestamp: '2026-01-10T15:00:00Z' },
    { video_id: 'vid_020', event_type: 'complete', engagement_pct: 90, timestamp: '2026-01-10T16:00:00Z' },
    { video_id: 'vid_037', event_type: 'complete', engagement_pct: 88, timestamp: '2026-01-11T13:00:00Z' },
    { video_id: 'vid_032', event_type: 'skip', engagement_pct: 20, timestamp: '2026-01-11T21:00:00Z' },
  ],
  
  // Test users for rollout percentage testing (tenant4)
  'f1a8c3e6-2b9d-4f7a-c5e8-1d3b6f9a2c4e': [
    { video_id: 'vid_044', event_type: 'complete', engagement_pct: 95, timestamp: '2026-01-10T15:00:00Z' },
  ],
  'f9c2e5a8-7d4b-4a1f-e3c6-8b1d5f2a7c9e': [
    { video_id: 'vid_044', event_type: 'complete', engagement_pct: 95, timestamp: '2026-01-10T15:00:00Z' },
  ],
  '1a2b3c4d-5e6f-4a7b-8c9d-0e1f2a3b4c5d': [
    { video_id: 'vid_044', event_type: 'complete', engagement_pct: 90, timestamp: '2026-01-10T15:00:00Z' },
  ],
  '2b3c4d5e-6f7a-4b8c-9d0e-1f2a3b4c5d6e': [
    { video_id: 'vid_045', event_type: 'complete', engagement_pct: 88, timestamp: '2026-01-10T15:00:00Z' },
  ],
  '3c4d5e6f-7a8b-4c9d-0e1f-2a3b4c5d6e7f': [
    { video_id: 'vid_046', event_type: 'complete', engagement_pct: 92, timestamp: '2026-01-10T15:00:00Z' },
  ],
  '4d5e6f7a-8b9c-4d0e-1f2a-3b4c5d6e7f8a': [
    { video_id: 'vid_044', event_type: 'view', engagement_pct: 75, timestamp: '2026-01-10T15:00:00Z' },
  ],
  '5e6f7a8b-9c0d-4e1f-2a3b-4c5d6e7f8a9b': [
    { video_id: 'vid_045', event_type: 'complete', engagement_pct: 100, timestamp: '2026-01-10T15:00:00Z' },
  ],
  '6f7a8b9c-0d1e-4f2a-3b4c-5d6e7f8a9b0c': [
    { video_id: 'vid_046', event_type: 'complete', engagement_pct: 85, timestamp: '2026-01-10T15:00:00Z' },
  ],
  '7a8b9c0d-1e2f-4a3b-4c5d-6e7f8a9b0c1d': [
    { video_id: 'vid_044', event_type: 'complete', engagement_pct: 93, timestamp: '2026-01-10T15:00:00Z' },
  ],
  '8b9c0d1e-2f3a-4b4c-5d6e-7f8a9b0c1d2e': [
    { video_id: 'vid_045', event_type: 'skip', engagement_pct: 20, timestamp: '2026-01-10T15:00:00Z' },
  ],
};

// Mock tenant configurations
const tenantConfigs = {
  'tenant1': {
    personalization_enabled: true,
    personalization_weights: {
      watch_history: 0.5,
      engagement: 0.3,
      editorial: 0.2,
    },
    rollout_percentage: 100,
  },
  'tenant2': {
    personalization_enabled: true,
    personalization_weights: {
      watch_history: 0.7,
      engagement: 0.2,
      editorial: 0.1,
    },
    rollout_percentage: 100,
  },
  'tenant3': {
    personalization_enabled: false, // Feature flag disabled
    personalization_weights: {
      watch_history: 0.5,
      engagement: 0.3,
      editorial: 0.2,
    },
    rollout_percentage: 0,
  },
  'tenant4': {
    personalization_enabled: true,
    personalization_weights: {
      watch_history: 0.5,
      engagement: 0.3,
      editorial: 0.2,
    },
    rollout_percentage: 50, // Only 50% of users get personalization (A/B test)
  },
};

module.exports = {
  videos,
  userSignals,
  tenantConfigs,
};
