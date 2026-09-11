import { Component, inject, computed, ChangeDetectionStrategy } from '@angular/core';
import { Store, createFeatureSelector } from '@ngrx/store';
import { PrimoRouterState } from '../shared/models/routerState.model';
import {AssetsPublicPathDirective} from '../services/assets-public-path.directive';

const selectRouterState = createFeatureSelector<PrimoRouterState>('routerState');

@Component({
  selector: 'custom-homepage-logo',
  standalone: true,
  imports: [AssetsPublicPathDirective],
  templateUrl: './homepage-logo.component.html',
  styleUrl: './homepage-logo.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomepageLogoComponent {
  private store = inject(Store);
  
  routerState = this.store.selectSignal(selectRouterState);
  imageUrl = 'assets/images/onesearch-logo.png';
  
  showLogo = computed(() => this.routerState()?.routerState === 'home');
}