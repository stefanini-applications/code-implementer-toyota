import { all, fork } from 'redux-saga/effects';

import advancedSearch from './advancedSearch/sagas';
import agency from './agency/sagas';
import attachment from './attachment/sagas';
import alertDashboard from './alertDashboard/sagas';
import auth from './auth/sagas';
import dropdownValues from './dropdownValues/sagas';
import enumerators from './enumerators/sagas';
import groupTemplate from './groupTemplate/sagas';
import hoomePage from './homePage/sagas';
import impactAssessment from './impactAssessment/sagas';
import legislations from './legislations/sagas';
import listings from './listings/sagas';
import notifications from './notifications/sagas';
import powerbitoken from './powerbitoken/sagas';
import priorityReport from './priorityReport/sagas';
import regulationReport from './regulationReport/sagas';
import regulations from './regulations/sagas';
import regulatoryUpdates from './regulatoryUpdates/sagas';
import relatedSubstances from './relatedSubstances/sagas';
import roles from './roles/sagas';
import s3file from './s3files/sagas';
import searchBar from './searchBar/sagas';
import searchResults from './searchResults/sagas';
import substances from './substances/sagas';
import substanceUses from './substanceUses/sagas';
import toyotaRegions from './toyotaRegions/sagas';
import userPreferences from './userPreferences/sagas';
import users from './users/sagas';
import userErrorLog from './userErrorLog/sagas';
import queues from './queues/sagas';
import linkedLegislations from './linkedLegislations/sagas';
import llm from './llm/sagas';
import regulationGroupSubstances from './regulationGroupSubstances/sagas';

interface TypedIterableIterator<T, N = any> {
  // eslint-disable-next-line no-unused-vars
  next(value: N): T;
}

export default function* rootSaga(): TypedIterableIterator<any, any> {
  return yield all([
    fork(legislations),
    fork(regulations),
    fork(substances),
    fork(substanceUses),
    fork(searchBar),
    fork(auth),
    fork(impactAssessment),
    fork(regulatoryUpdates),
    fork(searchResults),
    fork(alertDashboard),
    fork(attachment),
    fork(dropdownValues),
    fork(toyotaRegions),
    fork(advancedSearch),
    fork(relatedSubstances),
    fork(enumerators),
    fork(hoomePage),
    fork(regulationReport),
    fork(listings),
    fork(agency),
    fork(users),
    fork(roles),
    fork(notifications),
    fork(userPreferences),
    fork(powerbitoken),
    fork(groupTemplate),
    fork(priorityReport),
    fork(s3file),
    fork(userErrorLog),
    fork(queues),
    fork(linkedLegislations),
    fork(llm),
    fork(regulationGroupSubstances)
  ]);
}
