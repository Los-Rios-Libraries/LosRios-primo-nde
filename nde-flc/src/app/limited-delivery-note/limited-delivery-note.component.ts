// imported by wrapper-base-request-form-bottom.component
import { Component, inject, computed } from '@angular/core';
import { Store, createFeatureSelector } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { VIEW_CONSTANTS } from '../shared/constants/app.constants';

const selectFullDisplay = createFeatureSelector<any>('full-display');

@Component({
  selector: 'custom-limited-delivery-note',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './limited-delivery-note.component.html',
  styleUrl: './limited-delivery-note.component.css'
})
export class LimitedDeliveryNoteComponent {
   private store = inject(Store);
  
    fullDisplayData = toSignal(this.store.select(selectFullDisplay));

    deliveryLimited = computed(() => {
      // regular expression requires that the Alma location code begin with a single character followed by 'c' or 'mdvd', which are the codes for the unlimited delivery locations. 
      const unlimitedDeliveryLocations = /^.(c|mdvd)/; 

      const locations = this.fullDisplayData()?.getItLocations?.locations;
      // If any location matches the regex pattern, then it's not limited delivery. If none match, then it is limited delivery.
      if (locations.some((loc: any) => unlimitedDeliveryLocations.test(loc['sub-location-code']))) {
        return false; // Not limited delivery
      } else {
        return true; // Limited delivery - template will be rendered
      } 
    });
    faqURL = `https://answers.library.losrios.edu/${VIEW_CONSTANTS.libraryAcronym}/faq/${VIEW_CONSTANTS.limitedDeliveryFaq}`;

}           