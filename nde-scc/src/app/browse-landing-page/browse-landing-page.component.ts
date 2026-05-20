import { Component, computed, effect } from '@angular/core';
import { CustomDataService } from '../services/custom-data-service';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { VIEW_CONSTANTS } from '../shared/constants/app.constants';
import { browseSelections } from './browse-landing-page-constants';

@Component({
  selector: 'custom-browse-landing-page',
  standalone: true,
  imports: [MatTabsModule, MatCardModule, MatIcon, MatTooltip],
  templateUrl: './browse-landing-page.component.html',
  styleUrl: './browse-landing-page.component.css',
})
export class BrowseLandingPageComponent {
  // This function implements the Fisher-Yates shuffle algorithm to randomize the order of items in an array. It then slices the first 4 items from the shuffled array to return a smaller subset for display on the browse landing page.
  shuffleArray(array: any[]) {
    let slice: any[] = [];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
      slice = array.slice(0, 4);
    }
    return slice;
  }
  viewCode = VIEW_CONSTANTS.libraryAcronym.toUpperCase();
  subjects = this.shuffleArray(browseSelections.subjects);
  callNos = this.shuffleArray(browseSelections.callNos);
  callNoCode = 'callnumber.0';
  subjectCode = 'subject.1';
  urlBase = `/nde/browse?offset=0&fn=BrowseSearch&vid=01CACCL_LRCCD:${this.viewCode}&lang=en`;
  browseScope = computed(() => {
    const rawData = this.dataService.sharedData();
    // what is supplied here is the label from the mat-select in the search bar, which currently contains the word "Call number" or "Subject" depending on what the user has selected. We use regex to check for those keywords and determine what type of browse we are doing, which allows us to display the appropriate content on the browse landing page.
    if (rawData && /call number/i.test(rawData)) {
      return 'Call number';
    }
    else if (rawData && /subject/i.test(rawData)) {
      return 'Subject';
    }
    return '';
  });

  // Inject the service as public so the template can access it directly
  constructor(public dataService: CustomDataService) {
    // Registering the effect inside the constructor
    // effect(() => {
      // We read the signal's value
      // const capturedData = this.dataService.sharedData();

      // Log it to the console
      // if (capturedData) {
      //   console.log(
      //     '✅ DisplayComponent successfully received data:',
      //     capturedData,
      //   );
      // } else {
      //   console.log(
      //     '⏳ DisplayComponent waiting for Harvester to send data...',
      //   );
      // }
    // });
  }
}
