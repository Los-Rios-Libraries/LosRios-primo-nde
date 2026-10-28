import { Component, inject } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { MatGridListModule } from '@angular/material/grid-list';
import { VIEW_CONSTANTS } from '../shared/constants/app.constants';
import { ArrayUtilsService } from '../services/array-utils.service'; 
import { samples, gridImages } from './search-samples';

@Component({
  selector: 'custom-journal-search-landing',
  standalone: true,
  imports: [MatTabsModule, MatCardModule, MatIcon, MatTooltip, MatGridListModule],
  templateUrl: './journal-search-landing.component.html',
  styleUrl: './journal-search-landing.component.css'
})
export class JournalSearchLandingComponent {
  private arrayUtils = inject(ArrayUtilsService);
  viewCode = `01CACCL_LRCCD:${VIEW_CONSTANTS.libraryAcronym.toUpperCase()}`;
  urlRoot = `/nde/jsearch?&tab=jsearch_slot&search_scope=jsearch_scope&offset=0&lang=en&vid=${this.viewCode}&query=`;
  homepageUrl = `/nde/home?vid=${this.viewCode}`;
  browzineUrl = `https://browzine.com/libraries/${VIEW_CONSTANTS.browzineID}/`;

  // Shuffles array via ArrayUtilsService and takes up to 4 items for links
  selectedSamples = this.arrayUtils.shuffle(samples).slice(0, 4);
  // up to 5 images
  periodicalImages = this.arrayUtils.shuffle(gridImages).slice(0, 5);
}