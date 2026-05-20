import { Component, Input } from '@angular/core';
import { LocalNotesComponent } from '../local-notes/local-notes.component';

@Component({
  selector: 'custom-wrapper-collection-discovery-gallery-item-bottom',
  standalone: true,
  imports: [LocalNotesComponent],
  templateUrl: './wrapper-collection-discovery-gallery-item-bottom.component.html',
  styleUrl: './wrapper-collection-discovery-gallery-item-bottom.component.scss'
})
export class WrapperCollectionDiscoveryGalleryItemBottomComponent {
  @Input() public hostComponent!: any;
}
