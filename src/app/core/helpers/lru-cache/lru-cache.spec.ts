import { LRUCache } from '@core/helpers/lru-cache/lru-cache';

describe('LRUCache', () => {
  it('should initialize with default capacity', () => {
    const cache = new LRUCache<string, string>();
    expect(cache).toBeTruthy();
  });

  it('should initialize with custom capacity', () => {
    const cache = new LRUCache<string, string>(2);
    cache.put('1', 'one');
    cache.put('2', 'two');
    cache.put('3', 'three');

    expect(cache.has('1')).toBeFalsy();
    expect(cache.get('2')).toBe('two');
    expect(cache.get('3')).toBe('three');
  });

  it('should return null for non-existent keys', () => {
    const cache = new LRUCache<string, string>();
    expect(cache.get('non-existent')).toBeNull();
  });

  it('should return true/false for has', () => {
    const cache = new LRUCache<string, string>();
    cache.put('key1', 'value1');
    expect(cache.has('key1')).toBeTruthy();
    expect(cache.has('key2')).toBeFalsy();
  });

  it('should delete a value', () => {
    const cache = new LRUCache<string, string>();
    cache.put('key1', 'value1');
    expect(cache.has('key1')).toBeTruthy();
    cache.delete('key1');
    expect(cache.has('key1')).toBeFalsy();
    expect(cache.get('key1')).toBeNull();
  });

  it('should evict the oldest element when exceeding capacity', () => {
    const cache = new LRUCache<string, string>(3);
    cache.put('a', '1');
    cache.put('b', '2');
    cache.put('c', '3');
    cache.put('d', '4');

    expect(cache.has('a')).toBeFalsy();
    expect(cache.has('b')).toBeTruthy();
    expect(cache.has('c')).toBeTruthy();
    expect(cache.has('d')).toBeTruthy();
  });

  it('should update eviction order on get', () => {
    const cache = new LRUCache<string, string>(3);
    cache.put('a', '1');
    cache.put('b', '2');
    cache.put('c', '3');

    // access 'a' to make it the most recently used
    cache.get('a');

    // add a new element, 'b' should be evicted instead of 'a'
    cache.put('d', '4');

    expect(cache.has('b')).toBeFalsy();
    expect(cache.has('a')).toBeTruthy();
    expect(cache.has('c')).toBeTruthy();
    expect(cache.has('d')).toBeTruthy();
  });

  it('should update eviction order and value on put of existing key', () => {
    const cache = new LRUCache<string, string>(3);
    cache.put('a', '1');
    cache.put('b', '2');
    cache.put('c', '3');

    // update 'a' to make it the most recently used
    cache.put('a', 'updated-1');

    // add a new element, 'b' should be evicted instead of 'a'
    cache.put('d', '4');

    expect(cache.get('a')).toBe('updated-1');
    expect(cache.has('b')).toBeFalsy();
    expect(cache.has('c')).toBeTruthy();
    expect(cache.has('d')).toBeTruthy();
  });
});
