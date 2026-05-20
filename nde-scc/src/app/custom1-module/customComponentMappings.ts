import { HomepageLogoComponent } from '../homepage-logo/homepage-logo.component';
import { ProblemReporterComponent } from '../problem-reporter/problem-reporter.component';
import { FeeInfoComponent } from "../fee-info/fee-info.component";
import { LocalCreatorsComponent } from '../local-creators/local-creators.component';
import { BrowseLandingPageComponent } from '../browse-landing-page/browse-landing-page.component';  
import { IllLinkComponent } from '../ill-link/ill-link.component';  
import { WrapperSearchContainDropdownAfterComponent } from '../wrapper-search-contain-dropdown-after/wrapper-search-contain-dropdown-after.component';

// Define the map
export const selectorComponentMap = new Map<string, any>([
  ['nde-top-bar-before', HomepageLogoComponent],
  ['nde-search-result-item-container-bottom', ProblemReporterComponent],
  ['nde-fines-bottom', FeeInfoComponent]
  ['nde-record-availability-top', LocalCreatorsComponent],
  ['nde-request-card-bottom', IllLinkComponent],
  ['nde-search-contain-dropdown-after', WrapperSearchContainDropdownAfterComponent],
  ['nde-browse-home-page-bottom', BrowseLandingPageComponent],
]);
