import { HomepageLogoComponent } from '../homepage-logo/homepage-logo.component';
import { ProblemReporterComponent } from '../problem-reporter/problem-reporter.component';

// Define the map
export const selectorComponentMap = new Map<string, any>([
  ['nde-top-bar-before', HomepageLogoComponent],
  ['nde-search-result-item-container-bottom', ProblemReporterComponent],
]);
