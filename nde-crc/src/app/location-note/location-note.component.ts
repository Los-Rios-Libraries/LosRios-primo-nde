import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { notes } from './notes';
@Component({
  selector: 'custom-location-note',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './location-note.component.html',
  styleUrl: './location-note.component.css'
})
export class LocationNoteComponent {
  @Input() private hostComponent: any;

  get locationNote() {
    return notes.find(note => this.locationCode.includes(note.locCode));
  }

  get locationCode() {
    return this.hostComponent?.location?.subLocationCode;
  }

  

}
