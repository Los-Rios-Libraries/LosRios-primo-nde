import { HomepageLogoComponent } from '../homepage-logo/homepage-logo.component';
import { ProblemReporterComponent } from '../problem-reporter/problem-reporter.component';
import { FeeInfoComponent } from "../fee-info/fee-info.component";
import { IllLinkComponent } from '../ill-link/ill-link.component';  
import { LocalCreatorsComponent } from '../local-creators/local-creators.component';

// Define the map
export const selectorComponentMap = new Map<string, any>([
  ['nde-top-bar-before', HomepageLogoComponent],
  ['nde-search-result-item-container-bottom', ProblemReporterComponent],
  ['nde-record-availability-top', LocalCreatorsComponent],
  ['nde-fines-bottom', FeeInfoComponent],
  ['nde-request-card-bottom', IllLinkComponent]
]);
