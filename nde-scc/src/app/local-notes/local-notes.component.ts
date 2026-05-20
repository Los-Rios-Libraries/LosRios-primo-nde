import { Component, Input, computed, inject } from '@angular/core';
import { VIEW_CONSTANTS } from '../shared/constants/app.constants';
import { Store, createFeatureSelector } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';

const selectSearch = createFeatureSelector<any>('Search');
const selectFullDisplay = createFeatureSelector<any>('full-display');

@Component({
  selector: 'custom-local-notes',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './local-notes.component.html',
  styleUrl: './local-notes.component.css',
})
export class LocalNotesComponent {
  @Input() public hostComponent!: any;

  private store = inject(Store);

  recordData = toSignal(this.store.select(selectSearch));
  fullDisplayData = toSignal(this.store.select(selectFullDisplay));

  get recordID() {
    return this.hostComponent?.searchResult?.pnx?.control?.recordid?.[0];
  }

  get currentView() {
    return VIEW_CONSTANTS.libraryAcronym;
  }

 get destinationDir() {
    const parent = this.hostComponent?.constructor?.ɵcmp?.selectors?.[0]?.[0];

    
    if (!parent) {
      return 'Unknown';
    }

    const locationMap = [
      { parent: 'nde-collection-discovery-gallery-item', location: 'CollectionResults' },
      { parent: 'nde-full-display-details', location: 'DetailsBottom' },
      { parent: 'nde-full-display-service-container', location: 'HoldingsTop' },
      { parent: 'nde-locations-container', location: 'HoldingsBottom' },
      { parent: 'nde-view-it', location: 'ViewitBottom' },
      { parent: 'nde-search-result-item-container', location: 'Brief' },
    ];

    for (const mapping of locationMap) {
      if (parent.includes(mapping.parent)) {
        return mapping.location;
      }
    }
    return 'Unknown';
  }

  localNotes = computed(() => {
    let recordID = this.recordID;
    // console.log('recordID from getter: ', recordID);
    if (typeof recordID === 'undefined') {
      if (this.fullDisplayData()?.selectedRecordId) {
        recordID = this.fullDisplayData().selectedRecordId;
      } 
    }

    const record = this.recordData()?.entities?.[recordID];

    if (record) {
      if (typeof record.pnx !== 'undefined') {
        return record.pnx.display.lds01;
      }
    }
    return null;
  });

  // Reactive computed property for notes (fixes the "stuck data" when paging records)
  notes = computed(() => {
    let lrNote = this.localNotes();
    
    if (lrNote === null || typeof lrNote === 'undefined') {
      lrNote = this.hostComponent?.searchResult?.pnx?.display?.lds01;
    }

    const destDir = this.destinationDir;

    if (destDir === 'CollectionResults') {
      lrNote = this.hostComponent?.item?.pnx?.display?.lds01;
    }

    const processedNotes: any[] = [];

    if (!lrNote || !Array.isArray(lrNote)) {
      return processedNotes;
    }

    // Prepare today's date for math calculations
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (const noteStr of lrNote) {
      try {
        const data = JSON.parse(noteStr);

        // 1. Filter out notes not meant for this view
        if (typeof(data.views) !== 'undefined' && !data.views.includes(this.currentView)) {
          continue; 
        }

        // 2. Filter out notes not meant for this display area

        data.location = `lr-note-area-${destDir.toLowerCase()}`;


        if (typeof (data.displayArea) === 'undefined' || !data.displayArea.includes(destDir)) {
          continue; 
        }

        // 3. Calculate remaining time
        data.remainingTime = 0;
        if (data.exp) {
          const expStr = data.exp.replace(/-/g, ''); 
          if (expStr.length >= 8) {
            const expYear = parseInt(expStr.substring(0, 4), 10);
            const expMonth = parseInt(expStr.substring(4, 6), 10) - 1; 
            const expDay = parseInt(expStr.substring(6, 8), 10);
            const expDate = new Date(expYear, expMonth, expDay);
            const diffMs = expDate.getTime() - today.getTime();
            
            data.remainingTime = Math.ceil(diffMs / (1000 * 60 * 60 * 24)) + 1; 
          }
        }

        // 4. Add valid notes to our array
        if (data.remainingTime >= 0) {
          data.noteType = data.noteType ? `lr-note-${data.noteType}` : '';
          processedNotes.push(data);
        }

      } catch (err) {
        console.error('LocalNotesComponent: Failed to parse note data', err);
      }
    }
    console.log('Processed notes to display: ', processedNotes);

    return processedNotes;
  });
}