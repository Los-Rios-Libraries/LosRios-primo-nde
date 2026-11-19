import { Component, computed, inject } from '@angular/core';
import { Store, createFeatureSelector } from '@ngrx/store';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { MatGridListModule } from '@angular/material/grid-list';
import { SHELL_ROUTER } from '../injection-tokens';
import { VIEW_CONSTANTS } from '../shared/constants/app.constants';
import { ArrayUtilsService } from '../services/array-utils.service';
import { samples, gridImages } from './search-samples';
import { currentView } from '../shared/models/viewconfig.model';

const selectViewConfig = createFeatureSelector<currentView>('viewConfig');

@Component({
  selector: 'custom-journal-search-landing',
  standalone: true,
  imports: [MatTabsModule, MatCardModule, MatIcon, MatTooltip, MatGridListModule],
  templateUrl: './journal-search-landing.component.html',
  styleUrl: './journal-search-landing.component.css'
})
export class JournalSearchLandingComponent {
  private router = inject(SHELL_ROUTER);
  private store = inject(Store);
  private arrayUtils = inject(ArrayUtilsService);

  viewConfig = this.store.selectSignal(selectViewConfig);
  currentView = computed(() => this.viewConfig()?.config?.vid ?? '');

  browzineUrl = `https://browzine.com/libraries/${VIEW_CONSTANTS.browzineID}/`;

  // Shuffles array via ArrayUtilsService and takes up to 4 items for links
  selectedSamples = this.arrayUtils.shuffle(samples).slice(0, 4);
  // Up to 5 images
  periodicalImages = this.arrayUtils.shuffle(gridImages).slice(0, 5);

  getFullDisplayUrl(docId: string): string {
    return `/nde/jfulldisplay?context=L&vid=${this.currentView()}&search_scope=jsearch_scope&tab=jsearch_slot&lang=en&docid=alma${docId}`;
  }

  getHomepageUrl(): string {
    return `/nde/home?vid=${this.currentView()}`;
  }

  getSampleSearchUrl(sample: string): string {
    return `/nde/jsearch?tab=jsearch_slot&search_scope=jsearch_scope&offset=0&lang=en&vid=${this.currentView()}&query=${encodeURIComponent(sample)}`;
  }

  navigateToFullDisplay(event: MouseEvent, docId: string): void {
    this.navigateWithShellRouter(event, ['/jfulldisplay'], {
      context: 'L',
      vid: this.currentView(),
      search_scope: 'jsearch_scope',
      tab: 'jsearch_slot',
      lang: 'en',
      docid: `alma${docId}`
    });
  }

  navigateToHome(event: MouseEvent): void {
    this.navigateWithShellRouter(event, ['/home'], {
      vid: this.currentView()
    });
  }

  navigateToSampleSearch(event: MouseEvent, sample: string): void {
    this.navigateWithShellRouter(event, ['/jsearch'], {
      tab: 'jsearch_slot',
      search_scope: 'jsearch_scope',
      offset: 0,
      lang: 'en',
      vid: this.currentView(),
      query: sample
    });
  }

  private navigateWithShellRouter(
    event: MouseEvent,
    commands: string[],
    queryParams: Record<string, string | number>
  ): void {
    // Allow default browser behavior for middle-click or Ctrl/Cmd/Shift+click (open in new tab)
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.button !== 0) {
      return;
    }
    event.preventDefault();
    this.router.navigate(commands, { queryParams });
  }
}