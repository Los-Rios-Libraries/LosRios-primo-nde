import { Component, inject, computed, ChangeDetectionStrategy } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store, createFeatureSelector, createSelector } from '@ngrx/store';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { VIEW_CONSTANTS } from '../shared/constants/app.constants';
import { RouterUrl, PrimoRouterState } from '../shared/models/routerState.model';



const selectRouter = createFeatureSelector<RouterUrl>('router');
const selectUrl = createSelector(
  selectRouter,
  (router) => router?.state?.url
);
const selectRouterState = createFeatureSelector<PrimoRouterState>('routerState');


@Component({
  selector: 'custom-link-to-legacy-ve',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './link-to-legacy-ve.component.html',
  styleUrl: './link-to-legacy-ve.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkToLegacyVeComponent {
  private readonly store = inject(Store);
  routerState = this.store.selectSignal(selectRouterState);
    
    // returns true if the current router state is 'fulldisplay' or 'jfulldisplay', otherwise false 
    showLink = computed(() => /^j?fulldisplay$/.test(this.routerState()?.routerState) === true);

  // Convert the NgRx store.select() RxJS stream into an Angular Signal
  readonly rawUrl = toSignal(
    this.store.select(selectUrl),
    { initialValue: '' }
  );

  // Derived computed signal that updates automatically whenever rawUrl changes
  readonly newUrl = computed(() => {
    const url = this.rawUrl();
    console.log('raw url:', url);

    if (!url || typeof url !== 'string') {
      return '#';
    }

    const acronym = VIEW_CONSTANTS.libraryAcronym;
    const uppercaseAcronym = acronym.toUpperCase();

    const transformedPath = url
      .replace(`01CACCL_LRCCD:${uppercaseAcronym}`, `01CACCL_LRCCD:${acronym}`);

    return `https://${window.location.hostname}/discovery${transformedPath}`;
  });
}