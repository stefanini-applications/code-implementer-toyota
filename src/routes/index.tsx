import React from 'react';
import { Switch } from 'react-router-dom';

import AddRelatedSubstances from '../pages/AddRelatedSubstances';
import AdminPage from '../pages/AdminPage';
import AlertDashboard from '../pages/AlertDashboard';
import TemplatePage from '../pages/CreateTemplate';
import ErrorPage from '../pages/ErrorPage';
import GroupPage from '../pages/GroupPage';
import ImpactAssessmentNewRecord from '../pages/ImpactAssessment/WorkingPage';
import ImpactAssessmentGroup from '../pages/ImpactAssessmentGroup';
import Interest from '../pages/Interest';
import LegislationRecord from '../pages/Legislations/LegislationRecord';
import LegRegReport from '../pages/LegRegReport';
import Listing from '../pages/Listing';
import Main from '../pages/Main';
import Prediction from '../pages/Prediction';
import PriorityReport from '../pages/PriorityReport';
import RegulationRecord from '../pages/Regulations/RegulationRecord';
import SearchResult from '../pages/SearchResult';
import SubstancePriority from '../pages/SubstancePriority';
import SubstanceRecord from '../pages/Substances/SubstanceRecord';
import ViewListing from '../pages/ViewListing';
import Route from './Route';
import LegislationBulkUpload from '../pages/BulkUpload';
import ImportedReport from '../pages/ImportedReport';
import LlmChat from '../pages/LlmChat';
import LLmTestExecSummary from '../pages/LLmTestExecSummary';
import PriorityHeatmap from '../pages/PriorityHeatmap';
import LLmTestExecReport from '../pages/LLmTestExecReport';
import ViewSubstanceIA from '../pages/ViewSubstanceImpactAssessment';
import IAChart from '../pages/IAChart';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Main} isPrivate />
      <Route path="/result" component={SearchResult} isPrivate />
      <Route path="/substance" component={SubstanceRecord} isPrivate />
      <Route path="/legislation" component={LegislationRecord} isPrivate />
      <Route path="/regulation" component={RegulationRecord} isPrivate />
      <Route path="/listing" component={Listing} isPrivate />
      <Route path="/report" component={LegRegReport} isPrivate />
      <Route path="/viewListing" component={ViewListing} isPrivate />
      <Route path="/admin" component={AdminPage} isPrivate />
      <Route path="/priority" component={SubstancePriority} isPrivate />
      <Route path="/prediction" component={Prediction} isPrivate />
      <Route path="/interest" component={Interest} isPrivate />
      <Route path="/group" component={GroupPage} isPrivate />
      <Route path="/template" component={TemplatePage} isPrivate />
      <Route path="/priority-report" component={PriorityReport} isPrivate />
      <Route
        path="/add-related-substances"
        component={AddRelatedSubstances}
        isPrivate
      />
      <Route
        path="/view-impact-assessment-group"
        component={ImpactAssessmentGroup}
        isPrivate
      />
      <Route
        path="/legislation-bulk-upload"
        component={LegislationBulkUpload}
        isPrivate
      />
      <Route path="/imported-report" component={ImportedReport} isPrivate />
      <Route path="/changelog" component={AlertDashboard} isPrivate />
      <Route path="/error" component={ErrorPage} isPrivate />
      <Route path="/priority-heatmap" component={PriorityHeatmap} isPrivate />
      <Route path="/ask-griips" component={LlmChat} isPrivate />
      <Route path="/test-substance" component={LLmTestExecSummary} isPrivate />
      <Route path="/test-exec-report" component={LLmTestExecReport} isPrivate />
      <Route
        path="/newRecord-impactAssessment"
        component={ImpactAssessmentNewRecord}
        isPrivate
      />
      <Route
        path="/editRecord-impactAssessment"
        component={ImpactAssessmentNewRecord}
        isPrivate
      />
      <Route
        path="/view-substance-impact-assessment"
        component={ViewSubstanceIA}
        isPrivate
      />
      <Route path="/impact-assessment-chart" component={IAChart} isPrivate />
    </Switch>
  );
};

export default Routes;
