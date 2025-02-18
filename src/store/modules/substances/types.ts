export interface INewSubstance {
  active: any;
  commonName: any;
  otherNames?: any;
  casNumber?: any;
  execSummary: any;
  nextAction: any;
  uses: any;
  recordType: any;
}

export interface IEditSubstance {
  id: any;
  active: any;
  commonName: any;
  otherNames?: any;
  casNumber?: any;
  execSummary: any;
  nextAction: any;
  uses: any;
  recordType: any;
}

export interface IGetSubstanceAttachments {
  substanceId: any;
  jurisdictions: any;
  search: any;
}

export interface IGetJurisdictionContentBySubstance {
  substanceId: any;
}
