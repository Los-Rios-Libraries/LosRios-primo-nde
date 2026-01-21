import { Component, inject, computed } from '@angular/core';
import { Store, createFeatureSelector } from '@ngrx/store';

const selectRouterState = createFeatureSelector<any>('routerState');
// webpack path is needed for relative path to image
declare const __webpack_public_path__: string;
@Component({
  selector: 'custom-homepage-logo',
  standalone: true,
  templateUrl: './homepage-logo.component.html',
  styleUrl: './homepage-logo.component.css',
})

export class HomepageLogoComponent {
  private store = inject(Store);
  routerState = this.store.selectSignal(selectRouterState);
  imageUrl = `${__webpack_public_path__}assets/images/onesearch-logo.png`;
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
