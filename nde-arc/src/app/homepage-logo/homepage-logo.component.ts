import { Component, inject, computed } from '@angular/core';
import { Store, createFeatureSelector } from '@ngrx/store';
import { VIEW_CONSTANTS } from '../shared/constants/app.constants';

const selectRouterState = createFeatureSelector<any>('routerState');
@Component({
  selector: 'custom-homepage-logo',
  standalone: true,
  templateUrl: './homepage-logo.component.html',
  styleUrl: './homepage-logo.component.css',
})
export class HomepageLogoComponent {
  // current college is needed for path to image
  college = VIEW_CONSTANTS.libraryAcronym.toUpperCase();
  private store = inject(Store);
  routerState = this.store.selectSignal(selectRouterState);
  showLogo = computed(() => {
    // only show logo on home page
    const page = this.routerState().routerState;
    if (page === 'home') {
      return true;
    } else {
      return false;
    }
  });
}
