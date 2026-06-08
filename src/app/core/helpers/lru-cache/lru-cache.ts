export class LRUCache<T, V> {
  private readonly capacity: number;
  private cache: Map<T, V>;
  private readonly DEFAULT_MAX_CACHE_SIZE: number = 1000;

  constructor(capacity: number = this.DEFAULT_MAX_CACHE_SIZE) {
    this.capacity = capacity;
    this.cache = new Map<T, V>();
  }

  get(key: T): V | null {
    if (!this.cache.has(key)) return null;
    const value: V = this.cache.get(key)!;
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }

  put(key: T, value: V): void {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }
    this.cache.set(key, value);
    if (this.cache.size > this.capacity) {
      const oldestKey: T = this.cache.keys().next().value!;
      this.cache.delete(oldestKey);
    }
  }

  has(key: T): boolean {
    return this.cache.has(key);
  }

  delete(key: T): void {
    this.cache.delete(key);
  }
}
