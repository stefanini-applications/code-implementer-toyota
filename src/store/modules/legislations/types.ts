export interface IGetLegislationRecord {
  id: any;
}

export interface IGetLegislationRecordIA {
  legislationId: any;
  pageSize?: any;
  pageNumber?: any;
}

export interface IGetLegislationRecordAttachments {
  legislationId: any;
  attachmentTab: any;
  pageSize?: any;
  pageNumber?: any;
  searchText?: any;
}

export interface INewLegislation {
  billTitle: any;
  nickname: any;
  year: any;
  phase: any;
  billEpaDocket: any;
  recordType: any;
  typeId: any;
  categoryId: any;
  agencyId: any;
  jurisdictionId: any;
  active: any;
  tags: any;
  status?: string;
}

export interface IEditLegislation {
  id: any;
  billTitle: any;
  nickname: any;
  year: any;
  phase: any;
  billEpaDocket: any;
  recordType: any;
  typeId: any;
  categoryId: any;
  agencyId: any;
  jurisdictionId: any;
  active: any;
  tags: any;
  toyotaRegion?: number;
  status?: string;
}
