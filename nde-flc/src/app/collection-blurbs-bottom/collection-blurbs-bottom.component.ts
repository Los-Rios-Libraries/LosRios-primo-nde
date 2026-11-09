import {  Component, inject,  ChangeDetectionStrategy } from '@angular/core';
import { Store, createFeatureSelector } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { VIEW_CONSTANTS } from '../shared/constants/app.constants';

const selectCollectionDiscovery = createFeatureSelector<any>('collectionDiscovery');

@Component({
  selector: 'custom-collection-blurbs',
  standalone: true,
  imports: [MatIconModule, MatCardModule],
  templateUrl: './collection-blurbs-bottom.component.html',
  styleUrl: './collection-blurbs-bottom.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionBlurbsBottomComponent {
  private store = inject(Store);
  collectionDiscovery = toSignal(this.store.select(selectCollectionDiscovery));

  collectionWithBlurb = VIEW_CONSTANTS.collectionsWithBlurbs;

  collectionHasBlurb = () => {
    return this.collectionWithBlurb.includes(this.collectionDiscovery()?.currentCollectionId);
  }


}
