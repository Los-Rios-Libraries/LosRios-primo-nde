import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CookieService {

  /**
   * Sets a cookie with a specific name, value, and expiration period.
   * @param name Name of the cookie
   * @param value Value of the cookie
   * @param days Number of days until expiration (optional)
   * @param path Path where the cookie is accessible (defaults to '/')
   */
  set(name: string, value: string, days?: number, path: string = '/'): void {
    let expires = '';
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = `; expires=${date.toUTCString()}`;
    }
    
    // Secure and SameSite=Lax are modern best practices for cookie safety
    document.cookie = `${name}=${encodeURIComponent(value)}${expires}; path=${path}; SameSite=Lax; Secure`;
  }

  /**
   * Retrieves a cookie by its name.
   * @param name Name of the cookie to retrieve
   * @returns The string value of the cookie, or null if not found
   */
  get(name: string): string | null {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1, c.length);
      }
      if (c.indexOf(nameEQ) === 0) {
        return decodeURIComponent(c.substring(nameEQ.length, c.length));
      }
    }
    return null;
  }

  /**
   * Deletes a cookie by setting its expiration date to the past.
   * @param name Name of the cookie to delete
   * @param path Path where the cookie was set (defaults to '/')
   */
  delete(name: string, path: string = '/'): void {
    this.set(name, '', -1, path);
  }
}