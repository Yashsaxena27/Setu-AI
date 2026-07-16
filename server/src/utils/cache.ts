type CacheItem<T> = {
  value: T;
  expiry: number;
};

class MemoryCache {
  private store = new Map<string, CacheItem<any>>();

  get<T>(key: string): T | null {
    const item = this.store.get(key);

    if (!item) return null;

    if (Date.now() > item.expiry) {
      this.store.delete(key);
      return null;
    }

    return item.value;
  }

  set<T>(key: string, value: T, ttl = 1000 * 60 * 60) {
    this.store.set(key, {
      value,
      expiry: Date.now() + ttl,
    });
  }

  clear() {
    this.store.clear();
  }
}

export const cache = new MemoryCache();