import { Input, Component, inject, computed } from '@angular/core';
import { Store, createFeatureSelector } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { VIEW_CONSTANTS } from '../shared/constants/app.constants';
import { MatIconModule } from '@angular/material/icon';


const selectDeliveryState = createFeatureSelector<any>('Delivery');
const selectCollectionState = createFeatureSelector<any>('collectionDiscovery');

@Component({
  selector: 'custom-show-availability',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './show-availability.component.html',
  styleUrl: './show-availability.component.scss',
})
export class ShowAvailabilityComponent {
  // 1. Inject the store
  private store = inject(Store);

  // 1. Retrieve key 'Delivery'
  delivery = toSignal(this.store.select(selectDeliveryState));

  // 2. Retrieve key 'Collection'
  collection = toSignal(this.store.select(selectCollectionState));

  showElement = computed(() => {
    if (VIEW_CONSTANTS.collectionsShowingAvailability.indexOf(this.collection().currentCollectionId) > -1) {
      return true;
    } else {
      return false;
    }
  });

  available = computed(() => {
    const record = this.recordId;

    const avStatus = {
      availability: 'Checking availability...',
      avClass: 'getit-location-unavailable',
    };

    if (typeof this.delivery().entities[record].delivery !== 'undefined') {
      // takes time for the delivery property to become populated. Angular will get updates when it changes.

      const holdingArr = this.delivery().entities[record].delivery.holding;
      for (const holding of holdingArr) {
        // console.log('holding: ', holding);
        if (
          holding.libraryCode === VIEW_CONSTANTS.libraryAcronym.toUpperCase() &&
          holding.availabilityStatus === 'available'
        ) {
          avStatus.avClass = 'getit-location-available';
          avStatus.availability = 'Items currently available';
          break;
        }
      }
      if (!avStatus.availability.startsWith('Items')) {
        avStatus.availability = 'No items currently available';
      }
    }

    return avStatus;
  });

  // record ID does not require the store - can be gotten from host component
  @Input() public hostComponent!: any;

  get recordId() {
    return this.hostComponent.item.pnx.control.recordid[0] || '';
  }


}
