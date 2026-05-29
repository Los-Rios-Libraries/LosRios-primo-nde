// cached-http.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap, map, catchError } from 'rxjs';
import { ApiWrapper, CacheConfig } from '../shared/models/cached-http.models';

@Injectable() 
export class CachedHttpService {
  private http = inject(HttpClient); 
  private readonly DEFAULT_DURATION = 3 * 60 * 60 * 1000; 

  get<T>(config: CacheConfig<T>): Observable<T> {
    const storage = config.storageType === 'session' ? sessionStorage : localStorage;
    const key = config.cacheKey;

    const cachedString = storage.getItem(key);
    let staleData: T | null = null;
    
    // 1. Read Cache
    if (cachedString) {
      const entry = JSON.parse(cachedString);
      staleData = entry.data as T; 

      // 2. Conditional Expiry Check
      if (config.storageType === 'session') {
        // Session storage? Trust it implicitly.
        return of(staleData);
      } else {
        // Local storage? Check the timestamp.
        const duration = config.cacheDurationMs ?? this.DEFAULT_DURATION;
        if (Date.now() - entry.timestamp < duration) {
          return of(staleData); 
        }
      }
    }

    // 3. Network with Error Fallback (Unchanged)
    return this.http.get<ApiWrapper<T>>(config.url).pipe(
      map(res => res.data),
      tap(data => {
        storage.setItem(key, JSON.stringify({
          timestamp: Date.now(),
          data: data
        }));
      }),
      catchError((error) => {
        console.warn(`[Network Error] Failed to fetch ${config.url}.`, error);
        if (staleData) return of(staleData);
        return of(config.emptyFallback);
      })
    );
  }
}