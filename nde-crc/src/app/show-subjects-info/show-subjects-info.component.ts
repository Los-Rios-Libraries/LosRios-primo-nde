import { Component, inject, computed, ChangeDetectionStrategy, signal, } from '@angular/core';
import { Store, createFeatureSelector } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { VIEW_CONSTANTS } from '../shared/constants/app.constants';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CookieService } from '../services/cookie.service';
import { PrimoRouterState } from '../shared/models/routerState.model';
import { selectedRecordId } from '../shared/models/fulldisplay.model';

const selectFullDisplay = createFeatureSelector<selectedRecordId>('full-display');
const selectSearchResults = createFeatureSelector<any>('Search');
const selectRouterState = createFeatureSelector<PrimoRouterState>('routerState');


@Component({
  selector: 'custom-show-subjects-info',
  standalone: true,
  imports: [MatIconModule, MatCardModule, MatButtonModule, MatTooltipModule],
  templateUrl: './show-subjects-info.component.html',
  styleUrl: './show-subjects-info.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowSubjectsInfoComponent {
  private store = inject(Store);
  private cookieService = inject(CookieService);

  // toSignal is used because selectSignal with selectFullDisplay did not work
  fullDisplay = toSignal(this.store.select(selectFullDisplay));
  searchResults = this.store.selectSignal(selectSearchResults);
  routerState = this.store.selectSignal(selectRouterState);

  faqUrl = `https://answers.library.losrios.edu/${VIEW_CONSTANTS.libraryAcronym}/faq/${VIEW_CONSTANTS.subjectInfoFaqId}`;
  cookieName = 'lr-hide-subjects-info';

  // Tracks explicit dismissals during the current session so computed() reacts immediately
  manuallyDismissed = signal<boolean>(false);

  // True if dismissed in the current session OR via the persisted cookie
  isDismissed = computed(
    () =>
      this.manuallyDismissed() ||
      this.cookieService.get(this.cookieName) === 'true'
  );

  hasSubjects = computed(() => {
    const record = this.fullDisplay()?.selectedRecordId;
    const pageType = this.routerState()?.routerState;
    if (!record) return false;
    if (pageType !== 'fulldisplay') return false;

    const subjects =
      this.searchResults()?.entities?.[record]?.pnx?.display?.subject;
    return Array.isArray(subjects) && subjects.length > 0;
  });

  isSubjectSearch = computed(() => {
    const query = this.searchResults()?.searchParams?.q;
    const pageType = this.routerState()?.routerState;

    if (!query) return false;
    if (pageType === 'fulldisplay') return false;

    const queryText = Array.isArray(query) ? query.join(' ') : String(query);
    return /sub,(contains|exact),/i.test(queryText);
  });

  facetActive = computed(() => {
    const facets = this.searchResults()?.searchParams?.qInclude;
    const pageType = this.routerState()?.routerState;
    if (pageType === 'fulldisplay') return false;
    return (
      facets?.some((facet: string) => facet.includes('facet_topic')) ?? false
    );
  });

  // Always show if hasSubjects() is true; otherwise show only if not dismissed
  showCard = computed(
    () =>
      this.hasSubjects() ||
      (!this.isDismissed() && (this.facetActive() || this.isSubjectSearch()))
  );

  // Show dismiss button only for facet/subject searches, never when hasSubjects() is true
  showDismissButton = computed(
    () => !this.hasSubjects() && (this.facetActive() || this.isSubjectSearch())
  );

  dismissCard(): void {
    this.cookieService.set(this.cookieName, 'true', 60);
    this.manuallyDismissed.set(true);
  }
}