module.exports = {
  PORT: process.env.PORT || 3001,
  PERSONALIZATION_ENABLED: process.env.PERSONALIZATION_ENABLED !== 'false',
  CACHE_TTL: {
    FEED: 60, // seconds
    USER_SIGNALS: 300, // 5 minutes
    TENANT_CONFIG: 900, // 15 minutes
  },
};
