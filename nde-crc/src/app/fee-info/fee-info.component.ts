import { Component, inject, computed, ChangeDetectionStrategy } from '@angular/core';
import { Store, createFeatureSelector } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

const selectAccountState = createFeatureSelector<any>('account');
const selectUserState = createFeatureSelector<any>('user');

@Component({
  selector: 'custom-fee-info',
  standalone: true,
  imports: [MatCardModule, MatIconModule],
  templateUrl: './fee-info.component.html',
  styleUrl: './fee-info.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeeInfoComponent {
  private store = inject(Store);

  account = toSignal(this.store.select(selectAccountState)); // fines list doesn't come through correctly as pure signal
  user = this.store.selectSignal(selectUserState); // this will provide user group

  showCard = computed(() => {
    // show message if any fine is not CLOSED
    return !!this.account()?.finesList?.some((fine: any) => fine.fineType !== 'CLOSED');
  });

  isStudent = computed(() => {
    // show one message for students, another for non-students
    return this.user().decodedJwt.userGroup === 'STUDENT';
  });
}
