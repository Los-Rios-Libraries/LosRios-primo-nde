// cached-http.service.ts
import { Injectable } from '@angular/core';
import { Observable, of, from, tap, map, catchError } from 'rxjs';
import { ApiWrapper, CacheConfig } from '../shared/models/cached-http.models';

@Injectable() 
export class CachedHttpService {
  private readonly DEFAULT_DURATION = 3 * 60 * 60 * 1000; 

  get<T>(config: CacheConfig<T>): Observable<T> {
    const storage = config.storageType === 'session' ? sessionStorage : localStorage;
    const key = config.cacheKey;
    const cachedString = storage.getItem(key);
    let staleData: T | null = null;
    
    // 1. Read Cache & Check Expiry
    if (cachedString) {
      const entry = JSON.parse(cachedString);
      staleData = entry.data as T; 

      if (config.storageType === 'session') {
        return of(staleData);
      } else {
        const duration = config.cacheDurationMs ?? this.DEFAULT_DURATION;
        if (Date.now() - entry.timestamp < duration) {
          return of(staleData); 
        }
      }
    }

    // 2. Native Fetch API Call
    const fetchPromise = fetch(config.url).then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // Cast the resulting JSON to your ApiWrapper interface
      return response.status === 204 
        ? null 
        : response.json() as Promise<ApiWrapper<T>>; 
    });

    // 3. Convert Promise to RxJS Observable
    return from(fetchPromise).pipe(
      // 'res' is now strictly typed as ApiWrapper<T> | null, no more 'any'!
      map(res => { 
        if (!res || res.data === undefined || res.data === null) {
          return config.emptyFallback;
        }
        return res.data;
      }),
      // ... tap and catchError
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