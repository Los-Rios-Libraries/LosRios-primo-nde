import { Component, inject, signal, ChangeDetectionStrategy, DestroyRef, afterNextRender } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { VIEW_CONSTANTS } from '../shared/constants/app.constants';

@Component({
  selector: 'custom-norequests-message',
  standalone: true,
  imports: [MatIconModule, MatTooltipModule],
  templateUrl: './norequests-message.component.html',
  styleUrl: './norequests-message.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NorequestsMessageComponent {
  private readonly store = inject(Store);
  private readonly destroyRef = inject(DestroyRef);

  readonly faqUrl = `https://answers.library.losrios.edu/${VIEW_CONSTANTS.libraryAcronym}/faq/${VIEW_CONSTANTS.noRequestsFaqId}`;

  // Read-only signal created directly from NgRx Store state; is there more than one location in the bib?
  readonly moreThanOneHolding = this.store.selectSignal((state: any) => {
    const locArr =
      state?.locations?.['full-display']?.getItLocations?.locations ??
      state?.['full-display']?.getItLocations?.locations;

    return Array.isArray(locArr) && locArr.length > 1; // returns true if there is more than one location
  });

  readonly norequests = signal(false);

  // strategy is to query DOM because otherwise we cannot determine if the alert is showing. Looking for class 'no-requests' occuring as child of 'nde-requests'

  constructor() {
    // Ensures DOM execution occurs safely after Angular completes initial rendering
    afterNextRender(() => {
      this.updateElementState();
      this.setupObserver();
    });
  }

  private setupObserver(): void {
    const targetNode = document.querySelector('nde-requests') || document.body;
    const observer = new MutationObserver(() => {
      this.updateElementState();
    });

    observer.observe(targetNode, {
      childList: true,
      subtree: true
    });

    // Auto-cleanup when component is destroyed without requiring OnDestroy hook
    this.destroyRef.onDestroy(() => observer.disconnect());
  }

  private updateElementState(): void {
    const exists = document.querySelector('.no-requests') !== null;
    this.norequests.set(exists);
  }
}