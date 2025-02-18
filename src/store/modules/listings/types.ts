export interface IGetListings {
  pageNumber: any;
  pageSize: any;
  reference: any;
  type: any;
  paged: any;
  search?: any;
  noLoading?: any;
  toyotaRegion?: any;
}

export interface IDeleteGroup {
  listingsRequest: IGetListings;
  ids: any;
}

export interface IEditListings {
  id: any;
  type: any;
  reference: any;
  relatedSubstances: any;
  upload?: boolean;
  minPhase?: number;
  maxPhase?: number;
  toyotaRegion?: number;
}

export interface IDeleteListings {
  listId: any;
  type: any;
  reference: any;
  saveChildren: any;
  substance: any;
  toyotaRegion?: number;
}

export interface IEditListsApi {
  list: Array<{
    name: any;
    description: any;
    id?: any;
  }>;
  allInsert: boolean;
}

export interface IEditLists {
  list: Array<{
    name: any;
    description: any;
    id?: any;
  }>;
  allInsert: boolean;
  searchText?: string;
  pageNumber?: number;
  pageSize?: number;
}

export interface IGetListsSearch {
  searchText?: string;
  pageNumber?: number;
  pageSize?: number;
  noLoading: boolean;
  sortKey:any;
  direction:any;
}