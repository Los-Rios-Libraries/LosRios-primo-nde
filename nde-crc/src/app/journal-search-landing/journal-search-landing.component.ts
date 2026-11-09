import { Component, inject } from '@angular/core';
import { Store, createFeatureSelector } from '@ngrx/store';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { MatGridListModule } from '@angular/material/grid-list';
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
  private store = inject(Store);
  viewConfig = this.store.selectSignal(selectViewConfig);
  currentView = this.viewConfig()?.config?.vid;
  private arrayUtils = inject(ArrayUtilsService);
  urlRoot = `/nde/jsearch?&tab=jsearch_slot&search_scope=jsearch_scope&offset=0&lang=en&vid=${this.currentView}&query=`;
  homepageUrl = `/nde/home?vid=${this.currentView}`;
  browzineUrl = `https://browzine.com/libraries/${VIEW_CONSTANTS.browzineID}/`;

  // Shuffles array via ArrayUtilsService and takes up to 4 items for links
  selectedSamples = this.arrayUtils.shuffle(samples).slice(0, 4);
  // up to 5 images
  periodicalImages = this.arrayUtils.shuffle(gridImages).slice(0, 5);
}