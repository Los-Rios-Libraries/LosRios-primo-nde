import {
  Component,
  inject,
  computed,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Store, createFeatureSelector } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { VIEW_CONSTANTS } from '../shared/constants/app.constants';
import { MatIconModule } from '@angular/material/icon';

const selectFullDisplay = createFeatureSelector<any>('full-display');
const selectSearchResults = createFeatureSelector<any>('Search');
@Component({
  selector: 'custom-show-subjects-info',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './show-subjects-info.component.html',
  styleUrl: './show-subjects-info.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowSubjectsInfoComponent {
  private store = inject(Store);
// toSignal is used for selectFullDisplay because the component needs to access the selectedRecordId property of the full display state, which is not an observable. Using selectSignal with selectFullDisplay did not work.
  fullDisplay = toSignal(this.store.select(selectFullDisplay));
  searchResults = this.store.selectSignal(selectSearchResults);

  faqUrl = `https://answers.library.losrios.edu/${VIEW_CONSTANTS.libraryAcronym}/faq/${VIEW_CONSTANTS.subjectInfoFaqId}`;

  hasSubjects = computed(() => {
    const record = this.fullDisplay()?.selectedRecordId;
    const subjects =
      this.searchResults()?.entities[record]?.pnx?.display?.subject;
    return (subjects && subjects.length > 0) ? true : false;
  });
}
