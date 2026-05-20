import { Component, Input } from '@angular/core';
import { ShowLockerInfoComponent } from '../show-locker-info/show-locker-info.component';
import { LimitedDeliveryNoteComponent } from '../limited-delivery-note/limited-delivery-note.component';

@Component({
  selector: 'custom-wrapper-base-request-form-bottom',
  standalone: true,
  imports: [ShowLockerInfoComponent, LimitedDeliveryNoteComponent],
  templateUrl: './wrapper-base-request-form-bottom.component.html',
  // styleUrl: './wrapper-base-request-form-bottom.component.scss'
})
export class WrapperBaseRequestFormBottomComponent {
  @Input() public hostComponent!: any;

}
