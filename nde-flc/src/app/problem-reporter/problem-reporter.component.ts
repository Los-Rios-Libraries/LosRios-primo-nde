import { Component, Input, inject, computed } from '@angular/core';
import { Store, createFeatureSelector } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog'; // ADDED
import { VIEW_CONSTANTS } from '../shared/constants/app.constants';
import { ProblemReporterDialogComponent } from '../problem-reporter-dialog/problem-reporter-dialog.component'; // ADDED

// we need Delivery from store to know if there only physical or digital inventory--report will be sent to college-level queue in this case
const selectDeliveryState = createFeatureSelector<any>('Delivery');

@Component({
  selector: 'custom-problem-reporter',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatTooltipModule], // use Angular Material buttons/icons
  templateUrl: './problem-reporter.component.html',
  styleUrl: './problem-reporter.component.css',
})
export class ProblemReporterComponent {
  // we need the record ID both for the problem report and in order to get the correct data from the store to decide which queue to send it to. So we get this from the host component
  @Input() public hostComponent!: any;

  // getter function to retrieve record ID
  get recordID() {
    return this.hostComponent?.searchResult?.pnx?.control?.recordid[0];
  }

  private store = inject(Store);
  private dialog = inject(MatDialog);

  // convert Delivery to signal for easier handling. We can't use the signal directly because it seems that it doesn't get properly updated.
  delivery = toSignal(this.store.select(selectDeliveryState));

  queue = computed(() => {
    // check store to see what services are on the record. If the record is CDI or electronic inventory, send to erm queue. Otherwise send to queue matching view college. We need the record ID to do this because the store provides this data in an array of search results
    const recordDelivery = this.delivery().entities[this.recordID];
    let queue = VIEW_CONSTANTS.libraryAcronym; // college-level queue
    if (recordDelivery) {
      // wait until delivery property is populated
      if (typeof recordDelivery.delivery !== 'undefined') {
        const category = recordDelivery.delivery.deliveryCategory;

        for (const cat of category) {
          // cdi content shows as 'Remote Search Resource'; electronic repository inventory shows as 'Alma-E'
          if (cat === 'Remote Search Resource' || cat === 'Alma-E') {
            // send to ERM queue
            queue = 'erm';
          }
        }
      }
    }
    return queue;
  });

  openReporter(): void {
    // Consolidate background contextual information into a structural data object
    const reportMetadata = {
      url: location.href,
      recordid: this.recordID ?? '',
      college: VIEW_CONSTANTS.libraryAcronym,
      queue: this.queue(),
      source: 'primo'
    };

    // Open the Material modal dialog dynamically
    this.dialog.open(ProblemReporterDialogComponent, {
      width: '550px',
      maxWidth: '95vw',
      data: reportMetadata // Injects the metadata values directly into the dialog
    });
  }

}
