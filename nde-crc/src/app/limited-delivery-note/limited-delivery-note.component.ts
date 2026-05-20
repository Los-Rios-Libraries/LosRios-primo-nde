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
      const unlimitedDeliveryLocations = /^.(c|mdvd)/; 

      const locations = this.fullDisplayData()?.getItLocations?.locations;
      if (locations.some((loc: any) => unlimitedDeliveryLocations.test(loc["sub-location-code"]))) {
        return false; // Not limited delivery
      } else {
        return true; // Limited delivery
      } 
    });
    faqURL = `https://answers.library.losrios.edu/${VIEW_CONSTANTS.libraryAcronym}/faq/${VIEW_CONSTANTS.limitedDeliveryFaq}`;

}           