// imported by wrapper-base-request-form-bottom.component
import { Component, Input, DoCheck } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

// 1. Create an interface for your data structure (optional but good practice)
interface LockerData {
  name: string;
  url: string;
}

@Component({
  selector: 'custom-show-locker-info',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './show-locker-info.component.html',
  styleUrl: './show-locker-info.component.css',
})
export class ShowLockerInfoComponent implements DoCheck {
  @Input() public hostComponent!: any;

  // 2. Store the result in a property, NOT a getter
  public lockerInfo: LockerData | null = null;

  // 3. Keep track of the last form value so we only calculate when it changes
  private lastFormValue: string | null = null;

  private deliveryLibraries = [
    {
      key: 'scc',
      name: 'Sacramento City College Library',
      id: '5066568570005325',
      path: '360910',
    },
    {
      key: 'flc',
      name: 'Folsom Lake College Library',
      id: '5020041320005325',
      path: '361527',
    },
  ];

  ngDoCheck() {
    // Safely grab the current value
    const currentFormValue = this.hostComponent?.form?.value;

    // Only run the calculation if the value has actually mutated
    if (currentFormValue !== this.lastFormValue) {
      this.lastFormValue = currentFormValue;
      this.lockerInfo = this.calculateLockerInfo(currentFormValue);

      console.log('Form value updated to: ', currentFormValue);
      console.log('New locker info: ', this.lockerInfo);
    }
  }

  // Move the logic into a standard method
  private calculateLockerInfo(formValue: any): LockerData | null {
    // 1. Extract the actual string from the NDE form object
    const pickupLocation = formValue?.pickupLocation;

    // 2. Check the extracted property instead of the whole object
    if (!pickupLocation || typeof pickupLocation !== 'string') {
      return null;
    }

    for (const library of this.deliveryLibraries) {
      if (pickupLocation.includes(library.id)) {
        return {
          name: library.name,
          url: `https://answers.library.losrios.edu/${library.key}/faq/${library.path}`,
        };
      }
    }

    return null;
  }
}
