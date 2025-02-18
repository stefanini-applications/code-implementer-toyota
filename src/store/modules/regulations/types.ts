export interface IGetRegulationRecord {
  id: any;
}

export interface IGetRegulationRecordIA {
  regulationId: any;
  pageSize?: any;
  pageNumber?: any;
}

export interface IGetRegulationRecordAttachments {
  regulationId: any;
  pageSize?: any;
  pageNumber?: any;
  searchText?: any;
}

export interface INewRegulation {
  billTitle: any;
  nickname: any;
  year: any;
  billEpaDocket: any;
  recordType: any;
  typeId: any;
  categoryId: any;
  agencyId: any;
  jurisdictionId: any;
  active: any;
  tags: any;
}

export interface IEditRegulation {
  id: any;
  billTitle: any;
  nickname: any;
  year: any;
  billEpaDocket: any;
  recordType: any;
  typeId: any;
  categoryId: any;
  agencyId: any;
  jurisdictionId: any;
  active: any;
  tags: any;
}
