// In order for a banner to be displayed, there must be an active alert in the LibAnswers LRSA group with a designated topic in the form of [acronym]-onesearch. Example: 
// scc-onesearch
// If the user clicks the dismiss button, a cookie is set to prevent that specific alert from showing again for 30 days. The cookie name is dynamically generated based on the content of the alert to ensure uniqueness. 
import { Component, inject, signal, computed } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { alertResponse } from '../shared/models/faq.model';
import { CachedHttpService } from '../services/cached-http.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatTooltip} from '@angular/material/tooltip';
import { MatIcon } from '@angular/material/icon';
import { VIEW_CONSTANTS } from '../shared/constants/app.constants';
import { CookieService } from '../services/cookie.service'; 

@Component({
  selector: 'custom-header-banner',
  standalone: true,
  imports: [HttpClientModule, MatIconModule, MatButtonModule, MatTooltip, MatIcon],
  providers: [CachedHttpService],
  templateUrl: './header-banner.component.html',
  styleUrl: './header-banner.component.css'
})
export class HeaderBannerComponent {
  private cachedHttp = inject(CachedHttpService);
  private cookieService = inject(CookieService);

  // 1. Fetch the alert data
  alert = toSignal(
    this.cachedHttp.get<alertResponse[]>({
      url: `https://na-workflows.hosted.exlibrisgroup.com/60d0c170-306f-43b5-a6a4-a9d81bda2fc4/webhook/lrsa-posts?topic=${VIEW_CONSTANTS.libraryAcronym}-onesearch`,
      cacheKey: `header_alert_cache_${VIEW_CONSTANTS.libraryAcronym}`,
      emptyFallback: [],
      cacheDurationMs: 10 * 60 * 1000, 
    }),
    { initialValue: [] },
  );

  // 2. Extract just the first item (or null if empty)
  // Note: I used .length > 0 here. If you strictly want it ONLY when length === 1, 
  // you can change this to `alerts.length === 1 ? alerts[0] : null`.
  primaryAlert = computed(() => {
    const alerts = this.alert();
    return alerts.length > 0 ? alerts[0] : null;
  });

  // 2. Dynamically compute the cookie name once the alert is loaded
 // 2. Dynamically compute the cookie name once the alert is loaded
  cookieName = computed(() => {
    const alertItem = this.primaryAlert(); // Use the computed primary alert directly!
    if (alertItem?.question) {
      const snippet = alertItem.url.split('/').filter(Boolean).pop() ?? 'default';
      return `hide_alert_${snippet}_${VIEW_CONSTANTS.libraryAcronym}`;
    }
    return null;
  });

  // 3. Track explicit dismissals during the current user session
  manuallyDismissed = signal<boolean>(false);

  // Track the CSS animation state
  isHiding = signal<boolean>(false);

  // 4. Compute final display status based on the cookie OR session dismissal
  isDismissed = computed(() => {
    if (this.manuallyDismissed()) {
      return true;
    }
    
    const name = this.cookieName();
    if (name) {
      return this.cookieService.get(name) === 'true';
    }
    
    return false;
  });

  /**
   * Hides the banner immediately and sets the dynamic cookie
   */
  dismissBanner(): void {
    // Immediately trigger the CSS transition class
    this.isHiding.set(true);
    // Wait exactly 300ms for the animation to finish, THEN update the DOM/Cookies
    setTimeout(() => {
      const name = this.cookieName();
      if (name) {
        this.cookieService.set(name, 'true', 30); // Hide for 30 days
        this.manuallyDismissed.set(true); // Angular @if removes it completely
      }
    }, 300)
  }
}