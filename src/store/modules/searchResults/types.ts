export interface IGetSearchResults {
  searchText?: string;
  type: string;
  pageNumber?: number;
  pageSize?: number;
  loading?: boolean;
  sortKey?: any;
  direction?:any;
  originregulationID?:any;
}

export interface SearchKeys {
  pageSize?: any;
  pageNumber?: any;
  text?: any;
  type?: any;
  jurisdiction?: any;
  agency?: any;
  agencyType?: any;
  subUses?: any;
  hasAttachment?: any;
  notSearch?: any;
  startDate?: any;
  endDate?: any;
  searchType: string;
  timeStamp: number;
  status: any;
};

export interface SearchTabInfo {
  searchKeys?: SearchKeys;
  tabId: number;
};
