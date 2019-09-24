import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  AWSPhone: string,
  AWSDateTime: string,
  AWSJSON: string,
  AWSURL: string,
}



export interface Account {
   __typename?: 'Account',
  id: Scalars['ID'],
  name: Scalars['String'],
  addresses?: Maybe<Array<Maybe<Address>>>,
  website?: Maybe<Scalars['String']>,
  taxId?: Maybe<Scalars['String']>,
  ownerId: Scalars['ID'],
  ownedBy: User,
  plan?: Maybe<Plan>,
  planId?: Maybe<Scalars['ID']>,
  createdAt?: Maybe<Scalars['AWSDateTime']>,
  updatedAt?: Maybe<Scalars['AWSDateTime']>,
  active?: Maybe<Scalars['Int']>,
  numForms?: Maybe<Scalars['Int']>,
  numUsers?: Maybe<Scalars['Int']>,
  users?: Maybe<Array<Maybe<User>>>,
  forms?: Maybe<Array<Maybe<Form>>>,
}


export interface AccountAddressesArgs {
  limit?: Maybe<Scalars['Int']>
}


export interface AccountUsersArgs {
  limit?: Maybe<Scalars['Int']>
}


export interface AccountFormsArgs {
  limit?: Maybe<Scalars['Int']>
}

export interface AccountFilterInput {
  name?: Maybe<StringFilter>,
  createdAt?: Maybe<DateFilter>,
  updatedAt?: Maybe<DateFilter>,
  planId?: Maybe<StringFilter>,
  active?: Maybe<IntFilter>,
  criteria?: Maybe<Array<AccountFilterInput>>,
}

export interface AccountSortInput {
  name?: Maybe<SortOrder>,
  createdAt?: Maybe<SortOrder>,
  updatedAt?: Maybe<SortOrder>,
  planId?: Maybe<SortOrder>,
  sortBy?: Maybe<Array<AccountSortInput>>,
}

export interface AddAddressInput {
   __typename?: 'AddAddressInput',
  name: Scalars['String'],
  addressee?: Maybe<Scalars['String']>,
  addressType: AddressType,
  phone_number?: Maybe<Scalars['AWSPhone']>,
  email: Scalars['String'],
  street?: Maybe<Scalars['String']>,
  city?: Maybe<Scalars['String']>,
  state?: Maybe<Scalars['String']>,
  country?: Maybe<Scalars['String']>,
}

export interface AddFormEntryInput {
  id: Scalars['ID'],
  accountId: Scalars['ID'],
  formId: Scalars['ID'],
  data: Scalars['AWSJSON'],
}

export interface AddFormInput {
  accountId: Scalars['ID'],
  name: Scalars['String'],
  description: Scalars['String'],
  startsAt?: Maybe<Scalars['AWSDateTime']>,
  endsAt?: Maybe<Scalars['AWSDateTime']>,
  isPaused?: Maybe<Scalars['Int']>,
}

export interface AddFormVersionInput {
  accountId: Scalars['ID'],
  formId: Scalars['ID'],
  displayName: Scalars['String'],
  notes: Scalars['String'],
  formData: Scalars['AWSJSON'],
}

export interface AddIntegrationInput {
  integrationTypeId: Scalars['ID'],
  accountId: Scalars['ID'],
  formId: Scalars['ID'],
  active?: Maybe<Scalars['Int']>,
  authType?: Maybe<Scalars['String']>,
  auth?: Maybe<Scalars['AWSJSON']>,
  target?: Maybe<Scalars['String']>,
  method?: Maybe<Scalars['String']>,
}

export interface AddIntegrationTypeInput {
  name: Scalars['String'],
  active?: Maybe<Scalars['Int']>,
}

export interface AddPlanInput {
  accountId: Scalars['ID'],
  planTypeId: Scalars['ID'],
  endDate?: Maybe<Scalars['AWSDateTime']>,
  active?: Maybe<Scalars['Int']>,
}

export interface AddPlanTypeInput {
  name: Scalars['String'],
  cost: Scalars['Float'],
  billingTerm: Scalars['String'],
  active: Scalars['Int'],
}

export interface Address {
   __typename?: 'Address',
  id: Scalars['ID'],
  name: Scalars['String'],
  addressee?: Maybe<Scalars['String']>,
  addressType: AddressType,
  phone_number?: Maybe<Scalars['AWSPhone']>,
  email: Scalars['String'],
  street?: Maybe<Scalars['String']>,
  city?: Maybe<Scalars['String']>,
  state?: Maybe<Scalars['String']>,
  country?: Maybe<Scalars['String']>,
}

export enum AddressType {
  Billing = 'BILLING',
  Contact = 'CONTACT'
}

export interface AttachFormVersionInput {
  formId: Scalars['ID'],
  versionId: Scalars['ID'],
  accountId: Scalars['ID'],
}





export interface BooleanFilter {
  with?: Maybe<FilterWith>,
  expression: BooleanFilterExpression,
  value?: Maybe<Array<Scalars['Boolean']>>,
}

export enum BooleanFilterExpression {
  Ne = 'ne',
  Eq = 'eq'
}

export interface DateFilter {
  with?: Maybe<FilterWith>,
  expression: NumericFilterExpression,
  value?: Maybe<Array<Scalars['AWSDateTime']>>,
}

export interface DeleteFormInput {
  id: Scalars['ID'],
  accountId: Scalars['ID'],
}

export interface DeleteFormVersionInput {
  accountId: Scalars['ID'],
  formId: Scalars['ID'],
  versionId: Scalars['ID'],
}

export enum FilterWith {
  And = 'AND',
  Or = 'OR'
}

export interface FloatFilter {
  with?: Maybe<FilterWith>,
  expression: NumericFilterExpression,
  value?: Maybe<Array<Scalars['Float']>>,
}

export interface Form {
   __typename?: 'Form',
  id: Scalars['ID'],
  ownerId: Scalars['ID'],
  name: Scalars['String'],
  description: Scalars['String'],
  versionId?: Maybe<Scalars['ID']>,
  versionActivatedDate?: Maybe<Scalars['AWSDateTime']>,
  version?: Maybe<FormVersion>,
  ownedBy: User,
  accountId: Scalars['ID'],
  account: Account,
  createdAt: Scalars['AWSDateTime'],
  updatedAt?: Maybe<Scalars['AWSDateTime']>,
  startDate?: Maybe<Scalars['AWSDateTime']>,
  endDate?: Maybe<Scalars['AWSDateTime']>,
  isPaused?: Maybe<Scalars['Int']>,
  isDeleted?: Maybe<Scalars['Int']>,
  redirectNotStarted?: Maybe<Scalars['AWSURL']>,
  redirectHasEnded?: Maybe<Scalars['AWSURL']>,
  versions?: Maybe<Array<Maybe<FormVersion>>>,
  integrations?: Maybe<Array<Maybe<Integration>>>,
  numEntries?: Maybe<Scalars['Int']>,
  entries?: Maybe<Array<Maybe<FormEntry>>>,
}


export interface FormVersionsArgs {
  limit?: Maybe<Scalars['Int']>
}


export interface FormIntegrationsArgs {
  limit?: Maybe<Scalars['Int']>
}


export interface FormEntriesArgs {
  limit?: Maybe<Scalars['Int']>
}

export interface FormEntry {
   __typename?: 'FormEntry',
  id: Scalars['ID'],
  accountId: Scalars['ID'],
  formId: Scalars['ID'],
  form: Form,
  data: Scalars['AWSJSON'],
  createdAt: Scalars['AWSDateTime'],
}

export interface FormEntryFilterInput {
  formId?: Maybe<StringFilter>,
  createdAt?: Maybe<DateFilter>,
  accountId?: Maybe<StringFilter>,
  criteria?: Maybe<Array<FormEntryFilterInput>>,
}

export interface FormEntrySansData {
   __typename?: 'FormEntrySansData',
  id: Scalars['ID'],
  formId: Scalars['ID'],
  createdAt: Scalars['AWSDateTime'],
}

export interface FormEntrySortInput {
  createdAt?: Maybe<SortOrder>,
}

export interface FormFilterInput {
  name?: Maybe<StringFilter>,
  ownerId?: Maybe<StringFilter>,
  accountId?: Maybe<StringFilter>,
  createdAt?: Maybe<DateFilter>,
  updatedAt?: Maybe<DateFilter>,
  startsAt?: Maybe<DateFilter>,
  endsAt?: Maybe<DateFilter>,
  isPaused?: Maybe<IntFilter>,
  isDeleted?: Maybe<IntFilter>,
  criteria?: Maybe<Array<FormFilterInput>>,
}

export interface FormSortInput {
  name?: Maybe<SortOrder>,
  createdAt?: Maybe<SortOrder>,
  updatedAt?: Maybe<SortOrder>,
  startsAt?: Maybe<SortOrder>,
  endsAt?: Maybe<SortOrder>,
  sortBy?: Maybe<Array<FormSortInput>>,
}

export interface FormVersion {
   __typename?: 'FormVersion',
  id: Scalars['ID'],
  accountId: Scalars['ID'],
  formId: Scalars['ID'],
  ownerId: Scalars['ID'],
  ownedBy: User,
  createdAt?: Maybe<Scalars['AWSDateTime']>,
  displayName: Scalars['String'],
  notes?: Maybe<Scalars['String']>,
  formData: Scalars['AWSJSON'],
}

export interface FormVersionFilterInput {
  accountId?: Maybe<StringFilter>,
  formId?: Maybe<StringFilter>,
  ownerId?: Maybe<StringFilter>,
  createdAt?: Maybe<DateFilter>,
  criteria?: Maybe<Array<FormVersionFilterInput>>,
}

export interface FormVersionSortInput {
  createdAt?: Maybe<SortOrder>,
  sortBy?: Maybe<Array<FormVersionSortInput>>,
}

export interface Integration {
   __typename?: 'Integration',
  id: Scalars['ID'],
  integrationTypeId: Scalars['ID'],
  integrationType?: Maybe<IntegrationType>,
  ownerId: Scalars['ID'],
  accountId: Scalars['ID'],
  formId: Scalars['ID'],
  form: Form,
  active: Scalars['Int'],
  authType?: Maybe<Scalars['String']>,
  auth?: Maybe<Scalars['AWSJSON']>,
  target?: Maybe<Scalars['String']>,
  method?: Maybe<Scalars['String']>,
  lastExecuted?: Maybe<Scalars['AWSDateTime']>,
  lastExecutionResult?: Maybe<Scalars['Int']>,
  lastExecutionResultMessage?: Maybe<Scalars['String']>,
  createdAt?: Maybe<Scalars['AWSDateTime']>,
  updatedAt?: Maybe<Scalars['AWSDateTime']>,
  isDeleted?: Maybe<Scalars['Int']>,
}

export interface IntegrationFilterInput {
  ownerId?: Maybe<StringFilter>,
  accountId?: Maybe<StringFilter>,
  formId?: Maybe<StringFilter>,
  active?: Maybe<IntFilter>,
  isDeleted?: Maybe<IntFilter>,
  lastExecuted?: Maybe<DateFilter>,
  lastExecutionResult?: Maybe<IntFilter>,
  createdAt?: Maybe<DateFilter>,
  updatedAt?: Maybe<DateFilter>,
  criteria?: Maybe<Array<IntegrationFilterInput>>,
}

export interface IntegrationSortInput {
  lastExecuted?: Maybe<SortOrder>,
  createdAt?: Maybe<SortOrder>,
  updatedAt?: Maybe<SortOrder>,
  sortBy?: Maybe<Array<IntegrationSortInput>>,
}

export interface IntegrationType {
   __typename?: 'IntegrationType',
  id: Scalars['ID'],
  ownerId: Scalars['ID'],
  ownedBy: User,
  planTypeId: Scalars['ID'],
  planType?: Maybe<PlanType>,
  name: Scalars['String'],
  active: Scalars['Int'],
  createdAt?: Maybe<Scalars['AWSDateTime']>,
  updatedAt?: Maybe<Scalars['AWSDateTime']>,
}

export interface IntegrationTypeFilterInput {
  ownerId?: Maybe<StringFilter>,
  planTypeId?: Maybe<StringFilter>,
  name?: Maybe<StringFilter>,
  createdAt?: Maybe<DateFilter>,
  updatedAt?: Maybe<DateFilter>,
  active?: Maybe<IntFilter>,
  criteria?: Maybe<Array<IntegrationTypeFilterInput>>,
}

export interface IntegrationTypeSortInput {
  name?: Maybe<SortOrder>,
  createdAt?: Maybe<SortOrder>,
  updatedAt?: Maybe<SortOrder>,
  sortBy?: Maybe<Array<IntegrationTypeSortInput>>,
}

export interface IntFilter {
  with?: Maybe<FilterWith>,
  expression: NumericFilterExpression,
  value?: Maybe<Array<Scalars['Int']>>,
}

export interface Mutation {
   __typename?: 'Mutation',
  addPlanType: PlanType,
  addPlan: Plan,
  addIntegrationType: IntegrationType,
  addIntegration: Integration,
  addForm: Form,
  addFormVersion: Form,
  attachFormVersion: Form,
  updatePlanType: PlanType,
  updatePlan: Plan,
  updateAccount: Account,
  updateAccountPlan: Account,
  updateUser: User,
  updateIntegrationType: IntegrationType,
  updateIntegration: Integration,
  updateForm: Form,
  deleteForm: Form,
  deletePlanType: PlanType,
  deletePlan: Plan,
  deleteAccount: Account,
  deleteUser: User,
  deleteIntegrationType: IntegrationType,
  deleteIntegration: Integration,
  deleteFormVersion: FormVersion,
  addFormEntry: FormEntrySansData,
}


export interface MutationAddPlanTypeArgs {
  input?: Maybe<AddPlanTypeInput>
}


export interface MutationAddPlanArgs {
  input?: Maybe<AddPlanInput>
}


export interface MutationAddIntegrationTypeArgs {
  input?: Maybe<AddIntegrationTypeInput>
}


export interface MutationAddIntegrationArgs {
  input?: Maybe<AddIntegrationInput>
}


export interface MutationAddFormArgs {
  input: AddFormInput
}


export interface MutationAddFormVersionArgs {
  input: AddFormVersionInput
}


export interface MutationAttachFormVersionArgs {
  input: AttachFormVersionInput
}


export interface MutationUpdatePlanTypeArgs {
  input?: Maybe<UpdatePlanTypeInput>
}


export interface MutationUpdatePlanArgs {
  input?: Maybe<UpdatePlanInput>
}


export interface MutationUpdateAccountArgs {
  input?: Maybe<UpdateAccountInput>
}


export interface MutationUpdateAccountPlanArgs {
  input?: Maybe<AddPlanInput>
}


export interface MutationUpdateUserArgs {
  input?: Maybe<UpdateUserInput>
}


export interface MutationUpdateIntegrationTypeArgs {
  input?: Maybe<UpdateIntegrationTypeInput>
}


export interface MutationUpdateIntegrationArgs {
  input?: Maybe<UpdateIntegrationInput>
}


export interface MutationUpdateFormArgs {
  input?: Maybe<UpdateFormInput>
}


export interface MutationDeleteFormArgs {
  input: DeleteFormInput
}


export interface MutationDeletePlanTypeArgs {
  planTypeId: Scalars['ID']
}


export interface MutationDeletePlanArgs {
  accountId: Scalars['ID'],
  planId: Scalars['ID']
}


export interface MutationDeleteAccountArgs {
  accountId: Scalars['ID']
}


export interface MutationDeleteUserArgs {
  userId: Scalars['ID']
}


export interface MutationDeleteIntegrationTypeArgs {
  integrationTypeId: Scalars['ID']
}


export interface MutationDeleteIntegrationArgs {
  integrationId: Scalars['ID']
}


export interface MutationDeleteFormVersionArgs {
  input: DeleteFormVersionInput
}


export interface MutationAddFormEntryArgs {
  input: AddFormEntryInput
}

export enum NumericFilterExpression {
  In = 'in',
  Ne = 'ne',
  Eq = 'eq',
  Le = 'le',
  Lt = 'lt',
  Ge = 'ge',
  Gt = 'gt',
  Between = 'between',
  NotBetween = 'notBetween',
  IsNull = 'isNull',
  IsNotNull = 'isNotNull'
}

export interface OffsetLimit {
  offset?: Maybe<Scalars['Int']>,
  limit?: Maybe<Scalars['Int']>,
}

export interface Plan {
   __typename?: 'Plan',
  id: Scalars['ID'],
  accountId: Scalars['ID'],
  account: Account,
  ownerId: Scalars['ID'],
  ownedBy: User,
  planTypeId: Scalars['ID'],
  startDate: Scalars['AWSDateTime'],
  endDate?: Maybe<Scalars['AWSDateTime']>,
  active?: Maybe<Scalars['Int']>,
  lastBillDate?: Maybe<Scalars['AWSDateTime']>,
  createdAt?: Maybe<Scalars['AWSDateTime']>,
  updatedAt?: Maybe<Scalars['AWSDateTime']>,
  planType?: Maybe<PlanType>,
  isDeleted?: Maybe<Scalars['Int']>,
}

export interface PlanFilterInput {
  accountId?: Maybe<StringFilter>,
  ownerId?: Maybe<StringFilter>,
  planTypeId?: Maybe<StringFilter>,
  lastBillDate?: Maybe<DateFilter>,
  createdAt?: Maybe<DateFilter>,
  updatedAt?: Maybe<DateFilter>,
  startDate?: Maybe<DateFilter>,
  endDate?: Maybe<DateFilter>,
  criteria?: Maybe<Array<PlanFilterInput>>,
}

export interface PlanSortInput {
  createdAt?: Maybe<SortOrder>,
  updatedAt?: Maybe<SortOrder>,
  lastBillDate?: Maybe<SortOrder>,
  startDate?: Maybe<SortOrder>,
  endDate?: Maybe<SortOrder>,
  sortBy?: Maybe<Array<PlanSortInput>>,
}

export interface PlanType {
   __typename?: 'PlanType',
  id: Scalars['ID'],
  ownerId: Scalars['ID'],
  ownedBy: User,
  name: Scalars['String'],
  cost: Scalars['Float'],
  active: Scalars['Int'],
  billingTerm: Scalars['String'],
  createdAt?: Maybe<Scalars['AWSDateTime']>,
  updatedAt?: Maybe<Scalars['AWSDateTime']>,
  isDeleted?: Maybe<Scalars['Int']>,
}

export interface PlanTypeFilterInput {
  ownerId?: Maybe<StringFilter>,
  cost?: Maybe<FloatFilter>,
  billingTerm?: Maybe<StringFilter>,
  name?: Maybe<StringFilter>,
  createdAt?: Maybe<DateFilter>,
  updatedAt?: Maybe<DateFilter>,
  isDeleted?: Maybe<IntFilter>,
  criteria?: Maybe<Array<PlanTypeFilterInput>>,
}

export interface PlanTypeSortInput {
  name?: Maybe<SortOrder>,
  billingTerm?: Maybe<SortOrder>,
  cost?: Maybe<SortOrder>,
  createdAt?: Maybe<SortOrder>,
  updatedAt?: Maybe<SortOrder>,
  sortBy?: Maybe<Array<PlanTypeSortInput>>,
}

export interface Query {
   __typename?: 'Query',
  getAccount?: Maybe<Account>,
  getUser?: Maybe<User>,
  getPlan?: Maybe<Plan>,
  getActiveAccountPlan?: Maybe<Plan>,
  getPlanType?: Maybe<PlanType>,
  getForm?: Maybe<Form>,
  getFormVersion?: Maybe<FormVersion>,
  getIntegrationType?: Maybe<IntegrationType>,
  getIntegration?: Maybe<Integration>,
  getFormEntry?: Maybe<FormEntry>,
  listAccounts?: Maybe<Array<Maybe<Account>>>,
  listUsers?: Maybe<Array<Maybe<User>>>,
  listPlans?: Maybe<Array<Maybe<Plan>>>,
  listPlanTypes?: Maybe<Array<Maybe<PlanType>>>,
  listForms?: Maybe<Array<Maybe<Form>>>,
  listFormVersions?: Maybe<Array<Maybe<FormVersion>>>,
  listIntegrationTypes?: Maybe<Array<Maybe<IntegrationType>>>,
  listIntegrations?: Maybe<Array<Maybe<Integration>>>,
  listFormEntries?: Maybe<Array<Maybe<FormEntry>>>,
}


export interface QueryGetAccountArgs {
  accountId: Scalars['ID']
}


export interface QueryGetUserArgs {
  userId: Scalars['ID']
}


export interface QueryGetPlanArgs {
  planId: Scalars['String']
}


export interface QueryGetActiveAccountPlanArgs {
  accountId: Scalars['String']
}


export interface QueryGetPlanTypeArgs {
  planTypeId: Scalars['String']
}


export interface QueryGetFormArgs {
  formId: Scalars['String']
}


export interface QueryGetFormVersionArgs {
  versionId: Scalars['String']
}


export interface QueryGetIntegrationTypeArgs {
  integrationTypeId: Scalars['String']
}


export interface QueryGetIntegrationArgs {
  integrationId: Scalars['String']
}


export interface QueryGetFormEntryArgs {
  formEntryId: Scalars['String']
}


export interface QueryListAccountsArgs {
  offsetLimit?: Maybe<OffsetLimit>,
  filter?: Maybe<AccountFilterInput>,
  sort?: Maybe<AccountSortInput>
}


export interface QueryListUsersArgs {
  offsetLimit?: Maybe<OffsetLimit>,
  filter?: Maybe<UserFilterInput>,
  sort?: Maybe<UserSortInput>
}


export interface QueryListPlansArgs {
  offsetLimit?: Maybe<OffsetLimit>,
  filter?: Maybe<PlanFilterInput>,
  sort?: Maybe<PlanSortInput>
}


export interface QueryListPlanTypesArgs {
  offsetLimit?: Maybe<OffsetLimit>,
  filter?: Maybe<PlanTypeFilterInput>,
  sort?: Maybe<PlanTypeSortInput>
}


export interface QueryListFormsArgs {
  offsetLimit?: Maybe<OffsetLimit>,
  filter?: Maybe<FormFilterInput>,
  sort?: Maybe<FormSortInput>
}


export interface QueryListFormVersionsArgs {
  offsetLimit?: Maybe<OffsetLimit>,
  filter?: Maybe<FormVersionFilterInput>,
  sort?: Maybe<FormVersionSortInput>
}


export interface QueryListIntegrationTypesArgs {
  offsetLimit?: Maybe<OffsetLimit>,
  filter?: Maybe<IntegrationTypeFilterInput>,
  sort?: Maybe<IntegrationTypeSortInput>
}


export interface QueryListIntegrationsArgs {
  offsetLimit?: Maybe<OffsetLimit>,
  filter?: Maybe<IntegrationFilterInput>,
  sort?: Maybe<IntegrationSortInput>
}


export interface QueryListFormEntriesArgs {
  offsetLimit?: Maybe<OffsetLimit>,
  filter?: Maybe<FormEntryFilterInput>,
  sort?: Maybe<FormEntrySortInput>
}

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export interface StringFilter {
  with?: Maybe<FilterWith>,
  expression: StringFilterExpression,
  value?: Maybe<Array<Scalars['String']>>,
}

export enum StringFilterExpression {
  Ne = 'ne',
  Eq = 'eq',
  Contains = 'contains',
  NotContains = 'notContains',
  StartsWith = 'startsWith',
  IsNull = 'isNull',
  IsNotNull = 'isNotNull',
  In = 'in'
}

export interface UpdateAccountInput {
  id: Scalars['ID'],
  name?: Maybe<Scalars['String']>,
}

export interface UpdateFormInput {
  id: Scalars['ID'],
  currentVersionId?: Maybe<Scalars['ID']>,
  name?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
  startDate?: Maybe<Scalars['AWSDateTime']>,
  endDate?: Maybe<Scalars['AWSDateTime']>,
  redirectNotStarted?: Maybe<Scalars['AWSURL']>,
  redirectHasEnded?: Maybe<Scalars['AWSURL']>,
  isPaused?: Maybe<Scalars['Int']>,
}

export interface UpdateIntegrationInput {
  id: Scalars['ID'],
  active?: Maybe<Scalars['Int']>,
  authType?: Maybe<Scalars['String']>,
  auth?: Maybe<Scalars['AWSJSON']>,
  target?: Maybe<Scalars['String']>,
  method?: Maybe<Scalars['String']>,
}

export interface UpdateIntegrationTypeInput {
  id: Scalars['ID'],
  name: Scalars['String'],
  active?: Maybe<Scalars['Int']>,
}

export interface UpdateIntegrationTypeInputData {
  active?: Maybe<Scalars['Int']>,
  authType?: Maybe<Scalars['String']>,
  auth?: Maybe<Scalars['AWSJSON']>,
  target?: Maybe<Scalars['String']>,
  method?: Maybe<Scalars['String']>,
}

export interface UpdatePlanInput {
  planId: Scalars['ID'],
  accountId: Scalars['ID'],
  active: Scalars['Int'],
  endDate?: Maybe<Scalars['AWSDateTime']>,
}

export interface UpdatePlanTypeInput {
  id: Scalars['ID'],
  name?: Maybe<Scalars['String']>,
  cost?: Maybe<Scalars['Float']>,
  billingTerm?: Maybe<Scalars['String']>,
  active?: Maybe<Scalars['Int']>,
}

export interface UpdateUserInput {
  id: Scalars['ID'],
  data: UpdateUserInputData,
}

export interface UpdateUserInputData {
  group: Scalars['String'],
  given_name: Scalars['String'],
  family_name: Scalars['String'],
  phone_number?: Maybe<Scalars['AWSPhone']>,
}

export interface User {
   __typename?: 'User',
  id: Scalars['ID'],
  ownerId?: Maybe<Scalars['ID']>,
  ownedBy?: Maybe<User>,
  accountId?: Maybe<Scalars['ID']>,
  account?: Maybe<Account>,
  email: Scalars['String'],
  userGroup: Scalars['String'],
  given_name: Scalars['String'],
  family_name: Scalars['String'],
  phone_number?: Maybe<Scalars['AWSPhone']>,
  createdAt?: Maybe<Scalars['AWSDateTime']>,
  updatedAt?: Maybe<Scalars['AWSDateTime']>,
  isDeleted?: Maybe<Scalars['Int']>,
  numForms?: Maybe<Scalars['Int']>,
}

export interface UserFilterInput {
  accountId?: Maybe<StringFilter>,
  ownerId?: Maybe<StringFilter>,
  email?: Maybe<StringFilter>,
  userGroup?: Maybe<StringFilter>,
  given_name?: Maybe<StringFilter>,
  family_name?: Maybe<StringFilter>,
  createdAt?: Maybe<DateFilter>,
  updatedAt?: Maybe<DateFilter>,
  isDeleted?: Maybe<IntFilter>,
  criteria?: Maybe<Array<UserFilterInput>>,
}

export enum UserGroup {
  Admin = 'Admin',
  AccountAdmin = 'AccountAdmin',
  AccountEditor = 'AccountEditor',
  AccountViewer = 'AccountViewer'
}

export interface UserSortInput {
  accountId?: Maybe<SortOrder>,
  email?: Maybe<SortOrder>,
  given_name?: Maybe<SortOrder>,
  family_name?: Maybe<SortOrder>,
  userGroup?: Maybe<SortOrder>,
  createdAt?: Maybe<SortOrder>,
  updatedAt?: Maybe<SortOrder>,
  sortBy?: Maybe<Array<UserSortInput>>,
}
export type AddPlanTypeMutationVariables = {
  input?: Maybe<AddPlanTypeInput>
};


export type AddPlanTypeMutation = (
  { __typename?: 'Mutation' }
  & { addPlanType: (
    { __typename?: 'PlanType' }
    & Pick<PlanType, 'id' | 'ownerId' | 'name' | 'cost' | 'active' | 'billingTerm' | 'createdAt' | 'updatedAt' | 'isDeleted'>
    & { ownedBy: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>
    ) }
  ) }
);

export type AddPlanMutationVariables = {
  input?: Maybe<AddPlanInput>
};


export type AddPlanMutation = (
  { __typename?: 'Mutation' }
  & { addPlan: (
    { __typename?: 'Plan' }
    & Pick<Plan, 'id' | 'accountId' | 'ownerId' | 'planTypeId' | 'startDate' | 'endDate' | 'active' | 'lastBillDate' | 'createdAt' | 'updatedAt' | 'isDeleted'>
    & { account: (
      { __typename?: 'Account' }
      & Pick<Account, 'id' | 'name' | 'website' | 'taxId' | 'ownerId' | 'planId' | 'createdAt' | 'updatedAt' | 'active' | 'numForms' | 'numUsers'>
    ), ownedBy: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>
    ), planType: Maybe<(
      { __typename?: 'PlanType' }
      & Pick<PlanType, 'id' | 'ownerId' | 'name' | 'cost' | 'active' | 'billingTerm' | 'createdAt' | 'updatedAt' | 'isDeleted'>
    )> }
  ) }
);

export type AddIntegrationTypeMutationVariables = {
  input?: Maybe<AddIntegrationTypeInput>
};


export type AddIntegrationTypeMutation = (
  { __typename?: 'Mutation' }
  & { addIntegrationType: (
    { __typename?: 'IntegrationType' }
    & Pick<IntegrationType, 'id' | 'ownerId' | 'planTypeId' | 'name' | 'active' | 'createdAt' | 'updatedAt'>
    & { ownedBy: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>
    ), planType: Maybe<(
      { __typename?: 'PlanType' }
      & Pick<PlanType, 'id' | 'ownerId' | 'name' | 'cost' | 'active' | 'billingTerm' | 'createdAt' | 'updatedAt' | 'isDeleted'>
    )> }
  ) }
);

export type AddIntegrationMutationVariables = {
  input?: Maybe<AddIntegrationInput>
};


export type AddIntegrationMutation = (
  { __typename?: 'Mutation' }
  & { addIntegration: (
    { __typename?: 'Integration' }
    & Pick<Integration, 'id' | 'integrationTypeId' | 'ownerId' | 'accountId' | 'formId' | 'active' | 'authType' | 'auth' | 'target' | 'method' | 'lastExecuted' | 'lastExecutionResult' | 'lastExecutionResultMessage' | 'createdAt' | 'updatedAt' | 'isDeleted'>
    & { integrationType: Maybe<(
      { __typename?: 'IntegrationType' }
      & Pick<IntegrationType, 'id' | 'ownerId' | 'planTypeId' | 'name' | 'active' | 'createdAt' | 'updatedAt'>
    )>, form: (
      { __typename?: 'Form' }
      & Pick<Form, 'id' | 'ownerId' | 'name' | 'description' | 'versionId' | 'versionActivatedDate' | 'accountId' | 'createdAt' | 'updatedAt' | 'startDate' | 'endDate' | 'isPaused' | 'isDeleted' | 'redirectNotStarted' | 'redirectHasEnded'>
    ) }
  ) }
);

export type AddFormMutationVariables = {
  input: AddFormInput
};


export type AddFormMutation = (
  { __typename?: 'Mutation' }
  & { addForm: (
    { __typename?: 'Form' }
    & Pick<Form, 'id' | 'ownerId' | 'name' | 'description' | 'versionId' | 'versionActivatedDate' | 'accountId' | 'createdAt' | 'updatedAt' | 'startDate' | 'endDate' | 'isPaused' | 'isDeleted' | 'redirectNotStarted' | 'redirectHasEnded'>
    & { version: Maybe<(
      { __typename?: 'FormVersion' }
      & Pick<FormVersion, 'id' | 'accountId' | 'formId' | 'ownerId' | 'createdAt' | 'displayName' | 'notes' | 'formData'>
    )>, ownedBy: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>
    ), account: (
      { __typename?: 'Account' }
      & Pick<Account, 'id' | 'name' | 'website' | 'taxId' | 'ownerId' | 'planId' | 'createdAt' | 'updatedAt' | 'active' | 'numForms' | 'numUsers'>
    ), versions: Maybe<Array<Maybe<(
      { __typename?: 'FormVersion' }
      & Pick<FormVersion, 'id' | 'accountId' | 'formId' | 'ownerId' | 'createdAt' | 'displayName' | 'notes' | 'formData'>
    )>>>, integrations: Maybe<Array<Maybe<(
      { __typename?: 'Integration' }
      & Pick<Integration, 'id' | 'integrationTypeId' | 'ownerId' | 'accountId' | 'formId' | 'active' | 'authType' | 'auth' | 'target' | 'method' | 'lastExecuted' | 'lastExecutionResult' | 'lastExecutionResultMessage' | 'createdAt' | 'updatedAt' | 'isDeleted'>
    )>>>, entries: Maybe<Array<Maybe<(
      { __typename?: 'FormEntry' }
      & Pick<FormEntry, 'id' | 'formId' | 'data' | 'createdAt'>
    )>>> }
  ) }
);

export type AddFormVersionMutationVariables = {
  input: AddFormVersionInput
};


export type AddFormVersionMutation = (
  { __typename?: 'Mutation' }
  & { addFormVersion: (
    { __typename?: 'Form' }
    & Pick<Form, 'id' | 'ownerId' | 'name' | 'description' | 'versionId' | 'versionActivatedDate' | 'accountId' | 'createdAt' | 'updatedAt' | 'startDate' | 'endDate' | 'isPaused' | 'isDeleted' | 'redirectNotStarted' | 'redirectHasEnded'>
    & { version: Maybe<(
      { __typename?: 'FormVersion' }
      & Pick<FormVersion, 'id' | 'accountId' | 'formId' | 'ownerId' | 'createdAt' | 'displayName' | 'notes' | 'formData'>
    )>, ownedBy: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>
    ), account: (
      { __typename?: 'Account' }
      & Pick<Account, 'id' | 'name' | 'website' | 'taxId' | 'ownerId' | 'planId' | 'createdAt' | 'updatedAt' | 'active' | 'numForms' | 'numUsers'>
    ), versions: Maybe<Array<Maybe<(
      { __typename?: 'FormVersion' }
      & Pick<FormVersion, 'id' | 'accountId' | 'formId' | 'ownerId' | 'createdAt' | 'displayName' | 'notes' | 'formData'>
    )>>>, integrations: Maybe<Array<Maybe<(
      { __typename?: 'Integration' }
      & Pick<Integration, 'id' | 'integrationTypeId' | 'ownerId' | 'accountId' | 'formId' | 'active' | 'authType' | 'auth' | 'target' | 'method' | 'lastExecuted' | 'lastExecutionResult' | 'lastExecutionResultMessage' | 'createdAt' | 'updatedAt' | 'isDeleted'>
    )>>>, entries: Maybe<Array<Maybe<(
      { __typename?: 'FormEntry' }
      & Pick<FormEntry, 'id' | 'formId' | 'data' | 'createdAt'>
    )>>> }
  ) }
);

export type AttachFormVersionMutationVariables = {
  input: AttachFormVersionInput
};


export type AttachFormVersionMutation = (
  { __typename?: 'Mutation' }
  & { attachFormVersion: (
    { __typename?: 'Form' }
    & Pick<Form, 'id' | 'ownerId' | 'name' | 'description' | 'versionId' | 'versionActivatedDate' | 'accountId' | 'createdAt' | 'updatedAt' | 'startDate' | 'endDate' | 'isPaused' | 'isDeleted' | 'redirectNotStarted' | 'redirectHasEnded'>
    & { version: Maybe<(
      { __typename?: 'FormVersion' }
      & Pick<FormVersion, 'id' | 'accountId' | 'formId' | 'ownerId' | 'createdAt' | 'displayName' | 'notes' | 'formData'>
    )>, ownedBy: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email' | 'given_name' | 'family_name'>
    ), account: (
      { __typename?: 'Account' }
      & Pick<Account, 'id' | 'name'>
    ), versions: Maybe<Array<Maybe<(
      { __typename?: 'FormVersion' }
      & Pick<FormVersion, 'id' | 'createdAt' | 'displayName' | 'notes'>
      & { ownedBy: (
        { __typename?: 'User' }
        & Pick<User, 'email' | 'given_name' | 'family_name'>
      ) }
    )>>> }
  ) }
);

export type UpdatePlanTypeMutationVariables = {
  input?: Maybe<UpdatePlanTypeInput>
};


export type UpdatePlanTypeMutation = (
  { __typename?: 'Mutation' }
  & { updatePlanType: (
    { __typename?: 'PlanType' }
    & Pick<PlanType, 'id' | 'ownerId' | 'name' | 'cost' | 'active' | 'billingTerm' | 'createdAt' | 'updatedAt' | 'isDeleted'>
    & { ownedBy: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>
    ) }
  ) }
);

export type UpdatePlanMutationVariables = {
  input?: Maybe<UpdatePlanInput>
};


export type UpdatePlanMutation = (
  { __typename?: 'Mutation' }
  & { updatePlan: (
    { __typename?: 'Plan' }
    & Pick<Plan, 'id' | 'accountId' | 'ownerId' | 'planTypeId' | 'startDate' | 'endDate' | 'active' | 'lastBillDate' | 'createdAt' | 'updatedAt' | 'isDeleted'>
    & { account: (
      { __typename?: 'Account' }
      & Pick<Account, 'id' | 'name' | 'website' | 'taxId' | 'ownerId' | 'planId' | 'createdAt' | 'updatedAt' | 'active' | 'numForms' | 'numUsers'>
    ), ownedBy: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>
    ), planType: Maybe<(
      { __typename?: 'PlanType' }
      & Pick<PlanType, 'id' | 'ownerId' | 'name' | 'cost' | 'active' | 'billingTerm' | 'createdAt' | 'updatedAt' | 'isDeleted'>
    )> }
  ) }
);

export type UpdateAccountMutationVariables = {
  input?: Maybe<UpdateAccountInput>
};


export type UpdateAccountMutation = (
  { __typename?: 'Mutation' }
  & { updateAccount: (
    { __typename?: 'Account' }
    & Pick<Account, 'id' | 'name' | 'website' | 'taxId' | 'ownerId' | 'planId' | 'createdAt' | 'updatedAt' | 'active' | 'numForms' | 'numUsers'>
    & { addresses: Maybe<Array<Maybe<(
      { __typename?: 'Address' }
      & Pick<Address, 'id' | 'name' | 'addressee' | 'addressType' | 'phone_number' | 'email' | 'street' | 'city' | 'state' | 'country'>
    )>>>, ownedBy: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>
    ), plan: Maybe<(
      { __typename?: 'Plan' }
      & Pick<Plan, 'id' | 'accountId' | 'ownerId' | 'planTypeId' | 'startDate' | 'endDate' | 'active' | 'lastBillDate' | 'createdAt' | 'updatedAt' | 'isDeleted'>
    )>, users: Maybe<Array<Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>
    )>>>, forms: Maybe<Array<Maybe<(
      { __typename?: 'Form' }
      & Pick<Form, 'id' | 'ownerId' | 'name' | 'description' | 'versionId' | 'versionActivatedDate' | 'accountId' | 'createdAt' | 'updatedAt' | 'startDate' | 'endDate' | 'isPaused' | 'isDeleted' | 'redirectNotStarted' | 'redirectHasEnded'>
    )>>> }
  ) }
);

export type UpdateAccountPlanMutationVariables = {
  input?: Maybe<AddPlanInput>
};


export type UpdateAccountPlanMutation = (
  { __typename?: 'Mutation' }
  & { updateAccountPlan: (
    { __typename?: 'Account' }
    & Pick<Account, 'id' | 'name' | 'website' | 'taxId' | 'ownerId' | 'planId' | 'createdAt' | 'updatedAt' | 'active' | 'numForms' | 'numUsers'>
    & { addresses: Maybe<Array<Maybe<(
      { __typename?: 'Address' }
      & Pick<Address, 'id' | 'name' | 'addressee' | 'addressType' | 'phone_number' | 'email' | 'street' | 'city' | 'state' | 'country'>
    )>>>, ownedBy: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>
    ), plan: Maybe<(
      { __typename?: 'Plan' }
      & Pick<Plan, 'id' | 'accountId' | 'ownerId' | 'planTypeId' | 'startDate' | 'endDate' | 'active' | 'lastBillDate' | 'createdAt' | 'updatedAt' | 'isDeleted'>
    )>, users: Maybe<Array<Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>
    )>>>, forms: Maybe<Array<Maybe<(
      { __typename?: 'Form' }
      & Pick<Form, 'id' | 'ownerId' | 'name' | 'description' | 'versionId' | 'versionActivatedDate' | 'accountId' | 'createdAt' | 'updatedAt' | 'startDate' | 'endDate' | 'isPaused' | 'isDeleted' | 'redirectNotStarted' | 'redirectHasEnded'>
    )>>> }
  ) }
);

export type UpdateUserMutationVariables = {
  input?: Maybe<UpdateUserInput>
};


export type UpdateUserMutation = (
  { __typename?: 'Mutation' }
  & { updateUser: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>
    & { ownedBy: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>
    )>, account: Maybe<(
      { __typename?: 'Account' }
      & Pick<Account, 'id' | 'name' | 'website' | 'taxId' | 'ownerId' | 'planId' | 'createdAt' | 'updatedAt' | 'active' | 'numForms' | 'numUsers'>
    )> }
  ) }
);

export type UpdateIntegrationTypeMutationVariables = {
  input?: Maybe<UpdateIntegrationTypeInput>
};


export type UpdateIntegrationTypeMutation = (
  { __typename?: 'Mutation' }
  & { updateIntegrationType: (
    { __typename?: 'IntegrationType' }
    & Pick<IntegrationType, 'id' | 'ownerId' | 'planTypeId' | 'name' | 'active' | 'createdAt' | 'updatedAt'>
    & { ownedBy: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>
    ), planType: Maybe<(
      { __typename?: 'PlanType' }
      & Pick<PlanType, 'id' | 'ownerId' | 'name' | 'cost' | 'active' | 'billingTerm' | 'createdAt' | 'updatedAt' | 'isDeleted'>
    )> }
  ) }
);

export type UpdateIntegrationMutationVariables = {
  input?: Maybe<UpdateIntegrationInput>
};


export type UpdateIntegrationMutation = (
  { __typename?: 'Mutation' }
  & { updateIntegration: (
    { __typename?: 'Integration' }
    & Pick<Integration, 'id' | 'integrationTypeId' | 'ownerId' | 'accountId' | 'formId' | 'active' | 'authType' | 'auth' | 'target' | 'method' | 'lastExecuted' | 'lastExecutionResult' | 'lastExecutionResultMessage' | 'createdAt' | 'updatedAt' | 'isDeleted'>
    & { integrationType: Maybe<(
      { __typename?: 'IntegrationType' }
      & Pick<IntegrationType, 'id' | 'ownerId' | 'planTypeId' | 'name' | 'active' | 'createdAt' | 'updatedAt'>
    )>, form: (
      { __typename?: 'Form' }
      & Pick<Form, 'id' | 'ownerId' | 'name' | 'description' | 'versionId' | 'versionActivatedDate' | 'accountId' | 'createdAt' | 'updatedAt' | 'startDate' | 'endDate' | 'isPaused' | 'isDeleted' | 'redirectNotStarted' | 'redirectHasEnded'>
    ) }
  ) }
);

export type UpdateFormMutationVariables = {
  input?: Maybe<UpdateFormInput>
};


export type UpdateFormMutation = (
  { __typename?: 'Mutation' }
  & { updateForm: (
    { __typename?: 'Form' }
    & Pick<Form, 'id' | 'ownerId' | 'name' | 'description' | 'versionId' | 'versionActivatedDate' | 'accountId' | 'createdAt' | 'updatedAt' | 'startDate' | 'endDate' | 'isPaused' | 'isDeleted' | 'redirectNotStarted' | 'redirectHasEnded'>
    & { version: Maybe<(
      { __typename?: 'FormVersion' }
      & Pick<FormVersion, 'id' | 'accountId' | 'formId' | 'ownerId' | 'createdAt' | 'displayName' | 'notes' | 'formData'>
    )>, ownedBy: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted'>
    ), account: (
      { __typename?: 'Account' }
      & Pick<Account, 'id' | 'name' | 'website' | 'taxId' | 'ownerId' | 'planId' | 'createdAt' | 'updatedAt' | 'active'>
    ), versions: Maybe<Array<Maybe<(
      { __typename?: 'FormVersion' }
      & Pick<FormVersion, 'id' | 'accountId' | 'formId' | 'ownerId' | 'createdAt' | 'displayName' | 'notes'>
      & { ownedBy: (
        { __typename?: 'User' }
        & Pick<User, 'email' | 'given_name' | 'family_name'>
      ) }
    )>>> }
  ) }
);

export type DeleteFormMutationVariables = {
  input: DeleteFormInput
};


export type DeleteFormMutation = (
  { __typename?: 'Mutation' }
  & { deleteForm: (
    { __typename?: 'Form' }
    & Pick<Form, 'id' | 'ownerId' | 'name' | 'description' | 'versionId' | 'versionActivatedDate' | 'accountId' | 'createdAt' | 'updatedAt' | 'startDate' | 'endDate' | 'isPaused' | 'isDeleted' | 'redirectNotStarted' | 'redirectHasEnded'>
    & { version: Maybe<(
      { __typename?: 'FormVersion' }
      & Pick<FormVersion, 'id' | 'accountId' | 'formId' | 'ownerId' | 'createdAt' | 'displayName' | 'notes' | 'formData'>
    )>, ownedBy: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>
    ), account: (
      { __typename?: 'Account' }
      & Pick<Account, 'id' | 'name' | 'website' | 'taxId' | 'ownerId' | 'planId' | 'createdAt' | 'updatedAt' | 'active' | 'numForms' | 'numUsers'>
    ), versions: Maybe<Array<Maybe<(
      { __typename?: 'FormVersion' }
      & Pick<FormVersion, 'id' | 'accountId' | 'formId' | 'ownerId' | 'createdAt' | 'displayName' | 'notes' | 'formData'>
    )>>>, integrations: Maybe<Array<Maybe<(
      { __typename?: 'Integration' }
      & Pick<Integration, 'id' | 'integrationTypeId' | 'ownerId' | 'accountId' | 'formId' | 'active' | 'authType' | 'auth' | 'target' | 'method' | 'lastExecuted' | 'lastExecutionResult' | 'lastExecutionResultMessage' | 'createdAt' | 'updatedAt' | 'isDeleted'>
    )>>>, entries: Maybe<Array<Maybe<(
      { __typename?: 'FormEntry' }
      & Pick<FormEntry, 'id' | 'formId' | 'data' | 'createdAt'>
    )>>> }
  ) }
);

export type DeletePlanTypeMutationVariables = {
  planTypeId: Scalars['ID']
};


export type DeletePlanTypeMutation = (
  { __typename?: 'Mutation' }
  & { deletePlanType: (
    { __typename?: 'PlanType' }
    & Pick<PlanType, 'id' | 'ownerId' | 'name' | 'cost' | 'active' | 'billingTerm' | 'createdAt' | 'updatedAt' | 'isDeleted'>
    & { ownedBy: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>
    ) }
  ) }
);

export type DeletePlanMutationVariables = {
  accountId: Scalars['ID'],
  planId: Scalars['ID']
};


export type DeletePlanMutation = (
  { __typename?: 'Mutation' }
  & { deletePlan: (
    { __typename?: 'Plan' }
    & Pick<Plan, 'id' | 'accountId' | 'ownerId' | 'planTypeId' | 'startDate' | 'endDate' | 'active' | 'lastBillDate' | 'createdAt' | 'updatedAt' | 'isDeleted'>
    & { account: (
      { __typename?: 'Account' }
      & Pick<Account, 'id' | 'name' | 'website' | 'taxId' | 'ownerId' | 'planId' | 'createdAt' | 'updatedAt' | 'active' | 'numForms' | 'numUsers'>
    ), ownedBy: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>
    ), planType: Maybe<(
      { __typename?: 'PlanType' }
      & Pick<PlanType, 'id' | 'ownerId' | 'name' | 'cost' | 'active' | 'billingTerm' | 'createdAt' | 'updatedAt' | 'isDeleted'>
    )> }
  ) }
);

export type DeleteAccountMutationVariables = {
  accountId: Scalars['ID']
};


export type DeleteAccountMutation = (
  { __typename?: 'Mutation' }
  & { deleteAccount: (
    { __typename?: 'Account' }
    & Pick<Account, 'id' | 'name' | 'website' | 'taxId' | 'ownerId' | 'planId' | 'createdAt' | 'updatedAt' | 'active' | 'numForms' | 'numUsers'>
    & { addresses: Maybe<Array<Maybe<(
      { __typename?: 'Address' }
      & Pick<Address, 'id' | 'name' | 'addressee' | 'addressType' | 'phone_number' | 'email' | 'street' | 'city' | 'state' | 'country'>
    )>>>, ownedBy: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>
    ), plan: Maybe<(
      { __typename?: 'Plan' }
      & Pick<Plan, 'id' | 'accountId' | 'ownerId' | 'planTypeId' | 'startDate' | 'endDate' | 'active' | 'lastBillDate' | 'createdAt' | 'updatedAt' | 'isDeleted'>
    )>, users: Maybe<Array<Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>
    )>>>, forms: Maybe<Array<Maybe<(
      { __typename?: 'Form' }
      & Pick<Form, 'id' | 'ownerId' | 'name' | 'description' | 'versionId' | 'versionActivatedDate' | 'accountId' | 'createdAt' | 'updatedAt' | 'startDate' | 'endDate' | 'isPaused' | 'isDeleted' | 'redirectNotStarted' | 'redirectHasEnded'>
    )>>> }
  ) }
);

export type DeleteUserMutationVariables = {
  userId: Scalars['ID']
};


export type DeleteUserMutation = (
  { __typename?: 'Mutation' }
  & { deleteUser: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>
    & { ownedBy: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>
    )>, account: Maybe<(
      { __typename?: 'Account' }
      & Pick<Account, 'id' | 'name' | 'website' | 'taxId' | 'ownerId' | 'planId' | 'createdAt' | 'updatedAt' | 'active' | 'numForms' | 'numUsers'>
    )> }
  ) }
);

export type DeleteIntegrationTypeMutationVariables = {
  integrationTypeId: Scalars['ID']
};


export type DeleteIntegrationTypeMutation = (
  { __typename?: 'Mutation' }
  & { deleteIntegrationType: (
    { __typename?: 'IntegrationType' }
    & Pick<IntegrationType, 'id' | 'ownerId' | 'planTypeId' | 'name' | 'active' | 'createdAt' | 'updatedAt'>
    & { ownedBy: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>
    ), planType: Maybe<(
      { __typename?: 'PlanType' }
      & Pick<PlanType, 'id' | 'ownerId' | 'name' | 'cost' | 'active' | 'billingTerm' | 'createdAt' | 'updatedAt' | 'isDeleted'>
    )> }
  ) }
);

export type DeleteIntegrationMutationVariables = {
  integrationId: Scalars['ID']
};


export type DeleteIntegrationMutation = (
  { __typename?: 'Mutation' }
  & { deleteIntegration: (
    { __typename?: 'Integration' }
    & Pick<Integration, 'id' | 'integrationTypeId' | 'ownerId' | 'accountId' | 'formId' | 'active' | 'authType' | 'auth' | 'target' | 'method' | 'lastExecuted' | 'lastExecutionResult' | 'lastExecutionResultMessage' | 'createdAt' | 'updatedAt' | 'isDeleted'>
    & { integrationType: Maybe<(
      { __typename?: 'IntegrationType' }
      & Pick<IntegrationType, 'id' | 'ownerId' | 'planTypeId' | 'name' | 'active' | 'createdAt' | 'updatedAt'>
    )>, form: (
      { __typename?: 'Form' }
      & Pick<Form, 'id' | 'ownerId' | 'name' | 'description' | 'versionId' | 'versionActivatedDate' | 'accountId' | 'createdAt' | 'updatedAt' | 'startDate' | 'endDate' | 'isPaused' | 'isDeleted' | 'redirectNotStarted' | 'redirectHasEnded'>
    ) }
  ) }
);

export type DeleteFormVersionMutationVariables = {
  input: DeleteFormVersionInput
};


export type DeleteFormVersionMutation = (
  { __typename?: 'Mutation' }
  & { deleteFormVersion: (
    { __typename?: 'FormVersion' }
    & Pick<FormVersion, 'id' | 'accountId' | 'formId' | 'ownerId' | 'createdAt' | 'displayName' | 'notes' | 'formData'>
    & { ownedBy: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>
    ) }
  ) }
);

export type AddFormEntryMutationVariables = {
  input: AddFormEntryInput
};


export type AddFormEntryMutation = (
  { __typename?: 'Mutation' }
  & { addFormEntry: (
    { __typename?: 'FormEntrySansData' }
    & Pick<FormEntrySansData, 'id' | 'formId' | 'createdAt'>
  ) }
);

export type GetAccountQueryVariables = {
  accountId: Scalars['ID']
};


export type GetAccountQuery = (
  { __typename?: 'Query' }
  & { getAccount: Maybe<(
    { __typename?: 'Account' }
    & Pick<Account, 'id' | 'name' | 'website' | 'taxId' | 'ownerId' | 'planId' | 'createdAt' | 'updatedAt' | 'active' | 'numForms' | 'numUsers'>
    & { addresses: Maybe<Array<Maybe<(
      { __typename?: 'Address' }
      & Pick<Address, 'id' | 'name' | 'addressee' | 'addressType' | 'phone_number' | 'email' | 'street' | 'city' | 'state' | 'country'>
    )>>>, ownedBy: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>
    ), plan: Maybe<(
      { __typename?: 'Plan' }
      & Pick<Plan, 'id' | 'accountId' | 'ownerId' | 'planTypeId' | 'startDate' | 'endDate' | 'active' | 'lastBillDate' | 'createdAt' | 'updatedAt' | 'isDeleted'>
    )>, users: Maybe<Array<Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>
    )>>>, forms: Maybe<Array<Maybe<(
      { __typename?: 'Form' }
      & Pick<Form, 'id' | 'ownerId' | 'name' | 'description' | 'versionId' | 'versionActivatedDate' | 'accountId' | 'createdAt' | 'updatedAt' | 'startDate' | 'endDate' | 'isPaused' | 'isDeleted' | 'redirectNotStarted' | 'redirectHasEnded' | 'numEntries'>
    )>>> }
  )> }
);

export type GetUserQueryVariables = {
  userId: Scalars['ID']
};


export type GetUserQuery = (
  { __typename?: 'Query' }
  & { getUser: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>
    & { ownedBy: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>
    )>, account: Maybe<(
      { __typename?: 'Account' }
      & Pick<Account, 'id' | 'name' | 'website' | 'taxId' | 'ownerId' | 'planId' | 'createdAt' | 'updatedAt' | 'active' | 'numForms' | 'numUsers'>
    )> }
  )> }
);

export type GetPlanQueryVariables = {
  planId: Scalars['String']
};


export type GetPlanQuery = (
  { __typename?: 'Query' }
  & { getPlan: Maybe<(
    { __typename?: 'Plan' }
    & Pick<Plan, 'id' | 'accountId' | 'ownerId' | 'planTypeId' | 'startDate' | 'endDate' | 'active' | 'lastBillDate' | 'createdAt' | 'updatedAt' | 'isDeleted'>
    & { account: (
      { __typename?: 'Account' }
      & Pick<Account, 'id' | 'name' | 'website' | 'taxId' | 'ownerId' | 'planId' | 'createdAt' | 'updatedAt' | 'active' | 'numForms' | 'numUsers'>
    ), ownedBy: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>
    ), planType: Maybe<(
      { __typename?: 'PlanType' }
      & Pick<PlanType, 'id' | 'ownerId' | 'name' | 'cost' | 'active' | 'billingTerm' | 'createdAt' | 'updatedAt' | 'isDeleted'>
    )> }
  )> }
);

export type GetActiveAccountPlanQueryVariables = {
  accountId: Scalars['String']
};


export type GetActiveAccountPlanQuery = (
  { __typename?: 'Query' }
  & { getActiveAccountPlan: Maybe<(
    { __typename?: 'Plan' }
    & Pick<Plan, 'id' | 'accountId' | 'ownerId' | 'planTypeId' | 'startDate' | 'endDate' | 'active' | 'lastBillDate' | 'createdAt' | 'updatedAt' | 'isDeleted'>
    & { account: (
      { __typename?: 'Account' }
      & Pick<Account, 'id' | 'name' | 'website' | 'taxId' | 'ownerId' | 'planId' | 'createdAt' | 'updatedAt' | 'active' | 'numForms' | 'numUsers'>
    ), ownedBy: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>
    ), planType: Maybe<(
      { __typename?: 'PlanType' }
      & Pick<PlanType, 'id' | 'ownerId' | 'name' | 'cost' | 'active' | 'billingTerm' | 'createdAt' | 'updatedAt' | 'isDeleted'>
    )> }
  )> }
);

export type GetPlanTypeQueryVariables = {
  planTypeId: Scalars['String']
};


export type GetPlanTypeQuery = (
  { __typename?: 'Query' }
  & { getPlanType: Maybe<(
    { __typename?: 'PlanType' }
    & Pick<PlanType, 'id' | 'ownerId' | 'name' | 'cost' | 'active' | 'billingTerm' | 'createdAt' | 'updatedAt' | 'isDeleted'>
    & { ownedBy: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>
    ) }
  )> }
);

export type GetFormQueryVariables = {
  formId: Scalars['String']
};


export type GetFormQuery = (
  { __typename?: 'Query' }
  & { getForm: Maybe<(
    { __typename?: 'Form' }
    & Pick<Form, 'id' | 'ownerId' | 'name' | 'description' | 'versionId' | 'versionActivatedDate' | 'accountId' | 'createdAt' | 'updatedAt' | 'startDate' | 'endDate' | 'isPaused' | 'isDeleted' | 'redirectNotStarted' | 'redirectHasEnded'>
    & { version: Maybe<(
      { __typename?: 'FormVersion' }
      & Pick<FormVersion, 'id' | 'accountId' | 'formId' | 'ownerId' | 'createdAt' | 'displayName' | 'notes' | 'formData'>
    )>, ownedBy: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email' | 'userGroup' | 'given_name' | 'family_name'>
    ), account: (
      { __typename?: 'Account' }
      & Pick<Account, 'id' | 'name' | 'createdAt' | 'updatedAt' | 'active'>
    ), versions: Maybe<Array<Maybe<(
      { __typename?: 'FormVersion' }
      & Pick<FormVersion, 'id' | 'createdAt' | 'displayName' | 'notes'>
      & { ownedBy: (
        { __typename?: 'User' }
        & Pick<User, 'given_name' | 'family_name' | 'email'>
      ) }
    )>>> }
  )> }
);

export type GetFormVersionQueryVariables = {
  versionId: Scalars['String']
};


export type GetFormVersionQuery = (
  { __typename?: 'Query' }
  & { getFormVersion: Maybe<(
    { __typename?: 'FormVersion' }
    & Pick<FormVersion, 'id' | 'accountId' | 'formId' | 'ownerId' | 'createdAt' | 'displayName' | 'notes' | 'formData'>
    & { ownedBy: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>
    ) }
  )> }
);

export type GetIntegrationTypeQueryVariables = {
  integrationTypeId: Scalars['String']
};


export type GetIntegrationTypeQuery = (
  { __typename?: 'Query' }
  & { getIntegrationType: Maybe<(
    { __typename?: 'IntegrationType' }
    & Pick<IntegrationType, 'id' | 'ownerId' | 'planTypeId' | 'name' | 'active' | 'createdAt' | 'updatedAt'>
    & { ownedBy: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>
    ), planType: Maybe<(
      { __typename?: 'PlanType' }
      & Pick<PlanType, 'id' | 'ownerId' | 'name' | 'cost' | 'active' | 'billingTerm' | 'createdAt' | 'updatedAt' | 'isDeleted'>
    )> }
  )> }
);

export type GetIntegrationQueryVariables = {
  integrationId: Scalars['String']
};


export type GetIntegrationQuery = (
  { __typename?: 'Query' }
  & { getIntegration: Maybe<(
    { __typename?: 'Integration' }
    & Pick<Integration, 'id' | 'integrationTypeId' | 'ownerId' | 'accountId' | 'formId' | 'active' | 'authType' | 'auth' | 'target' | 'method' | 'lastExecuted' | 'lastExecutionResult' | 'lastExecutionResultMessage' | 'createdAt' | 'updatedAt' | 'isDeleted'>
    & { integrationType: Maybe<(
      { __typename?: 'IntegrationType' }
      & Pick<IntegrationType, 'id' | 'ownerId' | 'planTypeId' | 'name' | 'active' | 'createdAt' | 'updatedAt'>
    )>, form: (
      { __typename?: 'Form' }
      & Pick<Form, 'id' | 'ownerId' | 'name' | 'description' | 'versionId' | 'versionActivatedDate' | 'accountId' | 'createdAt' | 'updatedAt' | 'startDate' | 'endDate' | 'isPaused' | 'isDeleted' | 'redirectNotStarted' | 'redirectHasEnded'>
    ) }
  )> }
);

export type GetFormEntryQueryVariables = {
  formEntryId: Scalars['String']
};


export type GetFormEntryQuery = (
  { __typename?: 'Query' }
  & { getFormEntry: Maybe<(
    { __typename?: 'FormEntry' }
    & Pick<FormEntry, 'id' | 'accountId' | 'formId' | 'data' | 'createdAt'>
    & { form: (
      { __typename?: 'Form' }
      & Pick<Form, 'id' | 'ownerId' | 'name' | 'description' | 'versionId' | 'versionActivatedDate' | 'accountId' | 'createdAt' | 'updatedAt' | 'startDate' | 'endDate' | 'isPaused' | 'isDeleted' | 'redirectNotStarted' | 'redirectHasEnded'>
    ) }
  )> }
);

export type ListAccountsQueryVariables = {
  offsetLimit?: Maybe<OffsetLimit>,
  filter?: Maybe<AccountFilterInput>,
  sort?: Maybe<AccountSortInput>
};


export type ListAccountsQuery = (
  { __typename?: 'Query' }
  & { listAccounts: Maybe<Array<Maybe<(
    { __typename?: 'Account' }
    & Pick<Account, 'id' | 'name' | 'website' | 'taxId' | 'ownerId' | 'planId' | 'createdAt' | 'updatedAt' | 'active' | 'numForms' | 'numUsers'>
    & { addresses: Maybe<Array<Maybe<(
      { __typename?: 'Address' }
      & Pick<Address, 'id' | 'name' | 'addressee' | 'addressType' | 'phone_number' | 'email' | 'street' | 'city' | 'state' | 'country'>
    )>>>, ownedBy: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>
    ), plan: Maybe<(
      { __typename?: 'Plan' }
      & Pick<Plan, 'id' | 'accountId' | 'ownerId' | 'planTypeId' | 'startDate' | 'endDate' | 'active' | 'lastBillDate' | 'createdAt' | 'updatedAt' | 'isDeleted'>
    )>, users: Maybe<Array<Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>
    )>>>, forms: Maybe<Array<Maybe<(
      { __typename?: 'Form' }
      & Pick<Form, 'id' | 'ownerId' | 'name' | 'description' | 'versionId' | 'versionActivatedDate' | 'accountId' | 'createdAt' | 'updatedAt' | 'startDate' | 'endDate' | 'isPaused' | 'isDeleted' | 'redirectNotStarted' | 'redirectHasEnded'>
    )>>> }
  )>>> }
);

export type ListUsersQueryVariables = {
  offsetLimit?: Maybe<OffsetLimit>,
  filter?: Maybe<UserFilterInput>,
  sort?: Maybe<UserSortInput>
};


export type ListUsersQuery = (
  { __typename?: 'Query' }
  & { listUsers: Maybe<Array<Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted'>
    & { ownedBy: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>
    )>, account: Maybe<(
      { __typename?: 'Account' }
      & Pick<Account, 'id' | 'name' | 'website' | 'taxId' | 'ownerId' | 'planId' | 'createdAt' | 'updatedAt' | 'active'>
    )> }
  )>>> }
);

export type ListPlansQueryVariables = {
  offsetLimit?: Maybe<OffsetLimit>,
  filter?: Maybe<PlanFilterInput>,
  sort?: Maybe<PlanSortInput>
};


export type ListPlansQuery = (
  { __typename?: 'Query' }
  & { listPlans: Maybe<Array<Maybe<(
    { __typename?: 'Plan' }
    & Pick<Plan, 'id' | 'accountId' | 'ownerId' | 'planTypeId' | 'startDate' | 'endDate' | 'active' | 'lastBillDate' | 'createdAt' | 'updatedAt' | 'isDeleted'>
    & { account: (
      { __typename?: 'Account' }
      & Pick<Account, 'id' | 'name' | 'website' | 'taxId' | 'ownerId' | 'planId' | 'createdAt' | 'updatedAt' | 'active' | 'numForms' | 'numUsers'>
    ), ownedBy: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>
    ), planType: Maybe<(
      { __typename?: 'PlanType' }
      & Pick<PlanType, 'id' | 'ownerId' | 'name' | 'cost' | 'active' | 'billingTerm' | 'createdAt' | 'updatedAt' | 'isDeleted'>
    )> }
  )>>> }
);

export type ListPlanTypesQueryVariables = {
  offsetLimit?: Maybe<OffsetLimit>,
  filter?: Maybe<PlanTypeFilterInput>,
  sort?: Maybe<PlanTypeSortInput>
};


export type ListPlanTypesQuery = (
  { __typename?: 'Query' }
  & { listPlanTypes: Maybe<Array<Maybe<(
    { __typename?: 'PlanType' }
    & Pick<PlanType, 'id' | 'ownerId' | 'name' | 'cost' | 'active' | 'billingTerm' | 'createdAt' | 'updatedAt' | 'isDeleted'>
    & { ownedBy: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>
    ) }
  )>>> }
);

export type ListFormsQueryVariables = {
  offsetLimit?: Maybe<OffsetLimit>,
  filter?: Maybe<FormFilterInput>,
  sort?: Maybe<FormSortInput>
};


export type ListFormsQuery = (
  { __typename?: 'Query' }
  & { listForms: Maybe<Array<Maybe<(
    { __typename?: 'Form' }
    & Pick<Form, 'id' | 'ownerId' | 'name' | 'description' | 'versionId' | 'versionActivatedDate' | 'accountId' | 'createdAt' | 'updatedAt' | 'startDate' | 'endDate' | 'isPaused' | 'isDeleted' | 'redirectNotStarted' | 'redirectHasEnded'>
    & { version: Maybe<(
      { __typename?: 'FormVersion' }
      & Pick<FormVersion, 'id' | 'createdAt' | 'displayName' | 'notes'>
    )>, ownedBy: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email' | 'given_name' | 'family_name'>
    ), account: (
      { __typename?: 'Account' }
      & Pick<Account, 'id' | 'name'>
    ) }
  )>>> }
);

export type ListFormVersionsQueryVariables = {
  offsetLimit?: Maybe<OffsetLimit>,
  filter?: Maybe<FormVersionFilterInput>,
  sort?: Maybe<FormVersionSortInput>
};


export type ListFormVersionsQuery = (
  { __typename?: 'Query' }
  & { listFormVersions: Maybe<Array<Maybe<(
    { __typename?: 'FormVersion' }
    & Pick<FormVersion, 'id' | 'accountId' | 'formId' | 'ownerId' | 'createdAt' | 'displayName' | 'notes' | 'formData'>
    & { ownedBy: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email' | 'userGroup' | 'given_name' | 'family_name'>
    ) }
  )>>> }
);

export type ListIntegrationTypesQueryVariables = {
  offsetLimit?: Maybe<OffsetLimit>,
  filter?: Maybe<IntegrationTypeFilterInput>,
  sort?: Maybe<IntegrationTypeSortInput>
};


export type ListIntegrationTypesQuery = (
  { __typename?: 'Query' }
  & { listIntegrationTypes: Maybe<Array<Maybe<(
    { __typename?: 'IntegrationType' }
    & Pick<IntegrationType, 'id' | 'ownerId' | 'planTypeId' | 'name' | 'active' | 'createdAt' | 'updatedAt'>
    & { ownedBy: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>
    ), planType: Maybe<(
      { __typename?: 'PlanType' }
      & Pick<PlanType, 'id' | 'ownerId' | 'name' | 'cost' | 'active' | 'billingTerm' | 'createdAt' | 'updatedAt' | 'isDeleted'>
    )> }
  )>>> }
);

export type ListIntegrationsQueryVariables = {
  offsetLimit?: Maybe<OffsetLimit>,
  filter?: Maybe<IntegrationFilterInput>,
  sort?: Maybe<IntegrationSortInput>
};


export type ListIntegrationsQuery = (
  { __typename?: 'Query' }
  & { listIntegrations: Maybe<Array<Maybe<(
    { __typename?: 'Integration' }
    & Pick<Integration, 'id' | 'integrationTypeId' | 'ownerId' | 'accountId' | 'formId' | 'active' | 'authType' | 'auth' | 'target' | 'method' | 'lastExecuted' | 'lastExecutionResult' | 'lastExecutionResultMessage' | 'createdAt' | 'updatedAt' | 'isDeleted'>
    & { integrationType: Maybe<(
      { __typename?: 'IntegrationType' }
      & Pick<IntegrationType, 'id' | 'ownerId' | 'planTypeId' | 'name' | 'active' | 'createdAt' | 'updatedAt'>
    )>, form: (
      { __typename?: 'Form' }
      & Pick<Form, 'id' | 'ownerId' | 'name' | 'description' | 'versionId' | 'versionActivatedDate' | 'accountId' | 'createdAt' | 'updatedAt' | 'startDate' | 'endDate' | 'isPaused' | 'isDeleted' | 'redirectNotStarted' | 'redirectHasEnded'>
    ) }
  )>>> }
);

export type ListFormEntriesQueryVariables = {
  offsetLimit?: Maybe<OffsetLimit>,
  filter?: Maybe<FormEntryFilterInput>,
  sort?: Maybe<FormEntrySortInput>
};


export type ListFormEntriesQuery = (
  { __typename?: 'Query' }
  & { listFormEntries: Maybe<Array<Maybe<(
    { __typename?: 'FormEntry' }
    & Pick<FormEntry, 'id' | 'accountId' | 'formId' | 'data' | 'createdAt'>
    & { form: (
      { __typename?: 'Form' }
      & Pick<Form, 'id' | 'ownerId' | 'name' | 'description' | 'versionId' | 'versionActivatedDate' | 'accountId' | 'createdAt' | 'updatedAt' | 'startDate' | 'endDate' | 'isPaused' | 'isDeleted' | 'redirectNotStarted' | 'redirectHasEnded'>
    ) }
  )>>> }
);


export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  Account: ResolverTypeWrapper<Account>,
  String: ResolverTypeWrapper<Scalars['String']>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  Address: ResolverTypeWrapper<Address>,
  AddressType: AddressType,
  AWSPhone: ResolverTypeWrapper<Scalars['AWSPhone']>,
  User: ResolverTypeWrapper<User>,
  AWSDateTime: ResolverTypeWrapper<Scalars['AWSDateTime']>,
  Plan: ResolverTypeWrapper<Plan>,
  PlanType: ResolverTypeWrapper<PlanType>,
  Float: ResolverTypeWrapper<Scalars['Float']>,
  Form: ResolverTypeWrapper<Form>,
  FormVersion: ResolverTypeWrapper<FormVersion>,
  AWSJSON: ResolverTypeWrapper<Scalars['AWSJSON']>,
  AWSURL: ResolverTypeWrapper<Scalars['AWSURL']>,
  Integration: ResolverTypeWrapper<Integration>,
  IntegrationType: ResolverTypeWrapper<IntegrationType>,
  FormEntry: ResolverTypeWrapper<FormEntry>,
  OffsetLimit: OffsetLimit,
  AccountFilterInput: AccountFilterInput,
  StringFilter: StringFilter,
  FilterWith: FilterWith,
  StringFilterExpression: StringFilterExpression,
  DateFilter: DateFilter,
  NumericFilterExpression: NumericFilterExpression,
  IntFilter: IntFilter,
  AccountSortInput: AccountSortInput,
  SortOrder: SortOrder,
  UserFilterInput: UserFilterInput,
  UserSortInput: UserSortInput,
  PlanFilterInput: PlanFilterInput,
  PlanSortInput: PlanSortInput,
  PlanTypeFilterInput: PlanTypeFilterInput,
  FloatFilter: FloatFilter,
  PlanTypeSortInput: PlanTypeSortInput,
  FormFilterInput: FormFilterInput,
  FormSortInput: FormSortInput,
  FormVersionFilterInput: FormVersionFilterInput,
  FormVersionSortInput: FormVersionSortInput,
  IntegrationTypeFilterInput: IntegrationTypeFilterInput,
  IntegrationTypeSortInput: IntegrationTypeSortInput,
  IntegrationFilterInput: IntegrationFilterInput,
  IntegrationSortInput: IntegrationSortInput,
  FormEntryFilterInput: FormEntryFilterInput,
  FormEntrySortInput: FormEntrySortInput,
  Mutation: ResolverTypeWrapper<{}>,
  AddPlanTypeInput: AddPlanTypeInput,
  AddPlanInput: AddPlanInput,
  AddIntegrationTypeInput: AddIntegrationTypeInput,
  AddIntegrationInput: AddIntegrationInput,
  AddFormInput: AddFormInput,
  AddFormVersionInput: AddFormVersionInput,
  AttachFormVersionInput: AttachFormVersionInput,
  UpdatePlanTypeInput: UpdatePlanTypeInput,
  UpdatePlanInput: UpdatePlanInput,
  UpdateAccountInput: UpdateAccountInput,
  UpdateUserInput: UpdateUserInput,
  UpdateUserInputData: UpdateUserInputData,
  UpdateIntegrationTypeInput: UpdateIntegrationTypeInput,
  UpdateIntegrationInput: UpdateIntegrationInput,
  UpdateFormInput: UpdateFormInput,
  DeleteFormInput: DeleteFormInput,
  DeleteFormVersionInput: DeleteFormVersionInput,
  AddFormEntryInput: AddFormEntryInput,
  FormEntrySansData: ResolverTypeWrapper<FormEntrySansData>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  BooleanFilterExpression: BooleanFilterExpression,
  UserGroup: UserGroup,
  BooleanFilter: BooleanFilter,
  AddAddressInput: ResolverTypeWrapper<AddAddressInput>,
  UpdateIntegrationTypeInputData: UpdateIntegrationTypeInputData,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {},
  ID: Scalars['ID'],
  Account: Account,
  String: Scalars['String'],
  Int: Scalars['Int'],
  Address: Address,
  AddressType: AddressType,
  AWSPhone: Scalars['AWSPhone'],
  User: User,
  AWSDateTime: Scalars['AWSDateTime'],
  Plan: Plan,
  PlanType: PlanType,
  Float: Scalars['Float'],
  Form: Form,
  FormVersion: FormVersion,
  AWSJSON: Scalars['AWSJSON'],
  AWSURL: Scalars['AWSURL'],
  Integration: Integration,
  IntegrationType: IntegrationType,
  FormEntry: FormEntry,
  OffsetLimit: OffsetLimit,
  AccountFilterInput: AccountFilterInput,
  StringFilter: StringFilter,
  FilterWith: FilterWith,
  StringFilterExpression: StringFilterExpression,
  DateFilter: DateFilter,
  NumericFilterExpression: NumericFilterExpression,
  IntFilter: IntFilter,
  AccountSortInput: AccountSortInput,
  SortOrder: SortOrder,
  UserFilterInput: UserFilterInput,
  UserSortInput: UserSortInput,
  PlanFilterInput: PlanFilterInput,
  PlanSortInput: PlanSortInput,
  PlanTypeFilterInput: PlanTypeFilterInput,
  FloatFilter: FloatFilter,
  PlanTypeSortInput: PlanTypeSortInput,
  FormFilterInput: FormFilterInput,
  FormSortInput: FormSortInput,
  FormVersionFilterInput: FormVersionFilterInput,
  FormVersionSortInput: FormVersionSortInput,
  IntegrationTypeFilterInput: IntegrationTypeFilterInput,
  IntegrationTypeSortInput: IntegrationTypeSortInput,
  IntegrationFilterInput: IntegrationFilterInput,
  IntegrationSortInput: IntegrationSortInput,
  FormEntryFilterInput: FormEntryFilterInput,
  FormEntrySortInput: FormEntrySortInput,
  Mutation: {},
  AddPlanTypeInput: AddPlanTypeInput,
  AddPlanInput: AddPlanInput,
  AddIntegrationTypeInput: AddIntegrationTypeInput,
  AddIntegrationInput: AddIntegrationInput,
  AddFormInput: AddFormInput,
  AddFormVersionInput: AddFormVersionInput,
  AttachFormVersionInput: AttachFormVersionInput,
  UpdatePlanTypeInput: UpdatePlanTypeInput,
  UpdatePlanInput: UpdatePlanInput,
  UpdateAccountInput: UpdateAccountInput,
  UpdateUserInput: UpdateUserInput,
  UpdateUserInputData: UpdateUserInputData,
  UpdateIntegrationTypeInput: UpdateIntegrationTypeInput,
  UpdateIntegrationInput: UpdateIntegrationInput,
  UpdateFormInput: UpdateFormInput,
  DeleteFormInput: DeleteFormInput,
  DeleteFormVersionInput: DeleteFormVersionInput,
  AddFormEntryInput: AddFormEntryInput,
  FormEntrySansData: FormEntrySansData,
  Boolean: Scalars['Boolean'],
  BooleanFilterExpression: BooleanFilterExpression,
  UserGroup: UserGroup,
  BooleanFilter: BooleanFilter,
  AddAddressInput: AddAddressInput,
  UpdateIntegrationTypeInputData: UpdateIntegrationTypeInputData,
};

export type ModelDirectiveResolver<Result, Parent, ContextType = any, Args = {  }> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type Aws_Api_KeyDirectiveResolver<Result, Parent, ContextType = any, Args = {  }> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AccountResolvers<ContextType = any, ParentType extends ResolversParentTypes['Account'] = ResolversParentTypes['Account']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  addresses?: Resolver<Maybe<Array<Maybe<ResolversTypes['Address']>>>, ParentType, ContextType, AccountAddressesArgs>,
  website?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  taxId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  ownerId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  ownedBy?: Resolver<ResolversTypes['User'], ParentType, ContextType>,
  plan?: Resolver<Maybe<ResolversTypes['Plan']>, ParentType, ContextType>,
  planId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>,
  createdAt?: Resolver<Maybe<ResolversTypes['AWSDateTime']>, ParentType, ContextType>,
  updatedAt?: Resolver<Maybe<ResolversTypes['AWSDateTime']>, ParentType, ContextType>,
  active?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  numForms?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  numUsers?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  users?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType, AccountUsersArgs>,
  forms?: Resolver<Maybe<Array<Maybe<ResolversTypes['Form']>>>, ParentType, ContextType, AccountFormsArgs>,
};

export type AddAddressInputResolvers<ContextType = any, ParentType extends ResolversParentTypes['AddAddressInput'] = ResolversParentTypes['AddAddressInput']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  addressee?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  addressType?: Resolver<ResolversTypes['AddressType'], ParentType, ContextType>,
  phone_number?: Resolver<Maybe<ResolversTypes['AWSPhone']>, ParentType, ContextType>,
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  street?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  state?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
};

export type AddressResolvers<ContextType = any, ParentType extends ResolversParentTypes['Address'] = ResolversParentTypes['Address']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  addressee?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  addressType?: Resolver<ResolversTypes['AddressType'], ParentType, ContextType>,
  phone_number?: Resolver<Maybe<ResolversTypes['AWSPhone']>, ParentType, ContextType>,
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  street?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  state?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
};

export interface AwsDateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['AWSDateTime'], any> {
  name: 'AWSDateTime'
}

export interface AwsjsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['AWSJSON'], any> {
  name: 'AWSJSON'
}

export interface AwsPhoneScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['AWSPhone'], any> {
  name: 'AWSPhone'
}

export interface AwsurlScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['AWSURL'], any> {
  name: 'AWSURL'
}

export type FormResolvers<ContextType = any, ParentType extends ResolversParentTypes['Form'] = ResolversParentTypes['Form']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  ownerId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  versionId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>,
  versionActivatedDate?: Resolver<Maybe<ResolversTypes['AWSDateTime']>, ParentType, ContextType>,
  version?: Resolver<Maybe<ResolversTypes['FormVersion']>, ParentType, ContextType>,
  ownedBy?: Resolver<ResolversTypes['User'], ParentType, ContextType>,
  accountId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  account?: Resolver<ResolversTypes['Account'], ParentType, ContextType>,
  createdAt?: Resolver<ResolversTypes['AWSDateTime'], ParentType, ContextType>,
  updatedAt?: Resolver<Maybe<ResolversTypes['AWSDateTime']>, ParentType, ContextType>,
  startDate?: Resolver<Maybe<ResolversTypes['AWSDateTime']>, ParentType, ContextType>,
  endDate?: Resolver<Maybe<ResolversTypes['AWSDateTime']>, ParentType, ContextType>,
  isPaused?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  isDeleted?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  redirectNotStarted?: Resolver<Maybe<ResolversTypes['AWSURL']>, ParentType, ContextType>,
  redirectHasEnded?: Resolver<Maybe<ResolversTypes['AWSURL']>, ParentType, ContextType>,
  versions?: Resolver<Maybe<Array<Maybe<ResolversTypes['FormVersion']>>>, ParentType, ContextType, FormVersionsArgs>,
  integrations?: Resolver<Maybe<Array<Maybe<ResolversTypes['Integration']>>>, ParentType, ContextType, FormIntegrationsArgs>,
  numEntries?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  entries?: Resolver<Maybe<Array<Maybe<ResolversTypes['FormEntry']>>>, ParentType, ContextType, FormEntriesArgs>,
};

export type FormEntryResolvers<ContextType = any, ParentType extends ResolversParentTypes['FormEntry'] = ResolversParentTypes['FormEntry']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  accountId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  formId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  form?: Resolver<ResolversTypes['Form'], ParentType, ContextType>,
  data?: Resolver<ResolversTypes['AWSJSON'], ParentType, ContextType>,
  createdAt?: Resolver<ResolversTypes['AWSDateTime'], ParentType, ContextType>,
};

export type FormEntrySansDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['FormEntrySansData'] = ResolversParentTypes['FormEntrySansData']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  formId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  createdAt?: Resolver<ResolversTypes['AWSDateTime'], ParentType, ContextType>,
};

export type FormVersionResolvers<ContextType = any, ParentType extends ResolversParentTypes['FormVersion'] = ResolversParentTypes['FormVersion']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  accountId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  formId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  ownerId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  ownedBy?: Resolver<ResolversTypes['User'], ParentType, ContextType>,
  createdAt?: Resolver<Maybe<ResolversTypes['AWSDateTime']>, ParentType, ContextType>,
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  formData?: Resolver<ResolversTypes['AWSJSON'], ParentType, ContextType>,
};

export type IntegrationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Integration'] = ResolversParentTypes['Integration']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  integrationTypeId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  integrationType?: Resolver<Maybe<ResolversTypes['IntegrationType']>, ParentType, ContextType>,
  ownerId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  accountId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  formId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  form?: Resolver<ResolversTypes['Form'], ParentType, ContextType>,
  active?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  authType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  auth?: Resolver<Maybe<ResolversTypes['AWSJSON']>, ParentType, ContextType>,
  target?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  method?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  lastExecuted?: Resolver<Maybe<ResolversTypes['AWSDateTime']>, ParentType, ContextType>,
  lastExecutionResult?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  lastExecutionResultMessage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  createdAt?: Resolver<Maybe<ResolversTypes['AWSDateTime']>, ParentType, ContextType>,
  updatedAt?: Resolver<Maybe<ResolversTypes['AWSDateTime']>, ParentType, ContextType>,
  isDeleted?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
};

export type IntegrationTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['IntegrationType'] = ResolversParentTypes['IntegrationType']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  ownerId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  ownedBy?: Resolver<ResolversTypes['User'], ParentType, ContextType>,
  planTypeId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  planType?: Resolver<Maybe<ResolversTypes['PlanType']>, ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  active?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  createdAt?: Resolver<Maybe<ResolversTypes['AWSDateTime']>, ParentType, ContextType>,
  updatedAt?: Resolver<Maybe<ResolversTypes['AWSDateTime']>, ParentType, ContextType>,
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addPlanType?: Resolver<ResolversTypes['PlanType'], ParentType, ContextType, MutationAddPlanTypeArgs>,
  addPlan?: Resolver<ResolversTypes['Plan'], ParentType, ContextType, MutationAddPlanArgs>,
  addIntegrationType?: Resolver<ResolversTypes['IntegrationType'], ParentType, ContextType, MutationAddIntegrationTypeArgs>,
  addIntegration?: Resolver<ResolversTypes['Integration'], ParentType, ContextType, MutationAddIntegrationArgs>,
  addForm?: Resolver<ResolversTypes['Form'], ParentType, ContextType, RequireFields<MutationAddFormArgs, 'input'>>,
  addFormVersion?: Resolver<ResolversTypes['Form'], ParentType, ContextType, RequireFields<MutationAddFormVersionArgs, 'input'>>,
  attachFormVersion?: Resolver<ResolversTypes['Form'], ParentType, ContextType, RequireFields<MutationAttachFormVersionArgs, 'input'>>,
  updatePlanType?: Resolver<ResolversTypes['PlanType'], ParentType, ContextType, MutationUpdatePlanTypeArgs>,
  updatePlan?: Resolver<ResolversTypes['Plan'], ParentType, ContextType, MutationUpdatePlanArgs>,
  updateAccount?: Resolver<ResolversTypes['Account'], ParentType, ContextType, MutationUpdateAccountArgs>,
  updateAccountPlan?: Resolver<ResolversTypes['Account'], ParentType, ContextType, MutationUpdateAccountPlanArgs>,
  updateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, MutationUpdateUserArgs>,
  updateIntegrationType?: Resolver<ResolversTypes['IntegrationType'], ParentType, ContextType, MutationUpdateIntegrationTypeArgs>,
  updateIntegration?: Resolver<ResolversTypes['Integration'], ParentType, ContextType, MutationUpdateIntegrationArgs>,
  updateForm?: Resolver<ResolversTypes['Form'], ParentType, ContextType, MutationUpdateFormArgs>,
  deleteForm?: Resolver<ResolversTypes['Form'], ParentType, ContextType, RequireFields<MutationDeleteFormArgs, 'input'>>,
  deletePlanType?: Resolver<ResolversTypes['PlanType'], ParentType, ContextType, RequireFields<MutationDeletePlanTypeArgs, 'planTypeId'>>,
  deletePlan?: Resolver<ResolversTypes['Plan'], ParentType, ContextType, RequireFields<MutationDeletePlanArgs, 'accountId' | 'planId'>>,
  deleteAccount?: Resolver<ResolversTypes['Account'], ParentType, ContextType, RequireFields<MutationDeleteAccountArgs, 'accountId'>>,
  deleteUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationDeleteUserArgs, 'userId'>>,
  deleteIntegrationType?: Resolver<ResolversTypes['IntegrationType'], ParentType, ContextType, RequireFields<MutationDeleteIntegrationTypeArgs, 'integrationTypeId'>>,
  deleteIntegration?: Resolver<ResolversTypes['Integration'], ParentType, ContextType, RequireFields<MutationDeleteIntegrationArgs, 'integrationId'>>,
  deleteFormVersion?: Resolver<ResolversTypes['FormVersion'], ParentType, ContextType, RequireFields<MutationDeleteFormVersionArgs, 'input'>>,
  addFormEntry?: Resolver<ResolversTypes['FormEntrySansData'], ParentType, ContextType, RequireFields<MutationAddFormEntryArgs, 'input'>>,
};

export type PlanResolvers<ContextType = any, ParentType extends ResolversParentTypes['Plan'] = ResolversParentTypes['Plan']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  accountId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  account?: Resolver<ResolversTypes['Account'], ParentType, ContextType>,
  ownerId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  ownedBy?: Resolver<ResolversTypes['User'], ParentType, ContextType>,
  planTypeId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  startDate?: Resolver<ResolversTypes['AWSDateTime'], ParentType, ContextType>,
  endDate?: Resolver<Maybe<ResolversTypes['AWSDateTime']>, ParentType, ContextType>,
  active?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  lastBillDate?: Resolver<Maybe<ResolversTypes['AWSDateTime']>, ParentType, ContextType>,
  createdAt?: Resolver<Maybe<ResolversTypes['AWSDateTime']>, ParentType, ContextType>,
  updatedAt?: Resolver<Maybe<ResolversTypes['AWSDateTime']>, ParentType, ContextType>,
  planType?: Resolver<Maybe<ResolversTypes['PlanType']>, ParentType, ContextType>,
  isDeleted?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
};

export type PlanTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['PlanType'] = ResolversParentTypes['PlanType']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  ownerId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  ownedBy?: Resolver<ResolversTypes['User'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  cost?: Resolver<ResolversTypes['Float'], ParentType, ContextType>,
  active?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  billingTerm?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  createdAt?: Resolver<Maybe<ResolversTypes['AWSDateTime']>, ParentType, ContextType>,
  updatedAt?: Resolver<Maybe<ResolversTypes['AWSDateTime']>, ParentType, ContextType>,
  isDeleted?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getAccount?: Resolver<Maybe<ResolversTypes['Account']>, ParentType, ContextType, RequireFields<QueryGetAccountArgs, 'accountId'>>,
  getUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryGetUserArgs, 'userId'>>,
  getPlan?: Resolver<Maybe<ResolversTypes['Plan']>, ParentType, ContextType, RequireFields<QueryGetPlanArgs, 'planId'>>,
  getActiveAccountPlan?: Resolver<Maybe<ResolversTypes['Plan']>, ParentType, ContextType, RequireFields<QueryGetActiveAccountPlanArgs, 'accountId'>>,
  getPlanType?: Resolver<Maybe<ResolversTypes['PlanType']>, ParentType, ContextType, RequireFields<QueryGetPlanTypeArgs, 'planTypeId'>>,
  getForm?: Resolver<Maybe<ResolversTypes['Form']>, ParentType, ContextType, RequireFields<QueryGetFormArgs, 'formId'>>,
  getFormVersion?: Resolver<Maybe<ResolversTypes['FormVersion']>, ParentType, ContextType, RequireFields<QueryGetFormVersionArgs, 'versionId'>>,
  getIntegrationType?: Resolver<Maybe<ResolversTypes['IntegrationType']>, ParentType, ContextType, RequireFields<QueryGetIntegrationTypeArgs, 'integrationTypeId'>>,
  getIntegration?: Resolver<Maybe<ResolversTypes['Integration']>, ParentType, ContextType, RequireFields<QueryGetIntegrationArgs, 'integrationId'>>,
  getFormEntry?: Resolver<Maybe<ResolversTypes['FormEntry']>, ParentType, ContextType, RequireFields<QueryGetFormEntryArgs, 'formEntryId'>>,
  listAccounts?: Resolver<Maybe<Array<Maybe<ResolversTypes['Account']>>>, ParentType, ContextType, QueryListAccountsArgs>,
  listUsers?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType, QueryListUsersArgs>,
  listPlans?: Resolver<Maybe<Array<Maybe<ResolversTypes['Plan']>>>, ParentType, ContextType, QueryListPlansArgs>,
  listPlanTypes?: Resolver<Maybe<Array<Maybe<ResolversTypes['PlanType']>>>, ParentType, ContextType, QueryListPlanTypesArgs>,
  listForms?: Resolver<Maybe<Array<Maybe<ResolversTypes['Form']>>>, ParentType, ContextType, QueryListFormsArgs>,
  listFormVersions?: Resolver<Maybe<Array<Maybe<ResolversTypes['FormVersion']>>>, ParentType, ContextType, QueryListFormVersionsArgs>,
  listIntegrationTypes?: Resolver<Maybe<Array<Maybe<ResolversTypes['IntegrationType']>>>, ParentType, ContextType, QueryListIntegrationTypesArgs>,
  listIntegrations?: Resolver<Maybe<Array<Maybe<ResolversTypes['Integration']>>>, ParentType, ContextType, QueryListIntegrationsArgs>,
  listFormEntries?: Resolver<Maybe<Array<Maybe<ResolversTypes['FormEntry']>>>, ParentType, ContextType, QueryListFormEntriesArgs>,
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  ownerId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>,
  ownedBy?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
  accountId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>,
  account?: Resolver<Maybe<ResolversTypes['Account']>, ParentType, ContextType>,
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  userGroup?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  given_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  family_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  phone_number?: Resolver<Maybe<ResolversTypes['AWSPhone']>, ParentType, ContextType>,
  createdAt?: Resolver<Maybe<ResolversTypes['AWSDateTime']>, ParentType, ContextType>,
  updatedAt?: Resolver<Maybe<ResolversTypes['AWSDateTime']>, ParentType, ContextType>,
  isDeleted?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  numForms?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
};

export type Resolvers<ContextType = any> = {
  Account?: AccountResolvers<ContextType>,
  AddAddressInput?: AddAddressInputResolvers<ContextType>,
  Address?: AddressResolvers<ContextType>,
  AWSDateTime?: GraphQLScalarType,
  AWSJSON?: GraphQLScalarType,
  AWSPhone?: GraphQLScalarType,
  AWSURL?: GraphQLScalarType,
  Form?: FormResolvers<ContextType>,
  FormEntry?: FormEntryResolvers<ContextType>,
  FormEntrySansData?: FormEntrySansDataResolvers<ContextType>,
  FormVersion?: FormVersionResolvers<ContextType>,
  Integration?: IntegrationResolvers<ContextType>,
  IntegrationType?: IntegrationTypeResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  Plan?: PlanResolvers<ContextType>,
  PlanType?: PlanTypeResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  User?: UserResolvers<ContextType>,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
export type DirectiveResolvers<ContextType = any> = {
  model?: ModelDirectiveResolver<any, any, ContextType>,
  aws_api_key?: Aws_Api_KeyDirectiveResolver<any, any, ContextType>,
};


/**
* @deprecated
* Use "DirectiveResolvers" root object instead. If you wish to get "IDirectiveResolvers", add "typesPrefix: I" to your config.
*/
export type IDirectiveResolvers<ContextType = any> = DirectiveResolvers<ContextType>;