import { Component, inject, computed, ChangeDetectionStrategy } from '@angular/core';
import { Store, createFeatureSelector } from '@ngrx/store';
import { PrimoRouterState } from '../shared/models/routerState.model';

const selectRouterState = createFeatureSelector<PrimoRouterState>('routerState');

declare const __webpack_public_path__: string;

@Component({
  selector: 'custom-homepage-logo',
  standalone: true,
  templateUrl: './homepage-logo.component.html',
  styleUrl: './homepage-logo.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomepageLogoComponent {
  private store = inject(Store);
  
  routerState = this.store.selectSignal(selectRouterState);
  imageUrl = `${__webpack_public_path__}assets/images/onesearch-logo.png`;
  
  showLogo = computed(() => this.routerState()?.routerState === 'home');
}