export interface INewSubstanceUses {
  active: any;
  description: any;
}

export interface IEditSubstanceUses {
  id: any;
  active: any;
  description: any;
  searchText?: string;
  pageNumber?: number;
  pageSize?: number;
}

export interface IGetSubstanceUsesSearch {
  searchText?: string;
  pageNumber?: number;
  pageSize?: number;
  direction?: string;
}