import { Injectable, signal } from '@angular/core';
// This service can be used to share data across components using Angular 17 Signals.
@Injectable({
  providedIn: 'root',
})
export class CustomDataService {
  // Using an Angular 17 Signal to hold your data.
  // Replace 'any' with your specific interface if you have one.
  public sharedData = signal<any>(null);
}
