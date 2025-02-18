export interface IGetGroupTemplateSearch {
  search?: string;
  pageNumber?: number;
  pageSize?: number;
  noLoading: boolean;
  recordId: any;
  groupId?: any;
  onlySubstances?: boolean;
}
export interface IGetAdminGroupTemplateSearch {
  search?: string;
  pageNumber?: number;
  pageSize?: number;
  noLoading: boolean;
  sortKey?: string;
  direction?: string;
}

export interface IPostRegulationGroup {
  id?: number;
  name: string;
  regulationId: number;
  phase: number;
  phaseOutDate: string;
  comments: string;
  rows: Array<{
    id: number;
    type: string;
    phaseOutDate: string;
    comments: string;
  }>;
}

export interface IPostRegulationGroupAll {
  data: IPostRegulationGroup;
  recordType: number;
  recordId: number;
}

export interface IPostTemplate {
  id?: number;
  name: string;
  substances: Array<string>;
}
