import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store, createFeatureSelector } from '@ngrx/store';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BrowseState } from '../shared/models/browse-search.model';
import { currentView } from '../shared/models/viewconfig.model';

const selectBrowseState = createFeatureSelector<BrowseState>('browse-search');
const selectViewConfig = createFeatureSelector<currentView>('viewConfig');

@Component({
  selector: 'custom-back-to-browse-home-button',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './back-to-browse-home-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
  styleUrl: './back-to-browse-home-button.component.css'
})
export class BackToBrowseHomeButtonComponent {
  private store = inject(Store);
  browseState = this.store.selectSignal(selectBrowseState);
  viewConfig = this.store.selectSignal(selectViewConfig);
  currentView = this.viewConfig()?.config?.vid;
  showResults = this.browseState()?.isBrowseSearch; // true if the user is viewing browse search results, false if on the browse home page
  browseHomeUrl = `/nde/browse?lang=en&vid=${this.currentView}`;

}
