import { Component, Input, DoCheck } from '@angular/core';
import { CustomDataService } from '../services/custom-data-service';

@Component({
  selector: 'custom-wrapper-search-contain-dropdown-after',
  standalone: true,
  imports: [],
  templateUrl: './wrapper-search-contain-dropdown-after.component.html',
  styleUrl: './wrapper-search-contain-dropdown-after.component.scss',
})
export class WrapperSearchContainDropdownAfterComponent implements DoCheck {
  @Input() public hostComponent!: any;
  // Explicitly type this as a string to match matlabel
  private currentHarvestedValue: any = null;
  constructor(private dataService: CustomDataService) {}
  ngDoCheck() {
    if (!window.location.href.includes('/browse')) {
      return; 
    }
    if (window.location.href.includes('browseQuery=')) {
      return; 
    }

    // Safely drill down to the matlabel. 
    // Using optional chaining (?.) prevents undefined errors if the object isn't fully loaded yet.
    const newLabel = this.hostComponent?.matLabel;

    // 1. Ensure newLabel exists and is actually a string
    // 2. Strict check: ONLY proceed if the string has actually changed
    if (typeof newLabel === 'string' && newLabel !== this.currentHarvestedValue) {
      
      // Update our local tracker IMMEDIATELY to prevent the next CD cycle from catching it
      this.currentHarvestedValue = newLabel;
      
      // IMPORTANT: Console log to diagnose if we have multiple search bars fighting
      // console.log('🔄 Harvester captured new matlabel:', newLabel);

      // 3. The Escape Hatch: setTimeout pushes the signal update to the next event loop,
      // preventing Angular from getting stuck in a synchronous infinite CD loop.
      setTimeout(() => {
        this.dataService.sharedData.set(newLabel);
      }, 0);
      
    }
  }
}
