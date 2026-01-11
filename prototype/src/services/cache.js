const { CACHE_TTL } = require('../config/constants');

/**
 * Simple in-memory cache with TTL support
 */
class SimpleCache {
  constructor() {
    this.store = new Map();
  }

  /**
   * Set a value in cache with TTL
   */
  set(key, value, ttlSeconds = CACHE_TTL.FEED) {
    this.store.set(key, {
      value,
      expires: Date.now() + (ttlSeconds * 1000),
    });
  }

  /**
   * Get a value from cache
   */
  get(key) {
    const item = this.store.get(key);
    
    if (!item) {
      return null;
    }
    
    // Check if expired
    if (Date.now() > item.expires) {
      this.store.delete(key);
      return null;
    }
    
    return item.value;
  }

  /**
   * Clear all cache entries
   */
  clear() {
    this.store.clear();
  }

  /**
   * Get cache statistics
   */
  getStats() {
    const now = Date.now();
    let validEntries = 0;
    let expiredEntries = 0;
    
    this.store.forEach(item => {
      if (now > item.expires) {
        expiredEntries++;
      } else {
        validEntries++;
      }
    });
    
    return {
      total: this.store.size,
      valid: validEntries,
      expired: expiredEntries,
    };
  }
}

// Singleton instance
const cache = new SimpleCache();

// Clean up expired entries every minute
setInterval(() => {
  const now = Date.now();
  const keysToDelete = [];
  
  cache.store.forEach((item, key) => {
    if (now > item.expires) {
      keysToDelete.push(key);
    }
  });
  
  keysToDelete.forEach(key => cache.store.delete(key));
  
  if (keysToDelete.length > 0) {
    console.log(`Cache cleanup: removed ${keysToDelete.length} expired entries`);
  }
}, 60000);

module.exports = cache;
