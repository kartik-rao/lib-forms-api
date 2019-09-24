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



export interface IAccount {
  id: Scalars['ID'],
  name: Scalars['String'],
  addresses?: Maybe<Array<Maybe<IAddress>>>,
  website?: Maybe<Scalars['String']>,
  taxId?: Maybe<Scalars['String']>,
  ownerId: Scalars['ID'],
  ownedBy: IUser,
  plan?: Maybe<IPlan>,
  planId?: Maybe<Scalars['ID']>,
  createdAt?: Maybe<Scalars['AWSDateTime']>,
  updatedAt?: Maybe<Scalars['AWSDateTime']>,
  active?: Maybe<Scalars['Int']>,
  numForms?: Maybe<Scalars['Int']>,
  numUsers?: Maybe<Scalars['Int']>,
  users?: Maybe<Array<Maybe<IUser>>>,
  forms?: Maybe<Array<Maybe<IForm>>>,
}


export interface IAccountAddressesArgs {
  limit?: Maybe<Scalars['Int']>
}


export interface IAccountUsersArgs {
  limit?: Maybe<Scalars['Int']>
}


export interface IAccountFormsArgs {
  limit?: Maybe<Scalars['Int']>
}

export interface IAccountFilterInput {
  name?: Maybe<IStringFilter>,
  createdAt?: Maybe<IDateFilter>,
  updatedAt?: Maybe<IDateFilter>,
  planId?: Maybe<IStringFilter>,
  active?: Maybe<IIntFilter>,
  criteria?: Maybe<Array<IAccountFilterInput>>,
}

export interface IAccountSortInput {
  name?: Maybe<ISortOrder>,
  createdAt?: Maybe<ISortOrder>,
  updatedAt?: Maybe<ISortOrder>,
  planId?: Maybe<ISortOrder>,
  sortBy?: Maybe<Array<IAccountSortInput>>,
}

export interface IAddAddressInput {
  name: Scalars['String'],
  addressee?: Maybe<Scalars['String']>,
  addressType: IAddressType,
  phone_number?: Maybe<Scalars['AWSPhone']>,
  email: Scalars['String'],
  street?: Maybe<Scalars['String']>,
  city?: Maybe<Scalars['String']>,
  state?: Maybe<Scalars['String']>,
  country?: Maybe<Scalars['String']>,
}

export interface IAddFormEntryInput {
  id: Scalars['ID'],
  accountId: Scalars['ID'],
  formId: Scalars['ID'],
  data: Scalars['AWSJSON'],
}

export interface IAddFormInput {
  accountId: Scalars['ID'],
  name: Scalars['String'],
  description: Scalars['String'],
  startsAt?: Maybe<Scalars['AWSDateTime']>,
  endsAt?: Maybe<Scalars['AWSDateTime']>,
  isPaused?: Maybe<Scalars['Int']>,
}

export interface IAddFormVersionInput {
  accountId: Scalars['ID'],
  formId: Scalars['ID'],
  displayName: Scalars['String'],
  notes: Scalars['String'],
  formData: Scalars['AWSJSON'],
}

export interface IAddIntegrationInput {
  integrationTypeId: Scalars['ID'],
  accountId: Scalars['ID'],
  formId: Scalars['ID'],
  active?: Maybe<Scalars['Int']>,
  authType?: Maybe<Scalars['String']>,
  auth?: Maybe<Scalars['AWSJSON']>,
  target?: Maybe<Scalars['String']>,
  method?: Maybe<Scalars['String']>,
}

export interface IAddIntegrationTypeInput {
  name: Scalars['String'],
  active?: Maybe<Scalars['Int']>,
}

export interface IAddPlanInput {
  accountId: Scalars['ID'],
  planTypeId: Scalars['ID'],
  endDate?: Maybe<Scalars['AWSDateTime']>,
  active?: Maybe<Scalars['Int']>,
}

export interface IAddPlanTypeInput {
  name: Scalars['String'],
  cost: Scalars['Float'],
  billingTerm: Scalars['String'],
  active: Scalars['Int'],
}

export interface IAddress {
  id: Scalars['ID'],
  name: Scalars['String'],
  addressee?: Maybe<Scalars['String']>,
  addressType: IAddressType,
  phone_number?: Maybe<Scalars['AWSPhone']>,
  email: Scalars['String'],
  street?: Maybe<Scalars['String']>,
  city?: Maybe<Scalars['String']>,
  state?: Maybe<Scalars['String']>,
  country?: Maybe<Scalars['String']>,
}

export enum IAddressType {
  Billing = 'BILLING',
  Contact = 'CONTACT'
}

export interface IAttachFormVersionInput {
  formId: Scalars['ID'],
  versionId: Scalars['ID'],
  accountId: Scalars['ID'],
}





export interface IBooleanFilter {
  with?: Maybe<IFilterWith>,
  expression: IBooleanFilterExpression,
  value?: Maybe<Array<Scalars['Boolean']>>,
}

export enum IBooleanFilterExpression {
  Ne = 'ne',
  Eq = 'eq'
}

export interface IDateFilter {
  with?: Maybe<IFilterWith>,
  expression: INumericFilterExpression,
  value?: Maybe<Array<Scalars['AWSDateTime']>>,
}

export interface IDeleteFormInput {
  id: Scalars['ID'],
  accountId: Scalars['ID'],
}

export interface IDeleteFormVersionInput {
  accountId: Scalars['ID'],
  formId: Scalars['ID'],
  versionId: Scalars['ID'],
}

export enum IFilterWith {
  And = 'AND',
  Or = 'OR'
}

export interface IFloatFilter {
  with?: Maybe<IFilterWith>,
  expression: INumericFilterExpression,
  value?: Maybe<Array<Scalars['Float']>>,
}

export interface IForm {
  id: Scalars['ID'],
  ownerId: Scalars['ID'],
  name: Scalars['String'],
  description: Scalars['String'],
  versionId?: Maybe<Scalars['ID']>,
  versionActivatedDate?: Maybe<Scalars['AWSDateTime']>,
  version?: Maybe<IFormVersion>,
  ownedBy: IUser,
  accountId: Scalars['ID'],
  account: IAccount,
  createdAt: Scalars['AWSDateTime'],
  updatedAt?: Maybe<Scalars['AWSDateTime']>,
  startDate?: Maybe<Scalars['AWSDateTime']>,
  endDate?: Maybe<Scalars['AWSDateTime']>,
  isPaused?: Maybe<Scalars['Int']>,
  isDeleted?: Maybe<Scalars['Int']>,
  redirectNotStarted?: Maybe<Scalars['AWSURL']>,
  redirectHasEnded?: Maybe<Scalars['AWSURL']>,
  versions?: Maybe<Array<Maybe<IFormVersion>>>,
  integrations?: Maybe<Array<Maybe<IIntegration>>>,
  numEntries?: Maybe<Scalars['Int']>,
  entries?: Maybe<Array<Maybe<IFormEntry>>>,
}


export interface IFormVersionsArgs {
  limit?: Maybe<Scalars['Int']>
}


export interface IFormIntegrationsArgs {
  limit?: Maybe<Scalars['Int']>
}


export interface IFormEntriesArgs {
  limit?: Maybe<Scalars['Int']>
}

export interface IFormEntry {
  id: Scalars['ID'],
  accountId: Scalars['ID'],
  formId: Scalars['ID'],
  form: IForm,
  data: Scalars['AWSJSON'],
  createdAt: Scalars['AWSDateTime'],
}

export interface IFormEntryFilterInput {
  formId?: Maybe<IStringFilter>,
  createdAt?: Maybe<IDateFilter>,
  accountId?: Maybe<IStringFilter>,
  criteria?: Maybe<Array<IFormEntryFilterInput>>,
}

export interface IFormEntrySansData {
  id: Scalars['ID'],
  formId: Scalars['ID'],
  createdAt: Scalars['AWSDateTime'],
}

export interface IFormEntrySortInput {
  createdAt?: Maybe<ISortOrder>,
}

export interface IFormFilterInput {
  name?: Maybe<IStringFilter>,
  ownerId?: Maybe<IStringFilter>,
  accountId?: Maybe<IStringFilter>,
  createdAt?: Maybe<IDateFilter>,
  updatedAt?: Maybe<IDateFilter>,
  startsAt?: Maybe<IDateFilter>,
  endsAt?: Maybe<IDateFilter>,
  isPaused?: Maybe<IIntFilter>,
  isDeleted?: Maybe<IIntFilter>,
  criteria?: Maybe<Array<IFormFilterInput>>,
}

export interface IFormSortInput {
  name?: Maybe<ISortOrder>,
  createdAt?: Maybe<ISortOrder>,
  updatedAt?: Maybe<ISortOrder>,
  startsAt?: Maybe<ISortOrder>,
  endsAt?: Maybe<ISortOrder>,
  sortBy?: Maybe<Array<IFormSortInput>>,
}

export interface IFormVersion {
  id: Scalars['ID'],
  accountId: Scalars['ID'],
  formId: Scalars['ID'],
  ownerId: Scalars['ID'],
  ownedBy: IUser,
  createdAt?: Maybe<Scalars['AWSDateTime']>,
  displayName: Scalars['String'],
  notes?: Maybe<Scalars['String']>,
  formData: Scalars['AWSJSON'],
}

export interface IFormVersionFilterInput {
  accountId?: Maybe<IStringFilter>,
  formId?: Maybe<IStringFilter>,
  ownerId?: Maybe<IStringFilter>,
  createdAt?: Maybe<IDateFilter>,
  criteria?: Maybe<Array<IFormVersionFilterInput>>,
}

export interface IFormVersionSortInput {
  createdAt?: Maybe<ISortOrder>,
  sortBy?: Maybe<Array<IFormVersionSortInput>>,
}

export interface IIntegration {
  id: Scalars['ID'],
  integrationTypeId: Scalars['ID'],
  integrationType?: Maybe<IIntegrationType>,
  ownerId: Scalars['ID'],
  accountId: Scalars['ID'],
  formId: Scalars['ID'],
  form: IForm,
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

export interface IIntegrationFilterInput {
  ownerId?: Maybe<IStringFilter>,
  accountId?: Maybe<IStringFilter>,
  formId?: Maybe<IStringFilter>,
  active?: Maybe<IIntFilter>,
  isDeleted?: Maybe<IIntFilter>,
  lastExecuted?: Maybe<IDateFilter>,
  lastExecutionResult?: Maybe<IIntFilter>,
  createdAt?: Maybe<IDateFilter>,
  updatedAt?: Maybe<IDateFilter>,
  criteria?: Maybe<Array<IIntegrationFilterInput>>,
}

export interface IIntegrationSortInput {
  lastExecuted?: Maybe<ISortOrder>,
  createdAt?: Maybe<ISortOrder>,
  updatedAt?: Maybe<ISortOrder>,
  sortBy?: Maybe<Array<IIntegrationSortInput>>,
}

export interface IIntegrationType {
  id: Scalars['ID'],
  ownerId: Scalars['ID'],
  ownedBy: IUser,
  planTypeId: Scalars['ID'],
  planType?: Maybe<IPlanType>,
  name: Scalars['String'],
  active: Scalars['Int'],
  createdAt?: Maybe<Scalars['AWSDateTime']>,
  updatedAt?: Maybe<Scalars['AWSDateTime']>,
}

export interface IIntegrationTypeFilterInput {
  ownerId?: Maybe<IStringFilter>,
  planTypeId?: Maybe<IStringFilter>,
  name?: Maybe<IStringFilter>,
  createdAt?: Maybe<IDateFilter>,
  updatedAt?: Maybe<IDateFilter>,
  active?: Maybe<IIntFilter>,
  criteria?: Maybe<Array<IIntegrationTypeFilterInput>>,
}

export interface IIntegrationTypeSortInput {
  name?: Maybe<ISortOrder>,
  createdAt?: Maybe<ISortOrder>,
  updatedAt?: Maybe<ISortOrder>,
  sortBy?: Maybe<Array<IIntegrationTypeSortInput>>,
}

export interface IIntFilter {
  with?: Maybe<IFilterWith>,
  expression: INumericFilterExpression,
  value?: Maybe<Array<Scalars['Int']>>,
}

export interface IMutation {
  addPlanType: IPlanType,
  addPlan: IPlan,
  addIntegrationType: IIntegrationType,
  addIntegration: IIntegration,
  addForm: IForm,
  addFormVersion: IForm,
  attachFormVersion: IForm,
  updatePlanType: IPlanType,
  updatePlan: IPlan,
  updateAccount: IAccount,
  updateAccountPlan: IAccount,
  updateUser: IUser,
  updateIntegrationType: IIntegrationType,
  updateIntegration: IIntegration,
  updateForm: IForm,
  deleteForm: IForm,
  deletePlanType: IPlanType,
  deletePlan: IPlan,
  deleteAccount: IAccount,
  deleteUser: IUser,
  deleteIntegrationType: IIntegrationType,
  deleteIntegration: IIntegration,
  deleteFormVersion: IFormVersion,
  addFormEntry: IFormEntrySansData,
}


export interface IMutationAddPlanTypeArgs {
  input?: Maybe<IAddPlanTypeInput>
}


export interface IMutationAddPlanArgs {
  input?: Maybe<IAddPlanInput>
}


export interface IMutationAddIntegrationTypeArgs {
  input?: Maybe<IAddIntegrationTypeInput>
}


export interface IMutationAddIntegrationArgs {
  input?: Maybe<IAddIntegrationInput>
}


export interface IMutationAddFormArgs {
  input: IAddFormInput
}


export interface IMutationAddFormVersionArgs {
  input: IAddFormVersionInput
}


export interface IMutationAttachFormVersionArgs {
  input: IAttachFormVersionInput
}


export interface IMutationUpdatePlanTypeArgs {
  input?: Maybe<IUpdatePlanTypeInput>
}


export interface IMutationUpdatePlanArgs {
  input?: Maybe<IUpdatePlanInput>
}


export interface IMutationUpdateAccountArgs {
  input?: Maybe<IUpdateAccountInput>
}


export interface IMutationUpdateAccountPlanArgs {
  input?: Maybe<IAddPlanInput>
}


export interface IMutationUpdateUserArgs {
  input?: Maybe<IUpdateUserInput>
}


export interface IMutationUpdateIntegrationTypeArgs {
  input?: Maybe<IUpdateIntegrationTypeInput>
}


export interface IMutationUpdateIntegrationArgs {
  input?: Maybe<IUpdateIntegrationInput>
}


export interface IMutationUpdateFormArgs {
  input?: Maybe<IUpdateFormInput>
}


export interface IMutationDeleteFormArgs {
  input: IDeleteFormInput
}


export interface IMutationDeletePlanTypeArgs {
  planTypeId: Scalars['ID']
}


export interface IMutationDeletePlanArgs {
  accountId: Scalars['ID'],
  planId: Scalars['ID']
}


export interface IMutationDeleteAccountArgs {
  accountId: Scalars['ID']
}


export interface IMutationDeleteUserArgs {
  userId: Scalars['ID']
}


export interface IMutationDeleteIntegrationTypeArgs {
  integrationTypeId: Scalars['ID']
}


export interface IMutationDeleteIntegrationArgs {
  integrationId: Scalars['ID']
}


export interface IMutationDeleteFormVersionArgs {
  input: IDeleteFormVersionInput
}


export interface IMutationAddFormEntryArgs {
  input: IAddFormEntryInput
}

export enum INumericFilterExpression {
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

export interface IOffsetLimit {
  offset?: Maybe<Scalars['Int']>,
  limit?: Maybe<Scalars['Int']>,
}

export interface IPlan {
  id: Scalars['ID'],
  accountId: Scalars['ID'],
  account: IAccount,
  ownerId: Scalars['ID'],
  ownedBy: IUser,
  planTypeId: Scalars['ID'],
  startDate: Scalars['AWSDateTime'],
  endDate?: Maybe<Scalars['AWSDateTime']>,
  active?: Maybe<Scalars['Int']>,
  lastBillDate?: Maybe<Scalars['AWSDateTime']>,
  createdAt?: Maybe<Scalars['AWSDateTime']>,
  updatedAt?: Maybe<Scalars['AWSDateTime']>,
  planType?: Maybe<IPlanType>,
  isDeleted?: Maybe<Scalars['Int']>,
}

export interface IPlanFilterInput {
  accountId?: Maybe<IStringFilter>,
  ownerId?: Maybe<IStringFilter>,
  planTypeId?: Maybe<IStringFilter>,
  lastBillDate?: Maybe<IDateFilter>,
  createdAt?: Maybe<IDateFilter>,
  updatedAt?: Maybe<IDateFilter>,
  startDate?: Maybe<IDateFilter>,
  endDate?: Maybe<IDateFilter>,
  criteria?: Maybe<Array<IPlanFilterInput>>,
}

export interface IPlanSortInput {
  createdAt?: Maybe<ISortOrder>,
  updatedAt?: Maybe<ISortOrder>,
  lastBillDate?: Maybe<ISortOrder>,
  startDate?: Maybe<ISortOrder>,
  endDate?: Maybe<ISortOrder>,
  sortBy?: Maybe<Array<IPlanSortInput>>,
}

export interface IPlanType {
  id: Scalars['ID'],
  ownerId: Scalars['ID'],
  ownedBy: IUser,
  name: Scalars['String'],
  cost: Scalars['Float'],
  active: Scalars['Int'],
  billingTerm: Scalars['String'],
  createdAt?: Maybe<Scalars['AWSDateTime']>,
  updatedAt?: Maybe<Scalars['AWSDateTime']>,
  isDeleted?: Maybe<Scalars['Int']>,
}

export interface IPlanTypeFilterInput {
  ownerId?: Maybe<IStringFilter>,
  cost?: Maybe<IFloatFilter>,
  billingTerm?: Maybe<IStringFilter>,
  name?: Maybe<IStringFilter>,
  createdAt?: Maybe<IDateFilter>,
  updatedAt?: Maybe<IDateFilter>,
  isDeleted?: Maybe<IIntFilter>,
  criteria?: Maybe<Array<IPlanTypeFilterInput>>,
}

export interface IPlanTypeSortInput {
  name?: Maybe<ISortOrder>,
  billingTerm?: Maybe<ISortOrder>,
  cost?: Maybe<ISortOrder>,
  createdAt?: Maybe<ISortOrder>,
  updatedAt?: Maybe<ISortOrder>,
  sortBy?: Maybe<Array<IPlanTypeSortInput>>,
}

export interface IQuery {
  getAccount?: Maybe<IAccount>,
  getUser?: Maybe<IUser>,
  getPlan?: Maybe<IPlan>,
  getActiveAccountPlan?: Maybe<IPlan>,
  getPlanType?: Maybe<IPlanType>,
  getForm?: Maybe<IForm>,
  getFormVersion?: Maybe<IFormVersion>,
  getIntegrationType?: Maybe<IIntegrationType>,
  getIntegration?: Maybe<IIntegration>,
  getFormEntry?: Maybe<IFormEntry>,
  listAccounts?: Maybe<Array<Maybe<IAccount>>>,
  listUsers?: Maybe<Array<Maybe<IUser>>>,
  listPlans?: Maybe<Array<Maybe<IPlan>>>,
  listPlanTypes?: Maybe<Array<Maybe<IPlanType>>>,
  listForms?: Maybe<Array<Maybe<IForm>>>,
  listFormVersions?: Maybe<Array<Maybe<IFormVersion>>>,
  listIntegrationTypes?: Maybe<Array<Maybe<IIntegrationType>>>,
  listIntegrations?: Maybe<Array<Maybe<IIntegration>>>,
  listFormEntries?: Maybe<Array<Maybe<IFormEntry>>>,
}


export interface IQueryGetAccountArgs {
  accountId: Scalars['ID']
}


export interface IQueryGetUserArgs {
  userId: Scalars['ID']
}


export interface IQueryGetPlanArgs {
  planId: Scalars['String']
}


export interface IQueryGetActiveAccountPlanArgs {
  accountId: Scalars['String']
}


export interface IQueryGetPlanTypeArgs {
  planTypeId: Scalars['String']
}


export interface IQueryGetFormArgs {
  formId: Scalars['String']
}


export interface IQueryGetFormVersionArgs {
  versionId: Scalars['String']
}


export interface IQueryGetIntegrationTypeArgs {
  integrationTypeId: Scalars['String']
}


export interface IQueryGetIntegrationArgs {
  integrationId: Scalars['String']
}


export interface IQueryGetFormEntryArgs {
  formEntryId: Scalars['String']
}


export interface IQueryListAccountsArgs {
  offsetLimit?: Maybe<IOffsetLimit>,
  filter?: Maybe<IAccountFilterInput>,
  sort?: Maybe<IAccountSortInput>
}


export interface IQueryListUsersArgs {
  offsetLimit?: Maybe<IOffsetLimit>,
  filter?: Maybe<IUserFilterInput>,
  sort?: Maybe<IUserSortInput>
}


export interface IQueryListPlansArgs {
  offsetLimit?: Maybe<IOffsetLimit>,
  filter?: Maybe<IPlanFilterInput>,
  sort?: Maybe<IPlanSortInput>
}


export interface IQueryListPlanTypesArgs {
  offsetLimit?: Maybe<IOffsetLimit>,
  filter?: Maybe<IPlanTypeFilterInput>,
  sort?: Maybe<IPlanTypeSortInput>
}


export interface IQueryListFormsArgs {
  offsetLimit?: Maybe<IOffsetLimit>,
  filter?: Maybe<IFormFilterInput>,
  sort?: Maybe<IFormSortInput>
}


export interface IQueryListFormVersionsArgs {
  offsetLimit?: Maybe<IOffsetLimit>,
  filter?: Maybe<IFormVersionFilterInput>,
  sort?: Maybe<IFormVersionSortInput>
}


export interface IQueryListIntegrationTypesArgs {
  offsetLimit?: Maybe<IOffsetLimit>,
  filter?: Maybe<IIntegrationTypeFilterInput>,
  sort?: Maybe<IIntegrationTypeSortInput>
}


export interface IQueryListIntegrationsArgs {
  offsetLimit?: Maybe<IOffsetLimit>,
  filter?: Maybe<IIntegrationFilterInput>,
  sort?: Maybe<IIntegrationSortInput>
}


export interface IQueryListFormEntriesArgs {
  offsetLimit?: Maybe<IOffsetLimit>,
  filter?: Maybe<IFormEntryFilterInput>,
  sort?: Maybe<IFormEntrySortInput>
}

export enum ISortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export interface IStringFilter {
  with?: Maybe<IFilterWith>,
  expression: IStringFilterExpression,
  value?: Maybe<Array<Scalars['String']>>,
}

export enum IStringFilterExpression {
  Ne = 'ne',
  Eq = 'eq',
  Contains = 'contains',
  NotContains = 'notContains',
  StartsWith = 'startsWith',
  IsNull = 'isNull',
  IsNotNull = 'isNotNull',
  In = 'in'
}

export interface IUpdateAccountInput {
  id: Scalars['ID'],
  name?: Maybe<Scalars['String']>,
}

export interface IUpdateFormInput {
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

export interface IUpdateIntegrationInput {
  id: Scalars['ID'],
  active?: Maybe<Scalars['Int']>,
  authType?: Maybe<Scalars['String']>,
  auth?: Maybe<Scalars['AWSJSON']>,
  target?: Maybe<Scalars['String']>,
  method?: Maybe<Scalars['String']>,
}

export interface IUpdateIntegrationTypeInput {
  id: Scalars['ID'],
  name: Scalars['String'],
  active?: Maybe<Scalars['Int']>,
}

export interface IUpdateIntegrationTypeInputData {
  active?: Maybe<Scalars['Int']>,
  authType?: Maybe<Scalars['String']>,
  auth?: Maybe<Scalars['AWSJSON']>,
  target?: Maybe<Scalars['String']>,
  method?: Maybe<Scalars['String']>,
}

export interface IUpdatePlanInput {
  planId: Scalars['ID'],
  accountId: Scalars['ID'],
  active: Scalars['Int'],
  endDate?: Maybe<Scalars['AWSDateTime']>,
}

export interface IUpdatePlanTypeInput {
  id: Scalars['ID'],
  name?: Maybe<Scalars['String']>,
  cost?: Maybe<Scalars['Float']>,
  billingTerm?: Maybe<Scalars['String']>,
  active?: Maybe<Scalars['Int']>,
}

export interface IUpdateUserInput {
  id: Scalars['ID'],
  data: IUpdateUserInputData,
}

export interface IUpdateUserInputData {
  group: Scalars['String'],
  given_name: Scalars['String'],
  family_name: Scalars['String'],
  phone_number?: Maybe<Scalars['AWSPhone']>,
}

export interface IUser {
  id: Scalars['ID'],
  ownerId?: Maybe<Scalars['ID']>,
  ownedBy?: Maybe<IUser>,
  accountId?: Maybe<Scalars['ID']>,
  account?: Maybe<IAccount>,
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

export interface IUserFilterInput {
  accountId?: Maybe<IStringFilter>,
  ownerId?: Maybe<IStringFilter>,
  email?: Maybe<IStringFilter>,
  userGroup?: Maybe<IStringFilter>,
  given_name?: Maybe<IStringFilter>,
  family_name?: Maybe<IStringFilter>,
  createdAt?: Maybe<IDateFilter>,
  updatedAt?: Maybe<IDateFilter>,
  isDeleted?: Maybe<IIntFilter>,
  criteria?: Maybe<Array<IUserFilterInput>>,
}

export enum IUserGroup {
  Admin = 'Admin',
  AccountAdmin = 'AccountAdmin',
  AccountEditor = 'AccountEditor',
  AccountViewer = 'AccountViewer'
}

export interface IUserSortInput {
  accountId?: Maybe<ISortOrder>,
  email?: Maybe<ISortOrder>,
  given_name?: Maybe<ISortOrder>,
  family_name?: Maybe<ISortOrder>,
  userGroup?: Maybe<ISortOrder>,
  createdAt?: Maybe<ISortOrder>,
  updatedAt?: Maybe<ISortOrder>,
  sortBy?: Maybe<Array<IUserSortInput>>,
}
export type IAddPlanTypeMutationVariables = {
  input?: Maybe<IAddPlanTypeInput>
};


export type IAddPlanTypeMutation = { addPlanType: (
    Pick<IPlanType, 'id' | 'ownerId' | 'name' | 'cost' | 'active' | 'billingTerm' | 'createdAt' | 'updatedAt' | 'isDeleted'>
    & { ownedBy: Pick<IUser, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'> }
  ) };

export type IAddPlanMutationVariables = {
  input?: Maybe<IAddPlanInput>
};


export type IAddPlanMutation = { addPlan: (
    Pick<IPlan, 'id' | 'accountId' | 'ownerId' | 'planTypeId' | 'startDate' | 'endDate' | 'active' | 'lastBillDate' | 'createdAt' | 'updatedAt' | 'isDeleted'>
    & { account: Pick<IAccount, 'id' | 'name' | 'website' | 'taxId' | 'ownerId' | 'planId' | 'createdAt' | 'updatedAt' | 'active' | 'numForms' | 'numUsers'>, ownedBy: Pick<IUser, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>, planType: Maybe<Pick<IPlanType, 'id' | 'ownerId' | 'name' | 'cost' | 'active' | 'billingTerm' | 'createdAt' | 'updatedAt' | 'isDeleted'>> }
  ) };

export type IAddIntegrationTypeMutationVariables = {
  input?: Maybe<IAddIntegrationTypeInput>
};


export type IAddIntegrationTypeMutation = { addIntegrationType: (
    Pick<IIntegrationType, 'id' | 'ownerId' | 'planTypeId' | 'name' | 'active' | 'createdAt' | 'updatedAt'>
    & { ownedBy: Pick<IUser, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>, planType: Maybe<Pick<IPlanType, 'id' | 'ownerId' | 'name' | 'cost' | 'active' | 'billingTerm' | 'createdAt' | 'updatedAt' | 'isDeleted'>> }
  ) };

export type IAddIntegrationMutationVariables = {
  input?: Maybe<IAddIntegrationInput>
};


export type IAddIntegrationMutation = { addIntegration: (
    Pick<IIntegration, 'id' | 'integrationTypeId' | 'ownerId' | 'accountId' | 'formId' | 'active' | 'authType' | 'auth' | 'target' | 'method' | 'lastExecuted' | 'lastExecutionResult' | 'lastExecutionResultMessage' | 'createdAt' | 'updatedAt' | 'isDeleted'>
    & { integrationType: Maybe<Pick<IIntegrationType, 'id' | 'ownerId' | 'planTypeId' | 'name' | 'active' | 'createdAt' | 'updatedAt'>>, form: Pick<IForm, 'id' | 'ownerId' | 'name' | 'description' | 'versionId' | 'versionActivatedDate' | 'accountId' | 'createdAt' | 'updatedAt' | 'startDate' | 'endDate' | 'isPaused' | 'isDeleted' | 'redirectNotStarted' | 'redirectHasEnded'> }
  ) };

export type IAddFormMutationVariables = {
  input: IAddFormInput
};


export type IAddFormMutation = { addForm: (
    Pick<IForm, 'id' | 'ownerId' | 'name' | 'description' | 'versionId' | 'versionActivatedDate' | 'accountId' | 'createdAt' | 'updatedAt' | 'startDate' | 'endDate' | 'isPaused' | 'isDeleted' | 'redirectNotStarted' | 'redirectHasEnded'>
    & { version: Maybe<Pick<IFormVersion, 'id' | 'accountId' | 'formId' | 'ownerId' | 'createdAt' | 'displayName' | 'notes' | 'formData'>>, ownedBy: Pick<IUser, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>, account: Pick<IAccount, 'id' | 'name' | 'website' | 'taxId' | 'ownerId' | 'planId' | 'createdAt' | 'updatedAt' | 'active' | 'numForms' | 'numUsers'>, versions: Maybe<Array<Maybe<Pick<IFormVersion, 'id' | 'accountId' | 'formId' | 'ownerId' | 'createdAt' | 'displayName' | 'notes' | 'formData'>>>>, integrations: Maybe<Array<Maybe<Pick<IIntegration, 'id' | 'integrationTypeId' | 'ownerId' | 'accountId' | 'formId' | 'active' | 'authType' | 'auth' | 'target' | 'method' | 'lastExecuted' | 'lastExecutionResult' | 'lastExecutionResultMessage' | 'createdAt' | 'updatedAt' | 'isDeleted'>>>>, entries: Maybe<Array<Maybe<Pick<IFormEntry, 'id' | 'formId' | 'data' | 'createdAt'>>>> }
  ) };

export type IAddFormVersionMutationVariables = {
  input: IAddFormVersionInput
};


export type IAddFormVersionMutation = { addFormVersion: (
    Pick<IForm, 'id' | 'ownerId' | 'name' | 'description' | 'versionId' | 'versionActivatedDate' | 'accountId' | 'createdAt' | 'updatedAt' | 'startDate' | 'endDate' | 'isPaused' | 'isDeleted' | 'redirectNotStarted' | 'redirectHasEnded'>
    & { version: Maybe<Pick<IFormVersion, 'id' | 'accountId' | 'formId' | 'ownerId' | 'createdAt' | 'displayName' | 'notes' | 'formData'>>, ownedBy: Pick<IUser, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>, account: Pick<IAccount, 'id' | 'name' | 'website' | 'taxId' | 'ownerId' | 'planId' | 'createdAt' | 'updatedAt' | 'active' | 'numForms' | 'numUsers'>, versions: Maybe<Array<Maybe<Pick<IFormVersion, 'id' | 'accountId' | 'formId' | 'ownerId' | 'createdAt' | 'displayName' | 'notes' | 'formData'>>>>, integrations: Maybe<Array<Maybe<Pick<IIntegration, 'id' | 'integrationTypeId' | 'ownerId' | 'accountId' | 'formId' | 'active' | 'authType' | 'auth' | 'target' | 'method' | 'lastExecuted' | 'lastExecutionResult' | 'lastExecutionResultMessage' | 'createdAt' | 'updatedAt' | 'isDeleted'>>>>, entries: Maybe<Array<Maybe<Pick<IFormEntry, 'id' | 'formId' | 'data' | 'createdAt'>>>> }
  ) };

export type IAttachFormVersionMutationVariables = {
  input: IAttachFormVersionInput
};


export type IAttachFormVersionMutation = { attachFormVersion: (
    Pick<IForm, 'id' | 'ownerId' | 'name' | 'description' | 'versionId' | 'versionActivatedDate' | 'accountId' | 'createdAt' | 'updatedAt' | 'startDate' | 'endDate' | 'isPaused' | 'isDeleted' | 'redirectNotStarted' | 'redirectHasEnded'>
    & { version: Maybe<Pick<IFormVersion, 'id' | 'accountId' | 'formId' | 'ownerId' | 'createdAt' | 'displayName' | 'notes' | 'formData'>>, ownedBy: Pick<IUser, 'id' | 'email' | 'given_name' | 'family_name'>, account: Pick<IAccount, 'id' | 'name'>, versions: Maybe<Array<Maybe<(
      Pick<IFormVersion, 'id' | 'createdAt' | 'displayName' | 'notes'>
      & { ownedBy: Pick<IUser, 'email' | 'given_name' | 'family_name'> }
    )>>> }
  ) };

export type IUpdatePlanTypeMutationVariables = {
  input?: Maybe<IUpdatePlanTypeInput>
};


export type IUpdatePlanTypeMutation = { updatePlanType: (
    Pick<IPlanType, 'id' | 'ownerId' | 'name' | 'cost' | 'active' | 'billingTerm' | 'createdAt' | 'updatedAt' | 'isDeleted'>
    & { ownedBy: Pick<IUser, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'> }
  ) };

export type IUpdatePlanMutationVariables = {
  input?: Maybe<IUpdatePlanInput>
};


export type IUpdatePlanMutation = { updatePlan: (
    Pick<IPlan, 'id' | 'accountId' | 'ownerId' | 'planTypeId' | 'startDate' | 'endDate' | 'active' | 'lastBillDate' | 'createdAt' | 'updatedAt' | 'isDeleted'>
    & { account: Pick<IAccount, 'id' | 'name' | 'website' | 'taxId' | 'ownerId' | 'planId' | 'createdAt' | 'updatedAt' | 'active' | 'numForms' | 'numUsers'>, ownedBy: Pick<IUser, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>, planType: Maybe<Pick<IPlanType, 'id' | 'ownerId' | 'name' | 'cost' | 'active' | 'billingTerm' | 'createdAt' | 'updatedAt' | 'isDeleted'>> }
  ) };

export type IUpdateAccountMutationVariables = {
  input?: Maybe<IUpdateAccountInput>
};


export type IUpdateAccountMutation = { updateAccount: (
    Pick<IAccount, 'id' | 'name' | 'website' | 'taxId' | 'ownerId' | 'planId' | 'createdAt' | 'updatedAt' | 'active' | 'numForms' | 'numUsers'>
    & { addresses: Maybe<Array<Maybe<Pick<IAddress, 'id' | 'name' | 'addressee' | 'addressType' | 'phone_number' | 'email' | 'street' | 'city' | 'state' | 'country'>>>>, ownedBy: Pick<IUser, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>, plan: Maybe<Pick<IPlan, 'id' | 'accountId' | 'ownerId' | 'planTypeId' | 'startDate' | 'endDate' | 'active' | 'lastBillDate' | 'createdAt' | 'updatedAt' | 'isDeleted'>>, users: Maybe<Array<Maybe<Pick<IUser, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>>>>, forms: Maybe<Array<Maybe<Pick<IForm, 'id' | 'ownerId' | 'name' | 'description' | 'versionId' | 'versionActivatedDate' | 'accountId' | 'createdAt' | 'updatedAt' | 'startDate' | 'endDate' | 'isPaused' | 'isDeleted' | 'redirectNotStarted' | 'redirectHasEnded'>>>> }
  ) };

export type IUpdateAccountPlanMutationVariables = {
  input?: Maybe<IAddPlanInput>
};


export type IUpdateAccountPlanMutation = { updateAccountPlan: (
    Pick<IAccount, 'id' | 'name' | 'website' | 'taxId' | 'ownerId' | 'planId' | 'createdAt' | 'updatedAt' | 'active' | 'numForms' | 'numUsers'>
    & { addresses: Maybe<Array<Maybe<Pick<IAddress, 'id' | 'name' | 'addressee' | 'addressType' | 'phone_number' | 'email' | 'street' | 'city' | 'state' | 'country'>>>>, ownedBy: Pick<IUser, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>, plan: Maybe<Pick<IPlan, 'id' | 'accountId' | 'ownerId' | 'planTypeId' | 'startDate' | 'endDate' | 'active' | 'lastBillDate' | 'createdAt' | 'updatedAt' | 'isDeleted'>>, users: Maybe<Array<Maybe<Pick<IUser, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>>>>, forms: Maybe<Array<Maybe<Pick<IForm, 'id' | 'ownerId' | 'name' | 'description' | 'versionId' | 'versionActivatedDate' | 'accountId' | 'createdAt' | 'updatedAt' | 'startDate' | 'endDate' | 'isPaused' | 'isDeleted' | 'redirectNotStarted' | 'redirectHasEnded'>>>> }
  ) };

export type IUpdateUserMutationVariables = {
  input?: Maybe<IUpdateUserInput>
};


export type IUpdateUserMutation = { updateUser: (
    Pick<IUser, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>
    & { ownedBy: Maybe<Pick<IUser, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>>, account: Maybe<Pick<IAccount, 'id' | 'name' | 'website' | 'taxId' | 'ownerId' | 'planId' | 'createdAt' | 'updatedAt' | 'active' | 'numForms' | 'numUsers'>> }
  ) };

export type IUpdateIntegrationTypeMutationVariables = {
  input?: Maybe<IUpdateIntegrationTypeInput>
};


export type IUpdateIntegrationTypeMutation = { updateIntegrationType: (
    Pick<IIntegrationType, 'id' | 'ownerId' | 'planTypeId' | 'name' | 'active' | 'createdAt' | 'updatedAt'>
    & { ownedBy: Pick<IUser, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>, planType: Maybe<Pick<IPlanType, 'id' | 'ownerId' | 'name' | 'cost' | 'active' | 'billingTerm' | 'createdAt' | 'updatedAt' | 'isDeleted'>> }
  ) };

export type IUpdateIntegrationMutationVariables = {
  input?: Maybe<IUpdateIntegrationInput>
};


export type IUpdateIntegrationMutation = { updateIntegration: (
    Pick<IIntegration, 'id' | 'integrationTypeId' | 'ownerId' | 'accountId' | 'formId' | 'active' | 'authType' | 'auth' | 'target' | 'method' | 'lastExecuted' | 'lastExecutionResult' | 'lastExecutionResultMessage' | 'createdAt' | 'updatedAt' | 'isDeleted'>
    & { integrationType: Maybe<Pick<IIntegrationType, 'id' | 'ownerId' | 'planTypeId' | 'name' | 'active' | 'createdAt' | 'updatedAt'>>, form: Pick<IForm, 'id' | 'ownerId' | 'name' | 'description' | 'versionId' | 'versionActivatedDate' | 'accountId' | 'createdAt' | 'updatedAt' | 'startDate' | 'endDate' | 'isPaused' | 'isDeleted' | 'redirectNotStarted' | 'redirectHasEnded'> }
  ) };

export type IUpdateFormMutationVariables = {
  input?: Maybe<IUpdateFormInput>
};


export type IUpdateFormMutation = { updateForm: (
    Pick<IForm, 'id' | 'ownerId' | 'name' | 'description' | 'versionId' | 'versionActivatedDate' | 'accountId' | 'createdAt' | 'updatedAt' | 'startDate' | 'endDate' | 'isPaused' | 'isDeleted' | 'redirectNotStarted' | 'redirectHasEnded'>
    & { version: Maybe<Pick<IFormVersion, 'id' | 'accountId' | 'formId' | 'ownerId' | 'createdAt' | 'displayName' | 'notes' | 'formData'>>, ownedBy: Pick<IUser, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted'>, account: Pick<IAccount, 'id' | 'name' | 'website' | 'taxId' | 'ownerId' | 'planId' | 'createdAt' | 'updatedAt' | 'active'>, versions: Maybe<Array<Maybe<(
      Pick<IFormVersion, 'id' | 'accountId' | 'formId' | 'ownerId' | 'createdAt' | 'displayName' | 'notes'>
      & { ownedBy: Pick<IUser, 'email' | 'given_name' | 'family_name'> }
    )>>> }
  ) };

export type IDeleteFormMutationVariables = {
  input: IDeleteFormInput
};


export type IDeleteFormMutation = { deleteForm: (
    Pick<IForm, 'id' | 'ownerId' | 'name' | 'description' | 'versionId' | 'versionActivatedDate' | 'accountId' | 'createdAt' | 'updatedAt' | 'startDate' | 'endDate' | 'isPaused' | 'isDeleted' | 'redirectNotStarted' | 'redirectHasEnded'>
    & { version: Maybe<Pick<IFormVersion, 'id' | 'accountId' | 'formId' | 'ownerId' | 'createdAt' | 'displayName' | 'notes' | 'formData'>>, ownedBy: Pick<IUser, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>, account: Pick<IAccount, 'id' | 'name' | 'website' | 'taxId' | 'ownerId' | 'planId' | 'createdAt' | 'updatedAt' | 'active' | 'numForms' | 'numUsers'>, versions: Maybe<Array<Maybe<Pick<IFormVersion, 'id' | 'accountId' | 'formId' | 'ownerId' | 'createdAt' | 'displayName' | 'notes' | 'formData'>>>>, integrations: Maybe<Array<Maybe<Pick<IIntegration, 'id' | 'integrationTypeId' | 'ownerId' | 'accountId' | 'formId' | 'active' | 'authType' | 'auth' | 'target' | 'method' | 'lastExecuted' | 'lastExecutionResult' | 'lastExecutionResultMessage' | 'createdAt' | 'updatedAt' | 'isDeleted'>>>>, entries: Maybe<Array<Maybe<Pick<IFormEntry, 'id' | 'formId' | 'data' | 'createdAt'>>>> }
  ) };

export type IDeletePlanTypeMutationVariables = {
  planTypeId: Scalars['ID']
};


export type IDeletePlanTypeMutation = { deletePlanType: (
    Pick<IPlanType, 'id' | 'ownerId' | 'name' | 'cost' | 'active' | 'billingTerm' | 'createdAt' | 'updatedAt' | 'isDeleted'>
    & { ownedBy: Pick<IUser, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'> }
  ) };

export type IDeletePlanMutationVariables = {
  accountId: Scalars['ID'],
  planId: Scalars['ID']
};


export type IDeletePlanMutation = { deletePlan: (
    Pick<IPlan, 'id' | 'accountId' | 'ownerId' | 'planTypeId' | 'startDate' | 'endDate' | 'active' | 'lastBillDate' | 'createdAt' | 'updatedAt' | 'isDeleted'>
    & { account: Pick<IAccount, 'id' | 'name' | 'website' | 'taxId' | 'ownerId' | 'planId' | 'createdAt' | 'updatedAt' | 'active' | 'numForms' | 'numUsers'>, ownedBy: Pick<IUser, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>, planType: Maybe<Pick<IPlanType, 'id' | 'ownerId' | 'name' | 'cost' | 'active' | 'billingTerm' | 'createdAt' | 'updatedAt' | 'isDeleted'>> }
  ) };

export type IDeleteAccountMutationVariables = {
  accountId: Scalars['ID']
};


export type IDeleteAccountMutation = { deleteAccount: (
    Pick<IAccount, 'id' | 'name' | 'website' | 'taxId' | 'ownerId' | 'planId' | 'createdAt' | 'updatedAt' | 'active' | 'numForms' | 'numUsers'>
    & { addresses: Maybe<Array<Maybe<Pick<IAddress, 'id' | 'name' | 'addressee' | 'addressType' | 'phone_number' | 'email' | 'street' | 'city' | 'state' | 'country'>>>>, ownedBy: Pick<IUser, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>, plan: Maybe<Pick<IPlan, 'id' | 'accountId' | 'ownerId' | 'planTypeId' | 'startDate' | 'endDate' | 'active' | 'lastBillDate' | 'createdAt' | 'updatedAt' | 'isDeleted'>>, users: Maybe<Array<Maybe<Pick<IUser, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>>>>, forms: Maybe<Array<Maybe<Pick<IForm, 'id' | 'ownerId' | 'name' | 'description' | 'versionId' | 'versionActivatedDate' | 'accountId' | 'createdAt' | 'updatedAt' | 'startDate' | 'endDate' | 'isPaused' | 'isDeleted' | 'redirectNotStarted' | 'redirectHasEnded'>>>> }
  ) };

export type IDeleteUserMutationVariables = {
  userId: Scalars['ID']
};


export type IDeleteUserMutation = { deleteUser: (
    Pick<IUser, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>
    & { ownedBy: Maybe<Pick<IUser, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>>, account: Maybe<Pick<IAccount, 'id' | 'name' | 'website' | 'taxId' | 'ownerId' | 'planId' | 'createdAt' | 'updatedAt' | 'active' | 'numForms' | 'numUsers'>> }
  ) };

export type IDeleteIntegrationTypeMutationVariables = {
  integrationTypeId: Scalars['ID']
};


export type IDeleteIntegrationTypeMutation = { deleteIntegrationType: (
    Pick<IIntegrationType, 'id' | 'ownerId' | 'planTypeId' | 'name' | 'active' | 'createdAt' | 'updatedAt'>
    & { ownedBy: Pick<IUser, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>, planType: Maybe<Pick<IPlanType, 'id' | 'ownerId' | 'name' | 'cost' | 'active' | 'billingTerm' | 'createdAt' | 'updatedAt' | 'isDeleted'>> }
  ) };

export type IDeleteIntegrationMutationVariables = {
  integrationId: Scalars['ID']
};


export type IDeleteIntegrationMutation = { deleteIntegration: (
    Pick<IIntegration, 'id' | 'integrationTypeId' | 'ownerId' | 'accountId' | 'formId' | 'active' | 'authType' | 'auth' | 'target' | 'method' | 'lastExecuted' | 'lastExecutionResult' | 'lastExecutionResultMessage' | 'createdAt' | 'updatedAt' | 'isDeleted'>
    & { integrationType: Maybe<Pick<IIntegrationType, 'id' | 'ownerId' | 'planTypeId' | 'name' | 'active' | 'createdAt' | 'updatedAt'>>, form: Pick<IForm, 'id' | 'ownerId' | 'name' | 'description' | 'versionId' | 'versionActivatedDate' | 'accountId' | 'createdAt' | 'updatedAt' | 'startDate' | 'endDate' | 'isPaused' | 'isDeleted' | 'redirectNotStarted' | 'redirectHasEnded'> }
  ) };

export type IDeleteFormVersionMutationVariables = {
  input: IDeleteFormVersionInput
};


export type IDeleteFormVersionMutation = { deleteFormVersion: (
    Pick<IFormVersion, 'id' | 'accountId' | 'formId' | 'ownerId' | 'createdAt' | 'displayName' | 'notes' | 'formData'>
    & { ownedBy: Pick<IUser, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'> }
  ) };

export type IAddFormEntryMutationVariables = {
  input: IAddFormEntryInput
};


export type IAddFormEntryMutation = { addFormEntry: Pick<IFormEntrySansData, 'id' | 'formId' | 'createdAt'> };

export type IGetAccountQueryVariables = {
  accountId: Scalars['ID']
};


export type IGetAccountQuery = { getAccount: Maybe<(
    Pick<IAccount, 'id' | 'name' | 'website' | 'taxId' | 'ownerId' | 'planId' | 'createdAt' | 'updatedAt' | 'active' | 'numForms' | 'numUsers'>
    & { addresses: Maybe<Array<Maybe<Pick<IAddress, 'id' | 'name' | 'addressee' | 'addressType' | 'phone_number' | 'email' | 'street' | 'city' | 'state' | 'country'>>>>, ownedBy: Pick<IUser, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>, plan: Maybe<Pick<IPlan, 'id' | 'accountId' | 'ownerId' | 'planTypeId' | 'startDate' | 'endDate' | 'active' | 'lastBillDate' | 'createdAt' | 'updatedAt' | 'isDeleted'>>, users: Maybe<Array<Maybe<Pick<IUser, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>>>>, forms: Maybe<Array<Maybe<Pick<IForm, 'id' | 'ownerId' | 'name' | 'description' | 'versionId' | 'versionActivatedDate' | 'accountId' | 'createdAt' | 'updatedAt' | 'startDate' | 'endDate' | 'isPaused' | 'isDeleted' | 'redirectNotStarted' | 'redirectHasEnded' | 'numEntries'>>>> }
  )> };

export type IGetUserQueryVariables = {
  userId: Scalars['ID']
};


export type IGetUserQuery = { getUser: Maybe<(
    Pick<IUser, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>
    & { ownedBy: Maybe<Pick<IUser, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>>, account: Maybe<Pick<IAccount, 'id' | 'name' | 'website' | 'taxId' | 'ownerId' | 'planId' | 'createdAt' | 'updatedAt' | 'active' | 'numForms' | 'numUsers'>> }
  )> };

export type IGetPlanQueryVariables = {
  planId: Scalars['String']
};


export type IGetPlanQuery = { getPlan: Maybe<(
    Pick<IPlan, 'id' | 'accountId' | 'ownerId' | 'planTypeId' | 'startDate' | 'endDate' | 'active' | 'lastBillDate' | 'createdAt' | 'updatedAt' | 'isDeleted'>
    & { account: Pick<IAccount, 'id' | 'name' | 'website' | 'taxId' | 'ownerId' | 'planId' | 'createdAt' | 'updatedAt' | 'active' | 'numForms' | 'numUsers'>, ownedBy: Pick<IUser, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>, planType: Maybe<Pick<IPlanType, 'id' | 'ownerId' | 'name' | 'cost' | 'active' | 'billingTerm' | 'createdAt' | 'updatedAt' | 'isDeleted'>> }
  )> };

export type IGetActiveAccountPlanQueryVariables = {
  accountId: Scalars['String']
};


export type IGetActiveAccountPlanQuery = { getActiveAccountPlan: Maybe<(
    Pick<IPlan, 'id' | 'accountId' | 'ownerId' | 'planTypeId' | 'startDate' | 'endDate' | 'active' | 'lastBillDate' | 'createdAt' | 'updatedAt' | 'isDeleted'>
    & { account: Pick<IAccount, 'id' | 'name' | 'website' | 'taxId' | 'ownerId' | 'planId' | 'createdAt' | 'updatedAt' | 'active' | 'numForms' | 'numUsers'>, ownedBy: Pick<IUser, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>, planType: Maybe<Pick<IPlanType, 'id' | 'ownerId' | 'name' | 'cost' | 'active' | 'billingTerm' | 'createdAt' | 'updatedAt' | 'isDeleted'>> }
  )> };

export type IGetPlanTypeQueryVariables = {
  planTypeId: Scalars['String']
};


export type IGetPlanTypeQuery = { getPlanType: Maybe<(
    Pick<IPlanType, 'id' | 'ownerId' | 'name' | 'cost' | 'active' | 'billingTerm' | 'createdAt' | 'updatedAt' | 'isDeleted'>
    & { ownedBy: Pick<IUser, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'> }
  )> };

export type IGetFormQueryVariables = {
  formId: Scalars['String']
};


export type IGetFormQuery = { getForm: Maybe<(
    Pick<IForm, 'id' | 'ownerId' | 'name' | 'description' | 'versionId' | 'versionActivatedDate' | 'accountId' | 'createdAt' | 'updatedAt' | 'startDate' | 'endDate' | 'isPaused' | 'isDeleted' | 'redirectNotStarted' | 'redirectHasEnded'>
    & { version: Maybe<Pick<IFormVersion, 'id' | 'accountId' | 'formId' | 'ownerId' | 'createdAt' | 'displayName' | 'notes' | 'formData'>>, ownedBy: Pick<IUser, 'id' | 'email' | 'userGroup' | 'given_name' | 'family_name'>, account: Pick<IAccount, 'id' | 'name' | 'createdAt' | 'updatedAt' | 'active'>, versions: Maybe<Array<Maybe<(
      Pick<IFormVersion, 'id' | 'createdAt' | 'displayName' | 'notes'>
      & { ownedBy: Pick<IUser, 'given_name' | 'family_name' | 'email'> }
    )>>> }
  )> };

export type IGetFormVersionQueryVariables = {
  versionId: Scalars['String']
};


export type IGetFormVersionQuery = { getFormVersion: Maybe<(
    Pick<IFormVersion, 'id' | 'accountId' | 'formId' | 'ownerId' | 'createdAt' | 'displayName' | 'notes' | 'formData'>
    & { ownedBy: Pick<IUser, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'> }
  )> };

export type IGetIntegrationTypeQueryVariables = {
  integrationTypeId: Scalars['String']
};


export type IGetIntegrationTypeQuery = { getIntegrationType: Maybe<(
    Pick<IIntegrationType, 'id' | 'ownerId' | 'planTypeId' | 'name' | 'active' | 'createdAt' | 'updatedAt'>
    & { ownedBy: Pick<IUser, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>, planType: Maybe<Pick<IPlanType, 'id' | 'ownerId' | 'name' | 'cost' | 'active' | 'billingTerm' | 'createdAt' | 'updatedAt' | 'isDeleted'>> }
  )> };

export type IGetIntegrationQueryVariables = {
  integrationId: Scalars['String']
};


export type IGetIntegrationQuery = { getIntegration: Maybe<(
    Pick<IIntegration, 'id' | 'integrationTypeId' | 'ownerId' | 'accountId' | 'formId' | 'active' | 'authType' | 'auth' | 'target' | 'method' | 'lastExecuted' | 'lastExecutionResult' | 'lastExecutionResultMessage' | 'createdAt' | 'updatedAt' | 'isDeleted'>
    & { integrationType: Maybe<Pick<IIntegrationType, 'id' | 'ownerId' | 'planTypeId' | 'name' | 'active' | 'createdAt' | 'updatedAt'>>, form: Pick<IForm, 'id' | 'ownerId' | 'name' | 'description' | 'versionId' | 'versionActivatedDate' | 'accountId' | 'createdAt' | 'updatedAt' | 'startDate' | 'endDate' | 'isPaused' | 'isDeleted' | 'redirectNotStarted' | 'redirectHasEnded'> }
  )> };

export type IGetFormEntryQueryVariables = {
  formEntryId: Scalars['String']
};


export type IGetFormEntryQuery = { getFormEntry: Maybe<(
    Pick<IFormEntry, 'id' | 'accountId' | 'formId' | 'data' | 'createdAt'>
    & { form: Pick<IForm, 'id' | 'ownerId' | 'name' | 'description' | 'versionId' | 'versionActivatedDate' | 'accountId' | 'createdAt' | 'updatedAt' | 'startDate' | 'endDate' | 'isPaused' | 'isDeleted' | 'redirectNotStarted' | 'redirectHasEnded'> }
  )> };

export type IListAccountsQueryVariables = {
  offsetLimit?: Maybe<IOffsetLimit>,
  filter?: Maybe<IAccountFilterInput>,
  sort?: Maybe<IAccountSortInput>
};


export type IListAccountsQuery = { listAccounts: Maybe<Array<Maybe<(
    Pick<IAccount, 'id' | 'name' | 'website' | 'taxId' | 'ownerId' | 'planId' | 'createdAt' | 'updatedAt' | 'active' | 'numForms' | 'numUsers'>
    & { addresses: Maybe<Array<Maybe<Pick<IAddress, 'id' | 'name' | 'addressee' | 'addressType' | 'phone_number' | 'email' | 'street' | 'city' | 'state' | 'country'>>>>, ownedBy: Pick<IUser, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>, plan: Maybe<Pick<IPlan, 'id' | 'accountId' | 'ownerId' | 'planTypeId' | 'startDate' | 'endDate' | 'active' | 'lastBillDate' | 'createdAt' | 'updatedAt' | 'isDeleted'>>, users: Maybe<Array<Maybe<Pick<IUser, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>>>>, forms: Maybe<Array<Maybe<Pick<IForm, 'id' | 'ownerId' | 'name' | 'description' | 'versionId' | 'versionActivatedDate' | 'accountId' | 'createdAt' | 'updatedAt' | 'startDate' | 'endDate' | 'isPaused' | 'isDeleted' | 'redirectNotStarted' | 'redirectHasEnded'>>>> }
  )>>> };

export type IListUsersQueryVariables = {
  offsetLimit?: Maybe<IOffsetLimit>,
  filter?: Maybe<IUserFilterInput>,
  sort?: Maybe<IUserSortInput>
};


export type IListUsersQuery = { listUsers: Maybe<Array<Maybe<(
    Pick<IUser, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted'>
    & { ownedBy: Maybe<Pick<IUser, 'id' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>>, account: Maybe<Pick<IAccount, 'id' | 'name' | 'website' | 'taxId' | 'ownerId' | 'planId' | 'createdAt' | 'updatedAt' | 'active'>> }
  )>>> };

export type IListPlansQueryVariables = {
  offsetLimit?: Maybe<IOffsetLimit>,
  filter?: Maybe<IPlanFilterInput>,
  sort?: Maybe<IPlanSortInput>
};


export type IListPlansQuery = { listPlans: Maybe<Array<Maybe<(
    Pick<IPlan, 'id' | 'accountId' | 'ownerId' | 'planTypeId' | 'startDate' | 'endDate' | 'active' | 'lastBillDate' | 'createdAt' | 'updatedAt' | 'isDeleted'>
    & { account: Pick<IAccount, 'id' | 'name' | 'website' | 'taxId' | 'ownerId' | 'planId' | 'createdAt' | 'updatedAt' | 'active' | 'numForms' | 'numUsers'>, ownedBy: Pick<IUser, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>, planType: Maybe<Pick<IPlanType, 'id' | 'ownerId' | 'name' | 'cost' | 'active' | 'billingTerm' | 'createdAt' | 'updatedAt' | 'isDeleted'>> }
  )>>> };

export type IListPlanTypesQueryVariables = {
  offsetLimit?: Maybe<IOffsetLimit>,
  filter?: Maybe<IPlanTypeFilterInput>,
  sort?: Maybe<IPlanTypeSortInput>
};


export type IListPlanTypesQuery = { listPlanTypes: Maybe<Array<Maybe<(
    Pick<IPlanType, 'id' | 'ownerId' | 'name' | 'cost' | 'active' | 'billingTerm' | 'createdAt' | 'updatedAt' | 'isDeleted'>
    & { ownedBy: Pick<IUser, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'> }
  )>>> };

export type IListFormsQueryVariables = {
  offsetLimit?: Maybe<IOffsetLimit>,
  filter?: Maybe<IFormFilterInput>,
  sort?: Maybe<IFormSortInput>
};


export type IListFormsQuery = { listForms: Maybe<Array<Maybe<(
    Pick<IForm, 'id' | 'ownerId' | 'name' | 'description' | 'versionId' | 'versionActivatedDate' | 'accountId' | 'createdAt' | 'updatedAt' | 'startDate' | 'endDate' | 'isPaused' | 'isDeleted' | 'redirectNotStarted' | 'redirectHasEnded'>
    & { version: Maybe<Pick<IFormVersion, 'id' | 'createdAt' | 'displayName' | 'notes'>>, ownedBy: Pick<IUser, 'id' | 'email' | 'given_name' | 'family_name'>, account: Pick<IAccount, 'id' | 'name'> }
  )>>> };

export type IListFormVersionsQueryVariables = {
  offsetLimit?: Maybe<IOffsetLimit>,
  filter?: Maybe<IFormVersionFilterInput>,
  sort?: Maybe<IFormVersionSortInput>
};


export type IListFormVersionsQuery = { listFormVersions: Maybe<Array<Maybe<(
    Pick<IFormVersion, 'id' | 'accountId' | 'formId' | 'ownerId' | 'createdAt' | 'displayName' | 'notes' | 'formData'>
    & { ownedBy: Pick<IUser, 'id' | 'email' | 'userGroup' | 'given_name' | 'family_name'> }
  )>>> };

export type IListIntegrationTypesQueryVariables = {
  offsetLimit?: Maybe<IOffsetLimit>,
  filter?: Maybe<IIntegrationTypeFilterInput>,
  sort?: Maybe<IIntegrationTypeSortInput>
};


export type IListIntegrationTypesQuery = { listIntegrationTypes: Maybe<Array<Maybe<(
    Pick<IIntegrationType, 'id' | 'ownerId' | 'planTypeId' | 'name' | 'active' | 'createdAt' | 'updatedAt'>
    & { ownedBy: Pick<IUser, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>, planType: Maybe<Pick<IPlanType, 'id' | 'ownerId' | 'name' | 'cost' | 'active' | 'billingTerm' | 'createdAt' | 'updatedAt' | 'isDeleted'>> }
  )>>> };

export type IListIntegrationsQueryVariables = {
  offsetLimit?: Maybe<IOffsetLimit>,
  filter?: Maybe<IIntegrationFilterInput>,
  sort?: Maybe<IIntegrationSortInput>
};


export type IListIntegrationsQuery = { listIntegrations: Maybe<Array<Maybe<(
    Pick<IIntegration, 'id' | 'integrationTypeId' | 'ownerId' | 'accountId' | 'formId' | 'active' | 'authType' | 'auth' | 'target' | 'method' | 'lastExecuted' | 'lastExecutionResult' | 'lastExecutionResultMessage' | 'createdAt' | 'updatedAt' | 'isDeleted'>
    & { integrationType: Maybe<Pick<IIntegrationType, 'id' | 'ownerId' | 'planTypeId' | 'name' | 'active' | 'createdAt' | 'updatedAt'>>, form: Pick<IForm, 'id' | 'ownerId' | 'name' | 'description' | 'versionId' | 'versionActivatedDate' | 'accountId' | 'createdAt' | 'updatedAt' | 'startDate' | 'endDate' | 'isPaused' | 'isDeleted' | 'redirectNotStarted' | 'redirectHasEnded'> }
  )>>> };

export type IListFormEntriesQueryVariables = {
  offsetLimit?: Maybe<IOffsetLimit>,
  filter?: Maybe<IFormEntryFilterInput>,
  sort?: Maybe<IFormEntrySortInput>
};


export type IListFormEntriesQuery = { listFormEntries: Maybe<Array<Maybe<(
    Pick<IFormEntry, 'id' | 'accountId' | 'formId' | 'data' | 'createdAt'>
    & { form: Pick<IForm, 'id' | 'ownerId' | 'name' | 'description' | 'versionId' | 'versionActivatedDate' | 'accountId' | 'createdAt' | 'updatedAt' | 'startDate' | 'endDate' | 'isPaused' | 'isDeleted' | 'redirectNotStarted' | 'redirectHasEnded'> }
  )>>> };


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
export type IResolversTypes = {
  Query: ResolverTypeWrapper<{}>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  Account: ResolverTypeWrapper<IAccount>,
  String: ResolverTypeWrapper<Scalars['String']>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  Address: ResolverTypeWrapper<IAddress>,
  AddressType: IAddressType,
  AWSPhone: ResolverTypeWrapper<Scalars['AWSPhone']>,
  User: ResolverTypeWrapper<IUser>,
  AWSDateTime: ResolverTypeWrapper<Scalars['AWSDateTime']>,
  Plan: ResolverTypeWrapper<IPlan>,
  PlanType: ResolverTypeWrapper<IPlanType>,
  Float: ResolverTypeWrapper<Scalars['Float']>,
  Form: ResolverTypeWrapper<IForm>,
  FormVersion: ResolverTypeWrapper<IFormVersion>,
  AWSJSON: ResolverTypeWrapper<Scalars['AWSJSON']>,
  AWSURL: ResolverTypeWrapper<Scalars['AWSURL']>,
  Integration: ResolverTypeWrapper<IIntegration>,
  IntegrationType: ResolverTypeWrapper<IIntegrationType>,
  FormEntry: ResolverTypeWrapper<IFormEntry>,
  OffsetLimit: IOffsetLimit,
  AccountFilterInput: IAccountFilterInput,
  StringFilter: IStringFilter,
  FilterWith: IFilterWith,
  StringFilterExpression: IStringFilterExpression,
  DateFilter: IDateFilter,
  NumericFilterExpression: INumericFilterExpression,
  IntFilter: IIntFilter,
  AccountSortInput: IAccountSortInput,
  SortOrder: ISortOrder,
  UserFilterInput: IUserFilterInput,
  UserSortInput: IUserSortInput,
  PlanFilterInput: IPlanFilterInput,
  PlanSortInput: IPlanSortInput,
  PlanTypeFilterInput: IPlanTypeFilterInput,
  FloatFilter: IFloatFilter,
  PlanTypeSortInput: IPlanTypeSortInput,
  FormFilterInput: IFormFilterInput,
  FormSortInput: IFormSortInput,
  FormVersionFilterInput: IFormVersionFilterInput,
  FormVersionSortInput: IFormVersionSortInput,
  IntegrationTypeFilterInput: IIntegrationTypeFilterInput,
  IntegrationTypeSortInput: IIntegrationTypeSortInput,
  IntegrationFilterInput: IIntegrationFilterInput,
  IntegrationSortInput: IIntegrationSortInput,
  FormEntryFilterInput: IFormEntryFilterInput,
  FormEntrySortInput: IFormEntrySortInput,
  Mutation: ResolverTypeWrapper<{}>,
  AddPlanTypeInput: IAddPlanTypeInput,
  AddPlanInput: IAddPlanInput,
  AddIntegrationTypeInput: IAddIntegrationTypeInput,
  AddIntegrationInput: IAddIntegrationInput,
  AddFormInput: IAddFormInput,
  AddFormVersionInput: IAddFormVersionInput,
  AttachFormVersionInput: IAttachFormVersionInput,
  UpdatePlanTypeInput: IUpdatePlanTypeInput,
  UpdatePlanInput: IUpdatePlanInput,
  UpdateAccountInput: IUpdateAccountInput,
  UpdateUserInput: IUpdateUserInput,
  UpdateUserInputData: IUpdateUserInputData,
  UpdateIntegrationTypeInput: IUpdateIntegrationTypeInput,
  UpdateIntegrationInput: IUpdateIntegrationInput,
  UpdateFormInput: IUpdateFormInput,
  DeleteFormInput: IDeleteFormInput,
  DeleteFormVersionInput: IDeleteFormVersionInput,
  AddFormEntryInput: IAddFormEntryInput,
  FormEntrySansData: ResolverTypeWrapper<IFormEntrySansData>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  BooleanFilterExpression: IBooleanFilterExpression,
  UserGroup: IUserGroup,
  BooleanFilter: IBooleanFilter,
  AddAddressInput: ResolverTypeWrapper<IAddAddressInput>,
  UpdateIntegrationTypeInputData: IUpdateIntegrationTypeInputData,
};

/** Mapping between all available schema types and the resolvers parents */
export type IResolversParentTypes = {
  Query: {},
  ID: Scalars['ID'],
  Account: IAccount,
  String: Scalars['String'],
  Int: Scalars['Int'],
  Address: IAddress,
  AddressType: IAddressType,
  AWSPhone: Scalars['AWSPhone'],
  User: IUser,
  AWSDateTime: Scalars['AWSDateTime'],
  Plan: IPlan,
  PlanType: IPlanType,
  Float: Scalars['Float'],
  Form: IForm,
  FormVersion: IFormVersion,
  AWSJSON: Scalars['AWSJSON'],
  AWSURL: Scalars['AWSURL'],
  Integration: IIntegration,
  IntegrationType: IIntegrationType,
  FormEntry: IFormEntry,
  OffsetLimit: IOffsetLimit,
  AccountFilterInput: IAccountFilterInput,
  StringFilter: IStringFilter,
  FilterWith: IFilterWith,
  StringFilterExpression: IStringFilterExpression,
  DateFilter: IDateFilter,
  NumericFilterExpression: INumericFilterExpression,
  IntFilter: IIntFilter,
  AccountSortInput: IAccountSortInput,
  SortOrder: ISortOrder,
  UserFilterInput: IUserFilterInput,
  UserSortInput: IUserSortInput,
  PlanFilterInput: IPlanFilterInput,
  PlanSortInput: IPlanSortInput,
  PlanTypeFilterInput: IPlanTypeFilterInput,
  FloatFilter: IFloatFilter,
  PlanTypeSortInput: IPlanTypeSortInput,
  FormFilterInput: IFormFilterInput,
  FormSortInput: IFormSortInput,
  FormVersionFilterInput: IFormVersionFilterInput,
  FormVersionSortInput: IFormVersionSortInput,
  IntegrationTypeFilterInput: IIntegrationTypeFilterInput,
  IntegrationTypeSortInput: IIntegrationTypeSortInput,
  IntegrationFilterInput: IIntegrationFilterInput,
  IntegrationSortInput: IIntegrationSortInput,
  FormEntryFilterInput: IFormEntryFilterInput,
  FormEntrySortInput: IFormEntrySortInput,
  Mutation: {},
  AddPlanTypeInput: IAddPlanTypeInput,
  AddPlanInput: IAddPlanInput,
  AddIntegrationTypeInput: IAddIntegrationTypeInput,
  AddIntegrationInput: IAddIntegrationInput,
  AddFormInput: IAddFormInput,
  AddFormVersionInput: IAddFormVersionInput,
  AttachFormVersionInput: IAttachFormVersionInput,
  UpdatePlanTypeInput: IUpdatePlanTypeInput,
  UpdatePlanInput: IUpdatePlanInput,
  UpdateAccountInput: IUpdateAccountInput,
  UpdateUserInput: IUpdateUserInput,
  UpdateUserInputData: IUpdateUserInputData,
  UpdateIntegrationTypeInput: IUpdateIntegrationTypeInput,
  UpdateIntegrationInput: IUpdateIntegrationInput,
  UpdateFormInput: IUpdateFormInput,
  DeleteFormInput: IDeleteFormInput,
  DeleteFormVersionInput: IDeleteFormVersionInput,
  AddFormEntryInput: IAddFormEntryInput,
  FormEntrySansData: IFormEntrySansData,
  Boolean: Scalars['Boolean'],
  BooleanFilterExpression: IBooleanFilterExpression,
  UserGroup: IUserGroup,
  BooleanFilter: IBooleanFilter,
  AddAddressInput: IAddAddressInput,
  UpdateIntegrationTypeInputData: IUpdateIntegrationTypeInputData,
};

export type IModelDirectiveResolver<Result, Parent, ContextType = any, Args = {  }> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type IAws_Api_KeyDirectiveResolver<Result, Parent, ContextType = any, Args = {  }> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type IAccountResolvers<ContextType = any, ParentType extends IResolversParentTypes['Account'] = IResolversParentTypes['Account']> = {
  id?: Resolver<IResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<IResolversTypes['String'], ParentType, ContextType>,
  addresses?: Resolver<Maybe<Array<Maybe<IResolversTypes['Address']>>>, ParentType, ContextType, IAccountAddressesArgs>,
  website?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  taxId?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  ownerId?: Resolver<IResolversTypes['ID'], ParentType, ContextType>,
  ownedBy?: Resolver<IResolversTypes['User'], ParentType, ContextType>,
  plan?: Resolver<Maybe<IResolversTypes['Plan']>, ParentType, ContextType>,
  planId?: Resolver<Maybe<IResolversTypes['ID']>, ParentType, ContextType>,
  createdAt?: Resolver<Maybe<IResolversTypes['AWSDateTime']>, ParentType, ContextType>,
  updatedAt?: Resolver<Maybe<IResolversTypes['AWSDateTime']>, ParentType, ContextType>,
  active?: Resolver<Maybe<IResolversTypes['Int']>, ParentType, ContextType>,
  numForms?: Resolver<Maybe<IResolversTypes['Int']>, ParentType, ContextType>,
  numUsers?: Resolver<Maybe<IResolversTypes['Int']>, ParentType, ContextType>,
  users?: Resolver<Maybe<Array<Maybe<IResolversTypes['User']>>>, ParentType, ContextType, IAccountUsersArgs>,
  forms?: Resolver<Maybe<Array<Maybe<IResolversTypes['Form']>>>, ParentType, ContextType, IAccountFormsArgs>,
};

export type IAddAddressInputResolvers<ContextType = any, ParentType extends IResolversParentTypes['AddAddressInput'] = IResolversParentTypes['AddAddressInput']> = {
  name?: Resolver<IResolversTypes['String'], ParentType, ContextType>,
  addressee?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  addressType?: Resolver<IResolversTypes['AddressType'], ParentType, ContextType>,
  phone_number?: Resolver<Maybe<IResolversTypes['AWSPhone']>, ParentType, ContextType>,
  email?: Resolver<IResolversTypes['String'], ParentType, ContextType>,
  street?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  city?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  state?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  country?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
};

export type IAddressResolvers<ContextType = any, ParentType extends IResolversParentTypes['Address'] = IResolversParentTypes['Address']> = {
  id?: Resolver<IResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<IResolversTypes['String'], ParentType, ContextType>,
  addressee?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  addressType?: Resolver<IResolversTypes['AddressType'], ParentType, ContextType>,
  phone_number?: Resolver<Maybe<IResolversTypes['AWSPhone']>, ParentType, ContextType>,
  email?: Resolver<IResolversTypes['String'], ParentType, ContextType>,
  street?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  city?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  state?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  country?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
};

export interface IAwsDateTimeScalarConfig extends GraphQLScalarTypeConfig<IResolversTypes['AWSDateTime'], any> {
  name: 'AWSDateTime'
}

export interface IAwsjsonScalarConfig extends GraphQLScalarTypeConfig<IResolversTypes['AWSJSON'], any> {
  name: 'AWSJSON'
}

export interface IAwsPhoneScalarConfig extends GraphQLScalarTypeConfig<IResolversTypes['AWSPhone'], any> {
  name: 'AWSPhone'
}

export interface IAwsurlScalarConfig extends GraphQLScalarTypeConfig<IResolversTypes['AWSURL'], any> {
  name: 'AWSURL'
}

export type IFormResolvers<ContextType = any, ParentType extends IResolversParentTypes['Form'] = IResolversParentTypes['Form']> = {
  id?: Resolver<IResolversTypes['ID'], ParentType, ContextType>,
  ownerId?: Resolver<IResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<IResolversTypes['String'], ParentType, ContextType>,
  description?: Resolver<IResolversTypes['String'], ParentType, ContextType>,
  versionId?: Resolver<Maybe<IResolversTypes['ID']>, ParentType, ContextType>,
  versionActivatedDate?: Resolver<Maybe<IResolversTypes['AWSDateTime']>, ParentType, ContextType>,
  version?: Resolver<Maybe<IResolversTypes['FormVersion']>, ParentType, ContextType>,
  ownedBy?: Resolver<IResolversTypes['User'], ParentType, ContextType>,
  accountId?: Resolver<IResolversTypes['ID'], ParentType, ContextType>,
  account?: Resolver<IResolversTypes['Account'], ParentType, ContextType>,
  createdAt?: Resolver<IResolversTypes['AWSDateTime'], ParentType, ContextType>,
  updatedAt?: Resolver<Maybe<IResolversTypes['AWSDateTime']>, ParentType, ContextType>,
  startDate?: Resolver<Maybe<IResolversTypes['AWSDateTime']>, ParentType, ContextType>,
  endDate?: Resolver<Maybe<IResolversTypes['AWSDateTime']>, ParentType, ContextType>,
  isPaused?: Resolver<Maybe<IResolversTypes['Int']>, ParentType, ContextType>,
  isDeleted?: Resolver<Maybe<IResolversTypes['Int']>, ParentType, ContextType>,
  redirectNotStarted?: Resolver<Maybe<IResolversTypes['AWSURL']>, ParentType, ContextType>,
  redirectHasEnded?: Resolver<Maybe<IResolversTypes['AWSURL']>, ParentType, ContextType>,
  versions?: Resolver<Maybe<Array<Maybe<IResolversTypes['FormVersion']>>>, ParentType, ContextType, IFormVersionsArgs>,
  integrations?: Resolver<Maybe<Array<Maybe<IResolversTypes['Integration']>>>, ParentType, ContextType, IFormIntegrationsArgs>,
  numEntries?: Resolver<Maybe<IResolversTypes['Int']>, ParentType, ContextType>,
  entries?: Resolver<Maybe<Array<Maybe<IResolversTypes['FormEntry']>>>, ParentType, ContextType, IFormEntriesArgs>,
};

export type IFormEntryResolvers<ContextType = any, ParentType extends IResolversParentTypes['FormEntry'] = IResolversParentTypes['FormEntry']> = {
  id?: Resolver<IResolversTypes['ID'], ParentType, ContextType>,
  accountId?: Resolver<IResolversTypes['ID'], ParentType, ContextType>,
  formId?: Resolver<IResolversTypes['ID'], ParentType, ContextType>,
  form?: Resolver<IResolversTypes['Form'], ParentType, ContextType>,
  data?: Resolver<IResolversTypes['AWSJSON'], ParentType, ContextType>,
  createdAt?: Resolver<IResolversTypes['AWSDateTime'], ParentType, ContextType>,
};

export type IFormEntrySansDataResolvers<ContextType = any, ParentType extends IResolversParentTypes['FormEntrySansData'] = IResolversParentTypes['FormEntrySansData']> = {
  id?: Resolver<IResolversTypes['ID'], ParentType, ContextType>,
  formId?: Resolver<IResolversTypes['ID'], ParentType, ContextType>,
  createdAt?: Resolver<IResolversTypes['AWSDateTime'], ParentType, ContextType>,
};

export type IFormVersionResolvers<ContextType = any, ParentType extends IResolversParentTypes['FormVersion'] = IResolversParentTypes['FormVersion']> = {
  id?: Resolver<IResolversTypes['ID'], ParentType, ContextType>,
  accountId?: Resolver<IResolversTypes['ID'], ParentType, ContextType>,
  formId?: Resolver<IResolversTypes['ID'], ParentType, ContextType>,
  ownerId?: Resolver<IResolversTypes['ID'], ParentType, ContextType>,
  ownedBy?: Resolver<IResolversTypes['User'], ParentType, ContextType>,
  createdAt?: Resolver<Maybe<IResolversTypes['AWSDateTime']>, ParentType, ContextType>,
  displayName?: Resolver<IResolversTypes['String'], ParentType, ContextType>,
  notes?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  formData?: Resolver<IResolversTypes['AWSJSON'], ParentType, ContextType>,
};

export type IIntegrationResolvers<ContextType = any, ParentType extends IResolversParentTypes['Integration'] = IResolversParentTypes['Integration']> = {
  id?: Resolver<IResolversTypes['ID'], ParentType, ContextType>,
  integrationTypeId?: Resolver<IResolversTypes['ID'], ParentType, ContextType>,
  integrationType?: Resolver<Maybe<IResolversTypes['IntegrationType']>, ParentType, ContextType>,
  ownerId?: Resolver<IResolversTypes['ID'], ParentType, ContextType>,
  accountId?: Resolver<IResolversTypes['ID'], ParentType, ContextType>,
  formId?: Resolver<IResolversTypes['ID'], ParentType, ContextType>,
  form?: Resolver<IResolversTypes['Form'], ParentType, ContextType>,
  active?: Resolver<IResolversTypes['Int'], ParentType, ContextType>,
  authType?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  auth?: Resolver<Maybe<IResolversTypes['AWSJSON']>, ParentType, ContextType>,
  target?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  method?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  lastExecuted?: Resolver<Maybe<IResolversTypes['AWSDateTime']>, ParentType, ContextType>,
  lastExecutionResult?: Resolver<Maybe<IResolversTypes['Int']>, ParentType, ContextType>,
  lastExecutionResultMessage?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  createdAt?: Resolver<Maybe<IResolversTypes['AWSDateTime']>, ParentType, ContextType>,
  updatedAt?: Resolver<Maybe<IResolversTypes['AWSDateTime']>, ParentType, ContextType>,
  isDeleted?: Resolver<Maybe<IResolversTypes['Int']>, ParentType, ContextType>,
};

export type IIntegrationTypeResolvers<ContextType = any, ParentType extends IResolversParentTypes['IntegrationType'] = IResolversParentTypes['IntegrationType']> = {
  id?: Resolver<IResolversTypes['ID'], ParentType, ContextType>,
  ownerId?: Resolver<IResolversTypes['ID'], ParentType, ContextType>,
  ownedBy?: Resolver<IResolversTypes['User'], ParentType, ContextType>,
  planTypeId?: Resolver<IResolversTypes['ID'], ParentType, ContextType>,
  planType?: Resolver<Maybe<IResolversTypes['PlanType']>, ParentType, ContextType>,
  name?: Resolver<IResolversTypes['String'], ParentType, ContextType>,
  active?: Resolver<IResolversTypes['Int'], ParentType, ContextType>,
  createdAt?: Resolver<Maybe<IResolversTypes['AWSDateTime']>, ParentType, ContextType>,
  updatedAt?: Resolver<Maybe<IResolversTypes['AWSDateTime']>, ParentType, ContextType>,
};

export type IMutationResolvers<ContextType = any, ParentType extends IResolversParentTypes['Mutation'] = IResolversParentTypes['Mutation']> = {
  addPlanType?: Resolver<IResolversTypes['PlanType'], ParentType, ContextType, IMutationAddPlanTypeArgs>,
  addPlan?: Resolver<IResolversTypes['Plan'], ParentType, ContextType, IMutationAddPlanArgs>,
  addIntegrationType?: Resolver<IResolversTypes['IntegrationType'], ParentType, ContextType, IMutationAddIntegrationTypeArgs>,
  addIntegration?: Resolver<IResolversTypes['Integration'], ParentType, ContextType, IMutationAddIntegrationArgs>,
  addForm?: Resolver<IResolversTypes['Form'], ParentType, ContextType, RequireFields<IMutationAddFormArgs, 'input'>>,
  addFormVersion?: Resolver<IResolversTypes['Form'], ParentType, ContextType, RequireFields<IMutationAddFormVersionArgs, 'input'>>,
  attachFormVersion?: Resolver<IResolversTypes['Form'], ParentType, ContextType, RequireFields<IMutationAttachFormVersionArgs, 'input'>>,
  updatePlanType?: Resolver<IResolversTypes['PlanType'], ParentType, ContextType, IMutationUpdatePlanTypeArgs>,
  updatePlan?: Resolver<IResolversTypes['Plan'], ParentType, ContextType, IMutationUpdatePlanArgs>,
  updateAccount?: Resolver<IResolversTypes['Account'], ParentType, ContextType, IMutationUpdateAccountArgs>,
  updateAccountPlan?: Resolver<IResolversTypes['Account'], ParentType, ContextType, IMutationUpdateAccountPlanArgs>,
  updateUser?: Resolver<IResolversTypes['User'], ParentType, ContextType, IMutationUpdateUserArgs>,
  updateIntegrationType?: Resolver<IResolversTypes['IntegrationType'], ParentType, ContextType, IMutationUpdateIntegrationTypeArgs>,
  updateIntegration?: Resolver<IResolversTypes['Integration'], ParentType, ContextType, IMutationUpdateIntegrationArgs>,
  updateForm?: Resolver<IResolversTypes['Form'], ParentType, ContextType, IMutationUpdateFormArgs>,
  deleteForm?: Resolver<IResolversTypes['Form'], ParentType, ContextType, RequireFields<IMutationDeleteFormArgs, 'input'>>,
  deletePlanType?: Resolver<IResolversTypes['PlanType'], ParentType, ContextType, RequireFields<IMutationDeletePlanTypeArgs, 'planTypeId'>>,
  deletePlan?: Resolver<IResolversTypes['Plan'], ParentType, ContextType, RequireFields<IMutationDeletePlanArgs, 'accountId' | 'planId'>>,
  deleteAccount?: Resolver<IResolversTypes['Account'], ParentType, ContextType, RequireFields<IMutationDeleteAccountArgs, 'accountId'>>,
  deleteUser?: Resolver<IResolversTypes['User'], ParentType, ContextType, RequireFields<IMutationDeleteUserArgs, 'userId'>>,
  deleteIntegrationType?: Resolver<IResolversTypes['IntegrationType'], ParentType, ContextType, RequireFields<IMutationDeleteIntegrationTypeArgs, 'integrationTypeId'>>,
  deleteIntegration?: Resolver<IResolversTypes['Integration'], ParentType, ContextType, RequireFields<IMutationDeleteIntegrationArgs, 'integrationId'>>,
  deleteFormVersion?: Resolver<IResolversTypes['FormVersion'], ParentType, ContextType, RequireFields<IMutationDeleteFormVersionArgs, 'input'>>,
  addFormEntry?: Resolver<IResolversTypes['FormEntrySansData'], ParentType, ContextType, RequireFields<IMutationAddFormEntryArgs, 'input'>>,
};

export type IPlanResolvers<ContextType = any, ParentType extends IResolversParentTypes['Plan'] = IResolversParentTypes['Plan']> = {
  id?: Resolver<IResolversTypes['ID'], ParentType, ContextType>,
  accountId?: Resolver<IResolversTypes['ID'], ParentType, ContextType>,
  account?: Resolver<IResolversTypes['Account'], ParentType, ContextType>,
  ownerId?: Resolver<IResolversTypes['ID'], ParentType, ContextType>,
  ownedBy?: Resolver<IResolversTypes['User'], ParentType, ContextType>,
  planTypeId?: Resolver<IResolversTypes['ID'], ParentType, ContextType>,
  startDate?: Resolver<IResolversTypes['AWSDateTime'], ParentType, ContextType>,
  endDate?: Resolver<Maybe<IResolversTypes['AWSDateTime']>, ParentType, ContextType>,
  active?: Resolver<Maybe<IResolversTypes['Int']>, ParentType, ContextType>,
  lastBillDate?: Resolver<Maybe<IResolversTypes['AWSDateTime']>, ParentType, ContextType>,
  createdAt?: Resolver<Maybe<IResolversTypes['AWSDateTime']>, ParentType, ContextType>,
  updatedAt?: Resolver<Maybe<IResolversTypes['AWSDateTime']>, ParentType, ContextType>,
  planType?: Resolver<Maybe<IResolversTypes['PlanType']>, ParentType, ContextType>,
  isDeleted?: Resolver<Maybe<IResolversTypes['Int']>, ParentType, ContextType>,
};

export type IPlanTypeResolvers<ContextType = any, ParentType extends IResolversParentTypes['PlanType'] = IResolversParentTypes['PlanType']> = {
  id?: Resolver<IResolversTypes['ID'], ParentType, ContextType>,
  ownerId?: Resolver<IResolversTypes['ID'], ParentType, ContextType>,
  ownedBy?: Resolver<IResolversTypes['User'], ParentType, ContextType>,
  name?: Resolver<IResolversTypes['String'], ParentType, ContextType>,
  cost?: Resolver<IResolversTypes['Float'], ParentType, ContextType>,
  active?: Resolver<IResolversTypes['Int'], ParentType, ContextType>,
  billingTerm?: Resolver<IResolversTypes['String'], ParentType, ContextType>,
  createdAt?: Resolver<Maybe<IResolversTypes['AWSDateTime']>, ParentType, ContextType>,
  updatedAt?: Resolver<Maybe<IResolversTypes['AWSDateTime']>, ParentType, ContextType>,
  isDeleted?: Resolver<Maybe<IResolversTypes['Int']>, ParentType, ContextType>,
};

export type IQueryResolvers<ContextType = any, ParentType extends IResolversParentTypes['Query'] = IResolversParentTypes['Query']> = {
  getAccount?: Resolver<Maybe<IResolversTypes['Account']>, ParentType, ContextType, RequireFields<IQueryGetAccountArgs, 'accountId'>>,
  getUser?: Resolver<Maybe<IResolversTypes['User']>, ParentType, ContextType, RequireFields<IQueryGetUserArgs, 'userId'>>,
  getPlan?: Resolver<Maybe<IResolversTypes['Plan']>, ParentType, ContextType, RequireFields<IQueryGetPlanArgs, 'planId'>>,
  getActiveAccountPlan?: Resolver<Maybe<IResolversTypes['Plan']>, ParentType, ContextType, RequireFields<IQueryGetActiveAccountPlanArgs, 'accountId'>>,
  getPlanType?: Resolver<Maybe<IResolversTypes['PlanType']>, ParentType, ContextType, RequireFields<IQueryGetPlanTypeArgs, 'planTypeId'>>,
  getForm?: Resolver<Maybe<IResolversTypes['Form']>, ParentType, ContextType, RequireFields<IQueryGetFormArgs, 'formId'>>,
  getFormVersion?: Resolver<Maybe<IResolversTypes['FormVersion']>, ParentType, ContextType, RequireFields<IQueryGetFormVersionArgs, 'versionId'>>,
  getIntegrationType?: Resolver<Maybe<IResolversTypes['IntegrationType']>, ParentType, ContextType, RequireFields<IQueryGetIntegrationTypeArgs, 'integrationTypeId'>>,
  getIntegration?: Resolver<Maybe<IResolversTypes['Integration']>, ParentType, ContextType, RequireFields<IQueryGetIntegrationArgs, 'integrationId'>>,
  getFormEntry?: Resolver<Maybe<IResolversTypes['FormEntry']>, ParentType, ContextType, RequireFields<IQueryGetFormEntryArgs, 'formEntryId'>>,
  listAccounts?: Resolver<Maybe<Array<Maybe<IResolversTypes['Account']>>>, ParentType, ContextType, IQueryListAccountsArgs>,
  listUsers?: Resolver<Maybe<Array<Maybe<IResolversTypes['User']>>>, ParentType, ContextType, IQueryListUsersArgs>,
  listPlans?: Resolver<Maybe<Array<Maybe<IResolversTypes['Plan']>>>, ParentType, ContextType, IQueryListPlansArgs>,
  listPlanTypes?: Resolver<Maybe<Array<Maybe<IResolversTypes['PlanType']>>>, ParentType, ContextType, IQueryListPlanTypesArgs>,
  listForms?: Resolver<Maybe<Array<Maybe<IResolversTypes['Form']>>>, ParentType, ContextType, IQueryListFormsArgs>,
  listFormVersions?: Resolver<Maybe<Array<Maybe<IResolversTypes['FormVersion']>>>, ParentType, ContextType, IQueryListFormVersionsArgs>,
  listIntegrationTypes?: Resolver<Maybe<Array<Maybe<IResolversTypes['IntegrationType']>>>, ParentType, ContextType, IQueryListIntegrationTypesArgs>,
  listIntegrations?: Resolver<Maybe<Array<Maybe<IResolversTypes['Integration']>>>, ParentType, ContextType, IQueryListIntegrationsArgs>,
  listFormEntries?: Resolver<Maybe<Array<Maybe<IResolversTypes['FormEntry']>>>, ParentType, ContextType, IQueryListFormEntriesArgs>,
};

export type IUserResolvers<ContextType = any, ParentType extends IResolversParentTypes['User'] = IResolversParentTypes['User']> = {
  id?: Resolver<IResolversTypes['ID'], ParentType, ContextType>,
  ownerId?: Resolver<Maybe<IResolversTypes['ID']>, ParentType, ContextType>,
  ownedBy?: Resolver<Maybe<IResolversTypes['User']>, ParentType, ContextType>,
  accountId?: Resolver<Maybe<IResolversTypes['ID']>, ParentType, ContextType>,
  account?: Resolver<Maybe<IResolversTypes['Account']>, ParentType, ContextType>,
  email?: Resolver<IResolversTypes['String'], ParentType, ContextType>,
  userGroup?: Resolver<IResolversTypes['String'], ParentType, ContextType>,
  given_name?: Resolver<IResolversTypes['String'], ParentType, ContextType>,
  family_name?: Resolver<IResolversTypes['String'], ParentType, ContextType>,
  phone_number?: Resolver<Maybe<IResolversTypes['AWSPhone']>, ParentType, ContextType>,
  createdAt?: Resolver<Maybe<IResolversTypes['AWSDateTime']>, ParentType, ContextType>,
  updatedAt?: Resolver<Maybe<IResolversTypes['AWSDateTime']>, ParentType, ContextType>,
  isDeleted?: Resolver<Maybe<IResolversTypes['Int']>, ParentType, ContextType>,
  numForms?: Resolver<Maybe<IResolversTypes['Int']>, ParentType, ContextType>,
};

export type IResolvers<ContextType = any> = {
  Account?: IAccountResolvers<ContextType>,
  AddAddressInput?: IAddAddressInputResolvers<ContextType>,
  Address?: IAddressResolvers<ContextType>,
  AWSDateTime?: GraphQLScalarType,
  AWSJSON?: GraphQLScalarType,
  AWSPhone?: GraphQLScalarType,
  AWSURL?: GraphQLScalarType,
  Form?: IFormResolvers<ContextType>,
  FormEntry?: IFormEntryResolvers<ContextType>,
  FormEntrySansData?: IFormEntrySansDataResolvers<ContextType>,
  FormVersion?: IFormVersionResolvers<ContextType>,
  Integration?: IIntegrationResolvers<ContextType>,
  IntegrationType?: IIntegrationTypeResolvers<ContextType>,
  Mutation?: IMutationResolvers<ContextType>,
  Plan?: IPlanResolvers<ContextType>,
  PlanType?: IPlanTypeResolvers<ContextType>,
  Query?: IQueryResolvers<ContextType>,
  User?: IUserResolvers<ContextType>,
};


export type IDirectiveResolvers<ContextType = any> = {
  model?: IModelDirectiveResolver<any, any, ContextType>,
  aws_api_key?: IAws_Api_KeyDirectiveResolver<any, any, ContextType>,
};

