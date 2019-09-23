export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  AWSPhone: String,
  AWSDateTime: Date,
  AWSJSON: String,
  AWSURL: String,
};



export type Account = {
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
};


export type AccountAddressesArgs = {
  limit?: Maybe<Scalars['Int']>
};


export type AccountUsersArgs = {
  limit?: Maybe<Scalars['Int']>
};


export type AccountFormsArgs = {
  limit?: Maybe<Scalars['Int']>
};

export type AccountFilterInput = {
  name?: Maybe<StringFilter>,
  createdAt?: Maybe<DateFilter>,
  updatedAt?: Maybe<DateFilter>,
  planId?: Maybe<StringFilter>,
  active?: Maybe<IntFilter>,
  criteria?: Maybe<Array<AccountFilterInput>>,
};

export type AccountSortInput = {
  name?: Maybe<SortOrder>,
  createdAt?: Maybe<SortOrder>,
  updatedAt?: Maybe<SortOrder>,
  planId?: Maybe<SortOrder>,
  sortBy?: Maybe<Array<AccountSortInput>>,
};

export type AddAddressInput = {
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
};

export type AddFormEntryInput = {
  id: Scalars['ID'],
  accountId: Scalars['ID'],
  formId: Scalars['ID'],
  data: Scalars['AWSJSON'],
};

export type AddFormInput = {
  accountId: Scalars['ID'],
  name: Scalars['String'],
  description: Scalars['String'],
  startsAt?: Maybe<Scalars['AWSDateTime']>,
  endsAt?: Maybe<Scalars['AWSDateTime']>,
  isPaused?: Maybe<Scalars['Int']>,
};

export type AddFormVersionInput = {
  accountId: Scalars['ID'],
  formId: Scalars['ID'],
  displayName: Scalars['String'],
  notes: Scalars['String'],
  formData: Scalars['AWSJSON'],
};

export type AddIntegrationInput = {
  integrationTypeId: Scalars['ID'],
  accountId: Scalars['ID'],
  formId: Scalars['ID'],
  active?: Maybe<Scalars['Int']>,
  authType?: Maybe<Scalars['String']>,
  auth?: Maybe<Scalars['AWSJSON']>,
  target?: Maybe<Scalars['String']>,
  method?: Maybe<Scalars['String']>,
};

export type AddIntegrationTypeInput = {
  name: Scalars['String'],
  active?: Maybe<Scalars['Int']>,
};

export type AddPlanInput = {
  accountId: Scalars['ID'],
  planTypeId: Scalars['ID'],
  endDate?: Maybe<Scalars['AWSDateTime']>,
  active?: Maybe<Scalars['Int']>,
};

export type AddPlanTypeInput = {
  name: Scalars['String'],
  cost: Scalars['Float'],
  billingTerm: Scalars['String'],
  active: Scalars['Int'],
};

export type Address = {
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
};

export enum AddressType {
  Billing = 'BILLING',
  Contact = 'CONTACT'
}

export type AttachFormVersionInput = {
  formId: Scalars['ID'],
  versionId: Scalars['ID'],
  accountId: Scalars['ID'],
};





export type BooleanFilter = {
  with?: Maybe<FilterWith>,
  expression: BooleanFilterExpression,
  value?: Maybe<Array<Scalars['Boolean']>>,
};

export enum BooleanFilterExpression {
  Ne = 'ne',
  Eq = 'eq'
}

export type DateFilter = {
  with?: Maybe<FilterWith>,
  expression: NumericFilterExpression,
  value?: Maybe<Array<Scalars['AWSDateTime']>>,
};

export type DeleteFormInput = {
  id: Scalars['ID'],
  accountId: Scalars['ID'],
};

export type DeleteFormVersionInput = {
  accountId: Scalars['ID'],
  formId: Scalars['ID'],
  versionId: Scalars['ID'],
};

export enum FilterWith {
  And = 'AND',
  Or = 'OR'
}

export type FloatFilter = {
  with?: Maybe<FilterWith>,
  expression: NumericFilterExpression,
  value?: Maybe<Array<Scalars['Float']>>,
};

export type Form = {
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
};


export type FormVersionsArgs = {
  limit?: Maybe<Scalars['Int']>
};


export type FormIntegrationsArgs = {
  limit?: Maybe<Scalars['Int']>
};


export type FormEntriesArgs = {
  limit?: Maybe<Scalars['Int']>
};

export type FormEntry = {
   __typename?: 'FormEntry',
  id: Scalars['ID'],
  accountId: Scalars['ID'],
  formId: Scalars['ID'],
  form: Form,
  data: Scalars['AWSJSON'],
  createdAt: Scalars['AWSDateTime'],
};

export type FormEntryFilterInput = {
  formId?: Maybe<StringFilter>,
  createdAt?: Maybe<DateFilter>,
  accountId?: Maybe<StringFilter>,
  criteria?: Maybe<Array<FormEntryFilterInput>>,
};

export type FormEntrySansData = {
   __typename?: 'FormEntrySansData',
  id: Scalars['ID'],
  formId: Scalars['ID'],
  createdAt: Scalars['AWSDateTime'],
};

export type FormEntrySortInput = {
  createdAt?: Maybe<SortOrder>,
};

export type FormFilterInput = {
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
};

export type FormSortInput = {
  name?: Maybe<SortOrder>,
  createdAt?: Maybe<SortOrder>,
  updatedAt?: Maybe<SortOrder>,
  startsAt?: Maybe<SortOrder>,
  endsAt?: Maybe<SortOrder>,
  sortBy?: Maybe<Array<FormSortInput>>,
};

export type FormVersion = {
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
};

export type FormVersionFilterInput = {
  accountId?: Maybe<StringFilter>,
  formId?: Maybe<StringFilter>,
  ownerId?: Maybe<StringFilter>,
  createdAt?: Maybe<DateFilter>,
  criteria?: Maybe<Array<FormVersionFilterInput>>,
};

export type FormVersionSortInput = {
  createdAt?: Maybe<SortOrder>,
  sortBy?: Maybe<Array<FormVersionSortInput>>,
};

export type Integration = {
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
};

export type IntegrationFilterInput = {
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
};

export type IntegrationSortInput = {
  lastExecuted?: Maybe<SortOrder>,
  createdAt?: Maybe<SortOrder>,
  updatedAt?: Maybe<SortOrder>,
  sortBy?: Maybe<Array<IntegrationSortInput>>,
};

export type IntegrationType = {
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
};

export type IntegrationTypeFilterInput = {
  ownerId?: Maybe<StringFilter>,
  planTypeId?: Maybe<StringFilter>,
  name?: Maybe<StringFilter>,
  createdAt?: Maybe<DateFilter>,
  updatedAt?: Maybe<DateFilter>,
  active?: Maybe<IntFilter>,
  criteria?: Maybe<Array<IntegrationTypeFilterInput>>,
};

export type IntegrationTypeSortInput = {
  name?: Maybe<SortOrder>,
  createdAt?: Maybe<SortOrder>,
  updatedAt?: Maybe<SortOrder>,
  sortBy?: Maybe<Array<IntegrationTypeSortInput>>,
};

export type IntFilter = {
  with?: Maybe<FilterWith>,
  expression: NumericFilterExpression,
  value?: Maybe<Array<Scalars['Int']>>,
};

export type Mutation = {
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
};


export type MutationAddPlanTypeArgs = {
  input?: Maybe<AddPlanTypeInput>
};


export type MutationAddPlanArgs = {
  input?: Maybe<AddPlanInput>
};


export type MutationAddIntegrationTypeArgs = {
  input?: Maybe<AddIntegrationTypeInput>
};


export type MutationAddIntegrationArgs = {
  input?: Maybe<AddIntegrationInput>
};


export type MutationAddFormArgs = {
  input: AddFormInput
};


export type MutationAddFormVersionArgs = {
  input: AddFormVersionInput
};


export type MutationAttachFormVersionArgs = {
  input: AttachFormVersionInput
};


export type MutationUpdatePlanTypeArgs = {
  input?: Maybe<UpdatePlanTypeInput>
};


export type MutationUpdatePlanArgs = {
  input?: Maybe<UpdatePlanInput>
};


export type MutationUpdateAccountArgs = {
  input?: Maybe<UpdateAccountInput>
};


export type MutationUpdateAccountPlanArgs = {
  input?: Maybe<AddPlanInput>
};


export type MutationUpdateUserArgs = {
  input?: Maybe<UpdateUserInput>
};


export type MutationUpdateIntegrationTypeArgs = {
  input?: Maybe<UpdateIntegrationTypeInput>
};


export type MutationUpdateIntegrationArgs = {
  input?: Maybe<UpdateIntegrationInput>
};


export type MutationUpdateFormArgs = {
  input?: Maybe<UpdateFormInput>
};


export type MutationDeleteFormArgs = {
  input: DeleteFormInput
};


export type MutationDeletePlanTypeArgs = {
  planTypeId: Scalars['ID']
};


export type MutationDeletePlanArgs = {
  accountId: Scalars['ID'],
  planId: Scalars['ID']
};


export type MutationDeleteAccountArgs = {
  accountId: Scalars['ID']
};


export type MutationDeleteUserArgs = {
  userId: Scalars['ID']
};


export type MutationDeleteIntegrationTypeArgs = {
  integrationTypeId: Scalars['ID']
};


export type MutationDeleteIntegrationArgs = {
  integrationId: Scalars['ID']
};


export type MutationDeleteFormVersionArgs = {
  input: DeleteFormVersionInput
};


export type MutationAddFormEntryArgs = {
  input: AddFormEntryInput
};

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

export type OffsetLimit = {
  offset?: Maybe<Scalars['Int']>,
  limit?: Maybe<Scalars['Int']>,
};

export type Plan = {
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
};

export type PlanFilterInput = {
  accountId?: Maybe<StringFilter>,
  ownerId?: Maybe<StringFilter>,
  planTypeId?: Maybe<StringFilter>,
  lastBillDate?: Maybe<DateFilter>,
  createdAt?: Maybe<DateFilter>,
  updatedAt?: Maybe<DateFilter>,
  startDate?: Maybe<DateFilter>,
  endDate?: Maybe<DateFilter>,
  criteria?: Maybe<Array<PlanFilterInput>>,
};

export type PlanSortInput = {
  createdAt?: Maybe<SortOrder>,
  updatedAt?: Maybe<SortOrder>,
  lastBillDate?: Maybe<SortOrder>,
  startDate?: Maybe<SortOrder>,
  endDate?: Maybe<SortOrder>,
  sortBy?: Maybe<Array<PlanSortInput>>,
};

export type PlanType = {
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
};

export type PlanTypeFilterInput = {
  ownerId?: Maybe<StringFilter>,
  cost?: Maybe<FloatFilter>,
  billingTerm?: Maybe<StringFilter>,
  name?: Maybe<StringFilter>,
  createdAt?: Maybe<DateFilter>,
  updatedAt?: Maybe<DateFilter>,
  isDeleted?: Maybe<IntFilter>,
  criteria?: Maybe<Array<PlanTypeFilterInput>>,
};

export type PlanTypeSortInput = {
  name?: Maybe<SortOrder>,
  billingTerm?: Maybe<SortOrder>,
  cost?: Maybe<SortOrder>,
  createdAt?: Maybe<SortOrder>,
  updatedAt?: Maybe<SortOrder>,
  sortBy?: Maybe<Array<PlanTypeSortInput>>,
};

export type Query = {
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
};


export type QueryGetAccountArgs = {
  accountId: Scalars['ID']
};


export type QueryGetUserArgs = {
  userId: Scalars['ID']
};


export type QueryGetPlanArgs = {
  planId: Scalars['String']
};


export type QueryGetActiveAccountPlanArgs = {
  accountId: Scalars['String']
};


export type QueryGetPlanTypeArgs = {
  planTypeId: Scalars['String']
};


export type QueryGetFormArgs = {
  formId: Scalars['String']
};


export type QueryGetFormVersionArgs = {
  versionId: Scalars['String']
};


export type QueryGetIntegrationTypeArgs = {
  integrationTypeId: Scalars['String']
};


export type QueryGetIntegrationArgs = {
  integrationId: Scalars['String']
};


export type QueryGetFormEntryArgs = {
  formEntryId: Scalars['String']
};


export type QueryListAccountsArgs = {
  offsetLimit?: Maybe<OffsetLimit>,
  filter?: Maybe<AccountFilterInput>,
  sort?: Maybe<AccountSortInput>
};


export type QueryListUsersArgs = {
  offsetLimit?: Maybe<OffsetLimit>,
  filter?: Maybe<UserFilterInput>,
  sort?: Maybe<UserSortInput>
};


export type QueryListPlansArgs = {
  offsetLimit?: Maybe<OffsetLimit>,
  filter?: Maybe<PlanFilterInput>,
  sort?: Maybe<PlanSortInput>
};


export type QueryListPlanTypesArgs = {
  offsetLimit?: Maybe<OffsetLimit>,
  filter?: Maybe<PlanTypeFilterInput>,
  sort?: Maybe<PlanTypeSortInput>
};


export type QueryListFormsArgs = {
  offsetLimit?: Maybe<OffsetLimit>,
  filter?: Maybe<FormFilterInput>,
  sort?: Maybe<FormSortInput>
};


export type QueryListFormVersionsArgs = {
  offsetLimit?: Maybe<OffsetLimit>,
  filter?: Maybe<FormVersionFilterInput>,
  sort?: Maybe<FormVersionSortInput>
};


export type QueryListIntegrationTypesArgs = {
  offsetLimit?: Maybe<OffsetLimit>,
  filter?: Maybe<IntegrationTypeFilterInput>,
  sort?: Maybe<IntegrationTypeSortInput>
};


export type QueryListIntegrationsArgs = {
  offsetLimit?: Maybe<OffsetLimit>,
  filter?: Maybe<IntegrationFilterInput>,
  sort?: Maybe<IntegrationSortInput>
};


export type QueryListFormEntriesArgs = {
  offsetLimit?: Maybe<OffsetLimit>,
  filter?: Maybe<FormEntryFilterInput>,
  sort?: Maybe<FormEntrySortInput>
};

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export type StringFilter = {
  with?: Maybe<FilterWith>,
  expression: StringFilterExpression,
  value?: Maybe<Array<Scalars['String']>>,
};

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

export type UpdateAccountInput = {
  id: Scalars['ID'],
  name?: Maybe<Scalars['String']>,
};

export type UpdateFormInput = {
  id: Scalars['ID'],
  currentVersionId?: Maybe<Scalars['ID']>,
  name?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
  startDate?: Maybe<Scalars['AWSDateTime']>,
  endDate?: Maybe<Scalars['AWSDateTime']>,
  redirectNotStarted?: Maybe<Scalars['AWSURL']>,
  redirectHasEnded?: Maybe<Scalars['AWSURL']>,
  isPaused?: Maybe<Scalars['Int']>,
};

export type UpdateIntegrationInput = {
  id: Scalars['ID'],
  active?: Maybe<Scalars['Int']>,
  authType?: Maybe<Scalars['String']>,
  auth?: Maybe<Scalars['AWSJSON']>,
  target?: Maybe<Scalars['String']>,
  method?: Maybe<Scalars['String']>,
};

export type UpdateIntegrationTypeInput = {
  id: Scalars['ID'],
  name: Scalars['String'],
  active?: Maybe<Scalars['Int']>,
};

export type UpdateIntegrationTypeInputData = {
  active?: Maybe<Scalars['Int']>,
  authType?: Maybe<Scalars['String']>,
  auth?: Maybe<Scalars['AWSJSON']>,
  target?: Maybe<Scalars['String']>,
  method?: Maybe<Scalars['String']>,
};

export type UpdatePlanInput = {
  planId: Scalars['ID'],
  accountId: Scalars['ID'],
  active: Scalars['Int'],
  endDate?: Maybe<Scalars['AWSDateTime']>,
};

export type UpdatePlanTypeInput = {
  id: Scalars['ID'],
  name?: Maybe<Scalars['String']>,
  cost?: Maybe<Scalars['Float']>,
  billingTerm?: Maybe<Scalars['String']>,
  active?: Maybe<Scalars['Int']>,
};

export type UpdateUserInput = {
  id: Scalars['ID'],
  data: UpdateUserInputData,
};

export type UpdateUserInputData = {
  group: Scalars['String'],
  given_name: Scalars['String'],
  family_name: Scalars['String'],
  phone_number?: Maybe<Scalars['AWSPhone']>,
};

export type User = {
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
};

export type UserFilterInput = {
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
};

export type UserSortInput = {
  accountId?: Maybe<SortOrder>,
  email?: Maybe<SortOrder>,
  given_name?: Maybe<SortOrder>,
  family_name?: Maybe<SortOrder>,
  userGroup?: Maybe<SortOrder>,
  createdAt?: Maybe<SortOrder>,
  updatedAt?: Maybe<SortOrder>,
  sortBy?: Maybe<Array<UserSortInput>>,
};
