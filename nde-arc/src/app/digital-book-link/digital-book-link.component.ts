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
    const packageName = value?.electronicService?.packageName;
    // only test the regex if packageName is defined to avoid errors
    // representation must have "textbook" (case-insensitive) in the label for the link to show
    const isTextbook = packageName ? /textbook/i.test(packageName) : false;
    this.showLink.set(isDigital && isTextbook);
  }

  showLink = signal(false);

  readonly linkTarget = VIEW_CONSTANTS.almaDFaq;
}