import { Component, inject, computed } from '@angular/core';
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
})
export class FeeInfoComponent {
  private store = inject(Store);

  account = toSignal(this.store.select(selectAccountState)); // fines list doesn't come through correctly as pure signal
  user = this.store.selectSignal(selectUserState); // this will provide user group

  showCard = computed(() => {
    // if there are any non-closed fines, show the message
    const finesList = this.account().finesList;
    let finesExist = false;
    if (finesList) {
      for (const fine of finesList) {
        if (fine.fineType !== 'CLOSED') {
          finesExist = true;
          break;
        }
      }
    }
    return finesExist;
  });

  isStudent = computed(() => {
    // show one message for students, another for non-students
    let student = false;
    const userGroup = this.user().decodedJwt.userGroup;
    if (userGroup === 'STUDENT') {
      student = true;
    }
    return student;
  });
}
