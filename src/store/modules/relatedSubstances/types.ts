export interface IGetRelatedSubstances {
  pageNumber?: number;
  pageSize?: number;
  recordId: any;
}

export interface ICreateRelatedSubstance {
  regulation: any;
  relatedSubstances: any;
}

export interface IDeleteRelatedSubstance {
  regulation: any;
  substance: any;
  group?: any;
  type: any;
  listing?: boolean;
  toyotaRegion?: number;
  search?: string;
}
