// used in homepage-logo.component.ts to strongly type the router state from the store
export interface PrimoRouterState {
  routerState:
    | 'home'
    | 'search'
    | 'fulldisplay'
    | 'collectionDiscovery'
    | 'browse'
    | 'jsearch'
    | 'account/overview'
    | 'account/loans'
    | 'account/requests'
    | 'account/fines'
    | 'account/favorites'
    | 'account/savedSearches'
    | 'account/settings'
    | string;
  isFirstNavigation: boolean;
}
