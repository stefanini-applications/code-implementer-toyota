import { combineReducers } from 'redux';

import admin from './admin/reducer';
import advancedSearch from './advancedSearch/reducer';
import agency from './agency/reducer';
import alertDashboard from './alertDashboard/reducer';
import attachment from './attachment/reducer';
import auth from './auth/reducer';
import dropdown from './dropdownValues/reducer';
import enumerators from './enumerators/reducer';
import groupTemplate from './groupTemplate/reducer';
import homePage from './homePage/reducer';
import impactAssessment from './impactAssessment/reducer';
import language from './language/reducer';
import legislations from './legislations/reducer';
import listings from './listings/reducer';
import notifications from './notifications/reducer';
import powerbitoken from './powerbitoken/reducer';
import priorityReport from './priorityReport/reducer';
import regulationReport from './regulationReport/reducer';
import regulations from './regulations/reducer';
import regulatoryUpdates from './regulatoryUpdates/reducer';
import relatedSubstances from './relatedSubstances/reducer';
import roles from './roles/reducer';
import s3file from './s3files/reducer';
import searchBar from './searchBar/reducer';
import searchResults from './searchResults/reducer';
import substances from './substances/reducer';
import substanceUses from './substanceUses/reducer';
import toyotaRegions from './toyotaRegions/reducer';
import userPreferences from './userPreferences/reducer';
import users from './users/reducer';
import queues from './queues/reducer';
import linkedLegislations from './linkedLegislations/reducer';
import llm from './llm/reducer';
import regulationGroupSubstances from './regulationGroupSubstances/reducer';

export default combineReducers({
  language,
  legislations,
  regulations,
  substances,
  substanceUses,
  searchBar,
  auth,
  impactAssessment,
  regulatoryUpdates,
  searchResults,
  alertDashboard,
  attachment,
  dropdown,
  toyotaRegions,
  advancedSearch,
  relatedSubstances,
  enumerators,
  homePage,
  regulationReport,
  listings,
  agency,
  users,
  roles,
  notifications,
  userPreferences,
  admin,
  powerbitoken,
  groupTemplate,
  priorityReport,
  s3file,
  queues,
  linkedLegislations,
  llm,
  regulationGroupSubstances
});
