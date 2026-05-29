import { Component, Input, signal, ChangeDetectionStrategy } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { VIEW_CONSTANTS } from '../shared/constants/app.constants';
import { NdeDelivery } from '../shared/models/delivery.model';

@Component({
  selector: 'custom-show-digital-book-link',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './digital-book-link.component.html',
  styleUrl: './digital-book-link.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DigitalBookLinkComponent {
  
  // Use a setter to update the signal whenever the input changes
  @Input() set hostComponent(value: NdeDelivery) {
    const isDigital = value?.electronicService?.serviceType === 'DIGITAL';
    this.showLink.set(isDigital);
  }

  showLink = signal(false);

  readonly linkTarget = VIEW_CONSTANTS.almaDFaq;
}