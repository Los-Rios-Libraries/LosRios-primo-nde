import { Component, Input, signal, ChangeDetectionStrategy, inject, computed} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { VIEW_CONSTANTS } from '../shared/constants/app.constants';
import { NdeDelivery } from '../shared/models/delivery.model';
import { Store, createFeatureSelector } from '@ngrx/store';
import { LoggedInState } from '../shared/models/loggedIn.model';

const selectLoggedInState = createFeatureSelector<LoggedInState>('user');

@Component({
  selector: 'custom-show-digital-book-link',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './digital-book-link.component.html',
  styleUrl: './digital-book-link.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DigitalBookLinkComponent {
   private store = inject(Store);
   
   loggedInState = this.store.selectSignal(selectLoggedInState);
   notLoggedIn = computed(() => this.loggedInState()?.isLoggedIn === false);

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

  
  openHostLogin(): void {
    // Select NDE's user menu / sign-in element
    const loginBtn: HTMLElement | null = document.querySelector(
      'nde-login .mdc-button'
    );
    const userArea: HTMLElement | null = document.getElementById('user-area');

    if (loginBtn) { // login button located under physical holdings. Should be present where we have CDL titles
      loginBtn.click();
    }
    
    else if (userArea) {  // fallback: account login area. Element cannot be directly clicked, so open user menu where it appears
      userArea.click();
      userArea.scrollIntoView({ behavior: 'smooth' });
    }
  }
}