export interface INewImpactAssessment {
  regulationId: any;
  toyotaRegionId: any;
  substanceId: any;
  phase: any;
  active: any;
  rows: any;
  url?: any;
}

export interface IGetImpactAssessmentByGroup {
  pageNumber: any;
  pageSize: any;
  loading?: any;
  groupId: any;
  toyotaRegionId: any;
  applicationAreaId?: any;
  searchText?: string;
}

export interface IEditImpactAssessment {
  id?: any;
  regulationId: any;
  toyotaRegionId: any;
  substanceId: any;
  phase: any;
  active: any;
  rows: any;
  url?: any;
}

export interface IGetSubstanceImpactAttachments {
  id?: any;
  groupImpactAssessment: boolean;
  substanceId: any;
  regulationId: any;
  toyotaRegion: any;
  pageNumber: any;
  pageSize: any;
  searchText: any;
  areasSelected?: Array<number>;
}

export interface IEditImpactAssessmentSubstanceAttachments {
  id: number;
  substanceId: number;
  regulationId: number;
  toyotaRegionId: number;
  attachment: any;
  applicationAreas: any;
  pageSize?: number;
  pageNumber?: number;
  searchText?: string;
  areasSelected?: any;
  groupImpactAssessment: boolean;
}
export interface ICreateImpactAssessmentSubstanceAttachments {
  substanceId: number;
  regulationId: number;
  toyotaRegionId: number;
  attachment: any;
  applicationAreas: any;
  pageSize?: number;
  pageNumber?: number;
  searchText?: string;
  areasSelected?: any;
  groupImpactAssessment: boolean;
}

export interface INewImpactAssessmentSingle {
  substanceCasNum: any;
  substanceName: any;
  phase: any;
  active: any;
  rows: any;
}

export interface INewImpactAssessmentList {
  data: Array<INewImpactAssessmentSingle>;
  list: boolean;
  regulationId: any;
  toyotaRegionId: any;
  recordType?: any;
}
