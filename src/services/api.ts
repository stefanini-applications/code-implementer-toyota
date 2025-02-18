import { rejects } from 'assert';
import axios, { AxiosResponse } from 'axios';
import axiosRetry from 'axios-retry';
import * as Msal from 'msal';

import { datadogRum } from '@datadog/browser-rum';

import { JurisdictionSection } from '../components/Modal/ConfirmationModal/styled';
import { IGetFilteredRecordsAdSearch } from '../store/modules/advancedSearch/types';
import { IGetAgencyList } from '../store/modules/enumerators/types';
import {
  IGetAdminGroupTemplateSearch,
  IGetGroupTemplateSearch,
  IPostRegulationGroup,
  IPostTemplate
} from '../store/modules/groupTemplate/types';
import {
  INewImpactAssessment,
  IEditImpactAssessment,
  INewImpactAssessmentList,
  IGetSubstanceImpactAttachments,
  IEditImpactAssessmentSubstanceAttachments,
  ICreateImpactAssessmentSubstanceAttachments
} from '../store/modules/impactAssessment/types';
import {
  IGetLegislationRecord,
  IGetLegislationRecordIA,
  IGetLegislationRecordAttachments,
  IEditLegislation,
  INewLegislation
} from '../store/modules/legislations/types';
import {
  IEditListsApi,
  IEditListings,
  IGetListings,
  IGetListsSearch
} from '../store/modules/listings/types';
import { IGetPriorityReportRequest } from '../store/modules/priorityReport/types';
import {
  IGetRegulationRecord,
  IGetRegulationRecordIA,
  IGetRegulationRecordAttachments,
  IEditRegulation,
  INewRegulation
} from '../store/modules/regulations/types';
import {
  INewRegulatoryUpdate,
  IEditRegulatoryUpdate,
  IGetRegulatoryUpdateClass,
  IGetRegulatoryUpdateSubstance,
  IGetRegulatoryUpdates,
  IAttachmentRegulatoryUpdates
} from '../store/modules/regulatoryUpdates/types';
import {
  IGetRelatedSubstances,
  ICreateRelatedSubstance,
  IDeleteRelatedSubstance
} from '../store/modules/relatedSubstances/types';
import { IGetSearchResults } from '../store/modules/searchResults/types';
import {
  IEditSubstance,
  INewSubstance,
  IGetJurisdictionContentBySubstance
} from '../store/modules/substances/types';
import {
  IGetSubstanceUsesSearch,
  INewSubstanceUses
} from '../store/modules/substanceUses/types';
import { IGetUsersSearch, IEditUsers } from '../store/modules/users/types';
import {getEnv} from '../utils/env-util'



let countApi = 0;
let refreshPromisse: any;

let baseURL = process.env.REACT_APP_API_URL
let clientId = process.env.REACT_APP_OAUTH_CLIENT_ID
let authority = process.env.REACT_APP_OAUTH_AUTHORITY
let redirectUri = process.env.REACT_APP_OAUTH_REDIRECT_URI

const env = getEnv()
switch (env) {
  case 'local':
    baseURL = process.env.REACT_APP_LOCAL_API_URL
    clientId = process.env.REACT_APP_LOCAL_OAUTH_CLIENT_ID
    authority = process.env.REACT_APP_LOCAL_OAUTH_AUTHORITY
    redirectUri = process.env.REACT_APP_LOCAL_OAUTH_REDIRECT_URI
    break;
  case 'development':
    baseURL = process.env.REACT_APP_DEV_API_URL
    clientId = process.env.REACT_APP_DEV_OAUTH_CLIENT_ID
    authority = process.env.REACT_APP_DEV_OAUTH_AUTHORITY
    redirectUri = process.env.REACT_APP_DEV_OAUTH_REDIRECT_URI
    break;
  case 'qa':
    baseURL = process.env.REACT_APP_QA_API_URL
    clientId = process.env.REACT_APP_QA_OAUTH_CLIENT_ID
    authority = process.env.REACT_APP_QA_OAUTH_AUTHORITY
    redirectUri = process.env.REACT_APP_QA_OAUTH_REDIRECT_URI
    break;
  case 'production':
    baseURL = process.env.REACT_APP_PROD_API_URL
    clientId = process.env.REACT_APP_PROD_OAUTH_CLIENT_ID
    authority = process.env.REACT_APP_PROD_OAUTH_AUTHORITY
    redirectUri = process.env.REACT_APP_PROD_OAUTH_REDIRECT_URI
    break;
  default:
    break;
}

const api = axios.create({
  baseURL,
  timeout: 300000
});

axiosRetry(api, {
  retries: 1, // number of retries
  retryDelay: retryCount => {
    return retryCount * 1000; // time interval between retries
  },
  retryCondition: error => {
    console.log(error!.response!.status);
    // if retry condition is not specified, by default idempotent requests are retried
    return error!.response!.status === 500 || error!.response!.status === 503;
  }
});

api.interceptors.request.use(async config => {
  if (!config.params?.noLoading) {
    // document.body.classList.add('loading-indicator');
    document.getElementById('loading-screen')!.style.visibility = 'visible';
    document.getElementById('loading-screen')!.style.opacity = '1';
    countApi += 1;
  }
  if (!config.params?.noToken) {
    const token = getToken();
    if (token) {
      config!.headers!.Authorization = `Bearer ${token}`;
    }
  } else {
    config.params.noToken = undefined;
  }

  if (!config.params?.noEncoding) {
    config.url = encodeURI(config.url!);
  } else {
    config.params.noEncoding = undefined;
  }

  return config;
});

api.interceptors.response.use(
  response => {
    countApi -= 1;
    if (countApi <= 0) {
      document.getElementById('loading-screen')!.style.visibility = 'hidden';
      document.getElementById('loading-screen')!.style.opacity = '0';
    }
    return response;
  },
  async error => {
    const err = JSON?.parse(JSON.stringify(error));
    if (err.status === 401 || err.status === 403) {
      const token = await signIn();
      if (token) {
        countApi -= 1;
        if (countApi <= 0) {
          document.getElementById('loading-screen')!.style.visibility =
            'hidden';
          document.getElementById('loading-screen')!.style.opacity = '0';
        }
        error.config.headers.Authorization = `Bearer ${token}`;
        await loadUserData();
        return axios.request(error.config);
      }
    }
    countApi -= 1;
    if (countApi <= 0) {
      document.getElementById('loading-screen')!.style.visibility = 'hidden';
      document.getElementById('loading-screen')!.style.opacity = '0';
    }

    if (env !== 'local' && err.status >= 401) {
      window.open('/error', '_self');
    }

    throw error;
  }
);
const loadUserData = async () => {
  const currentUserRole = await getUserRole();
  if (
    currentUserRole.data.message &&
    (currentUserRole.data.message == 'Read-only' ||
      currentUserRole.data.message == 'Normal User' ||
      currentUserRole.data.message == 'Admin')
  ) {
    localStorage.setItem('user.role', currentUserRole.data.message);
  }
  const userPreferences = await searchUserPreferences();
  if (userPreferences.data.message) {
    localStorage.setItem(
      'user.jurisdictions',
      userPreferences.data.message.jurisdictions.join(',')
    );
    localStorage.setItem(
      'user.toyotaRegions',
      userPreferences.data.message.toyotaRegions.join(',')
    );
    localStorage.setItem(
      'user.reportJurisdictions',
      userPreferences.data.message.reportJurisdictions.join(',')
    );
    localStorage.setItem(
      'user.toyotaRegion',
      userPreferences.data.message.toyotaRegionId || '1'
    );
  }
};

function getToken() {
  try {
    const valueLocalStorage: any = localStorage.getItem('msal.idtoken');
    return valueLocalStorage;
  } catch (error) {
    return null;
  }
}

export async function signIn() {
  if (!refreshPromisse) {
    refreshPromisse = new Promise((resolve, reject) => {
      const msalConfig: Msal.Configuration = {
        auth: {
          clientId: clientId!,
          authority,
          redirectUri: redirectUri!
        },
        cache: {
          cacheLocation: 'localStorage'
        }
      };
      const tokenScope = {
        scopes: ['User.Read']
      };
      const client = new Msal.UserAgentApplication(msalConfig);

      client.loginPopup(tokenScope).then(
        response => {
          const userAccount = response.account;

          // Extract user details
          const userName = userAccount.name; // User's name
          const userEmail = userAccount.userName; // User's email, depending on the configuration

          const tokenLogin = response.idToken.rawIdToken;
          localStorage.setItem('msal.idtoken', tokenLogin);
          localStorage.setItem('msal.userName', userName);
          localStorage.setItem('msal.userEmail', userEmail);
          refreshPromisse = null;
          resolve(tokenLogin);
        },
        error => {
          console.log(error, 'error');
          reject(error);
        }
      );
    });
  }
  return refreshPromisse;
}

export async function listSearchBarResults(searchText: string) {
  return api.get(`/search-bar?Text=${searchText}`, {
    params: {
      noLoading: true
    }
  });
}

export async function listSubstances() {
  return api.get('/substance', {
    params: {
      noLoading: true
    }
  });
}
export async function listToyotaRegions() {
  return api.get('/toyota-region');
}

export async function listRegLeg() {
  return api.get('/regulation');
}

export async function createRegulationRecord({
  billTitle,
  nickname,
  year,
  billEpaDocket,
  recordType,
  typeId,
  categoryId,
  agencyId,
  jurisdictionId,
  active,
  tags
}: INewRegulation): Promise<AxiosResponse<any>> {
  return api.post('/regulation', {
    billTitle,
    nickname,
    year,
    billEpaDocket,
    recordType,
    typeId,
    categoryId,
    agencyId,
    jurisdictionId,
    active,
    tags
  });
}

export async function editRegulationRecord({
  id,
  billTitle,
  nickname,
  year,
  billEpaDocket,
  recordType,
  typeId,
  categoryId,
  agencyId,
  jurisdictionId,
  active,
  tags
}: IEditRegulation): Promise<AxiosResponse<any>> {
  return api.post('/regulation', {
    id,
    billTitle,
    nickname,
    year,
    billEpaDocket,
    recordType,
    typeId,
    categoryId,
    agencyId,
    jurisdictionId,
    active,
    tags
  });
}

export async function createLegislationRecord({
  billTitle,
  nickname,
  year,
  phase,
  billEpaDocket,
  recordType,
  typeId,
  categoryId,
  agencyId,
  jurisdictionId,
  active,
  status,
  tags
}: INewLegislation): Promise<AxiosResponse<any>> {
  return api.post('/regulation', {
    billTitle,
    nickname,
    year,
    phase,
    billEpaDocket,
    recordType,
    typeId,
    categoryId,
    agencyId,
    jurisdictionId,
    active,
    status,
    tags
  });
}


export async function createNewBulkLegislationRecord(data: []): Promise<AxiosResponse<any>> {
  return api.post('/regulation', data);
}

export async function editLegislationRecord({
  id,
  billTitle,
  nickname,
  year,
  phase,
  billEpaDocket,
  recordType,
  typeId,
  categoryId,
  agencyId,
  jurisdictionId,
  active,
  status,
  tags
}: IEditLegislation): Promise<AxiosResponse<any>> {
  return api.post('/regulation', {
    id,
    billTitle,
    nickname,
    year,
    phase,
    billEpaDocket,
    recordType,
    typeId,
    categoryId,
    agencyId,
    jurisdictionId,
    active,
    status,
    tags
  });
}

export async function listSearchResults({
  type,
  searchText,
  pageNumber,
  pageSize,
  loading
}: IGetSearchResults) {
  return api.get(
    `/search?Type=${type}&PageNumber=${pageNumber}&Text=${searchText}&PageSize=${pageSize}`,
    {
      params: {
        noLoading: !loading
      }
    }
  );
}

export async function listSubstancesAdmin({
  searchText,
  pageNumber,
  pageSize,
  loading,
  sortKey,
  direction
} :any) {
  return api.get(
    `/substance?Paged=true&PageNumber=${pageNumber}&Search=${searchText ?? ''}&PageSize=${pageSize}&SortKey=${sortKey}&Direction=${direction}`,
    {
      params: {
        noLoading: !loading
      }
    }
  );
}

export async function listRegulationsAdmin({
  recordType,
  searchText,
  pageNumber,
  pageSize,
  loading,
  sortKey,
  direction,
  originregulationID
}: any) {
  return api.get(
    `/regulation?RecordType=${recordType}&Paged=true&PageNumber=${pageNumber}&Search=${searchText}&PageSize=${pageSize}&SortKey=${sortKey ?? ''}&Direction=${direction ?? ''}&originregulationID=${originregulationID ?? ''}`,
    {
      params: {
        noLoading: !loading
      }
    }
  );
}

export async function listGroupImpactAssessments({
  searchText,
  pageNumber,
  pageSize,
  loading,
  groupId,
  toyotaRegionId,
  applicationAreaId
}: any) {
  return api.get(
    `/view-reg-group-ia/${groupId}?PageSize=${pageSize}&PageNumber=${pageNumber}&Search=${searchText}&SortKey=impact&SortDirection=DESC&Region=${toyotaRegionId}&Paged=true&ApplicationArea=${applicationAreaId}`,
    {
      params: {
        noLoading: !loading
      }
    }
  );
}

export async function getImpactAssessmentRecord({
  substanceId,
  toyotaRegionId,
  regulationId,
  regulationGroupId
}: any) {
  return api.get(
    `/impact-assessment?Regulation=${regulationId}&Substance=${substanceId}&RegulationGroup=${
      regulationGroupId || ''
    }&Region=${toyotaRegionId}`
  );
}

export async function createImpactAssessmentRecord({
  active,
  phase,
  regulationId,
  rows,
  substanceId,
  toyotaRegionId
}: INewImpactAssessment): Promise<AxiosResponse<any>> {
  return api.post('/impact-assessment', {
    active,
    phase,
    regulationId,
    rows,
    substanceId,
    toyotaRegionId
  });
}

export async function editImpactAssessmentRecord({
  id,
  active,
  phase,
  regulationId,
  rows,
  substanceId,
  toyotaRegionId
}: IEditImpactAssessment): Promise<AxiosResponse<any>> {
  return api.post('/impact-assessment', {
    id,
    active,
    phase,
    regulationId,
    rows,
    substanceId,
    toyotaRegionId
  });
}

export async function listRegulatoryUpdatesRecords({
  search,
  pageNumber,
  regulationLegislationId
}: IGetRegulatoryUpdates): Promise<AxiosResponse<any>> {
  return api.get(
    `/regulation-update?Regulation=${regulationLegislationId}&Search=${search}&PageSize=10&PageNumber=${pageNumber}&Paged=true`,
    {
      params: {
        noLoading: true
      }
    }
  );
}

export async function listRegulatoryUpdatesBySubstance({
  substanceId,
  jurisdictions,
  search,
  pageNumber
}: IGetRegulatoryUpdateSubstance): Promise<AxiosResponse<any>> {
  return api.get(
    `/regulation-update-substance?Substance=${substanceId}&Search=${search}&Jurisdiction=${jurisdictions.toString()}&PageSize=10&PageNumber=${pageNumber}&Paged=true`,
    {
      params: {
        noLoading: true
      }
    }
  );
}

export async function listSubstanceAttachments(payload: any) {
  return api.get(
    `/substance-attachments?Substance=${payload.substanceId}&Search=${
      payload.search
    }&Jurisdiction=${payload.jurisdictions.toString()}&AttachmentTab=${
      payload.attachmentTab ? payload.attachmentTab : ''
    }&Jurisdiction=${payload.jurisdictions.toString()}&PageSize=${
      payload.pageSize
    }&PageNumber=${payload.pageNumber}&Paged=true`,
    {
      params: {
        noLoading: true
      }
    }
  );
}

export async function createRegulatoryUpdatesRecord({
  active,
  agencyDate,
  agencyDueDate,
  attachments,
  comment,
  regulationId,
  substances,
  toyotaDueDate
}: INewRegulatoryUpdate): Promise<AxiosResponse<any>> {
  return api.post('/regulation-update', {
    active,
    agencyDate,
    agencyDueDate,
    attachments,
    comment,
    regulationId,
    substances,
    toyotaDueDate
  });
}

export async function editRegulatoryUpdatesRecord({
  id,
  active,
  agencyDate,
  agencyDueDate,
  attachments,
  comment,
  regulationId,
  substances,
  toyotaDueDate
}: IEditRegulatoryUpdate): Promise<AxiosResponse<any>> {
  return api.post('/regulation-update', {
    id,
    active,
    agencyDate,
    agencyDueDate,
    attachments,
    comment,
    regulationId,
    substances,
    toyotaDueDate
  });
}

export async function addSubstanceRecord({
  active,
  commonName,
  otherNames,
  casNumber,
  execSummary,
  nextAction,
  uses,
  recordType
}: INewSubstance): Promise<AxiosResponse<any>> {
  return api.post('/substance', {
    active,
    commonName,
    otherNames,
    casNumber,
    execSummary,
    nextAction,
    uses,
    recordType
  });
}

export async function editSubstanceRecord({
  id,
  active,
  commonName,
  otherNames,
  casNumber,
  execSummary,
  nextAction,
  uses,
  recordType
}: IEditSubstance): Promise<AxiosResponse<any>> {
  return api.post('/substance', {
    id,
    active,
    commonName,
    otherNames,
    casNumber,
    execSummary,
    nextAction,
    uses,
    recordType
  });
}

export async function getSubstanceRecord(id: number) {
  return api.get(`/substance/${id}`, {
    params: {
      noLoading: true
    }
  });
}
export async function getSubstanceUses() {
  return api.get(`/substance-use`);
}
export async function deleteSubstanceUses(ids): Promise<AxiosResponse<any>> {
  return api.delete('/substance-use', {
    data: {
      ids
    }
  });
}
export async function searchSubstanceUses({
  pageNumber,
  pageSize,
  searchText,
  direction
}: IGetSubstanceUsesSearch) {
  const paged = pageSize !== 0;
  return api.get(
    `/substance-use-search?Paged=${paged}&PageNumber=${pageNumber}&PageSize=${pageSize}&Search=${searchText}&Direction=${direction}`,
    {
      params: {
        noLoading: true
      }
    }
  );
}
export async function createEditSubstanceUses(
  substanceUse: INewSubstanceUses
): Promise<AxiosResponse<any>> {
  return api.post('/substance-use', {
    ...substanceUse
  });
}

export async function createUserErrorLog(
  userErrorLog: any
): Promise<AxiosResponse<any>> {
  return api.post('/user-error-log', {
    ...userErrorLog
  },
  {
    params: {
      noLoading: true
    }
  });
}
export async function getImpactAssessmentBySubstance(payload: any) {
  const {
    substanceId,
    searchText = '',
    pageNumber,
    pageSize,
    sortDirection,
    impactedRegionFilter,
    applicationArea,
    jurisdictions
  } = payload;
  return api.get(
    `/impact-assessment-substance?Substance=${substanceId}&Region=${impactedRegionFilter}&PageSize=${pageSize}&PageNumber=${pageNumber}&Search=${searchText}&SortOption=1&SortDirection=${sortDirection}&ApplicationArea=${applicationArea}&Jurisdictions=${jurisdictions}`,
    {
      params: {
        noLoading: true
      }
    }
  );
}

export async function getImpactAssessmentSubstanceAttachments({
  groupImpactAssessment,
  substanceId,
  regulationId,
  toyotaRegion,
  pageSize,
  pageNumber,
  searchText,
  areasSelected
}: IGetSubstanceImpactAttachments) {
  return groupImpactAssessment
    ? api.get(
        `/impact-assessment-attachment-group?Group=${substanceId}&Region=${toyotaRegion}&PageSize=${pageSize}&PageNumber=${pageNumber}&Search=${searchText}&Area=${areasSelected}`,
        {
          params: {
            noLoading: true
          }
        }
      )
    : api.get(
        `/impact-assessment-attachment?Substance=${substanceId}&Regulation=${regulationId}&Region=${toyotaRegion}&PageSize=${pageSize}&PageNumber=${pageNumber}&Search=${searchText}&Area=${areasSelected}`,
        {
          params: {
            noLoading: true
          }
        }
      );
}

export async function editImpactAssessmentSubstanceAttachments({
  id,
  substanceId,
  regulationId,
  toyotaRegionId,
  attachment,
  applicationAreas,
  groupImpactAssessment
}: IEditImpactAssessmentSubstanceAttachments) {
  return groupImpactAssessment
    ? api.post(`/impact-assessment-attachment-group`, {
        id,
        regulationGroupId: substanceId,
        toyotaRegionId,
        attachment,
        applicationAreas
      })
    : api.post(`/impact-assessment-attachment`, {
        id,
        substanceId,
        regulationId,
        toyotaRegionId,
        attachment,
        applicationAreas
      });
}

export async function createImpactAssessmentSubstanceAttachments({
  substanceId,
  regulationId,
  toyotaRegionId,
  attachment,
  applicationAreas,
  groupImpactAssessment
}: ICreateImpactAssessmentSubstanceAttachments) {
  return groupImpactAssessment
    ? api.post(`/impact-assessment-attachment-group`, {
        regulationGroupId: substanceId,
        toyotaRegionId,
        attachment,
        applicationAreas
      })
    : api.post(`/impact-assessment-attachment`, {
        substanceId,
        regulationId,
        toyotaRegionId,
        attachment,
        applicationAreas
      });
}

export async function deleteImpactAssessmentSubstanceAttachments({
  id,
  groupImpactAssessment
}) {
  return groupImpactAssessment
    ? api.delete(`/impact-assessment-attachment-group/${id}`)
    : api.delete(`/impact-assessment-attachment/${id}`);
}

export async function getImpactAssessmentById(id: number) {
  return api.get(`/impact-assessment/${id}`);
}

export async function downloadAttachment(id: number) {
  return api.get(`/attachment/${id}`);
}

export async function registerAttachmentRegulatoryUpdates({
  file
}: IAttachmentRegulatoryUpdates) {
  const formData = new FormData();
  formData.append('file', file);
  return api.post(`/attachment`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}

export async function listFilteredRecordsAdvancedSearch({
  type,
  text,
  pageSize,
  pageNumber,
  hasAttachment,
  jurisdiction,
  agency,
  agencyType,
  subUses,
  notSearch,
  startDate,
  endDate,
  status
}: IGetFilteredRecordsAdSearch) {
  return api.get(
    `/advanced-search?PageSize=${pageSize}&PageNumber=${pageNumber}&Text=${text}&Type=${type}&Jurisdiction=${jurisdiction}&Agency=${agency}&AgencyType=${agencyType}&SubUses=${subUses}&HasAttachment=${hasAttachment}&NotSearch=${notSearch}&StartDate=${startDate}&EndDate=${endDate}&status=${status}`
  );
}

export async function listJurisdictions() {
  return api.get(`/jurisdiction`);
}

export async function listLegislationRecord({ id }: IGetLegislationRecord) {
  return api.get(`/regulation/${id}`);
}

export async function listLegislationRecordImpactAssessment({
  legislationId
}: IGetLegislationRecordIA) {
  return api.get(
    `/impact-assessment-regulation?Regulation=${legislationId}&PageSize=10&PageNumber=1`
  );
}

export async function getImpactAssessmentBySubstanceRegulationAndToyotaRegion({
  substanceId,
  regulationId,
  toyotaRegionId
}: any) {
  return api.get(
    `/impact-assessment-check-toyota-region?Substance=${substanceId}&Regulation=${regulationId}&ToyotaRegion=${toyotaRegionId}`
  );
}

export async function listLegislationRecordAttachments({
  legislationId,
  attachmentTab,
  pageSize,
  pageNumber,
  searchText
}: IGetLegislationRecordAttachments) {
  return api.get(
    `/regulation-attachment?Search=${searchText}&Regulation=${legislationId}&AttachmentTab=${attachmentTab}&PageSize=${pageSize}&PageNumber=${pageNumber}`,
    {
      params: {
        noLoading: true
      }
    }
  );
}

export async function listRegulationRecord({ id }: IGetRegulationRecord) {
  return api.get(`/regulation/${id}`);
}

export async function listRegulationRecordImpactAssessment({
  regulationId
}: IGetRegulationRecordIA) {
  return api.get(
    `/impact-assessment-regulation?Regulation=${regulationId}&PageSize=10&PageNumber=1`
  );
}

export async function listRegulationRecordAttachments({
  regulationId
}: IGetRegulationRecordAttachments) {
  return api.get(
    `/regulation-attachment?Search=&Regulation=${regulationId}&PageSize=10&PageNumber=1`
  );
}

export async function listJurisdictionContentBySubstance({
  substanceId
}: IGetJurisdictionContentBySubstance) {
  return api.get(`/jurisdiction-filter?Substance=${substanceId}`);
}

export async function getRegulationSubstancePhase({
  regulationId,
  substanceId
}: any) {
  return api.get(
    `/regulation-substance-phase?Substance=${substanceId}&Regulation=${regulationId}`
  );
}

export async function listRegulationsBySubstance({ substanceId }: any) {
  return api.get(`/substance-regulation-dropdown?Substance=${substanceId}`);
}

export async function listRelatedySubstance({ regulationId }: any) {
  return api.get(`/related-substance-add-dropdown?Regulation=${regulationId}`);
}
export async function listUpdatesRelatedSubstance({ regulationId }: any) {
  return api.get(
    `/related-substance-dropdown?Regulation=${regulationId}&Region=1`
  );
}

export async function listRelatedSubstance({
  recordId
}: IGetRelatedSubstances) {
  return api.get(`/related-substance/${recordId}`);
}

export async function createRelatedSubstance({
  regulation,
  relatedSubstances
}: ICreateRelatedSubstance): Promise<AxiosResponse<any>> {
  return api.post('/related-substance', {
    regulation,
    relatedSubstances
  });
}
export async function editRelatedSubstance({
  regulation,
  relatedSubstances
}: ICreateRelatedSubstance): Promise<AxiosResponse<any>> {
  return api.post(
    '/related-substance',
    {
      regulation,
      relatedSubstances
    },
    {
      params: {
        noLoading: true
      }
    }
  );
}

export async function deleteRelatedSubstance({
  regulation,
  substance,
  type,
  group
}: IDeleteRelatedSubstance): Promise<AxiosResponse<any>> {
  return api.delete('/related-substance', {
    data: {
      regulation,
      substance,
      type,
      group
    }
  });
}

export async function listAgency({ type, onlyActive }: IGetAgencyList) {
  return api.get(
    `/agency?PageSize=999&PageNumber=1&Text=&Type=${type}&OnlyActive=${onlyActive}`
  );
}

export async function downloadReport({
  startDate,
  endDate,
  startDueDate,
  endDueDate,
  jurisdictions,
  types,
  status
}) {
  return api.get(
    `/regulation-report-download?Jurisdiction=${jurisdictions}&Type=${types}&StartDate=${startDate}&EndDate=${endDate}` +
    `&StartDueDate=${startDueDate}&EndDueDate=${endDueDate}&Status=${status}`,
  );
}

export async function downloadPriorityReport(payload) {
  const {
    showPhase6,
    searchText,
    pageNumber = 1,
    pageSize = 999999,
    region = '',
    jurisdiction = '',
    showLegislation = false,
    sortOption = 1,
    sortDirection = 'DESC',
    appArea = '',
    hideNr
  } = payload;

  return api.get(
    `/substance-priority-report-download?PageSize=${pageSize}&PageNumber=${pageNumber}&Search=${searchText}&` +
      `Region=${region}&Jurisdiction=${jurisdiction}&ShowLegislation=${showLegislation}&IncludePhase6=${showPhase6}&` +
      `SortOption=${sortOption}&SortDirection=${sortDirection}&ApplicationArea=${appArea}&HideNR=${hideNr}`
  );
}

export async function getRegulationReport({
  startDate,
  endDate,
  startDueDate,
  endDueDate,
  jurisdictions,
  types,
  status
}) {
  return api.get(
    `/regulation-report?Jurisdiction=${jurisdictions}&Type=${types}&StartDate=${startDate}&EndDate=${endDate}` +
    `&StartDueDate=${startDueDate}&EndDueDate=${endDueDate}&Status=${status}`,
    {
      params: {
        noLoading: true
      }
    }
  );
}

export async function uploadAttachment(files: any, descriptions: any) {
  const result: any[] = [];
  await Promise.all(
    files.map(async (element: any, index: any) => {
      if (!element[0].uploaded) {
        const formData = new FormData();
        const upResult = await api.post(`/attachment`, {
          filename: element[0].name
        });
        const extension = element[0].name.split('.').pop();
        const myNewFile = new File(
          [element[0]],
          `${upResult.data.message.fileUuid}.${extension}`,
          {
            type: element[0].type
          }
        );
        formData.append(
          `${upResult.data.message.fileUuid}.${extension}`,
          myNewFile
        );
        console.log(myNewFile)
        const uploadS3Result = await api.put(
          upResult.data.message.url,
          myNewFile,
          {
            params: {
              noToken: true,
              noEncoding: true
            },
            headers: {
              'Content-Type': element[0].type
            }
          }
        );
        result.push({
          fileUuid: upResult.data.message.fileUuid,
          fileName: upResult.data.message.fileName,
          description: descriptions[index] ?? ''
        });
      } else {
        result.push({
          id: Number(element[0].id),
          fileUuid: element[0].uuid,
          fileName: element[0].name,
          description: descriptions[index] ?? ''
        });
      }
    })
  );

  return result;
}

export async function getHomePageUpdatesSubstance(
  regions: string,
  startDate: any,
  endDate: any,
  pageNumber: any
) {
  return api.get(
    `home-page-updates-substances?Region=${regions}&StartDate=${startDate}&EndDate=${endDate}&Paged=true&PageSize=20&PageNumber=${pageNumber}`,
    {
      params: {
        noLoading: true
      }
    }
  );
}
export async function getHomePageUpdatesRegulation(
  regions: string,
  startDate: any,
  endDate: any,
  pageNumber: any,
  recordType: any,
) {
  return api.get(
    `home-page-updates-regulations?Region=${regions}&StartDate=${startDate}&EndDate=${endDate}&Paged=true&PageSize=20&PageNumber=${pageNumber}&recordType=${recordType}`,
    {
      params: {
        noLoading: true
      }
    }
  );
}

export async function getRecentlyView(
  everyone: any,
  recordType: any,
) {
  return api.get(
    `regulation-view-logs?Everyone=${everyone}&RecordType=${recordType}`,
    {
      params: {
        noLoading: true
      }
    }
  );
}
export async function getListingsData({
  pageNumber,
  pageSize,
  paged,
  reference,
  type,
  search,
  noLoading,
  toyotaRegion
}: IGetListings) {
  return api.get(
    `/listings?Paged=${paged}&PageNumber=${pageNumber}&PageSize=${pageSize}&Reference=${reference}&Type=${type}&Search=${search}&Region=${toyotaRegion}`,
    {
      params: {
        noLoading
      }
    }
  );
}

export async function getListingsSubstanceData(substanceId) {
  return api.get(`/listings-substance?Substance=${substanceId}`);
}

export async function editListingData(
  payload: IEditListings
): Promise<AxiosResponse<any>> {
  return api.post('/listings', payload);
}

export async function listListingsDropdown({ type, reference, search }: any) {
  return api.get(
    `/listings-dropdown?Type=${type}&Reference=${reference}&Search=${search}`
  );
}

export async function deleteListingData(
  type,
  id,
  saveChildren
): Promise<AxiosResponse<any>> {
  return api.delete(`/listings/${id}`, {
    data: {
      type,
      saveChildren
    }
  });
}

export async function deleteRegulatoryUpdate({ id }: any) {
  return api.delete(`/regulation-update/${id}`);
}

export async function listAgencyAdmin({
  type,
  onlyActive,
  search,
  pageNumber,
  pageSize,
  sortKey = '',
  direction = ''
}) {
  return api.get(
    `/agency?PageSize=${pageSize}&PageNumber=${pageNumber}&Text=${search}&Type=${type}&OnlyActive=${onlyActive}&SortKey=${sortKey}&Direction=${direction}`,
    {
      params: {
        noLoading: true
      }
    }
  );
}

export async function deleteAgencies(ids): Promise<AxiosResponse<any>> {
  return api.delete('/agency', {
    data: {
      ids
    }
  });
}

export async function createAgency({
  id,
  description,
  refLink,
  type,
  active,
  jurisdictions,
  abbreviation
}: any) {
  return api.post(`/agency`, {
    id,
    description,
    refLink,
    type,
    active,
    jurisdictions,
    abbreviation
  });
}

export async function listAlertDashboard({
  type,
  dataRangeStart,
  dataRangeEnd,
  search,
  jurisdictions,
  regions,
  pageNumber,
  pageSize,
  sortKey = '',
  direction = ''
}) {
  return api.get(
    `/alert-dashboard?PageNumber=${pageNumber}&PageSize=${pageSize}&Type=${type}&DataRangeStart=${dataRangeStart}&DataRangeEnd=${dataRangeEnd}&Jurisdictions=${jurisdictions}&Regions=${regions}&Search=${search}&SortKey=${sortKey}&Direction=${direction}`,
    {
      params: {
        noLoading: true
      }
    }
  );
}

export async function actInAlertDashboard({ type, id, action }: any) {
  return api.post(
    `/alert-dashboard`,
    {
      ...{
        type,
        id,
        action
      }
    },
    {
      params: {
        noLoading: true
      }
    }
  );
}
export async function deleteSubstances(ids): Promise<AxiosResponse<any>> {
  return api.delete('/substance', {
    data: {
      ids
    }
  });
}

export async function searchUsers({
  pageNumber,
  pageSize,
  searchText,
  sortKey,
  direction
}: IGetUsersSearch) {
  const paged = pageSize !== 0;
  return api.get(
    `/users?Paged=${paged}&PageNumber=${pageNumber}&PageSize=${pageSize}&Search=${searchText}&SortKey=${sortKey?? ''}&Direction=${direction?? ''}`,
    {
      params: {
        noLoading: true
      }
    }
  );
}
export async function editUser(
  userRole: IEditUsers
): Promise<AxiosResponse<any>> {
  return api.post('/users', {
    ...userRole
  });
}
export async function getRoles() {
  return api.get(`/roles`, {
    params: {
      noLoading: true
    }
  });
}

export async function deleteLegislations(ids): Promise<AxiosResponse<any>> {
  return api.delete('/regulation', {
    data: {
      ids
    }
  });
}

export async function deleteRegulations(ids): Promise<AxiosResponse<any>> {
  return api.delete('/regulation', {
    data: {
      ids
    }
  });
}

export async function getUserRole() {
  return api.get(`/user-role`);
}

export async function getNotifications({
  pageNumber,
  pageSize,
  searchText,
  sortKey,
  direction
}: any) {
  const paged = pageSize !== 0;
  return api.get(
    `/notifications?Paged=${paged}&PageNumber=${pageNumber}&PageSize=${pageSize}&SortKey=${sortKey}&Direction=${direction}&Search=${searchText}`,
    {
      params: {
        noLoading: true
      }
    }
  );
}

export async function searchUserPreferences() {
  return api.get(`/user-preferences`);
}

export async function changeUserPreferences(
  userPreferences: any
): Promise<AxiosResponse<any>> {
  return api.post('/user-preferences', {
    ...userPreferences
  });
}

export async function changeToyotaRegion(
  toyotaRegionId: number
): Promise<AxiosResponse<any>> {
  return api.post(
    '/user-preferences-region',
    {
      toyotaRegionId
    },
    {
      params: {
        noLoading: true
      }
    }
  );
}

export async function getEmbedToken() {
  return api.get(`/power-bi-token`);
}

export async function getHomePageHeatMapToken() {
  return api.get(`/home-page-heatmap`);
}

export async function getPredictionsBySubstance(id) {
  return api.get(`/predictions?Substance=${id}`);
}

export async function updateList(data: IEditListsApi) {
  return api.post(`/lists`, data, {
    params: {
      noLoading: data.allInsert
    }
  });
}

export async function searchLists({
  pageNumber,
  pageSize,
  searchText,
  noLoading,
  sortKey,
  direction
}: IGetListsSearch) {
  const paged = pageSize !== 0;
  return api.get(
    `/lists?Paged=${paged}&PageNumber=${pageNumber}&PageSize=${pageSize}&Search=${searchText}&SortKey=${sortKey?? ''}&Direction=${direction?? ''}`,
    {
      params: {
        noLoading
      }
    }
  );
}

export async function getListByName(name: string) {
  return api.get(`/lists?Name=${name}`);
}

export async function sendImpactAssessmentList(
  data: INewImpactAssessmentList
): Promise<AxiosResponse<any>> {
  return api.post('/impact-assessment-list', data);
}

export async function getGroupTemplate({
  pageNumber,
  pageSize,
  search,
  noLoading,
  recordId,
  groupId,
  onlySubstances = false
}: IGetGroupTemplateSearch) {
  return api.get(
    `/group-template-list?PageNumber=${pageNumber || ''}&PageSize=${
      pageSize || ''
    }&Search=${search || ''}&Regulation=${recordId || ''}&Group=${
      groupId || ''
    }&onlySubstances=${onlySubstances}`,
    {
      params: {
        noLoading
      }
    }
  );
}

export async function getAdminGroupTemplate({
  pageNumber,
  pageSize,
  search,
  noLoading,
  sortKey,
  direction
}: IGetAdminGroupTemplateSearch) {
  return api.get(
    `/group-template?PageNumber=${pageNumber}&PageSize=${pageSize}&Search=${search}&SortKey=${sortKey}&Direction=${direction}`,
    {
      params: {
        noLoading
      }
    }
  );
}

export async function deleteAdminGroupTemplate(
  ids
): Promise<AxiosResponse<any>> {
  return api.delete('/group-template', {
    data: {
      ids
    }
  });
}

export async function postRegulationGroup(
  data: IPostRegulationGroup
): Promise<AxiosResponse<any>> {
  return api.post('/regulation-group', {
    ...data
  });
}

export async function postTemplate(
  data: IPostTemplate
): Promise<AxiosResponse<any>> {
  return api.post('/group-template', {
    ...data
  });
}

export async function getRegulationGroup(id: number) {
  return api.get(`/regulation-group/${id}`, {
    params: {
      noLoading: true
    }
  });
}
export async function getTemplate(id: number) {
  return api.get(`/group-template-list/${id}`, {
    params: {
      noLoading: true
    }
  });
}

export async function getTemplatesDownloadUrl() {
  return api.get(`/group-template-download`);
}

export async function deleteRegulationGroup(ids): Promise<AxiosResponse<any>> {
  return api.delete('/regulation-group', {
    data: {
      ids
    }
  });
}

export async function downloadRelatedSubstance(regulationId, toyotaRegionId, groups) {
  return api.get(
    `/related-substance-download/${regulationId}?Region=${toyotaRegionId}&Groups=${groups.join(',')}`
  );
}

export async function groupSubstances({
  sortKey,
  direction,
  groupId,
  toyotaRegionId,
  pageNumber,
  pageSize,
  text
}) {
  return api.get(`/group-substances?GroupId=${groupId}&SortKey=${sortKey}&Direction=${direction}&ToyotaRegionId=${toyotaRegionId}&PageNumber=${pageNumber}&PageSize=${pageSize}&Text=${text}`, {
    params: {
      noLoading: true
    }
  });
}

export async function getPriorityReportData(
  payload: IGetPriorityReportRequest
) {
  const {
    showPhase6,
    searchText,
    pageNumber = 1,
    pageSize = 10,
    region = '',
    jurisdiction = '',
    showLegislation = false,
    sortOption = 1,
    sortDirection = 'DESC',
    appArea = ''
  } = payload;
  return api.get(
    `/substance-group-priority-report?PageSize=${pageSize}&PageNumber=${pageNumber}&Search=${searchText}&Region=${region}&Jurisdiction=${jurisdiction}&ShowLegislation=${showLegislation}&IncludePhase6=${showPhase6}&SortOption=${sortOption}&SortDirection=${sortDirection}&ApplicationArea=${appArea}`,
    {
      params: {
        noLoading: true
      }
    }
  );
}

export async function getPriorityReportFilters(payload: any) {
  const {
    showPhase6,
    region = '',
    jurisdiction = '',
    showLegislation = false,
    appArea = ''
  } = payload;
  return api.get(
    `/substance-group-priority-report-filters?Region=${region}&Jurisdiction=${jurisdiction}&ShowLegislation=${showLegislation}&IncludePhase6=${showPhase6}&ApplicationArea=${appArea}`,
    {
      params: {
        noLoading: true
      }
    }
  );
}

export async function downloadFileS3(url) {
  return api.get(url, {
    params: {
      noEncoding: true,
      noToken: true
    }
  });
}

export async function downloadListing(type, reference, listName) {
  return api.get(
    `/listings-download?Type=${type}&Reference=${reference}&ListName=${listName}`
  );
}

export async function postQueue(
  data: any,
  queueName: any
): Promise<AxiosResponse<any>> {
  return api.post(`/queue?name=${queueName}`, {
    ...data
  });
}


export async function genericS3Download(bucketName: any, fileName: any) {
  const result = await api.post(`/generic-upload-download`, {
    fileName,
    bucketName,
    type: 'download'
  });

  return result.data.message.url;
}


export async function genericS3Upload(file: any, bucketName: any) {
  const upResult = await api.post(`/generic-upload-download`, {
    fileName: file.name,
    bucketName,
    type: 'upload'
  });
  const myNewFile = new File(
    [file],
    file.name,
    {
      type: file.type
    }
  );
  const uploadS3Result = await api.put(
    upResult.data.message.url,
    myNewFile,
    {
      params: {
        noToken: true,
        noEncoding: true
      },
      headers: {
        'Content-Type': file.type
      }
    }
  );
  return uploadS3Result;
}


export async function listLinkedlegislations({
  search,
  legislationId,
  pageNumber,
  pageSize,
  sortKey,
  direction,
}) {
  return api.get(`/regulations-linked?Text=${search}&originRegulationID=${legislationId}&SortKey=${sortKey}&Direction=${direction}&PageNumber=${pageNumber}&PageSize=${pageSize}`, {
    params: {
      noLoading: true
    }
  });
}


export async function getchartHistoryData(
  reqData
) {
  return api.get(`/history-chart?Substance=${reqData.substanceId}&Regulation=${reqData.regulationId}&Group=${reqData.groupId}&ToyotaRegion=${reqData.toyotaRegionId}&ApplicationArea=${reqData.applicationAreaId}&DateFrom=${reqData.dateFrom}&DateTo=${reqData.dateTo}`, {
    params: {
      noLoading: true
    }
  });
}



export async function postLinkedLegislations(
  data: any,
): Promise<AxiosResponse<any>> {
  return api.post(`/regulations-linked`, data);
}
export async function deleteLinkedLegislations(
  data: any,
): Promise<AxiosResponse<any>> {
  console.log(data)
  return api.delete(`/regulations-linked`, {data});
}

export async function getRegulatoryUpdateById(id: string) {
  return api.get(`/regulation-update/${id}`);
}


export async function postSubstanceExecutiveSummaryLlm(
  data: any,
): Promise<AxiosResponse<any>> {
  return api.post(`/exec-summary-substance-llm`, data);
}

export async function postExecReportLlm(
  data: any,
): Promise<AxiosResponse<any>> {
  return api.post(`/exec-report-llm`, data);
}
