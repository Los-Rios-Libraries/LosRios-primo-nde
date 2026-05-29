export interface PnxControl {
  recordid: string[];
}

export interface SearchResult {
  pnx: {
    control: PnxControl;
  };
}

export interface PrimoHostComponent {
  searchResult: SearchResult;
}

export interface DeliveryEntity {
  delivery?: {
    deliveryCategory: string[];
  };
}