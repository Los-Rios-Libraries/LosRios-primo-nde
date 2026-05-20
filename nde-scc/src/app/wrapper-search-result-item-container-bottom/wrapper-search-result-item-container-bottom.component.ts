import { Component, Input } from '@angular/core';
import { ProblemReporterComponent } from '../problem-reporter/problem-reporter.component';
import { LocalNotesComponent } from "../local-notes/local-notes.component";

@Component({
  selector: 'custom-wrapper-search-result-item-container-bottom',
  standalone: true,
  imports: [ProblemReporterComponent, LocalNotesComponent],
  templateUrl: './wrapper-search-result-item-container-bottom.component.html',
  styleUrl: './wrapper-search-result-item-container-bottom.component.scss'
})
export class WrapperSearchResultItemContainerBottomComponent {
   @Input() public hostComponent!: any;

}
