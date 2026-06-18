interface CacheEntry<V> {
  value: V;
  expiry: number;
}

export class LRUCache<T, V> {
  private readonly capacity: number;
  private readonly ttlSeconds: number;
  private cache: Map<T, CacheEntry<V>>;
  private readonly DEFAULT_MAX_CACHE_SIZE: number = 1000;

  constructor(capacity: number = this.DEFAULT_MAX_CACHE_SIZE, ttlSeconds: number = Infinity) {
    this.capacity = capacity;
    this.ttlSeconds = ttlSeconds;
    this.cache = new Map<T, CacheEntry<V>>();
  }

  get(key: T): V | null {
    if (!this.cache.has(key)) return null;
    const entry = this.cache.get(key)!;
    if (entry.expiry < Date.now()) {
      this.cache.delete(key);
      return null;
    }
    this.cache.delete(key);
    this.cache.set(key, entry);
    return entry.value;
  }

  put(key: T, value: V): void {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }
    const expiry = this.ttlSeconds === Infinity ? Infinity : Date.now() + this.ttlSeconds * 1000;
    this.cache.set(key, { value, expiry });
    if (this.cache.size > this.capacity) {
      const oldestKey: T = this.cache.keys().next().value!;
      this.cache.delete(oldestKey);
    }
  }

  has(key: T): boolean {
    if (!this.cache.has(key)) return false;
    const entry = this.cache.get(key)!;
    if (entry.expiry < Date.now()) {
      this.cache.delete(key);
      return false;
    }
    return true;
  }

  delete(key: T): void {
    this.cache.delete(key);
  }

  keys(): IterableIterator<T> {
    const now = Date.now();
    const expired: T[] = [];
    for (const [key, entry] of this.cache.entries()) {
      if (entry.expiry < now) {
        expired.push(key);
      }
    }
    for (const key of expired) {
      this.cache.delete(key);
    }
    return this.cache.keys();
  }
}
