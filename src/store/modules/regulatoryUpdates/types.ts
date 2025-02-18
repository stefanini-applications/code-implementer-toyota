export interface INewRegulatoryUpdate {
  comment: any;
  toyotaDueDate: any;
  agencyDate: any;
  agencyDueDate: any;
  regulationId: any;
  active: any;
  attachments?: any;
  substances: any;
}

export interface IEditRegulatoryUpdate {
  id: any;
  comment: any;
  toyotaDueDate: any;
  agencyDate: any;
  agencyDueDate: any;
  regulationId: any;
  active: any;
  attachments?: any;
  substances: any;
}

export interface IGetRegulatoryUpdates {
  search: any;
  pageSize?: any;
  pageNumber?: any;
  regulationLegislationId?: any;
}

export interface IGetRegulatoryUpdateSubstance {
  substanceId: any;
  jurisdictions: any;
  search: any;
  pageSize?: any;
  pageNumber?: any;
}

export interface IGetRegulatoryUpdateClass {
  substanceId: any;
  jurisdictions: any;
  search: any;
  pageSize?: any;
  pageNumber?: any;
}

export interface IAttachmentRegulatoryUpdates {
  file: any;
}
