import { Component, Input, DoCheck, signal } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { VIEW_CONSTANTS } from '../shared/constants/app.constants';

interface Creator {
  crName: string;
  creatorType: string;
  title: string;
  college: string;
  url: string;
}

@Component({
  selector: 'custom-local-creators',
  standalone: true,
  imports: [MatIconModule, MatTooltipModule],
  templateUrl: './local-creators.component.html',
  styleUrl: './local-creators.component.css',
})
export class LocalCreatorsComponent implements DoCheck {
  @Input() hostComponent!: any;

  // Variables to hold our data
  creatorsData: Creator[] = [];
  localCreatorExists = signal(false);

  // Variable to track the last data state so we don't re-process unnecessarily
  private lastDataSignature: string = '';

  get isFullDisplay() {
    return location.href.includes('nde/fulldisplay?');
  }

  // ngDoCheck runs frequently, but we make it fast by only comparing strings
  ngDoCheck(): void {
    const rawField = this.hostComponent?.searchResult?.pnx?.display?.lds09;

    // Create a unique "signature" of the data (joining the array into a string)
    // If the data hasn't changed, this string will be identical to the last one.
    const currentSignature = rawField ? rawField.join('') : 'empty';

    // Only run the expensive processing if the data signature has changed
    if (currentSignature !== this.lastDataSignature) {
      this.lastDataSignature = currentSignature;
      this.processData(rawField);
    }
  }

  private processData(localField: string[] | undefined) {
    if (!localField || localField.length === 0) {
      this.creatorsData = [];
      this.localCreatorExists.set(false);
      return;
    }

    const creators: Creator[] = [];

    for (const field of localField) {
      try {
        const data = JSON.parse(field);

        // Skip if required data is missing
        if (!data.crName || !data.currency) continue;

        creators.push({
          crName: data.crName,
          creatorType: data.role || 'creator',
          title: this.buildTitleString(data),
          college: this.buildCollegeString(data.college),
          url: data.url || '',
        });
      } catch (e) {
        console.warn('Failed to parse local creator data', e);
      }
    }

    this.creatorsData = creators;
    this.localCreatorExists.set(creators.length > 0);
  }

  private buildTitleString(data: any): string {
    let title = data.position || 'affiliated';
    let connector = 'with';
    let currency = 'is';
    let art = '';

    // Connector logic
    if (data.position) {
      connector = /^(Interim )?President/.test(title) ? 'of' : 'at';
    }

    // Article logic
    if (data.position) {
      if (/^[aeiou]/i.test(title)) {
        art = 'an';
      } else if (!/^((Interim )?(Dean|Pres|Vice|Direct))/.test(title)) {
        art = 'a';
      }
    }

    // Currency/Former logic
    const isDeceased = data.deceased === 'deceased';
    if (data.currency === 'former') {
      currency = isDeceased ? (art ? 'was ' + art : 'was') : 'is a former';
      art = '';
      if (title === 'affiliated') {
        currency = isDeceased ? 'was' : 'was formerly';
      }
    }

    return `${currency} ${art} ${title} ${connector}`
      .replace(/\s+/g, ' ')
      .trim();
  }

  private buildCollegeString(collegeCode: string): string {
    if (!collegeCode) return 'Los Rios Community College District';

    const crCol = [];
    for (let lib of VIEW_CONSTANTS.libraries) {
      if (collegeCode.indexOf(lib.abbr) > -1) {
        crCol.push(`${lib.name} College`);
      }
    }

    if (crCol.length === 0) return 'Los Rios Community College District';
    if (crCol.length === 1) return crCol[0];
    if (crCol.length === 2) return `${crCol[0]} and ${crCol[1]}`;

    const lastMember = crCol.pop();
    return `${crCol.join(', ')} and ${lastMember}`;
  }
}
