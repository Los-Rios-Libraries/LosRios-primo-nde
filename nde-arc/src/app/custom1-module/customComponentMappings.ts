import { HomepageLogoComponent } from '../homepage-logo/homepage-logo.component';
import { FeeInfoComponent } from "../fee-info/fee-info.component";
import { IllLinkComponent } from '../ill-link/ill-link.component';  
import { LocalCreatorsComponent } from '../local-creators/local-creators.component';
import { WrapperSearchContainDropdownAfterComponent } from '../wrapper-search-contain-dropdown-after/wrapper-search-contain-dropdown-after.component';
import { BrowseLandingPageComponent } from '../browse-landing-page/browse-landing-page.component';
import { LocalNotesComponent } from '../local-notes/local-notes.component';
import { WrapperCollectionDiscoveryGalleryItemBottomComponent } from '../wrapper-collection-discovery-gallery-item-bottom/wrapper-collection-discovery-gallery-item-bottom.component';
import { WrapperSearchResultItemContainerBottomComponent } from '../wrapper-search-result-item-container-bottom/wrapper-search-result-item-container-bottom.component';

// Define the map
export const selectorComponentMap = new Map<string, any>([
  ['nde-top-bar-before', HomepageLogoComponent],
  ['nde-search-result-item-container-bottom', WrapperSearchResultItemContainerBottomComponent],  
  ['nde-full-display-service-container-before', LocalNotesComponent],
  ['nde-collection-discovery-gallery-item-bottom', WrapperCollectionDiscoveryGalleryItemBottomComponent],
  ['nde-record-availability-top', LocalCreatorsComponent],
  ['nde-fines-bottom', FeeInfoComponent],
  ['nde-locations-container-after', LocalNotesComponent],
  ['nde-full-display-details-after', LocalNotesComponent],
  ['nde-get-it-before', LocalNotesComponent],
  ['nde-view-it-after', LocalNotesComponent] ,
  ['nde-request-card-bottom', IllLinkComponent],
  ['nde-search-contain-dropdown-after', WrapperSearchContainDropdownAfterComponent],
  ['nde-browse-home-page-bottom', BrowseLandingPageComponent]
]);
