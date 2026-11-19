import { Component, inject } from '@angular/core';
import { Store, createFeatureSelector, createSelector } from '@ngrx/store';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BrowseState } from '../shared/models/browse-search.model';
import { currentView } from '../shared/models/viewconfig.model';

const selectBrowseState = createFeatureSelector<BrowseState>('browse-search');
const selectIsBrowseSearch = createSelector(
  selectBrowseState,
  (state) => Boolean(state?.isBrowseSearch)
);

const selectViewConfig = createFeatureSelector<currentView>('viewConfig');
const selectVid = createSelector(
  selectViewConfig,
  (view) => view?.config?.vid ?? ''
);

@Component({
  selector: 'custom-back-to-browse-home-button',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './back-to-browse-home-button.component.html',
  styleUrl: './back-to-browse-home-button.component.css'
})
export class BackToBrowseHomeButtonComponent {
  private store = inject(Store);

  showResults = this.store.selectSignal(selectIsBrowseSearch);
  browseHomeUrl = `/nde/browse?lang=en&vid=${this.store.selectSignal(selectViewConfig)()?.config?.vid ?? ''}`;
}