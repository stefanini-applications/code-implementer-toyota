export interface IGetPriorityReportRequest {
  showPhase6: boolean;
  searchText: string;
  pageNumber: number;
  pageSize: number;
  region?: number;
  jurisdiction?: number;
  showLegislation?: boolean;
  sortOption?: number;
  sortDirection?: string;
  appArea?: any;
}
