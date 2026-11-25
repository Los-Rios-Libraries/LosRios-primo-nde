import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { createFeatureSelector, Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs'; // 1. Imported map operator
import { CollectionItem } from '../shared/models/collection.model';
import { CachedHttpService } from '../services/cached-http.service';
import { ArrayUtilsService } from '../services/array-utils.service';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { VIEW_CONSTANTS } from '../shared/constants/app.constants';
import { currentView } from '../shared/models/viewconfig.model';
import { SHELL_ROUTER } from '../injection-tokens';

const selectViewConfig = createFeatureSelector<currentView>('viewConfig');

@Component({
  selector: 'custom-homepage-collections-widget',
  standalone: true,
  imports: [MatTooltipModule, MatIconModule, MatButtonModule, MatCardModule],
  providers: [CachedHttpService],
  templateUrl: './homepage-collections-widget.component.html',
  styleUrl: './homepage-collections-widget.component.css',
})
export class HomepageCollectionsWidgetComponent {
  // get current view code
  private store = inject(Store);
  viewConfig = this.store.selectSignal(selectViewConfig);
  currentView = this.viewConfig()?.config?.vid;


  
  private cachedHttp = inject(CachedHttpService);
  private arrayUtils = inject(ArrayUtilsService);

  college = VIEW_CONSTANTS.libraryAcronym;
  thumbnailBaseURL = '/view/delivery/thumbnail/01CACCL_LRCCD/';
  collectionPage = `/collectionDiscovery?vid=${this.currentView}&collectionId=`;
  collectionRoot = VIEW_CONSTANTS.collectionRoot;
 


  collections = toSignal(
    this.cachedHttp.get<CollectionItem[]>({
      url: `https://na-workflows.hosted.exlibrisgroup.com/60d0c170-306f-43b5-a6a4-a9d81bda2fc4/webhook/collections-for-nde?college=${this.college}`,
      cacheKey: `collections_cache_${this.college}`,
      emptyFallback: [],
      cacheDurationMs: 5 * 60 * 60 * 1000, // 5 hours
    }).pipe(
      // Shuffle the array and take only the first x items
      map(data => this.arrayUtils.shuffle(data).slice(0, 4))
    ),
    { initialValue: [] },
  );

  constructor() {}

  goToCollection(collection: CollectionItem): void {
    this.navigateToCollection(collection.col_id);
  }

  goToAllCollections(event: Event): void {
    this.navigateToCollection(this.collectionRoot, event);
  }

  private navigateToCollection(collectionId: string, event?: Event): void {
    event?.preventDefault();
    const vid = this.viewConfig()?.config?.vid;
    this.router.navigate(['/collectionDiscovery'], {
      queryParams: {
        vid,
        collectionId,
      },
    });
  }
}