import { Component, computed, OnInit } from '@angular/core';
import { CustomDataService } from '../services/custom-data-service';
// Update the import path below to match where you saved the service
import { ArrayUtilsService } from '../services/array-utils.service'; 
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
export class BrowseLandingPageComponent implements OnInit {
  viewCode = VIEW_CONSTANTS.libraryAcronym.toUpperCase();
  callNoCode = 'callnumber.0';
  subjectCode = 'subject.1';

  subjects: { name: string, url: string }[] = [];
  callNos: { class: string; desc: string, url: string }[] = [];
  subjectFaqUrl = `https://answers.library.losrios.edu/${VIEW_CONSTANTS.libraryAcronym}/faq/${VIEW_CONSTANTS.subjectInfoFaqId}`;

  browseScope = computed(() => {
    const rawData = this.dataService.sharedData();
    if (rawData && /call number/i.test(rawData)) {
      return {browse_type: 'Call number', icon: 'shelves'};
    }
    else if (rawData && /subject/i.test(rawData)) {
      return {browse_type: 'Subject', icon: 'menu_book'};
    }
    return {browse_type: null, icon: null};
  });

  constructor(
    public dataService: CustomDataService,
    private arrayUtils: ArrayUtilsService // Inject the new service here
  ) {}

  ngOnInit() {
    // Chain .slice(0, 4) after the shuffle to limit the results for this component
    this.subjects = this.arrayUtils.shuffle(browseSelections.subjects).slice(0, 4).map(subject => ({
      name: subject,
      url: this.buildUrl(this.subjectCode, subject)
        }));

    this.callNos = this.arrayUtils.shuffle(browseSelections.callNos).slice(0, 4).map(callNo => ({
      class: callNo.class,
      desc: callNo.desc,
      url: this.buildUrl(this.callNoCode, callNo.class) // Pass just the class to the URL builder
    }));
  }

  buildUrl(scope: string, query: string) {
    return `/nde/browse?offset=0&fn=BrowseSearch&vid=01CACCL_LRCCD:${this.viewCode}&lang=en&browseScope=${encodeURIComponent(scope)}&browseQuery=${encodeURIComponent(query)}`;
  }
}