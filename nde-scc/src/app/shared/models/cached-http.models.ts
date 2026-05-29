// cached-http.models.ts
export interface ApiWrapper<T> {
  data: T;
}

export interface CacheConfig<T> {
  url: string;
  cacheKey: string;
  emptyFallback: T; // What to return if network fails AND no cache exists
  cacheDurationMs?: number; 
  storageType?: 'local' | 'session'; 
}