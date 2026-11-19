import { Component, computed, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CustomDataService } from '../services/custom-data-service';
import { ArrayUtilsService } from '../services/array-utils.service'; 
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { MatDivider } from '@angular/material/divider';
import { SHELL_ROUTER } from '../injection-tokens';
import { VIEW_CONSTANTS } from '../shared/constants/app.constants';
import { browseSelections } from './browse-landing-page-constants';

declare const __webpack_public_path__: string;

interface BrowseLinkItem {
  name: string;
  scope: string;
  query: string;
  url: string;
}

interface CallNoLinkItem extends BrowseLinkItem {
  class: string;
  desc: string;
}

@Component({
  selector: 'custom-browse-landing-page',
  standalone: true,
  imports: [MatTabsModule, MatCardModule, MatIcon, MatTooltip, MatDivider],
  templateUrl: './browse-landing-page.component.html',
  styleUrl: './browse-landing-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BrowseLandingPageComponent implements OnInit {
  private router = inject(SHELL_ROUTER);

  viewCode = VIEW_CONSTANTS.libraryAcronym.toUpperCase();
  callNoCode = 'callnumber.0';
  lcSubjectCode = 'subject.1';
  homoitSubjectCode = 'subject.2';
  lcGenreCode = 'subject.3';
  lcNameCode = 'author';

  lcSubjects: BrowseLinkItem[] = [];
  homoitSubjects: BrowseLinkItem[] = [];
  lcGenres: BrowseLinkItem[] = [];
  lcNames: BrowseLinkItem[] = [];
  callNos: CallNoLinkItem[] = [];

  subjectFaqUrl = `https://answers.library.losrios.edu/${VIEW_CONSTANTS.libraryAcronym}/faq/${VIEW_CONSTANTS.subjectInfoFaqId}`;
  askUsUrl = `https://library.losrios.edu/ask-us?${VIEW_CONSTANTS.libraryAcronym}`;

  browseScope = computed(() => {
    const rawData = this.dataService.sharedData();
    if (rawData && /call number/i.test(rawData)) {
      return { browse_type: 'Call number', icon: 'shelves' };
    } else if (rawData && /subject/i.test(rawData)) {
      return { browse_type: 'LC subject heading', icon: 'menu_book' };
    } else if (rawData && /homosaurus/i.test(rawData)) {
      return {
        browse_type: 'Homosaurus subject heading',
        image: `${__webpack_public_path__}assets/images/homosaurus-24.png`
      };
    } else if (rawData && /genre/i.test(rawData)) {
      return { browse_type: 'LC genre term', icon: 'category' };
    } else if (rawData && /name/i.test(rawData)) {
      return { browse_type: 'LC name heading', icon: 'person_search' };
    } else {
      return { browse_type: null, icon: null };
    }
  });

  constructor(
    public dataService: CustomDataService,
    private arrayUtils: ArrayUtilsService
  ) {}

  ngOnInit(): void {
    this.lcSubjects = this.buildSampleItems(browseSelections.lcSubjects, this.lcSubjectCode);
    this.homoitSubjects = this.buildSampleItems(browseSelections.homoitSubjects, this.homoitSubjectCode);
    this.lcGenres = this.buildSampleItems(browseSelections.lcGenres, this.lcGenreCode);
    this.lcNames = this.buildSampleItems(browseSelections.lcNames, this.lcNameCode);

    this.callNos = this.arrayUtils.shuffle(browseSelections.callNos).slice(0, 4).map(callNo => ({
      name: callNo.class,
      class: callNo.class,
      desc: callNo.desc,
      scope: this.callNoCode,
      query: callNo.class,
      url: this.buildUrl(this.callNoCode, callNo.class)
    }));
  }

  private buildSampleItems(items: readonly string[], scope: string): BrowseLinkItem[] {
  return this.arrayUtils.shuffle(items).slice(0, 4).map(item => ({
    name: item,
    scope,
    query: item,
    url: this.buildUrl(scope, item)
  }));
}

  buildUrl(scope: string, query: string): string {
    return `/nde/browse?offset=0&fn=BrowseSearch&vid=01CACCL_LRCCD:${this.viewCode}&lang=en&browseScope=${encodeURIComponent(scope)}&browseQuery=${encodeURIComponent(query)}`;
  }

  navigateToBrowse(event: MouseEvent, scope: string, query: string): void {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.button !== 0) {
      return;
    }
    event.preventDefault();
    this.router.navigate(['/browse'], {
      queryParams: {
        offset: 0,
        fn: 'BrowseSearch',
        vid: `01CACCL_LRCCD:${this.viewCode}`,
        lang: 'en',
        browseScope: scope,
        browseQuery: query
      }
    });
  }
}