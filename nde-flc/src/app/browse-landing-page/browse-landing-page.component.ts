import { Component, computed, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CustomDataService } from '../services/custom-data-service';
import { ArrayUtilsService } from '../services/array-utils.service'; 
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { VIEW_CONSTANTS } from '../shared/constants/app.constants';
import { browseSelections } from './browse-landing-page-constants';

declare const __webpack_public_path__: string;

@Component({
  selector: 'custom-browse-landing-page',
  standalone: true,
  imports: [MatTabsModule, MatCardModule, MatIcon, MatTooltip],
  templateUrl: './browse-landing-page.component.html',
  styleUrl: './browse-landing-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BrowseLandingPageComponent implements OnInit {
  viewCode = VIEW_CONSTANTS.libraryAcronym.toUpperCase();
  callNoCode = 'callnumber.0';
  lcSubjectCode = 'subject.1';
  homoitSubjectCode = 'subject.2';
  lcGenreCode = 'subject.3';
  lcNameCode = 'author';

  lcSubjects: { name: string, url: string }[] = [];
  homoitSubjects: {name: string, url: string}[] = [];
  lcGenres: {name: string, url: string}[] = [];
  lcNames: {name: string, url: string}[] = [];
  callNos: { class: string; desc: string, url: string }[] = [];

  subjectFaqUrl = `https://answers.library.losrios.edu/${VIEW_CONSTANTS.libraryAcronym}/faq/${VIEW_CONSTANTS.subjectInfoFaqId}`;
  askUsUrl = `https://library.losrios.edu/ask-us?${VIEW_CONSTANTS.libraryAcronym}`;

  browseScope = computed(() => {
    const rawData = this.dataService.sharedData();
    if (rawData && /call number/i.test(rawData)) {
      return {browse_type: 'Call number', icon: 'shelves'};
    }
    else if (rawData && /subject/i.test(rawData)) {
      return {browse_type: 'LC subject heading', icon: 'menu_book'};
    }
    else if (rawData && /homosaurus/i.test(rawData)) {
      return {browse_type: 'Homosaurus subject heading', image: `${__webpack_public_path__}assets/images/homosaurus-24.png`};
    }
    else if (rawData && /lc genre/i.test(rawData)) {
      return {browse_type: 'LC genre term', icon: 'category'};
    }
    else if (rawData && /author/i.test(rawData)) {
      return {browse_type: 'LC name heading', icon: 'person_search'};
    }
    else 
    return {browse_type: null, icon: null};
  });

  constructor(
    public dataService: CustomDataService,
    private arrayUtils: ArrayUtilsService // Inject the new service here
  ) {}

  ngOnInit() {
    // Chain .slice(0, 4) after the shuffle to limit the results for this component
    this.lcSubjects = this.arrayUtils.shuffle(browseSelections.lcSubjects).slice(0, 4).map(subject => ({
      name: subject,
      url: this.buildUrl(this.lcSubjectCode, subject)
        }));
    this.homoitSubjects = this.arrayUtils.shuffle(browseSelections.homoitSubjects).slice(0, 4).map(subject => ({
      name: subject,
      url: this.buildUrl(this.homoitSubjectCode, subject)
        }));
    this.lcGenres = this.arrayUtils.shuffle(browseSelections.lcGenres).slice(0, 4).map(subject => ({
      name: subject,
      url: this.buildUrl(this.lcGenreCode, subject)
        }));
    this.lcNames = this.arrayUtils.shuffle(browseSelections.lcNames).slice(0, 4).map(subject => ({
      name: subject,
      url: this.buildUrl(this.lcNameCode, subject)
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