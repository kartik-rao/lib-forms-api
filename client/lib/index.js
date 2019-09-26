"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var IAddressType;
(function (IAddressType) {
    IAddressType["Billing"] = "BILLING";
    IAddressType["Contact"] = "CONTACT";
})(IAddressType = exports.IAddressType || (exports.IAddressType = {}));
var IBooleanFilterExpression;
(function (IBooleanFilterExpression) {
    IBooleanFilterExpression["Ne"] = "ne";
    IBooleanFilterExpression["Eq"] = "eq";
})(IBooleanFilterExpression = exports.IBooleanFilterExpression || (exports.IBooleanFilterExpression = {}));
var IFilterWith;
(function (IFilterWith) {
    IFilterWith["And"] = "AND";
    IFilterWith["Or"] = "OR";
})(IFilterWith = exports.IFilterWith || (exports.IFilterWith = {}));
var INumericFilterExpression;
(function (INumericFilterExpression) {
    INumericFilterExpression["In"] = "in";
    INumericFilterExpression["Ne"] = "ne";
    INumericFilterExpression["Eq"] = "eq";
    INumericFilterExpression["Le"] = "le";
    INumericFilterExpression["Lt"] = "lt";
    INumericFilterExpression["Ge"] = "ge";
    INumericFilterExpression["Gt"] = "gt";
    INumericFilterExpression["Between"] = "between";
    INumericFilterExpression["NotBetween"] = "notBetween";
    INumericFilterExpression["IsNull"] = "isNull";
    INumericFilterExpression["IsNotNull"] = "isNotNull";
})(INumericFilterExpression = exports.INumericFilterExpression || (exports.INumericFilterExpression = {}));
var ISortOrder;
(function (ISortOrder) {
    ISortOrder["Asc"] = "asc";
    ISortOrder["Desc"] = "desc";
})(ISortOrder = exports.ISortOrder || (exports.ISortOrder = {}));
var IStringFilterExpression;
(function (IStringFilterExpression) {
    IStringFilterExpression["Ne"] = "ne";
    IStringFilterExpression["Eq"] = "eq";
    IStringFilterExpression["Contains"] = "contains";
    IStringFilterExpression["NotContains"] = "notContains";
    IStringFilterExpression["StartsWith"] = "startsWith";
    IStringFilterExpression["IsNull"] = "isNull";
    IStringFilterExpression["IsNotNull"] = "isNotNull";
    IStringFilterExpression["In"] = "in";
})(IStringFilterExpression = exports.IStringFilterExpression || (exports.IStringFilterExpression = {}));
var IUserGroup;
(function (IUserGroup) {
    IUserGroup["Admin"] = "Admin";
    IUserGroup["AccountAdmin"] = "AccountAdmin";
    IUserGroup["AccountEditor"] = "AccountEditor";
    IUserGroup["AccountViewer"] = "AccountViewer";
})(IUserGroup = exports.IUserGroup || (exports.IUserGroup = {}));
const graphql_tag_1 = __importDefault(require("graphql-tag"));
exports.UserFields = graphql_tag_1.default `
  fragment userFields on User {
    id
    email
    userGroup
    given_name
    family_name
    createdAt
    updatedAt
  }
`;
exports.AccountFields = graphql_tag_1.default `
  fragment accountFields on Account {
    id
    name
    ownerId
    ownedBy {
      ...userFields
    }
  }
  ${exports.UserFields}
`;
exports.FormFields = graphql_tag_1.default `
  fragment formFields on Form {
    id
    ownerId
    ownedBy {
      ...userFields
    }
    description
    accountId
    account {
      ...accountFields
    }
    createdAt
  }
  ${exports.UserFields}
  ${exports.AccountFields}
`;
exports.PlanTypeFields = graphql_tag_1.default `
  fragment planTypeFields on PlanType {
    id
    name
    cost
    billingTerm
  }
`;
exports.PlanFields = graphql_tag_1.default `
  fragment planFields on Plan {
    id
    accountId
    ownerId
    ownedBy {
      ...userFields
    }
    planTypeId
    planType {
      ...planTypeFields
    }
    startDate
  }
  ${exports.UserFields}
  ${exports.PlanTypeFields}
`;
exports.AddPlanType = graphql_tag_1.default `
  mutation AddPlanType($input: AddPlanTypeInput) {
    addPlanType(input: $input) {
      id
      ownerId
      ownedBy {
        ...userFields
      }
      name
      cost
      active
      billingTerm
      createdAt
      updatedAt
      isDeleted
    }
  }
  ${exports.UserFields}
`;
exports.AddPlan = graphql_tag_1.default `
  mutation AddPlan($input: AddPlanInput) {
    addPlan(input: $input) {
      id
      accountId
      account {
        id
        name
        website
        taxId
        ownerId
        planId
        createdAt
        updatedAt
        active
        numForms
        numUsers
      }
      ownerId
      ownedBy {
        ...userFields
      }
      planTypeId
      startDate
      endDate
      active
      lastBillDate
      createdAt
      updatedAt
      planType {
        id
        ownerId
        name
        cost
        active
        billingTerm
        createdAt
        updatedAt
        isDeleted
      }
      isDeleted
    }
  }
  ${exports.UserFields}
`;
exports.AddIntegrationType = graphql_tag_1.default `
  mutation AddIntegrationType($input: AddIntegrationTypeInput) {
    addIntegrationType(input: $input) {
      id
      ownerId
      ownedBy {
        ...userFields
      }
      planTypeId
      planType {
        id
        ownerId
        name
        cost
        active
        billingTerm
        createdAt
        updatedAt
        isDeleted
      }
      name
      active
      createdAt
      updatedAt
    }
  }
  ${exports.UserFields}
`;
exports.AddIntegration = graphql_tag_1.default `
  mutation AddIntegration($input: AddIntegrationInput) {
    addIntegration(input: $input) {
      id
      integrationTypeId
      integrationType {
        id
        ownerId
        planTypeId
        name
        active
        createdAt
        updatedAt
      }
      ownerId
      ownedBy {
        ...userFields
      }
      accountId
      formId
      form {
        ...formFields
      }
      active
      authType
      auth
      target
      method
      lastExecuted
      lastExecutionResult
      lastExecutionResultMessage
      createdAt
      updatedAt
      isDeleted
    }
  }
  ${exports.UserFields}
  ${exports.FormFields}
`;
exports.AddForm = graphql_tag_1.default `
  mutation AddForm($input: AddFormInput!) {
    addForm(input: $input) {
      id
      ownerId
      name
      description
      ownedBy {
        ...userFields
      }
      accountId
      account {
        ...accountFields
      }
      createdAt
      updatedAt
      startDate
      endDate
      isPaused
      isDeleted
      redirectNotStarted
      redirectHasEnded
    }
  }
  ${exports.UserFields}
  ${exports.AccountFields}
`;
exports.AddFormVersion = graphql_tag_1.default `
  mutation AddFormVersion($input: AddFormVersionInput!) {
    addFormVersion(input: $input) {
      id
      ownerId
      name
      description
      versionId
      versionActivatedDate
      version {
        id
        accountId
        formId
        ownerId
        createdAt
        displayName
        notes
        formData
        ownedBy {
          ...userFields
        }
      }
      ownedBy {
        ...userFields
      }
      accountId
      account {
        ...accountFields
      }
      createdAt
      updatedAt
      startDate
      endDate
      isPaused
      isDeleted
      redirectNotStarted
      redirectHasEnded
      versions {
        id
        accountId
        formId
        ownerId
        createdAt
        displayName
        notes
        ownedBy {
          ...userFields
        }
      }
    }
  }
  ${exports.UserFields}
  ${exports.AccountFields}
`;
exports.AttachFormVersion = graphql_tag_1.default `
  mutation AttachFormVersion($input: AttachFormVersionInput!) {
    attachFormVersion(input: $input) {
      id
      versionId
      versionActivatedDate
      version {
        id
        accountId
        formId
        ownerId
        createdAt
        displayName
        notes
        formData
        ownedBy {
          ...userFields
        }
      }
      updatedAt
    }
  }
  ${exports.UserFields}
`;
exports.UpdatePlanType = graphql_tag_1.default `
  mutation UpdatePlanType($input: UpdatePlanTypeInput) {
    updatePlanType(input: $input) {
      id
      ownerId
      ownedBy {
        ...userFields
      }
      name
      cost
      active
      billingTerm
      createdAt
      updatedAt
      isDeleted
    }
  }
  ${exports.UserFields}
`;
exports.UpdatePlan = graphql_tag_1.default `
  mutation UpdatePlan($input: UpdatePlanInput) {
    updatePlan(input: $input) {
      id
      accountId
      account {
        ...accountFields
      }
      ownerId
      ownedBy {
        ...userFields
      }
      planTypeId
      startDate
      endDate
      active
      lastBillDate
      createdAt
      updatedAt
      planType {
        id
        ownerId
        name
        cost
        active
        billingTerm
        createdAt
        updatedAt
        isDeleted
      }
      isDeleted
    }
  }
  ${exports.AccountFields}
  ${exports.UserFields}
`;
exports.UpdateAccount = graphql_tag_1.default `
  mutation UpdateAccount($input: UpdateAccountInput) {
    updateAccount(input: $input) {
      id
      name
      addresses {
        id
        name
        addressee
        addressType
        phone_number
        email
        street
        city
        state
        country
      }
      website
      taxId
      ownerId
      ownedBy {
        ...userFields
      }
      plan {
        id
        accountId
        ownerId
        planTypeId
        startDate
        endDate
        active
        lastBillDate
        createdAt
        updatedAt
        isDeleted
      }
      planId
      createdAt
      updatedAt
      active
      numForms
      numUsers
    }
  }
  ${exports.UserFields}
`;
exports.UpdateAccountPlan = graphql_tag_1.default `
  mutation UpdateAccountPlan($input: AddPlanInput) {
    updateAccountPlan(input: $input) {
      id
      name
      website
      taxId
      ownerId
      ownedBy {
        ...userFields
      }
      plan {
        id
        accountId
        ownerId
        planTypeId
        startDate
        endDate
        active
        lastBillDate
        createdAt
        updatedAt
        isDeleted
      }
      planId
      createdAt
      updatedAt
      active
      numForms
      numUsers
    }
  }
  ${exports.UserFields}
`;
exports.UpdateUser = graphql_tag_1.default `
  mutation UpdateUser($input: UpdateUserInput) {
    updateUser(input: $input) {
      id
      ownerId
      ownedBy {
        ...userFields
      }
      accountId
      account {
        ...accountFields
      }
      email
      userGroup
      given_name
      family_name
      phone_number
      createdAt
      updatedAt
      isDeleted
      numForms
    }
  }
  ${exports.UserFields}
  ${exports.AccountFields}
`;
exports.UpdateIntegrationType = graphql_tag_1.default `
  mutation UpdateIntegrationType($input: UpdateIntegrationTypeInput) {
    updateIntegrationType(input: $input) {
      id
      ownerId
      ownedBy {
        ...userFields
      }
      planTypeId
      planType {
        id
        ownerId
        name
        cost
        active
        billingTerm
        createdAt
        updatedAt
        isDeleted
      }
      name
      active
      createdAt
      updatedAt
    }
  }
  ${exports.UserFields}
`;
exports.UpdateIntegration = graphql_tag_1.default `
  mutation UpdateIntegration($input: UpdateIntegrationInput) {
    updateIntegration(input: $input) {
      id
      integrationTypeId
      integrationType {
        id
        ownerId
        planTypeId
        name
        active
        createdAt
        updatedAt
      }
      ownerId
      accountId
      formId
      active
      authType
      auth
      target
      method
      lastExecuted
      lastExecutionResult
      lastExecutionResultMessage
      createdAt
      updatedAt
      isDeleted
    }
  }
`;
exports.UpdateForm = graphql_tag_1.default `
  mutation UpdateForm($input: UpdateFormInput) {
    updateForm(input: $input) {
      id
      ownerId
      name
      description
      versionId
      versionActivatedDate
      version {
        id
        accountId
        formId
        ownerId
        createdAt
        displayName
        notes
        formData
      }
      ownedBy {
        ...userFields
      }
      accountId
      account {
        ...accountFields
      }
      createdAt
      updatedAt
      startDate
      endDate
      isPaused
      isDeleted
      redirectNotStarted
      redirectHasEnded
      versions {
        id
        accountId
        formId
        ownerId
        createdAt
        displayName
        notes
        ownedBy {
          ...userFields
        }
      }
    }
  }
  ${exports.UserFields}
  ${exports.AccountFields}
`;
exports.DeleteForm = graphql_tag_1.default `
  mutation DeleteForm($input: DeleteFormInput!) {
    deleteForm(input: $input) {
      id
      ownerId
      name
      description
      versionId
      versionActivatedDate
      version {
        id
        accountId
        formId
        ownerId
        createdAt
        displayName
        notes
        formData
      }
      ownedBy {
        ...userFields
      }
      accountId
      account {
        ...accountFields
      }
      createdAt
      updatedAt
      startDate
      endDate
      isPaused
      isDeleted
      redirectNotStarted
      redirectHasEnded
      versions {
        id
        accountId
        formId
        ownerId
        createdAt
        displayName
        notes
        formData
      }
      integrations {
        id
        integrationTypeId
        ownerId
        accountId
        formId
        active
        authType
        auth
        target
        method
        lastExecuted
        lastExecutionResult
        lastExecutionResultMessage
        createdAt
        updatedAt
        isDeleted
      }
      entries {
        id
        formId
        data
        createdAt
      }
    }
  }
  ${exports.UserFields}
  ${exports.AccountFields}
`;
exports.DeletePlanType = graphql_tag_1.default `
  mutation DeletePlanType($planTypeId: ID!) {
    deletePlanType(planTypeId: $planTypeId) {
      id
      ownerId
      ownedBy {
        ...userFields
      }
      name
      cost
      active
      billingTerm
      createdAt
      updatedAt
      isDeleted
    }
  }
  ${exports.UserFields}
`;
exports.DeletePlan = graphql_tag_1.default `
  mutation DeletePlan($accountId: ID!, $planId: ID!) {
    deletePlan(accountId: $accountId, planId: $planId) {
      id
      accountId
      account {
        ...accountFields
      }
      ownerId
      ownedBy {
        ...userFields
      }
      planTypeId
      startDate
      endDate
      active
      lastBillDate
      createdAt
      updatedAt
      planType {
        id
        ownerId
        name
        cost
        active
        billingTerm
        createdAt
        updatedAt
        isDeleted
      }
      isDeleted
    }
  }
  ${exports.AccountFields}
  ${exports.UserFields}
`;
exports.DeleteAccount = graphql_tag_1.default `
  mutation DeleteAccount($accountId: ID!) {
    deleteAccount(accountId: $accountId) {
      id
      name
      website
      taxId
      ownerId
      ownedBy {
        ...userFields
      }
      plan {
        id
        accountId
        ownerId
        planTypeId
        startDate
        endDate
        active
        lastBillDate
        createdAt
        updatedAt
        isDeleted
      }
      planId
      createdAt
      updatedAt
      active
      numForms
      numUsers
    }
  }
  ${exports.UserFields}
`;
exports.DeleteUser = graphql_tag_1.default `
  mutation DeleteUser($userId: ID!) {
    deleteUser(userId: $userId) {
      id
      ownerId
      ownedBy {
        ...userFields
      }
      accountId
      account {
        ...accountFields
      }
      email
      userGroup
      given_name
      family_name
      phone_number
      createdAt
      updatedAt
      isDeleted
      numForms
    }
  }
  ${exports.UserFields}
  ${exports.AccountFields}
`;
exports.DeleteIntegrationType = graphql_tag_1.default `
  mutation DeleteIntegrationType($integrationTypeId: ID!) {
    deleteIntegrationType(integrationTypeId: $integrationTypeId) {
      id
      ownerId
      ownedBy {
        ...userFields
      }
      planTypeId
      planType {
        id
        ownerId
        name
        cost
        active
        billingTerm
        createdAt
        updatedAt
        isDeleted
      }
      name
      active
      createdAt
      updatedAt
    }
  }
  ${exports.UserFields}
`;
exports.DeleteIntegration = graphql_tag_1.default `
  mutation DeleteIntegration($integrationId: ID!) {
    deleteIntegration(integrationId: $integrationId) {
      id
      integrationTypeId
      integrationType {
        id
        ownerId
        planTypeId
        name
        active
        createdAt
        updatedAt
      }
      ownerId
      ownedBy {
        ...userFields
      }
      accountId
      account {
        ...accountFields
      }
      formId
      active
      authType
      auth
      target
      method
      lastExecuted
      lastExecutionResult
      lastExecutionResultMessage
      createdAt
      updatedAt
      isDeleted
    }
  }
  ${exports.UserFields}
  ${exports.AccountFields}
`;
exports.DeleteFormVersion = graphql_tag_1.default `
  mutation DeleteFormVersion($input: DeleteFormVersionInput!) {
    deleteFormVersion(input: $input) {
      id
      accountId
      formId
      ownerId
      ownedBy {
        ...userFields
      }
      createdAt
      displayName
      notes
      formData
    }
  }
  ${exports.UserFields}
`;
exports.AddFormEntry = graphql_tag_1.default `
  mutation AddFormEntry($input: AddFormEntryInput!) {
    addFormEntry(input: $input) {
      id
      formId
      createdAt
    }
  }
`;
exports.GetAccount = graphql_tag_1.default `
  query GetAccount($accountId: ID!) {
    getAccount(accountId: $accountId) {
      id
      name
      addresses {
        id
        name
        addressee
        addressType
        phone_number
        email
        street
        city
        state
        country
      }
      website
      taxId
      ownerId
      ownedBy {
        ...userFields
      }
      planId
      plan {
        ...planFields
      }
      createdAt
      updatedAt
      active
      numForms
      numUsers
    }
  }
  ${exports.UserFields}
  ${exports.PlanFields}
`;
exports.GetUser = graphql_tag_1.default `
  query GetUser($userId: ID!) {
    getUser(userId: $userId) {
      id
      ownerId
      ownedBy {
        ...userFields
      }
      accountId
      account {
        ...accountFields
      }
      email
      userGroup
      given_name
      family_name
      phone_number
      createdAt
      updatedAt
      isDeleted
      numForms
    }
  }
  ${exports.UserFields}
  ${exports.AccountFields}
`;
exports.GetPlan = graphql_tag_1.default `
  query GetPlan($planId: String!) {
    getPlan(planId: $planId) {
      id
      accountId
      account {
        ...accountFields
      }
      ownerId
      ownedBy {
        ...userFields
      }
      planTypeId
      startDate
      endDate
      active
      lastBillDate
      createdAt
      updatedAt
      planType {
        id
        ownerId
        name
        cost
        active
        billingTerm
        createdAt
        updatedAt
        isDeleted
      }
      isDeleted
    }
  }
  ${exports.AccountFields}
  ${exports.UserFields}
`;
exports.GetActiveAccountPlan = graphql_tag_1.default `
  query GetActiveAccountPlan($accountId: String!) {
    getActiveAccountPlan(accountId: $accountId) {
      id
      accountId
      account {
        ...accountFields
      }
      ownerId
      ownedBy {
        ...userFields
      }
      planTypeId
      startDate
      endDate
      active
      lastBillDate
      createdAt
      updatedAt
      planType {
        id
        ownerId
        ownedBy {
          ...userFields
        }
        name
        cost
        active
        billingTerm
        createdAt
        updatedAt
        isDeleted
      }
      isDeleted
    }
  }
  ${exports.AccountFields}
  ${exports.UserFields}
`;
exports.GetPlanType = graphql_tag_1.default `
  query GetPlanType($planTypeId: String!) {
    getPlanType(planTypeId: $planTypeId) {
      id
      ownerId
      ownedBy {
        ...userFields
      }
      name
      cost
      active
      billingTerm
      createdAt
      updatedAt
      isDeleted
    }
  }
  ${exports.UserFields}
`;
exports.GetForm = graphql_tag_1.default `
  query GetForm($formId: String!) {
    getForm(formId: $formId) {
      id
      ownerId
      name
      description
      versionId
      versionActivatedDate
      version {
        id
        accountId
        formId
        ownerId
        createdAt
        displayName
        notes
        formData
        ownedBy {
          ...userFields
        }
      }
      ownedBy {
        ...userFields
      }
      accountId
      account {
        ...accountFields
      }
      createdAt
      updatedAt
      startDate
      endDate
      isPaused
      isDeleted
      redirectNotStarted
      redirectHasEnded
      versions {
        id
        createdAt
        displayName
        notes
        ownedBy {
          ...userFields
        }
      }
    }
  }
  ${exports.UserFields}
  ${exports.AccountFields}
`;
exports.GetFormVersion = graphql_tag_1.default `
  query GetFormVersion($versionId: String!) {
    getFormVersion(versionId: $versionId) {
      id
      accountId
      formId
      ownerId
      ownedBy {
        ...userFields
      }
      createdAt
      displayName
      notes
      formData
    }
  }
  ${exports.UserFields}
`;
exports.GetIntegrationType = graphql_tag_1.default `
  query GetIntegrationType($integrationTypeId: String!) {
    getIntegrationType(integrationTypeId: $integrationTypeId) {
      id
      ownerId
      ownedBy {
        ...userFields
      }
      planTypeId
      planType {
        id
        ownerId
        name
        cost
        active
        billingTerm
        createdAt
        updatedAt
        isDeleted
      }
      name
      active
      createdAt
      updatedAt
    }
  }
  ${exports.UserFields}
`;
exports.GetIntegration = graphql_tag_1.default `
  query GetIntegration($integrationId: String!) {
    getIntegration(integrationId: $integrationId) {
      id
      integrationTypeId
      integrationType {
        id
        ownerId
        planTypeId
        name
        active
        createdAt
        updatedAt
      }
      ownerId
      accountId
      formId
      form {
        id
        ownerId
        name
        description
        versionId
        versionActivatedDate
        accountId
        createdAt
        updatedAt
        startDate
        endDate
        isPaused
        isDeleted
        redirectNotStarted
        redirectHasEnded
      }
      active
      authType
      auth
      target
      method
      lastExecuted
      lastExecutionResult
      lastExecutionResultMessage
      createdAt
      updatedAt
      isDeleted
    }
  }
`;
exports.GetFormEntry = graphql_tag_1.default `
  query GetFormEntry($formEntryId: String!) {
    getFormEntry(formEntryId: $formEntryId) {
      id
      accountId
      formId
      form {
        id
        ownerId
        name
        description
        versionId
        versionActivatedDate
        accountId
        createdAt
        updatedAt
        startDate
        endDate
        isPaused
        isDeleted
        redirectNotStarted
        redirectHasEnded
      }
      data
      createdAt
    }
  }
`;
exports.ListAccounts = graphql_tag_1.default `
  query ListAccounts(
    $offsetLimit: OffsetLimit
    $filter: AccountFilterInput
    $sort: AccountSortInput
  ) {
    listAccounts(offsetLimit: $offsetLimit, filter: $filter, sort: $sort) {
      id
      name
      addresses {
        id
        name
        addressee
        addressType
        phone_number
        email
        street
        city
        state
        country
      }
      website
      taxId
      ownerId
      ownedBy {
        ...userFields
      }
      plan {
        ...planFields
      }
      planId
      createdAt
      updatedAt
      active
      numForms
      numUsers
    }
  }
  ${exports.UserFields}
  ${exports.PlanFields}
`;
exports.ListUsers = graphql_tag_1.default `
  query ListUsers(
    $offsetLimit: OffsetLimit
    $filter: UserFilterInput
    $sort: UserSortInput
  ) {
    listUsers(offsetLimit: $offsetLimit, filter: $filter, sort: $sort) {
      id
      ownerId
      ownedBy {
        ...userFields
      }
      accountId
      account {
        ...accountFields
      }
      email
      userGroup
      given_name
      family_name
      phone_number
      createdAt
      updatedAt
      isDeleted
    }
  }
  ${exports.UserFields}
  ${exports.AccountFields}
`;
exports.ListPlans = graphql_tag_1.default `
  query ListPlans(
    $offsetLimit: OffsetLimit
    $filter: PlanFilterInput
    $sort: PlanSortInput
  ) {
    listPlans(offsetLimit: $offsetLimit, filter: $filter, sort: $sort) {
      id
      accountId
      account {
        ...accountFields
      }
      ownerId
      ownedBy {
        ...userFields
      }
      planTypeId
      startDate
      endDate
      active
      lastBillDate
      createdAt
      updatedAt
      planType {
        id
        ownerId
        name
        cost
        active
        billingTerm
        createdAt
        updatedAt
        isDeleted
      }
      isDeleted
    }
  }
  ${exports.AccountFields}
  ${exports.UserFields}
`;
exports.ListPlanTypes = graphql_tag_1.default `
  query ListPlanTypes(
    $offsetLimit: OffsetLimit
    $filter: PlanTypeFilterInput
    $sort: PlanTypeSortInput
  ) {
    listPlanTypes(offsetLimit: $offsetLimit, filter: $filter, sort: $sort) {
      id
      ownerId
      ownedBy {
        ...userFields
      }
      name
      cost
      active
      billingTerm
      createdAt
      updatedAt
      isDeleted
    }
  }
  ${exports.UserFields}
`;
exports.ListForms = graphql_tag_1.default `
  query ListForms(
    $offsetLimit: OffsetLimit
    $filter: FormFilterInput
    $sort: FormSortInput
  ) {
    listForms(offsetLimit: $offsetLimit, filter: $filter, sort: $sort) {
      id
      ownerId
      name
      description
      versionId
      versionActivatedDate
      version {
        id
        accountId
        displayName
        createdAt
        ownedBy {
          ...userFields
        }
        notes
      }
      ownedBy {
        ...userFields
      }
      accountId
      account {
        ...accountFields
      }
      createdAt
      updatedAt
      startDate
      endDate
      isPaused
      isDeleted
      redirectNotStarted
      redirectHasEnded
    }
  }
  ${exports.UserFields}
  ${exports.AccountFields}
`;
exports.ListFormVersions = graphql_tag_1.default `
  query ListFormVersions(
    $offsetLimit: OffsetLimit
    $filter: FormVersionFilterInput
    $sort: FormVersionSortInput
  ) {
    listFormVersions(offsetLimit: $offsetLimit, filter: $filter, sort: $sort) {
      id
      accountId
      formId
      ownerId
      ownedBy {
        ...userFields
      }
      createdAt
      displayName
      notes
    }
  }
  ${exports.UserFields}
`;
exports.ListIntegrationTypes = graphql_tag_1.default `
  query ListIntegrationTypes(
    $offsetLimit: OffsetLimit
    $filter: IntegrationTypeFilterInput
    $sort: IntegrationTypeSortInput
  ) {
    listIntegrationTypes(
      offsetLimit: $offsetLimit
      filter: $filter
      sort: $sort
    ) {
      id
      ownerId
      ownedBy {
        ...userFields
      }
      planTypeId
      planType {
        id
        ownerId
        name
        cost
        active
        billingTerm
        createdAt
        updatedAt
        isDeleted
      }
      name
      active
      createdAt
      updatedAt
    }
  }
  ${exports.UserFields}
`;
exports.ListIntegrations = graphql_tag_1.default `
  query ListIntegrations(
    $offsetLimit: OffsetLimit
    $filter: IntegrationFilterInput
    $sort: IntegrationSortInput
  ) {
    listIntegrations(offsetLimit: $offsetLimit, filter: $filter, sort: $sort) {
      id
      integrationTypeId
      integrationType {
        id
        ownerId
        planTypeId
        name
        active
        createdAt
        updatedAt
      }
      ownerId
      accountId
      formId
      form {
        ...formFields
      }
      active
      authType
      auth
      target
      method
      lastExecuted
      lastExecutionResult
      lastExecutionResultMessage
      createdAt
      updatedAt
      isDeleted
    }
  }
  ${exports.FormFields}
`;
exports.ListFormEntries = graphql_tag_1.default `
  query ListFormEntries(
    $offsetLimit: OffsetLimit
    $filter: FormEntryFilterInput
    $sort: FormEntrySortInput
  ) {
    listFormEntries(offsetLimit: $offsetLimit, filter: $filter, sort: $sort) {
      id
      accountId
      formId
      form {
        ...formFields
      }
      data
      createdAt
    }
  }
  ${exports.FormFields}
`;
