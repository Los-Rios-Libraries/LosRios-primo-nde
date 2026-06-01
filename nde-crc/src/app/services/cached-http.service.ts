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

    // 3. Network with Error Fallback (UPDATED)
    return this.http.get<ApiWrapper<T> | null>(config.url).pipe(
      map(res => {
        // Safely check if the response is empty/null. 
        // If it is, immediately return the safe fallback provided by the component.
        if (!res || res.data === undefined || res.data === null) {
          return config.emptyFallback;
        }
        return res.data;
      }),
      tap(data => {
        // Because of the safe map above, this will now successfully trigger 
        // and save the empty state to localStorage!
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