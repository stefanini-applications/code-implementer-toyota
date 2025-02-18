export default {
  languages: {
    'en-US': 'English'
  },
  header: {
    filter: 'Filter by',
    paginationItems: 'Items per page',
    attachments: 'Attachments',
    substances: 'Substances',
    legreg: 'Legislation / Regulation',
    description: 'Description',
    dueDate: 'Due Date',
    toyota: 'Toyota',
    announcement: 'Announcement Date',
    agency: 'Agency',
    dates: 'Dates',
    newSubstance: 'New Substance',
    newSubstanceUse: 'New Substance Use',
    editSubstanceUse: 'Edit Substance Use',
    newClass: 'New Class',
    editSubstance: 'Edit Substance',
    editClass: 'Edit Class',
    success: 'Success',
    error: 'Error',
    updateSuccess: 'The update was created succesfully'
  },
  navbar: {
    substances: 'Substances',
    substance: 'SubstanceRecord',
    regulations: 'Regulations',
    legislations: 'Legislations',
    searchResults: 'Search Results',
    regulatoryUpdates: 'Regulatory/Legislative Updates',
    impactAssessment: 'Impact Assessment',
    substanceRecord: 'Substance Record',
    addSubstance: 'Substance',
    addClass: 'Class'
  },
  breadcrumbs: {
    home: 'Home',
    search: 'Search',
    admin: 'Admin'
  },
  menuTabs: {
    attachments: 'Attachments',
    journals: 'Journals'
  },
  components: {
    searchBar: {
      placeholder: 'Search here...',
      advancedSearch: 'Advanced Search',
      noSuggestions: 'No options',
      toastErrorListSearchBarResults:
        'It was not possible load search bar results'
    },
    searchResult: {
      phase: 'Phase:',
      jurisdiction: 'Jurisdiction:',
      regulation: 'Regulation Body:',
      latestUpdate: 'Latest Update:',
      actionFrom: 'by'
    },
    buttons: {
      clearButton: 'Clear',
      saveButton: 'Save',
      createButton: 'Create',
      cancelButton: 'Cancel',
      confirmButton: 'Confirm',
      applyButton: 'Apply',
      recognizeButton: 'Recognize',
      finishButton: 'Finish',
      addAttachmentButton: '+ add more attachments'
    },
    input: {
      noSuggestions: 'No options',
      toastMandatoryFields: 'Fill in all required fields'
    },
    attachments: {
      toastErrorAttachmentRecord:
        'It was not possible to load the attachment record',
      toastErrorListAttachments:
        'It was not possible to load the attachments list'
    },
    advancedSearch: {
      toastErrorListAdSearchResults:
        'It was not possible to load the results list'
    }
  },
  pages: {
    alertDashboard: {
      toastSuccessAck: 'Changelog was acknowledged successfully',
      toastSuccessUndoAck: 'Acknowledge was undone successfully',
    },
    listings: {
      toastErrorAttachmentRead: 'Unable to upload the attachment',
      toastListingsColumnsError: 'Number of columns from uploaded file are not equals to below table columns',
      toastErrorListUpdate: 'It was not possible to update the listing',
      toastErrorLoadList: 'It was not possible to load the listings',
      toastSuccessEditLists: 'The record was successfully edited',
    },
    signin: {
      title: 'Connect to Toyota GRIIPS. Click the button below',
      button: 'Login',
      copyright: '©copyright Toyota'
    },
    priorityReport: {
      toastError: 'Error loading the Priority Report'
    },
    updates: {
      headerOne: 'TSCA Section 5: Final Significant New Use Rules',
      headerTwo: 'Final SNURs',
      title: 'Regulatory/Legislative Updates'
    },
    searchResultsAll: {
      title: 'Search Results',
      toastErrorListResults: 'It was not possible to load the results list'
    },
    substances: {
      title: 'Substances',
      toastErrorSubstancesEmpty: 'Use description cannot be empty',
      toastErrorListSubstances:
        'It was not possible to load the substances list',
      toastErrorDeleteSubstancesUses:
        'It was not possible to delete the substance uses',
      toastSuccessDeleteSubstanceUses: 'The record was successfully deleted',
      toastSuccessDeleteSubstances: 'The record was successfully deleted',
      toastErrorNewSubstancesUses:
        'It was not possible to create the substance use',
      toastErrorEditSubstancesUses:
        'It was not possible to edit the substance use',
      toastSuccessNewSubstancesUses: 'The record was successfully created',
      toastSuccessEditSubstancesUses: 'The record was successfully edited',
      description: 'Description'
    },
    classes: {
      title: 'Classes',
      toastErrorListSubstances: 'It was not possible to load the class list'
    },
    templates: {
      title: 'Templates',
      toastSuccessDeleteRecord: 'The template was successfully deleted',
      toastErrorDeleteGroupTemplate: 'It was not possible to delete the template',
    },
    substanceRecord: {
      cas: 'CAS RN',
      substanceName: 'Substance Name',
      otherNames: 'Other Names / Numbers',
      classes: 'Classes',
      execSummary: 'Executive Summary',
      nextSteps: 'Next Steps',
      substancesUses: 'Substance Uses',
      jurisdiction: 'Jurisdiction',
      toastSuccessNewRecord: 'The record was successfully created',
      toastSuccessEditRecord: 'The record has been successfully edited',
      toastErrorListSubstanceRecord:
        'It was not possible to load the substance record',
      toastErrorNewRecord:
        'It was not possible register the new record. Try again',
      toastErrorEditRecord: 'It was not possible to edit the record. Try again',
      summaryUses: 'Summary Uses',
      applicationYordas: 'Application',
      groupingYordas: 'Grouping',
      materialYordas: 'Material',
      techFunctionsYordas: 'Tech Functions'
    },
    classRecord: {
      className: 'Class Name',
      otherNames: 'Other Names',
      subClasses: 'Sub-classes',
      classes: 'Classes',
      execSummary: 'Executive Summary',
      nextSteps: 'Next Steps',
      substancesUses: 'Substance Uses',
      jurisdiction: 'Jurisdiction',
      toastSuccessNewRecord: 'The record was successfully created',
      toastSuccessEditRecord: 'The record has been successfully edited',
      toastErrorListSubstanceRecord:
        'It was not possible to load the substance record',
      toastErrorNewRecord:
        'It was not possible register the new record. Try again',
      toastErrorEditRecord: 'It was not possible to edit the record. Try again'
    },
    regulations: {
      title: 'Regulations',
      newRegulation: 'Regulation',
      editRegulation: 'Edit Regulation',
      toastErrorListRegulations:
        'It was not possible to load the regulations list',
      toastErrorImpactAssessmentBySubstanceRegulationAndToyotaRegionFailure:
        'Failed to validate Regulation and Impacted Toyota Region',
      toastErrorListListings:
        'It was not possible to load the listings',
      toastSuccessNewRegulation: 'The regulation was successfully created',
      toastSuccessEditRegulation: 'The regulation has been successfully edited',
      toastErrorNewRegulation:
        'It was not possible register the regulation. Try again',
      toastErrorEditRegulation:
        'It was not possible to edit the regulation. Try again',
      toastSuccessDeleteRegulation: 'The record was successfully deleted',
      toastErrorCreateEditRegulationGroup:
        'It was not possible to create or modify a Legislation / Regulation Group',
      toastErrorGetRegulationGroup:
        'It was not possible to load the Group record',
      toastSuccessCreateEditRegulationGroup:
        'The Legislation / Regulation Group was successfully created / edited',
      toastErrorDeleteRegulationGroup:
        'It was not possible to delete the Group record',
      toastErrorCreateEditTemplate:
        'It was not possible to create or modify a Template',
      toastSuccessCreateEditTemplate:
        'The Template was successfully created / edited',
    },
    legislations: {
      title: 'Legislations',
      newLegislation: 'Legislation',
      editLegislation: 'Edit Legislation',
      toastErrorRegulatoryBodiesEmpty: 'Regulatory Bodies name cannot be empty',
      toastErrorRegulatoryBodiesSize: 'Regulatory Bodies name max size is 255 characters',
      toastErrorSubJurisdictionEmpty: 'Sub-jurisdiction name cannot be empty',
      toastErrorAbbreviationEmpty: 'Abbreviation cannot be empty',
      toastErrorSubJurisdictionSize: 'Sub-jurisdiction name max size is 255 characters',
      toastErrorAbbreviationSize: 'Abbreviation max size is 255 characters',
      toastErrorListLegislations:
        'It was not possible to load the legislations list',
      toastErrorLegislationRecord:
        'It was not possible to load the legislation record',
      toastSuccessNewLegislation: 'The legislation was successfully created',
      toastSuccessEditLegislation:
        'The legislation has been successfully edited',
      toastErrorNewLegislation:
        'It was not possible register the legislation. Try again',
      toastErrorEditLegislation:
        'It was not possible to edit the legislation. Try again',
      toastSuccessDeleteLegislations: 'The record was successfully deleted'
    },
    impactAssessment: {
      title: 'Impact Assessment',
      toastSuccessNewRecord: 'The Impact Assessment was successfully created',
      toastSuccessAttachmentSubstance: 'The attachment was successfully created',
      toastErrorAttachmentSubstance: 'There was an error getting the attachment',
      toastSuccessEditRecord:
        'The Impact Assessment has been successfully edited',
      toastSuccessEditAttachmentSubstance:
        'The Attachment has been successfully edited',
      toastErrorEditAttachmentSubstance:
        'It was not possible to edit the attachment.',
      toastSuccessCreateAttachmentSubstance:
        'The Attachment has been successfully created',
      toastErrorCreateAttachmentSubstance:
        'It was not possible to create the attachment.',
      toastSuccessDeleteAttachmentSubstance:
        'The Attachment has been successfully deleted',
      toastErrorDeleteAttachmentSubstance:
        'It was not possible to delete the attachment.',
      toastErrorListImpactAssessment:
        'It was not possible to load the impact assessment list',
      toastErrorImpactAssessmentRecord:
        'It was not possible to load the impact assessment record',
      toastErrorNewRecord:
        'It was not possible register the new record. Try again',
      toastErrorEditRecord: 'It was not possible to edit the record. Try again',
      toastErrorImpactAssessmentReadTabs:
        'Four number of sheets are not present in the file!',
      toastErrorImpactAssessmentInvalidSheetNames:
        'Invalid sheet name, expected (Article, Direct, Indirect, Service)',
      toastSuccessListUpload: 'Impact Assessment for batches of Substances is successfully uploaded',
      toastSuccessListUploadError: 'It was not possible to upload Impact Assessment for batches of Substances'
    },
    agency: {
      toastSuccessNewRecord: 'The record was successfully created/updated',
      toastSuccessEditRecord: 'The record has been successfully edited',
      toastSuccessDeleteRecord: 'Records inactivated successfully',
      toastErrorNewRecord:
        'It was not possible register the new record. Try again',
      toastErrorEditRecord: 'It was not possible to edit the record. Try again',
      toastErrorDuplicateRecord: 'The record already exists',
      toastErrorDuplicateAbbrRecord: 'Sub-jurisdiction abbreviation must be unique'
    },
    regulatoryUpdates: {
      title: 'Regulatory Updates',
      newUpdate: 'New Update',
      editUpdate: 'Edit Update',
      toastSuccessNewRecord: 'The record was successfully created',
      toastSuccessEditRecord: 'The record has been successfully edited',
      toastSuccessDeleteRecord: 'The update has been successfully deleted',
      toastErrorListRegulatoryUpdates:
        'It was not possible to load the regulatory updates list',
      toastErrorListRegions: 'It was not possible to load the regions list',
      toastErrorNewRecord:
        'It was not possible register the new record. Try again',
      toastErrorEditRecord: 'It was not possible to edit the record. Try again',
      toastErrorAttachment: 'Attachment extension invalid',
      toastEmpty: 'Mandatory field not filled in'
    },
    relatedSubstances: {
      toastErrorListRelatedSubstances:
        'It was not possible to load the related substances list',
      toastErrorNewRecord:
        'It was not possible register the new record. Try again'
    },
    users: {
      title: 'Users',
      toastErrorListUsers: 'It was not possible to load the users list',
      toastErrorEditUsers: 'It was not possible to edit the user',
      toastSuccessEditUsers: 'The record was successfully edited',
      toastErrorRoleEmpty: 'Role cannot be empty',
      toastSuccessEditUserPreferences: 'User preferences successfully saved',
      toastSuccessChangeToyotaRegion: 'User Impacted Toyota Region was successfully changed',
    },
    roles: {
      title: 'Roles',
      toastErrorGetRoles: 'It was not possible to load the roles list'
    }
  },
  lists: {
    enumerators: {
      placeholder: 'Select',
      toastErrorListJurisdictions:
        'It was not possible to load the jurisdictions list',
      toastErrorListAgency: 'It was not possible to load the agency list'
    }
  },
  queuesToast: {
    impactAssessmentUpload: {
      message: 'Impact Assessment information is being processed',
      description: 'You will receive an email notification when the process is completed (approximately 1-2 minutes).',
    },
    deleteGroup: {
      message: 'The group is being deleted',
      description: 'You will receive an email notification when the process is completed (approximately 1-2 minutes).',
    }
  }
};
