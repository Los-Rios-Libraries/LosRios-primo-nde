import { Component, inject } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs'; // 1. Imported map operator
import { CollectionItem } from '../shared/models/collection.model';
import { CachedHttpService } from '../services/cached-http.service';
import { ArrayUtilsService } from '../services/array-utils.service';
import { MatGridListModule } from '@angular/material/grid-list'; 
import { MatIconModule } from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { VIEW_CONSTANTS } from '../shared/constants/app.constants';

@Component({
  selector: 'custom-homepage-collections-widget',
  standalone: true,
  imports: [HttpClientModule, MatGridListModule, MatTooltipModule, MatIconModule, MatButtonModule],
  providers: [CachedHttpService],
  templateUrl: './homepage-collections-widget.component.html',
  styleUrl: './homepage-collections-widget.component.css',
})
export class HomepageCollectionsWidgetComponent {
  private cachedHttp = inject(CachedHttpService);
  private arrayUtils = inject(ArrayUtilsService); // 2. Switched to inject() to avoid initialization order bugs

  college = VIEW_CONSTANTS.libraryAcronym;
  thumbnailBaseURL = '/view/delivery/thumbnail/01CACCL_LRCCD/';
  collectionPage = `/discovery/collectionDiscovery?vid=01CACCL_LRCCD:${this.college.toUpperCase()}&collectionId=`;
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
// responsive solution from https://stackoverflow.com/a/48499719/1903000
  numInRow: number = 4; // Default to 4 columns for desktop
  itemHeight: string = '4:3'; // Aspect ratio for thumbnails
  constructor() {  }

  ngOnInit() {
    if (window.innerWidth <= 512) {
      this.numInRow = 1;
    } else if (window.innerWidth > 512 && window.innerWidth <= 890) {
      this.numInRow = 2;
    } else {
      this.numInRow = 4;
    }
    this.itemHeight = (window.innerWidth <= 768) ? '140' : '4:3'; // fixed height for mobile, 4:3 for desktop
  }
  
  
}