export declare type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    AWSPhone: String;
    AWSDateTime: Date;
    AWSJSON: String;
    AWSURL: String;
}
export interface Account {
    __typename?: 'Account';
    id: Scalars['ID'];
    name: Scalars['String'];
    addresses?: Maybe<Array<Maybe<Address>>>;
    website?: Maybe<Scalars['String']>;
    taxId?: Maybe<Scalars['String']>;
    ownerId: Scalars['ID'];
    ownedBy: User;
    plan?: Maybe<Plan>;
    planId?: Maybe<Scalars['ID']>;
    createdAt?: Maybe<Scalars['AWSDateTime']>;
    updatedAt?: Maybe<Scalars['AWSDateTime']>;
    active?: Maybe<Scalars['Int']>;
    numForms?: Maybe<Scalars['Int']>;
    numUsers?: Maybe<Scalars['Int']>;
    users?: Maybe<Array<Maybe<User>>>;
    forms?: Maybe<Array<Maybe<Form>>>;
}
export interface AccountAddressesArgs {
    limit?: Maybe<Scalars['Int']>;
}
export interface AccountUsersArgs {
    limit?: Maybe<Scalars['Int']>;
}
export interface AccountFormsArgs {
    limit?: Maybe<Scalars['Int']>;
}
export interface AccountFilterInput {
    name?: Maybe<StringFilter>;
    createdAt?: Maybe<DateFilter>;
    updatedAt?: Maybe<DateFilter>;
    planId?: Maybe<StringFilter>;
    active?: Maybe<IntFilter>;
    criteria?: Maybe<Array<AccountFilterInput>>;
}
export interface AccountSortInput {
    name?: Maybe<SortOrder>;
    createdAt?: Maybe<SortOrder>;
    updatedAt?: Maybe<SortOrder>;
    planId?: Maybe<SortOrder>;
    sortBy?: Maybe<Array<AccountSortInput>>;
}
export interface AddAddressInput {
    __typename?: 'AddAddressInput';
    name: Scalars['String'];
    addressee?: Maybe<Scalars['String']>;
    addressType: AddressType;
    phone_number?: Maybe<Scalars['AWSPhone']>;
    email: Scalars['String'];
    street?: Maybe<Scalars['String']>;
    city?: Maybe<Scalars['String']>;
    state?: Maybe<Scalars['String']>;
    country?: Maybe<Scalars['String']>;
}
export interface AddFormEntryInput {
    id: Scalars['ID'];
    accountId: Scalars['ID'];
    formId: Scalars['ID'];
    data: Scalars['AWSJSON'];
}
export interface AddFormInput {
    accountId: Scalars['ID'];
    name: Scalars['String'];
    description: Scalars['String'];
    startsAt?: Maybe<Scalars['AWSDateTime']>;
    endsAt?: Maybe<Scalars['AWSDateTime']>;
    isPaused?: Maybe<Scalars['Int']>;
}
export interface AddFormVersionInput {
    accountId: Scalars['ID'];
    formId: Scalars['ID'];
    displayName: Scalars['String'];
    notes: Scalars['String'];
    formData: Scalars['AWSJSON'];
}
export interface AddIntegrationInput {
    integrationTypeId: Scalars['ID'];
    accountId: Scalars['ID'];
    formId: Scalars['ID'];
    active?: Maybe<Scalars['Int']>;
    authType?: Maybe<Scalars['String']>;
    auth?: Maybe<Scalars['AWSJSON']>;
    target?: Maybe<Scalars['String']>;
    method?: Maybe<Scalars['String']>;
}
export interface AddIntegrationTypeInput {
    name: Scalars['String'];
    active?: Maybe<Scalars['Int']>;
}
export interface AddPlanInput {
    accountId: Scalars['ID'];
    planTypeId: Scalars['ID'];
    endDate?: Maybe<Scalars['AWSDateTime']>;
    active?: Maybe<Scalars['Int']>;
}
export interface AddPlanTypeInput {
    name: Scalars['String'];
    cost: Scalars['Float'];
    billingTerm: Scalars['String'];
    active: Scalars['Int'];
}
export interface Address {
    __typename?: 'Address';
    id: Scalars['ID'];
    name: Scalars['String'];
    addressee?: Maybe<Scalars['String']>;
    addressType: AddressType;
    phone_number?: Maybe<Scalars['AWSPhone']>;
    email: Scalars['String'];
    street?: Maybe<Scalars['String']>;
    city?: Maybe<Scalars['String']>;
    state?: Maybe<Scalars['String']>;
    country?: Maybe<Scalars['String']>;
}
export declare enum AddressType {
    Billing = "BILLING",
    Contact = "CONTACT"
}
export interface AttachFormVersionInput {
    formId: Scalars['ID'];
    versionId: Scalars['ID'];
    accountId: Scalars['ID'];
}
export interface BooleanFilter {
    with?: Maybe<FilterWith>;
    expression: BooleanFilterExpression;
    value?: Maybe<Array<Scalars['Boolean']>>;
}
export declare enum BooleanFilterExpression {
    Ne = "ne",
    Eq = "eq"
}
export interface DateFilter {
    with?: Maybe<FilterWith>;
    expression: NumericFilterExpression;
    value?: Maybe<Array<Scalars['AWSDateTime']>>;
}
export interface DeleteFormInput {
    id: Scalars['ID'];
    accountId: Scalars['ID'];
}
export interface DeleteFormVersionInput {
    accountId: Scalars['ID'];
    formId: Scalars['ID'];
    versionId: Scalars['ID'];
}
export declare enum FilterWith {
    And = "AND",
    Or = "OR"
}
export interface FloatFilter {
    with?: Maybe<FilterWith>;
    expression: NumericFilterExpression;
    value?: Maybe<Array<Scalars['Float']>>;
}
export interface Form {
    __typename?: 'Form';
    id: Scalars['ID'];
    ownerId: Scalars['ID'];
    name: Scalars['String'];
    description: Scalars['String'];
    versionId?: Maybe<Scalars['ID']>;
    versionActivatedDate?: Maybe<Scalars['AWSDateTime']>;
    version?: Maybe<FormVersion>;
    ownedBy: User;
    accountId: Scalars['ID'];
    account: Account;
    createdAt: Scalars['AWSDateTime'];
    updatedAt?: Maybe<Scalars['AWSDateTime']>;
    startDate?: Maybe<Scalars['AWSDateTime']>;
    endDate?: Maybe<Scalars['AWSDateTime']>;
    isPaused?: Maybe<Scalars['Int']>;
    isDeleted?: Maybe<Scalars['Int']>;
    redirectNotStarted?: Maybe<Scalars['AWSURL']>;
    redirectHasEnded?: Maybe<Scalars['AWSURL']>;
    versions?: Maybe<Array<Maybe<FormVersion>>>;
    integrations?: Maybe<Array<Maybe<Integration>>>;
    numEntries?: Maybe<Scalars['Int']>;
    entries?: Maybe<Array<Maybe<FormEntry>>>;
}
export interface FormVersionsArgs {
    limit?: Maybe<Scalars['Int']>;
}
export interface FormIntegrationsArgs {
    limit?: Maybe<Scalars['Int']>;
}
export interface FormEntriesArgs {
    limit?: Maybe<Scalars['Int']>;
}
export interface FormEntry {
    __typename?: 'FormEntry';
    id: Scalars['ID'];
    accountId: Scalars['ID'];
    formId: Scalars['ID'];
    form: Form;
    data: Scalars['AWSJSON'];
    createdAt: Scalars['AWSDateTime'];
}
export interface FormEntryFilterInput {
    formId?: Maybe<StringFilter>;
    createdAt?: Maybe<DateFilter>;
    accountId?: Maybe<StringFilter>;
    criteria?: Maybe<Array<FormEntryFilterInput>>;
}
export interface FormEntrySansData {
    __typename?: 'FormEntrySansData';
    id: Scalars['ID'];
    formId: Scalars['ID'];
    createdAt: Scalars['AWSDateTime'];
}
export interface FormEntrySortInput {
    createdAt?: Maybe<SortOrder>;
}
export interface FormFilterInput {
    name?: Maybe<StringFilter>;
    ownerId?: Maybe<StringFilter>;
    accountId?: Maybe<StringFilter>;
    createdAt?: Maybe<DateFilter>;
    updatedAt?: Maybe<DateFilter>;
    startsAt?: Maybe<DateFilter>;
    endsAt?: Maybe<DateFilter>;
    isPaused?: Maybe<IntFilter>;
    isDeleted?: Maybe<IntFilter>;
    criteria?: Maybe<Array<FormFilterInput>>;
}
export interface FormSortInput {
    name?: Maybe<SortOrder>;
    createdAt?: Maybe<SortOrder>;
    updatedAt?: Maybe<SortOrder>;
    startsAt?: Maybe<SortOrder>;
    endsAt?: Maybe<SortOrder>;
    sortBy?: Maybe<Array<FormSortInput>>;
}
export interface FormVersion {
    __typename?: 'FormVersion';
    id: Scalars['ID'];
    accountId: Scalars['ID'];
    formId: Scalars['ID'];
    ownerId: Scalars['ID'];
    ownedBy: User;
    createdAt?: Maybe<Scalars['AWSDateTime']>;
    displayName: Scalars['String'];
    notes?: Maybe<Scalars['String']>;
    formData: Scalars['AWSJSON'];
}
export interface FormVersionFilterInput {
    accountId?: Maybe<StringFilter>;
    formId?: Maybe<StringFilter>;
    ownerId?: Maybe<StringFilter>;
    createdAt?: Maybe<DateFilter>;
    criteria?: Maybe<Array<FormVersionFilterInput>>;
}
export interface FormVersionSortInput {
    createdAt?: Maybe<SortOrder>;
    sortBy?: Maybe<Array<FormVersionSortInput>>;
}
export interface Integration {
    __typename?: 'Integration';
    id: Scalars['ID'];
    integrationTypeId: Scalars['ID'];
    integrationType?: Maybe<IntegrationType>;
    ownerId: Scalars['ID'];
    accountId: Scalars['ID'];
    formId: Scalars['ID'];
    form: Form;
    active: Scalars['Int'];
    authType?: Maybe<Scalars['String']>;
    auth?: Maybe<Scalars['AWSJSON']>;
    target?: Maybe<Scalars['String']>;
    method?: Maybe<Scalars['String']>;
    lastExecuted?: Maybe<Scalars['AWSDateTime']>;
    lastExecutionResult?: Maybe<Scalars['Int']>;
    lastExecutionResultMessage?: Maybe<Scalars['String']>;
    createdAt?: Maybe<Scalars['AWSDateTime']>;
    updatedAt?: Maybe<Scalars['AWSDateTime']>;
    isDeleted?: Maybe<Scalars['Int']>;
}
export interface IntegrationFilterInput {
    ownerId?: Maybe<StringFilter>;
    accountId?: Maybe<StringFilter>;
    formId?: Maybe<StringFilter>;
    active?: Maybe<IntFilter>;
    isDeleted?: Maybe<IntFilter>;
    lastExecuted?: Maybe<DateFilter>;
    lastExecutionResult?: Maybe<IntFilter>;
    createdAt?: Maybe<DateFilter>;
    updatedAt?: Maybe<DateFilter>;
    criteria?: Maybe<Array<IntegrationFilterInput>>;
}
export interface IntegrationSortInput {
    lastExecuted?: Maybe<SortOrder>;
    createdAt?: Maybe<SortOrder>;
    updatedAt?: Maybe<SortOrder>;
    sortBy?: Maybe<Array<IntegrationSortInput>>;
}
export interface IntegrationType {
    __typename?: 'IntegrationType';
    id: Scalars['ID'];
    ownerId: Scalars['ID'];
    ownedBy: User;
    planTypeId: Scalars['ID'];
    planType?: Maybe<PlanType>;
    name: Scalars['String'];
    active: Scalars['Int'];
    createdAt?: Maybe<Scalars['AWSDateTime']>;
    updatedAt?: Maybe<Scalars['AWSDateTime']>;
}
export interface IntegrationTypeFilterInput {
    ownerId?: Maybe<StringFilter>;
    planTypeId?: Maybe<StringFilter>;
    name?: Maybe<StringFilter>;
    createdAt?: Maybe<DateFilter>;
    updatedAt?: Maybe<DateFilter>;
    active?: Maybe<IntFilter>;
    criteria?: Maybe<Array<IntegrationTypeFilterInput>>;
}
export interface IntegrationTypeSortInput {
    name?: Maybe<SortOrder>;
    createdAt?: Maybe<SortOrder>;
    updatedAt?: Maybe<SortOrder>;
    sortBy?: Maybe<Array<IntegrationTypeSortInput>>;
}
export interface IntFilter {
    with?: Maybe<FilterWith>;
    expression: NumericFilterExpression;
    value?: Maybe<Array<Scalars['Int']>>;
}
export interface Mutation {
    __typename?: 'Mutation';
    addPlanType: PlanType;
    addPlan: Plan;
    addIntegrationType: IntegrationType;
    addIntegration: Integration;
    addForm: Form;
    addFormVersion: Form;
    attachFormVersion: Form;
    updatePlanType: PlanType;
    updatePlan: Plan;
    updateAccount: Account;
    updateAccountPlan: Account;
    updateUser: User;
    updateIntegrationType: IntegrationType;
    updateIntegration: Integration;
    updateForm: Form;
    deleteForm: Form;
    deletePlanType: PlanType;
    deletePlan: Plan;
    deleteAccount: Account;
    deleteUser: User;
    deleteIntegrationType: IntegrationType;
    deleteIntegration: Integration;
    deleteFormVersion: FormVersion;
    addFormEntry: FormEntrySansData;
}
export interface MutationAddPlanTypeArgs {
    input?: Maybe<AddPlanTypeInput>;
}
export interface MutationAddPlanArgs {
    input?: Maybe<AddPlanInput>;
}
export interface MutationAddIntegrationTypeArgs {
    input?: Maybe<AddIntegrationTypeInput>;
}
export interface MutationAddIntegrationArgs {
    input?: Maybe<AddIntegrationInput>;
}
export interface MutationAddFormArgs {
    input: AddFormInput;
}
export interface MutationAddFormVersionArgs {
    input: AddFormVersionInput;
}
export interface MutationAttachFormVersionArgs {
    input: AttachFormVersionInput;
}
export interface MutationUpdatePlanTypeArgs {
    input?: Maybe<UpdatePlanTypeInput>;
}
export interface MutationUpdatePlanArgs {
    input?: Maybe<UpdatePlanInput>;
}
export interface MutationUpdateAccountArgs {
    input?: Maybe<UpdateAccountInput>;
}
export interface MutationUpdateAccountPlanArgs {
    input?: Maybe<AddPlanInput>;
}
export interface MutationUpdateUserArgs {
    input?: Maybe<UpdateUserInput>;
}
export interface MutationUpdateIntegrationTypeArgs {
    input?: Maybe<UpdateIntegrationTypeInput>;
}
export interface MutationUpdateIntegrationArgs {
    input?: Maybe<UpdateIntegrationInput>;
}
export interface MutationUpdateFormArgs {
    input?: Maybe<UpdateFormInput>;
}
export interface MutationDeleteFormArgs {
    input: DeleteFormInput;
}
export interface MutationDeletePlanTypeArgs {
    planTypeId: Scalars['ID'];
}
export interface MutationDeletePlanArgs {
    accountId: Scalars['ID'];
    planId: Scalars['ID'];
}
export interface MutationDeleteAccountArgs {
    accountId: Scalars['ID'];
}
export interface MutationDeleteUserArgs {
    userId: Scalars['ID'];
}
export interface MutationDeleteIntegrationTypeArgs {
    integrationTypeId: Scalars['ID'];
}
export interface MutationDeleteIntegrationArgs {
    integrationId: Scalars['ID'];
}
export interface MutationDeleteFormVersionArgs {
    input: DeleteFormVersionInput;
}
export interface MutationAddFormEntryArgs {
    input: AddFormEntryInput;
}
export declare enum NumericFilterExpression {
    In = "in",
    Ne = "ne",
    Eq = "eq",
    Le = "le",
    Lt = "lt",
    Ge = "ge",
    Gt = "gt",
    Between = "between",
    NotBetween = "notBetween",
    IsNull = "isNull",
    IsNotNull = "isNotNull"
}
export interface OffsetLimit {
    offset?: Maybe<Scalars['Int']>;
    limit?: Maybe<Scalars['Int']>;
}
export interface Plan {
    __typename?: 'Plan';
    id: Scalars['ID'];
    accountId: Scalars['ID'];
    account: Account;
    ownerId: Scalars['ID'];
    ownedBy: User;
    planTypeId: Scalars['ID'];
    startDate: Scalars['AWSDateTime'];
    endDate?: Maybe<Scalars['AWSDateTime']>;
    active?: Maybe<Scalars['Int']>;
    lastBillDate?: Maybe<Scalars['AWSDateTime']>;
    createdAt?: Maybe<Scalars['AWSDateTime']>;
    updatedAt?: Maybe<Scalars['AWSDateTime']>;
    planType?: Maybe<PlanType>;
    isDeleted?: Maybe<Scalars['Int']>;
}
export interface PlanFilterInput {
    accountId?: Maybe<StringFilter>;
    ownerId?: Maybe<StringFilter>;
    planTypeId?: Maybe<StringFilter>;
    lastBillDate?: Maybe<DateFilter>;
    createdAt?: Maybe<DateFilter>;
    updatedAt?: Maybe<DateFilter>;
    startDate?: Maybe<DateFilter>;
    endDate?: Maybe<DateFilter>;
    criteria?: Maybe<Array<PlanFilterInput>>;
}
export interface PlanSortInput {
    createdAt?: Maybe<SortOrder>;
    updatedAt?: Maybe<SortOrder>;
    lastBillDate?: Maybe<SortOrder>;
    startDate?: Maybe<SortOrder>;
    endDate?: Maybe<SortOrder>;
    sortBy?: Maybe<Array<PlanSortInput>>;
}
export interface PlanType {
    __typename?: 'PlanType';
    id: Scalars['ID'];
    ownerId: Scalars['ID'];
    ownedBy: User;
    name: Scalars['String'];
    cost: Scalars['Float'];
    active: Scalars['Int'];
    billingTerm: Scalars['String'];
    createdAt?: Maybe<Scalars['AWSDateTime']>;
    updatedAt?: Maybe<Scalars['AWSDateTime']>;
    isDeleted?: Maybe<Scalars['Int']>;
}
export interface PlanTypeFilterInput {
    ownerId?: Maybe<StringFilter>;
    cost?: Maybe<FloatFilter>;
    billingTerm?: Maybe<StringFilter>;
    name?: Maybe<StringFilter>;
    createdAt?: Maybe<DateFilter>;
    updatedAt?: Maybe<DateFilter>;
    isDeleted?: Maybe<IntFilter>;
    criteria?: Maybe<Array<PlanTypeFilterInput>>;
}
export interface PlanTypeSortInput {
    name?: Maybe<SortOrder>;
    billingTerm?: Maybe<SortOrder>;
    cost?: Maybe<SortOrder>;
    createdAt?: Maybe<SortOrder>;
    updatedAt?: Maybe<SortOrder>;
    sortBy?: Maybe<Array<PlanTypeSortInput>>;
}
export interface Query {
    __typename?: 'Query';
    getAccount?: Maybe<Account>;
    getUser?: Maybe<User>;
    getPlan?: Maybe<Plan>;
    getActiveAccountPlan?: Maybe<Plan>;
    getPlanType?: Maybe<PlanType>;
    getForm?: Maybe<Form>;
    getFormVersion?: Maybe<FormVersion>;
    getIntegrationType?: Maybe<IntegrationType>;
    getIntegration?: Maybe<Integration>;
    getFormEntry?: Maybe<FormEntry>;
    listAccounts?: Maybe<Array<Maybe<Account>>>;
    listUsers?: Maybe<Array<Maybe<User>>>;
    listPlans?: Maybe<Array<Maybe<Plan>>>;
    listPlanTypes?: Maybe<Array<Maybe<PlanType>>>;
    listForms?: Maybe<Array<Maybe<Form>>>;
    listFormVersions?: Maybe<Array<Maybe<FormVersion>>>;
    listIntegrationTypes?: Maybe<Array<Maybe<IntegrationType>>>;
    listIntegrations?: Maybe<Array<Maybe<Integration>>>;
    listFormEntries?: Maybe<Array<Maybe<FormEntry>>>;
}
export interface QueryGetAccountArgs {
    accountId: Scalars['ID'];
}
export interface QueryGetUserArgs {
    userId: Scalars['ID'];
}
export interface QueryGetPlanArgs {
    planId: Scalars['String'];
}
export interface QueryGetActiveAccountPlanArgs {
    accountId: Scalars['String'];
}
export interface QueryGetPlanTypeArgs {
    planTypeId: Scalars['String'];
}
export interface QueryGetFormArgs {
    formId: Scalars['String'];
}
export interface QueryGetFormVersionArgs {
    versionId: Scalars['String'];
}
export interface QueryGetIntegrationTypeArgs {
    integrationTypeId: Scalars['String'];
}
export interface QueryGetIntegrationArgs {
    integrationId: Scalars['String'];
}
export interface QueryGetFormEntryArgs {
    formEntryId: Scalars['String'];
}
export interface QueryListAccountsArgs {
    offsetLimit?: Maybe<OffsetLimit>;
    filter?: Maybe<AccountFilterInput>;
    sort?: Maybe<AccountSortInput>;
}
export interface QueryListUsersArgs {
    offsetLimit?: Maybe<OffsetLimit>;
    filter?: Maybe<UserFilterInput>;
    sort?: Maybe<UserSortInput>;
}
export interface QueryListPlansArgs {
    offsetLimit?: Maybe<OffsetLimit>;
    filter?: Maybe<PlanFilterInput>;
    sort?: Maybe<PlanSortInput>;
}
export interface QueryListPlanTypesArgs {
    offsetLimit?: Maybe<OffsetLimit>;
    filter?: Maybe<PlanTypeFilterInput>;
    sort?: Maybe<PlanTypeSortInput>;
}
export interface QueryListFormsArgs {
    offsetLimit?: Maybe<OffsetLimit>;
    filter?: Maybe<FormFilterInput>;
    sort?: Maybe<FormSortInput>;
}
export interface QueryListFormVersionsArgs {
    offsetLimit?: Maybe<OffsetLimit>;
    filter?: Maybe<FormVersionFilterInput>;
    sort?: Maybe<FormVersionSortInput>;
}
export interface QueryListIntegrationTypesArgs {
    offsetLimit?: Maybe<OffsetLimit>;
    filter?: Maybe<IntegrationTypeFilterInput>;
    sort?: Maybe<IntegrationTypeSortInput>;
}
export interface QueryListIntegrationsArgs {
    offsetLimit?: Maybe<OffsetLimit>;
    filter?: Maybe<IntegrationFilterInput>;
    sort?: Maybe<IntegrationSortInput>;
}
export interface QueryListFormEntriesArgs {
    offsetLimit?: Maybe<OffsetLimit>;
    filter?: Maybe<FormEntryFilterInput>;
    sort?: Maybe<FormEntrySortInput>;
}
export declare enum SortOrder {
    Asc = "asc",
    Desc = "desc"
}
export interface StringFilter {
    with?: Maybe<FilterWith>;
    expression: StringFilterExpression;
    value?: Maybe<Array<Scalars['String']>>;
}
export declare enum StringFilterExpression {
    Ne = "ne",
    Eq = "eq",
    Contains = "contains",
    NotContains = "notContains",
    StartsWith = "startsWith",
    IsNull = "isNull",
    IsNotNull = "isNotNull",
    In = "in"
}
export interface UpdateAccountInput {
    id: Scalars['ID'];
    name?: Maybe<Scalars['String']>;
}
export interface UpdateFormInput {
    id: Scalars['ID'];
    currentVersionId?: Maybe<Scalars['ID']>;
    name?: Maybe<Scalars['String']>;
    description?: Maybe<Scalars['String']>;
    startDate?: Maybe<Scalars['AWSDateTime']>;
    endDate?: Maybe<Scalars['AWSDateTime']>;
    redirectNotStarted?: Maybe<Scalars['AWSURL']>;
    redirectHasEnded?: Maybe<Scalars['AWSURL']>;
    isPaused?: Maybe<Scalars['Int']>;
}
export interface UpdateIntegrationInput {
    id: Scalars['ID'];
    active?: Maybe<Scalars['Int']>;
    authType?: Maybe<Scalars['String']>;
    auth?: Maybe<Scalars['AWSJSON']>;
    target?: Maybe<Scalars['String']>;
    method?: Maybe<Scalars['String']>;
}
export interface UpdateIntegrationTypeInput {
    id: Scalars['ID'];
    name: Scalars['String'];
    active?: Maybe<Scalars['Int']>;
}
export interface UpdateIntegrationTypeInputData {
    active?: Maybe<Scalars['Int']>;
    authType?: Maybe<Scalars['String']>;
    auth?: Maybe<Scalars['AWSJSON']>;
    target?: Maybe<Scalars['String']>;
    method?: Maybe<Scalars['String']>;
}
export interface UpdatePlanInput {
    planId: Scalars['ID'];
    accountId: Scalars['ID'];
    active: Scalars['Int'];
    endDate?: Maybe<Scalars['AWSDateTime']>;
}
export interface UpdatePlanTypeInput {
    id: Scalars['ID'];
    name?: Maybe<Scalars['String']>;
    cost?: Maybe<Scalars['Float']>;
    billingTerm?: Maybe<Scalars['String']>;
    active?: Maybe<Scalars['Int']>;
}
export interface UpdateUserInput {
    id: Scalars['ID'];
    data: UpdateUserInputData;
}
export interface UpdateUserInputData {
    group: Scalars['String'];
    given_name: Scalars['String'];
    family_name: Scalars['String'];
    phone_number?: Maybe<Scalars['AWSPhone']>;
}
export interface User {
    __typename?: 'User';
    id: Scalars['ID'];
    ownerId?: Maybe<Scalars['ID']>;
    ownedBy?: Maybe<User>;
    accountId?: Maybe<Scalars['ID']>;
    account?: Maybe<Account>;
    email: Scalars['String'];
    userGroup: Scalars['String'];
    given_name: Scalars['String'];
    family_name: Scalars['String'];
    phone_number?: Maybe<Scalars['AWSPhone']>;
    createdAt?: Maybe<Scalars['AWSDateTime']>;
    updatedAt?: Maybe<Scalars['AWSDateTime']>;
    isDeleted?: Maybe<Scalars['Int']>;
    numForms?: Maybe<Scalars['Int']>;
}
export interface UserFilterInput {
    accountId?: Maybe<StringFilter>;
    ownerId?: Maybe<StringFilter>;
    email?: Maybe<StringFilter>;
    userGroup?: Maybe<StringFilter>;
    given_name?: Maybe<StringFilter>;
    family_name?: Maybe<StringFilter>;
    createdAt?: Maybe<DateFilter>;
    updatedAt?: Maybe<DateFilter>;
    isDeleted?: Maybe<IntFilter>;
    criteria?: Maybe<Array<UserFilterInput>>;
}
export interface UserSortInput {
    accountId?: Maybe<SortOrder>;
    email?: Maybe<SortOrder>;
    given_name?: Maybe<SortOrder>;
    family_name?: Maybe<SortOrder>;
    userGroup?: Maybe<SortOrder>;
    createdAt?: Maybe<SortOrder>;
    updatedAt?: Maybe<SortOrder>;
    sortBy?: Maybe<Array<UserSortInput>>;
}
export declare type AddPlanTypeMutationVariables = {
    input?: Maybe<AddPlanTypeInput>;
};
export declare type AddPlanTypeMutation = ({
    __typename?: 'Mutation';
} & {
    addPlanType: ({
        __typename?: 'PlanType';
    } & Pick<PlanType, 'id' | 'ownerId' | 'name' | 'cost' | 'active' | 'billingTerm' | 'createdAt' | 'updatedAt' | 'isDeleted'> & {
        ownedBy: ({
            __typename?: 'User';
        } & Pick<User, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>);
    });
});
export declare type AddPlanMutationVariables = {
    input?: Maybe<AddPlanInput>;
};
export declare type AddPlanMutation = ({
    __typename?: 'Mutation';
} & {
    addPlan: ({
        __typename?: 'Plan';
    } & Pick<Plan, 'id' | 'accountId' | 'ownerId' | 'planTypeId' | 'startDate' | 'endDate' | 'active' | 'lastBillDate' | 'createdAt' | 'updatedAt' | 'isDeleted'> & {
        account: ({
            __typename?: 'Account';
        } & Pick<Account, 'id' | 'name' | 'website' | 'taxId' | 'ownerId' | 'planId' | 'createdAt' | 'updatedAt' | 'active' | 'numForms' | 'numUsers'>);
        ownedBy: ({
            __typename?: 'User';
        } & Pick<User, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>);
        planType: Maybe<({
            __typename?: 'PlanType';
        } & Pick<PlanType, 'id' | 'ownerId' | 'name' | 'cost' | 'active' | 'billingTerm' | 'createdAt' | 'updatedAt' | 'isDeleted'>)>;
    });
});
export declare type AddIntegrationTypeMutationVariables = {
    input?: Maybe<AddIntegrationTypeInput>;
};
export declare type AddIntegrationTypeMutation = ({
    __typename?: 'Mutation';
} & {
    addIntegrationType: ({
        __typename?: 'IntegrationType';
    } & Pick<IntegrationType, 'id' | 'ownerId' | 'planTypeId' | 'name' | 'active' | 'createdAt' | 'updatedAt'> & {
        ownedBy: ({
            __typename?: 'User';
        } & Pick<User, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>);
        planType: Maybe<({
            __typename?: 'PlanType';
        } & Pick<PlanType, 'id' | 'ownerId' | 'name' | 'cost' | 'active' | 'billingTerm' | 'createdAt' | 'updatedAt' | 'isDeleted'>)>;
    });
});
export declare type AddIntegrationMutationVariables = {
    input?: Maybe<AddIntegrationInput>;
};
export declare type AddIntegrationMutation = ({
    __typename?: 'Mutation';
} & {
    addIntegration: ({
        __typename?: 'Integration';
    } & Pick<Integration, 'id' | 'integrationTypeId' | 'ownerId' | 'accountId' | 'formId' | 'active' | 'authType' | 'auth' | 'target' | 'method' | 'lastExecuted' | 'lastExecutionResult' | 'lastExecutionResultMessage' | 'createdAt' | 'updatedAt' | 'isDeleted'> & {
        integrationType: Maybe<({
            __typename?: 'IntegrationType';
        } & Pick<IntegrationType, 'id' | 'ownerId' | 'planTypeId' | 'name' | 'active' | 'createdAt' | 'updatedAt'>)>;
        form: ({
            __typename?: 'Form';
        } & Pick<Form, 'id' | 'ownerId' | 'name' | 'description' | 'versionId' | 'versionActivatedDate' | 'accountId' | 'createdAt' | 'updatedAt' | 'startDate' | 'endDate' | 'isPaused' | 'isDeleted' | 'redirectNotStarted' | 'redirectHasEnded'>);
    });
});
export declare type AddFormMutationVariables = {
    input: AddFormInput;
};
export declare type AddFormMutation = ({
    __typename?: 'Mutation';
} & {
    addForm: ({
        __typename?: 'Form';
    } & Pick<Form, 'id' | 'ownerId' | 'name' | 'description' | 'versionId' | 'versionActivatedDate' | 'accountId' | 'createdAt' | 'updatedAt' | 'startDate' | 'endDate' | 'isPaused' | 'isDeleted' | 'redirectNotStarted' | 'redirectHasEnded'> & {
        version: Maybe<({
            __typename?: 'FormVersion';
        } & Pick<FormVersion, 'id' | 'accountId' | 'formId' | 'ownerId' | 'createdAt' | 'displayName' | 'notes' | 'formData'>)>;
        ownedBy: ({
            __typename?: 'User';
        } & Pick<User, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>);
        account: ({
            __typename?: 'Account';
        } & Pick<Account, 'id' | 'name' | 'website' | 'taxId' | 'ownerId' | 'planId' | 'createdAt' | 'updatedAt' | 'active' | 'numForms' | 'numUsers'>);
        versions: Maybe<Array<Maybe<({
            __typename?: 'FormVersion';
        } & Pick<FormVersion, 'id' | 'accountId' | 'formId' | 'ownerId' | 'createdAt' | 'displayName' | 'notes' | 'formData'>)>>>;
        integrations: Maybe<Array<Maybe<({
            __typename?: 'Integration';
        } & Pick<Integration, 'id' | 'integrationTypeId' | 'ownerId' | 'accountId' | 'formId' | 'active' | 'authType' | 'auth' | 'target' | 'method' | 'lastExecuted' | 'lastExecutionResult' | 'lastExecutionResultMessage' | 'createdAt' | 'updatedAt' | 'isDeleted'>)>>>;
        entries: Maybe<Array<Maybe<({
            __typename?: 'FormEntry';
        } & Pick<FormEntry, 'id' | 'formId' | 'data' | 'createdAt'>)>>>;
    });
});
export declare type AddFormVersionMutationVariables = {
    input: AddFormVersionInput;
};
export declare type AddFormVersionMutation = ({
    __typename?: 'Mutation';
} & {
    addFormVersion: ({
        __typename?: 'Form';
    } & Pick<Form, 'id' | 'ownerId' | 'name' | 'description' | 'versionId' | 'versionActivatedDate' | 'accountId' | 'createdAt' | 'updatedAt' | 'startDate' | 'endDate' | 'isPaused' | 'isDeleted' | 'redirectNotStarted' | 'redirectHasEnded'> & {
        version: Maybe<({
            __typename?: 'FormVersion';
        } & Pick<FormVersion, 'id' | 'accountId' | 'formId' | 'ownerId' | 'createdAt' | 'displayName' | 'notes' | 'formData'>)>;
        ownedBy: ({
            __typename?: 'User';
        } & Pick<User, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>);
        account: ({
            __typename?: 'Account';
        } & Pick<Account, 'id' | 'name' | 'website' | 'taxId' | 'ownerId' | 'planId' | 'createdAt' | 'updatedAt' | 'active' | 'numForms' | 'numUsers'>);
        versions: Maybe<Array<Maybe<({
            __typename?: 'FormVersion';
        } & Pick<FormVersion, 'id' | 'accountId' | 'formId' | 'ownerId' | 'createdAt' | 'displayName' | 'notes' | 'formData'>)>>>;
        integrations: Maybe<Array<Maybe<({
            __typename?: 'Integration';
        } & Pick<Integration, 'id' | 'integrationTypeId' | 'ownerId' | 'accountId' | 'formId' | 'active' | 'authType' | 'auth' | 'target' | 'method' | 'lastExecuted' | 'lastExecutionResult' | 'lastExecutionResultMessage' | 'createdAt' | 'updatedAt' | 'isDeleted'>)>>>;
        entries: Maybe<Array<Maybe<({
            __typename?: 'FormEntry';
        } & Pick<FormEntry, 'id' | 'formId' | 'data' | 'createdAt'>)>>>;
    });
});
export declare type AttachFormVersionMutationVariables = {
    input: AttachFormVersionInput;
};
export declare type AttachFormVersionMutation = ({
    __typename?: 'Mutation';
} & {
    attachFormVersion: ({
        __typename?: 'Form';
    } & Pick<Form, 'id' | 'ownerId' | 'name' | 'description' | 'versionId' | 'versionActivatedDate' | 'accountId' | 'createdAt' | 'updatedAt' | 'startDate' | 'endDate' | 'isPaused' | 'isDeleted' | 'redirectNotStarted' | 'redirectHasEnded'> & {
        version: Maybe<({
            __typename?: 'FormVersion';
        } & Pick<FormVersion, 'id' | 'accountId' | 'formId' | 'ownerId' | 'createdAt' | 'displayName' | 'notes' | 'formData'>)>;
        ownedBy: ({
            __typename?: 'User';
        } & Pick<User, 'id' | 'email' | 'given_name' | 'family_name'>);
        account: ({
            __typename?: 'Account';
        } & Pick<Account, 'id' | 'name'>);
        versions: Maybe<Array<Maybe<({
            __typename?: 'FormVersion';
        } & Pick<FormVersion, 'id' | 'createdAt' | 'displayName' | 'notes'> & {
            ownedBy: ({
                __typename?: 'User';
            } & Pick<User, 'email' | 'given_name' | 'family_name'>);
        })>>>;
    });
});
export declare type UpdatePlanTypeMutationVariables = {
    input?: Maybe<UpdatePlanTypeInput>;
};
export declare type UpdatePlanTypeMutation = ({
    __typename?: 'Mutation';
} & {
    updatePlanType: ({
        __typename?: 'PlanType';
    } & Pick<PlanType, 'id' | 'ownerId' | 'name' | 'cost' | 'active' | 'billingTerm' | 'createdAt' | 'updatedAt' | 'isDeleted'> & {
        ownedBy: ({
            __typename?: 'User';
        } & Pick<User, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>);
    });
});
export declare type UpdatePlanMutationVariables = {
    input?: Maybe<UpdatePlanInput>;
};
export declare type UpdatePlanMutation = ({
    __typename?: 'Mutation';
} & {
    updatePlan: ({
        __typename?: 'Plan';
    } & Pick<Plan, 'id' | 'accountId' | 'ownerId' | 'planTypeId' | 'startDate' | 'endDate' | 'active' | 'lastBillDate' | 'createdAt' | 'updatedAt' | 'isDeleted'> & {
        account: ({
            __typename?: 'Account';
        } & Pick<Account, 'id' | 'name' | 'website' | 'taxId' | 'ownerId' | 'planId' | 'createdAt' | 'updatedAt' | 'active' | 'numForms' | 'numUsers'>);
        ownedBy: ({
            __typename?: 'User';
        } & Pick<User, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>);
        planType: Maybe<({
            __typename?: 'PlanType';
        } & Pick<PlanType, 'id' | 'ownerId' | 'name' | 'cost' | 'active' | 'billingTerm' | 'createdAt' | 'updatedAt' | 'isDeleted'>)>;
    });
});
export declare type UpdateAccountMutationVariables = {
    input?: Maybe<UpdateAccountInput>;
};
export declare type UpdateAccountMutation = ({
    __typename?: 'Mutation';
} & {
    updateAccount: ({
        __typename?: 'Account';
    } & Pick<Account, 'id' | 'name' | 'website' | 'taxId' | 'ownerId' | 'planId' | 'createdAt' | 'updatedAt' | 'active' | 'numForms' | 'numUsers'> & {
        addresses: Maybe<Array<Maybe<({
            __typename?: 'Address';
        } & Pick<Address, 'id' | 'name' | 'addressee' | 'addressType' | 'phone_number' | 'email' | 'street' | 'city' | 'state' | 'country'>)>>>;
        ownedBy: ({
            __typename?: 'User';
        } & Pick<User, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>);
        plan: Maybe<({
            __typename?: 'Plan';
        } & Pick<Plan, 'id' | 'accountId' | 'ownerId' | 'planTypeId' | 'startDate' | 'endDate' | 'active' | 'lastBillDate' | 'createdAt' | 'updatedAt' | 'isDeleted'>)>;
        users: Maybe<Array<Maybe<({
            __typename?: 'User';
        } & Pick<User, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>)>>>;
        forms: Maybe<Array<Maybe<({
            __typename?: 'Form';
        } & Pick<Form, 'id' | 'ownerId' | 'name' | 'description' | 'versionId' | 'versionActivatedDate' | 'accountId' | 'createdAt' | 'updatedAt' | 'startDate' | 'endDate' | 'isPaused' | 'isDeleted' | 'redirectNotStarted' | 'redirectHasEnded'>)>>>;
    });
});
export declare type UpdateAccountPlanMutationVariables = {
    input?: Maybe<AddPlanInput>;
};
export declare type UpdateAccountPlanMutation = ({
    __typename?: 'Mutation';
} & {
    updateAccountPlan: ({
        __typename?: 'Account';
    } & Pick<Account, 'id' | 'name' | 'website' | 'taxId' | 'ownerId' | 'planId' | 'createdAt' | 'updatedAt' | 'active' | 'numForms' | 'numUsers'> & {
        addresses: Maybe<Array<Maybe<({
            __typename?: 'Address';
        } & Pick<Address, 'id' | 'name' | 'addressee' | 'addressType' | 'phone_number' | 'email' | 'street' | 'city' | 'state' | 'country'>)>>>;
        ownedBy: ({
            __typename?: 'User';
        } & Pick<User, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>);
        plan: Maybe<({
            __typename?: 'Plan';
        } & Pick<Plan, 'id' | 'accountId' | 'ownerId' | 'planTypeId' | 'startDate' | 'endDate' | 'active' | 'lastBillDate' | 'createdAt' | 'updatedAt' | 'isDeleted'>)>;
        users: Maybe<Array<Maybe<({
            __typename?: 'User';
        } & Pick<User, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>)>>>;
        forms: Maybe<Array<Maybe<({
            __typename?: 'Form';
        } & Pick<Form, 'id' | 'ownerId' | 'name' | 'description' | 'versionId' | 'versionActivatedDate' | 'accountId' | 'createdAt' | 'updatedAt' | 'startDate' | 'endDate' | 'isPaused' | 'isDeleted' | 'redirectNotStarted' | 'redirectHasEnded'>)>>>;
    });
});
export declare type UpdateUserMutationVariables = {
    input?: Maybe<UpdateUserInput>;
};
export declare type UpdateUserMutation = ({
    __typename?: 'Mutation';
} & {
    updateUser: ({
        __typename?: 'User';
    } & Pick<User, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'> & {
        ownedBy: Maybe<({
            __typename?: 'User';
        } & Pick<User, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>)>;
        account: Maybe<({
            __typename?: 'Account';
        } & Pick<Account, 'id' | 'name' | 'website' | 'taxId' | 'ownerId' | 'planId' | 'createdAt' | 'updatedAt' | 'active' | 'numForms' | 'numUsers'>)>;
    });
});
export declare type UpdateIntegrationTypeMutationVariables = {
    input?: Maybe<UpdateIntegrationTypeInput>;
};
export declare type UpdateIntegrationTypeMutation = ({
    __typename?: 'Mutation';
} & {
    updateIntegrationType: ({
        __typename?: 'IntegrationType';
    } & Pick<IntegrationType, 'id' | 'ownerId' | 'planTypeId' | 'name' | 'active' | 'createdAt' | 'updatedAt'> & {
        ownedBy: ({
            __typename?: 'User';
        } & Pick<User, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>);
        planType: Maybe<({
            __typename?: 'PlanType';
        } & Pick<PlanType, 'id' | 'ownerId' | 'name' | 'cost' | 'active' | 'billingTerm' | 'createdAt' | 'updatedAt' | 'isDeleted'>)>;
    });
});
export declare type UpdateIntegrationMutationVariables = {
    input?: Maybe<UpdateIntegrationInput>;
};
export declare type UpdateIntegrationMutation = ({
    __typename?: 'Mutation';
} & {
    updateIntegration: ({
        __typename?: 'Integration';
    } & Pick<Integration, 'id' | 'integrationTypeId' | 'ownerId' | 'accountId' | 'formId' | 'active' | 'authType' | 'auth' | 'target' | 'method' | 'lastExecuted' | 'lastExecutionResult' | 'lastExecutionResultMessage' | 'createdAt' | 'updatedAt' | 'isDeleted'> & {
        integrationType: Maybe<({
            __typename?: 'IntegrationType';
        } & Pick<IntegrationType, 'id' | 'ownerId' | 'planTypeId' | 'name' | 'active' | 'createdAt' | 'updatedAt'>)>;
        form: ({
            __typename?: 'Form';
        } & Pick<Form, 'id' | 'ownerId' | 'name' | 'description' | 'versionId' | 'versionActivatedDate' | 'accountId' | 'createdAt' | 'updatedAt' | 'startDate' | 'endDate' | 'isPaused' | 'isDeleted' | 'redirectNotStarted' | 'redirectHasEnded'>);
    });
});
export declare type UpdateFormMutationVariables = {
    input?: Maybe<UpdateFormInput>;
};
export declare type UpdateFormMutation = ({
    __typename?: 'Mutation';
} & {
    updateForm: ({
        __typename?: 'Form';
    } & Pick<Form, 'id' | 'ownerId' | 'name' | 'description' | 'versionId' | 'versionActivatedDate' | 'accountId' | 'createdAt' | 'updatedAt' | 'startDate' | 'endDate' | 'isPaused' | 'isDeleted' | 'redirectNotStarted' | 'redirectHasEnded'> & {
        version: Maybe<({
            __typename?: 'FormVersion';
        } & Pick<FormVersion, 'id' | 'accountId' | 'formId' | 'ownerId' | 'createdAt' | 'displayName' | 'notes' | 'formData'>)>;
        ownedBy: ({
            __typename?: 'User';
        } & Pick<User, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted'>);
        account: ({
            __typename?: 'Account';
        } & Pick<Account, 'id' | 'name' | 'website' | 'taxId' | 'ownerId' | 'planId' | 'createdAt' | 'updatedAt' | 'active'>);
        versions: Maybe<Array<Maybe<({
            __typename?: 'FormVersion';
        } & Pick<FormVersion, 'id' | 'accountId' | 'formId' | 'ownerId' | 'createdAt' | 'displayName' | 'notes'> & {
            ownedBy: ({
                __typename?: 'User';
            } & Pick<User, 'email' | 'given_name' | 'family_name'>);
        })>>>;
    });
});
export declare type DeleteFormMutationVariables = {
    input: DeleteFormInput;
};
export declare type DeleteFormMutation = ({
    __typename?: 'Mutation';
} & {
    deleteForm: ({
        __typename?: 'Form';
    } & Pick<Form, 'id' | 'ownerId' | 'name' | 'description' | 'versionId' | 'versionActivatedDate' | 'accountId' | 'createdAt' | 'updatedAt' | 'startDate' | 'endDate' | 'isPaused' | 'isDeleted' | 'redirectNotStarted' | 'redirectHasEnded'> & {
        version: Maybe<({
            __typename?: 'FormVersion';
        } & Pick<FormVersion, 'id' | 'accountId' | 'formId' | 'ownerId' | 'createdAt' | 'displayName' | 'notes' | 'formData'>)>;
        ownedBy: ({
            __typename?: 'User';
        } & Pick<User, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>);
        account: ({
            __typename?: 'Account';
        } & Pick<Account, 'id' | 'name' | 'website' | 'taxId' | 'ownerId' | 'planId' | 'createdAt' | 'updatedAt' | 'active' | 'numForms' | 'numUsers'>);
        versions: Maybe<Array<Maybe<({
            __typename?: 'FormVersion';
        } & Pick<FormVersion, 'id' | 'accountId' | 'formId' | 'ownerId' | 'createdAt' | 'displayName' | 'notes' | 'formData'>)>>>;
        integrations: Maybe<Array<Maybe<({
            __typename?: 'Integration';
        } & Pick<Integration, 'id' | 'integrationTypeId' | 'ownerId' | 'accountId' | 'formId' | 'active' | 'authType' | 'auth' | 'target' | 'method' | 'lastExecuted' | 'lastExecutionResult' | 'lastExecutionResultMessage' | 'createdAt' | 'updatedAt' | 'isDeleted'>)>>>;
        entries: Maybe<Array<Maybe<({
            __typename?: 'FormEntry';
        } & Pick<FormEntry, 'id' | 'formId' | 'data' | 'createdAt'>)>>>;
    });
});
export declare type DeletePlanTypeMutationVariables = {
    planTypeId: Scalars['ID'];
};
export declare type DeletePlanTypeMutation = ({
    __typename?: 'Mutation';
} & {
    deletePlanType: ({
        __typename?: 'PlanType';
    } & Pick<PlanType, 'id' | 'ownerId' | 'name' | 'cost' | 'active' | 'billingTerm' | 'createdAt' | 'updatedAt' | 'isDeleted'> & {
        ownedBy: ({
            __typename?: 'User';
        } & Pick<User, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>);
    });
});
export declare type DeletePlanMutationVariables = {
    accountId: Scalars['ID'];
    planId: Scalars['ID'];
};
export declare type DeletePlanMutation = ({
    __typename?: 'Mutation';
} & {
    deletePlan: ({
        __typename?: 'Plan';
    } & Pick<Plan, 'id' | 'accountId' | 'ownerId' | 'planTypeId' | 'startDate' | 'endDate' | 'active' | 'lastBillDate' | 'createdAt' | 'updatedAt' | 'isDeleted'> & {
        account: ({
            __typename?: 'Account';
        } & Pick<Account, 'id' | 'name' | 'website' | 'taxId' | 'ownerId' | 'planId' | 'createdAt' | 'updatedAt' | 'active' | 'numForms' | 'numUsers'>);
        ownedBy: ({
            __typename?: 'User';
        } & Pick<User, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>);
        planType: Maybe<({
            __typename?: 'PlanType';
        } & Pick<PlanType, 'id' | 'ownerId' | 'name' | 'cost' | 'active' | 'billingTerm' | 'createdAt' | 'updatedAt' | 'isDeleted'>)>;
    });
});
export declare type DeleteAccountMutationVariables = {
    accountId: Scalars['ID'];
};
export declare type DeleteAccountMutation = ({
    __typename?: 'Mutation';
} & {
    deleteAccount: ({
        __typename?: 'Account';
    } & Pick<Account, 'id' | 'name' | 'website' | 'taxId' | 'ownerId' | 'planId' | 'createdAt' | 'updatedAt' | 'active' | 'numForms' | 'numUsers'> & {
        addresses: Maybe<Array<Maybe<({
            __typename?: 'Address';
        } & Pick<Address, 'id' | 'name' | 'addressee' | 'addressType' | 'phone_number' | 'email' | 'street' | 'city' | 'state' | 'country'>)>>>;
        ownedBy: ({
            __typename?: 'User';
        } & Pick<User, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>);
        plan: Maybe<({
            __typename?: 'Plan';
        } & Pick<Plan, 'id' | 'accountId' | 'ownerId' | 'planTypeId' | 'startDate' | 'endDate' | 'active' | 'lastBillDate' | 'createdAt' | 'updatedAt' | 'isDeleted'>)>;
        users: Maybe<Array<Maybe<({
            __typename?: 'User';
        } & Pick<User, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>)>>>;
        forms: Maybe<Array<Maybe<({
            __typename?: 'Form';
        } & Pick<Form, 'id' | 'ownerId' | 'name' | 'description' | 'versionId' | 'versionActivatedDate' | 'accountId' | 'createdAt' | 'updatedAt' | 'startDate' | 'endDate' | 'isPaused' | 'isDeleted' | 'redirectNotStarted' | 'redirectHasEnded'>)>>>;
    });
});
export declare type DeleteUserMutationVariables = {
    userId: Scalars['ID'];
};
export declare type DeleteUserMutation = ({
    __typename?: 'Mutation';
} & {
    deleteUser: ({
        __typename?: 'User';
    } & Pick<User, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'> & {
        ownedBy: Maybe<({
            __typename?: 'User';
        } & Pick<User, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>)>;
        account: Maybe<({
            __typename?: 'Account';
        } & Pick<Account, 'id' | 'name' | 'website' | 'taxId' | 'ownerId' | 'planId' | 'createdAt' | 'updatedAt' | 'active' | 'numForms' | 'numUsers'>)>;
    });
});
export declare type DeleteIntegrationTypeMutationVariables = {
    integrationTypeId: Scalars['ID'];
};
export declare type DeleteIntegrationTypeMutation = ({
    __typename?: 'Mutation';
} & {
    deleteIntegrationType: ({
        __typename?: 'IntegrationType';
    } & Pick<IntegrationType, 'id' | 'ownerId' | 'planTypeId' | 'name' | 'active' | 'createdAt' | 'updatedAt'> & {
        ownedBy: ({
            __typename?: 'User';
        } & Pick<User, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>);
        planType: Maybe<({
            __typename?: 'PlanType';
        } & Pick<PlanType, 'id' | 'ownerId' | 'name' | 'cost' | 'active' | 'billingTerm' | 'createdAt' | 'updatedAt' | 'isDeleted'>)>;
    });
});
export declare type DeleteIntegrationMutationVariables = {
    integrationId: Scalars['ID'];
};
export declare type DeleteIntegrationMutation = ({
    __typename?: 'Mutation';
} & {
    deleteIntegration: ({
        __typename?: 'Integration';
    } & Pick<Integration, 'id' | 'integrationTypeId' | 'ownerId' | 'accountId' | 'formId' | 'active' | 'authType' | 'auth' | 'target' | 'method' | 'lastExecuted' | 'lastExecutionResult' | 'lastExecutionResultMessage' | 'createdAt' | 'updatedAt' | 'isDeleted'> & {
        integrationType: Maybe<({
            __typename?: 'IntegrationType';
        } & Pick<IntegrationType, 'id' | 'ownerId' | 'planTypeId' | 'name' | 'active' | 'createdAt' | 'updatedAt'>)>;
        form: ({
            __typename?: 'Form';
        } & Pick<Form, 'id' | 'ownerId' | 'name' | 'description' | 'versionId' | 'versionActivatedDate' | 'accountId' | 'createdAt' | 'updatedAt' | 'startDate' | 'endDate' | 'isPaused' | 'isDeleted' | 'redirectNotStarted' | 'redirectHasEnded'>);
    });
});
export declare type DeleteFormVersionMutationVariables = {
    input: DeleteFormVersionInput;
};
export declare type DeleteFormVersionMutation = ({
    __typename?: 'Mutation';
} & {
    deleteFormVersion: ({
        __typename?: 'FormVersion';
    } & Pick<FormVersion, 'id' | 'accountId' | 'formId' | 'ownerId' | 'createdAt' | 'displayName' | 'notes' | 'formData'> & {
        ownedBy: ({
            __typename?: 'User';
        } & Pick<User, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>);
    });
});
export declare type AddFormEntryMutationVariables = {
    input: AddFormEntryInput;
};
export declare type AddFormEntryMutation = ({
    __typename?: 'Mutation';
} & {
    addFormEntry: ({
        __typename?: 'FormEntrySansData';
    } & Pick<FormEntrySansData, 'id' | 'formId' | 'createdAt'>);
});
export declare type GetAccountQueryVariables = {
    accountId: Scalars['ID'];
};
export declare type GetAccountQuery = ({
    __typename?: 'Query';
} & {
    getAccount: Maybe<({
        __typename?: 'Account';
    } & Pick<Account, 'id' | 'name' | 'website' | 'taxId' | 'ownerId' | 'planId' | 'createdAt' | 'updatedAt' | 'active' | 'numForms' | 'numUsers'> & {
        addresses: Maybe<Array<Maybe<({
            __typename?: 'Address';
        } & Pick<Address, 'id' | 'name' | 'addressee' | 'addressType' | 'phone_number' | 'email' | 'street' | 'city' | 'state' | 'country'>)>>>;
        ownedBy: ({
            __typename?: 'User';
        } & Pick<User, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>);
        plan: Maybe<({
            __typename?: 'Plan';
        } & Pick<Plan, 'id' | 'accountId' | 'ownerId' | 'planTypeId' | 'startDate' | 'endDate' | 'active' | 'lastBillDate' | 'createdAt' | 'updatedAt' | 'isDeleted'>)>;
        users: Maybe<Array<Maybe<({
            __typename?: 'User';
        } & Pick<User, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>)>>>;
        forms: Maybe<Array<Maybe<({
            __typename?: 'Form';
        } & Pick<Form, 'id' | 'ownerId' | 'name' | 'description' | 'versionId' | 'versionActivatedDate' | 'accountId' | 'createdAt' | 'updatedAt' | 'startDate' | 'endDate' | 'isPaused' | 'isDeleted' | 'redirectNotStarted' | 'redirectHasEnded' | 'numEntries'>)>>>;
    })>;
});
export declare type GetUserQueryVariables = {
    userId: Scalars['ID'];
};
export declare type GetUserQuery = ({
    __typename?: 'Query';
} & {
    getUser: Maybe<({
        __typename?: 'User';
    } & Pick<User, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'> & {
        ownedBy: Maybe<({
            __typename?: 'User';
        } & Pick<User, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>)>;
        account: Maybe<({
            __typename?: 'Account';
        } & Pick<Account, 'id' | 'name' | 'website' | 'taxId' | 'ownerId' | 'planId' | 'createdAt' | 'updatedAt' | 'active' | 'numForms' | 'numUsers'>)>;
    })>;
});
export declare type GetPlanQueryVariables = {
    planId: Scalars['String'];
};
export declare type GetPlanQuery = ({
    __typename?: 'Query';
} & {
    getPlan: Maybe<({
        __typename?: 'Plan';
    } & Pick<Plan, 'id' | 'accountId' | 'ownerId' | 'planTypeId' | 'startDate' | 'endDate' | 'active' | 'lastBillDate' | 'createdAt' | 'updatedAt' | 'isDeleted'> & {
        account: ({
            __typename?: 'Account';
        } & Pick<Account, 'id' | 'name' | 'website' | 'taxId' | 'ownerId' | 'planId' | 'createdAt' | 'updatedAt' | 'active' | 'numForms' | 'numUsers'>);
        ownedBy: ({
            __typename?: 'User';
        } & Pick<User, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>);
        planType: Maybe<({
            __typename?: 'PlanType';
        } & Pick<PlanType, 'id' | 'ownerId' | 'name' | 'cost' | 'active' | 'billingTerm' | 'createdAt' | 'updatedAt' | 'isDeleted'>)>;
    })>;
});
export declare type GetActiveAccountPlanQueryVariables = {
    accountId: Scalars['String'];
};
export declare type GetActiveAccountPlanQuery = ({
    __typename?: 'Query';
} & {
    getActiveAccountPlan: Maybe<({
        __typename?: 'Plan';
    } & Pick<Plan, 'id' | 'accountId' | 'ownerId' | 'planTypeId' | 'startDate' | 'endDate' | 'active' | 'lastBillDate' | 'createdAt' | 'updatedAt' | 'isDeleted'> & {
        account: ({
            __typename?: 'Account';
        } & Pick<Account, 'id' | 'name' | 'website' | 'taxId' | 'ownerId' | 'planId' | 'createdAt' | 'updatedAt' | 'active' | 'numForms' | 'numUsers'>);
        ownedBy: ({
            __typename?: 'User';
        } & Pick<User, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>);
        planType: Maybe<({
            __typename?: 'PlanType';
        } & Pick<PlanType, 'id' | 'ownerId' | 'name' | 'cost' | 'active' | 'billingTerm' | 'createdAt' | 'updatedAt' | 'isDeleted'>)>;
    })>;
});
export declare type GetPlanTypeQueryVariables = {
    planTypeId: Scalars['String'];
};
export declare type GetPlanTypeQuery = ({
    __typename?: 'Query';
} & {
    getPlanType: Maybe<({
        __typename?: 'PlanType';
    } & Pick<PlanType, 'id' | 'ownerId' | 'name' | 'cost' | 'active' | 'billingTerm' | 'createdAt' | 'updatedAt' | 'isDeleted'> & {
        ownedBy: ({
            __typename?: 'User';
        } & Pick<User, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>);
    })>;
});
export declare type GetFormQueryVariables = {
    formId: Scalars['String'];
};
export declare type GetFormQuery = ({
    __typename?: 'Query';
} & {
    getForm: Maybe<({
        __typename?: 'Form';
    } & Pick<Form, 'id' | 'ownerId' | 'name' | 'description' | 'versionId' | 'versionActivatedDate' | 'accountId' | 'createdAt' | 'updatedAt' | 'startDate' | 'endDate' | 'isPaused' | 'isDeleted' | 'redirectNotStarted' | 'redirectHasEnded'> & {
        version: Maybe<({
            __typename?: 'FormVersion';
        } & Pick<FormVersion, 'id' | 'accountId' | 'formId' | 'ownerId' | 'createdAt' | 'displayName' | 'notes' | 'formData'>)>;
        ownedBy: ({
            __typename?: 'User';
        } & Pick<User, 'id' | 'email' | 'userGroup' | 'given_name' | 'family_name'>);
        account: ({
            __typename?: 'Account';
        } & Pick<Account, 'id' | 'name' | 'createdAt' | 'updatedAt' | 'active'>);
        versions: Maybe<Array<Maybe<({
            __typename?: 'FormVersion';
        } & Pick<FormVersion, 'id' | 'createdAt' | 'displayName' | 'notes'> & {
            ownedBy: ({
                __typename?: 'User';
            } & Pick<User, 'given_name' | 'family_name' | 'email'>);
        })>>>;
    })>;
});
export declare type GetFormVersionQueryVariables = {
    versionId: Scalars['String'];
};
export declare type GetFormVersionQuery = ({
    __typename?: 'Query';
} & {
    getFormVersion: Maybe<({
        __typename?: 'FormVersion';
    } & Pick<FormVersion, 'id' | 'accountId' | 'formId' | 'ownerId' | 'createdAt' | 'displayName' | 'notes' | 'formData'> & {
        ownedBy: ({
            __typename?: 'User';
        } & Pick<User, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>);
    })>;
});
export declare type GetIntegrationTypeQueryVariables = {
    integrationTypeId: Scalars['String'];
};
export declare type GetIntegrationTypeQuery = ({
    __typename?: 'Query';
} & {
    getIntegrationType: Maybe<({
        __typename?: 'IntegrationType';
    } & Pick<IntegrationType, 'id' | 'ownerId' | 'planTypeId' | 'name' | 'active' | 'createdAt' | 'updatedAt'> & {
        ownedBy: ({
            __typename?: 'User';
        } & Pick<User, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>);
        planType: Maybe<({
            __typename?: 'PlanType';
        } & Pick<PlanType, 'id' | 'ownerId' | 'name' | 'cost' | 'active' | 'billingTerm' | 'createdAt' | 'updatedAt' | 'isDeleted'>)>;
    })>;
});
export declare type GetIntegrationQueryVariables = {
    integrationId: Scalars['String'];
};
export declare type GetIntegrationQuery = ({
    __typename?: 'Query';
} & {
    getIntegration: Maybe<({
        __typename?: 'Integration';
    } & Pick<Integration, 'id' | 'integrationTypeId' | 'ownerId' | 'accountId' | 'formId' | 'active' | 'authType' | 'auth' | 'target' | 'method' | 'lastExecuted' | 'lastExecutionResult' | 'lastExecutionResultMessage' | 'createdAt' | 'updatedAt' | 'isDeleted'> & {
        integrationType: Maybe<({
            __typename?: 'IntegrationType';
        } & Pick<IntegrationType, 'id' | 'ownerId' | 'planTypeId' | 'name' | 'active' | 'createdAt' | 'updatedAt'>)>;
        form: ({
            __typename?: 'Form';
        } & Pick<Form, 'id' | 'ownerId' | 'name' | 'description' | 'versionId' | 'versionActivatedDate' | 'accountId' | 'createdAt' | 'updatedAt' | 'startDate' | 'endDate' | 'isPaused' | 'isDeleted' | 'redirectNotStarted' | 'redirectHasEnded'>);
    })>;
});
export declare type GetFormEntryQueryVariables = {
    formEntryId: Scalars['String'];
};
export declare type GetFormEntryQuery = ({
    __typename?: 'Query';
} & {
    getFormEntry: Maybe<({
        __typename?: 'FormEntry';
    } & Pick<FormEntry, 'id' | 'accountId' | 'formId' | 'data' | 'createdAt'> & {
        form: ({
            __typename?: 'Form';
        } & Pick<Form, 'id' | 'ownerId' | 'name' | 'description' | 'versionId' | 'versionActivatedDate' | 'accountId' | 'createdAt' | 'updatedAt' | 'startDate' | 'endDate' | 'isPaused' | 'isDeleted' | 'redirectNotStarted' | 'redirectHasEnded'>);
    })>;
});
export declare type ListAccountsQueryVariables = {
    offsetLimit?: Maybe<OffsetLimit>;
    filter?: Maybe<AccountFilterInput>;
    sort?: Maybe<AccountSortInput>;
};
export declare type ListAccountsQuery = ({
    __typename?: 'Query';
} & {
    listAccounts: Maybe<Array<Maybe<({
        __typename?: 'Account';
    } & Pick<Account, 'id' | 'name' | 'website' | 'taxId' | 'ownerId' | 'planId' | 'createdAt' | 'updatedAt' | 'active' | 'numForms' | 'numUsers'> & {
        addresses: Maybe<Array<Maybe<({
            __typename?: 'Address';
        } & Pick<Address, 'id' | 'name' | 'addressee' | 'addressType' | 'phone_number' | 'email' | 'street' | 'city' | 'state' | 'country'>)>>>;
        ownedBy: ({
            __typename?: 'User';
        } & Pick<User, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>);
        plan: Maybe<({
            __typename?: 'Plan';
        } & Pick<Plan, 'id' | 'accountId' | 'ownerId' | 'planTypeId' | 'startDate' | 'endDate' | 'active' | 'lastBillDate' | 'createdAt' | 'updatedAt' | 'isDeleted'>)>;
        users: Maybe<Array<Maybe<({
            __typename?: 'User';
        } & Pick<User, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>)>>>;
        forms: Maybe<Array<Maybe<({
            __typename?: 'Form';
        } & Pick<Form, 'id' | 'ownerId' | 'name' | 'description' | 'versionId' | 'versionActivatedDate' | 'accountId' | 'createdAt' | 'updatedAt' | 'startDate' | 'endDate' | 'isPaused' | 'isDeleted' | 'redirectNotStarted' | 'redirectHasEnded'>)>>>;
    })>>>;
});
export declare type ListUsersQueryVariables = {
    offsetLimit?: Maybe<OffsetLimit>;
    filter?: Maybe<UserFilterInput>;
    sort?: Maybe<UserSortInput>;
};
export declare type ListUsersQuery = ({
    __typename?: 'Query';
} & {
    listUsers: Maybe<Array<Maybe<({
        __typename?: 'User';
    } & Pick<User, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted'> & {
        ownedBy: Maybe<({
            __typename?: 'User';
        } & Pick<User, 'id' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>)>;
        account: Maybe<({
            __typename?: 'Account';
        } & Pick<Account, 'id' | 'name' | 'website' | 'taxId' | 'ownerId' | 'planId' | 'createdAt' | 'updatedAt' | 'active'>)>;
    })>>>;
});
export declare type ListPlansQueryVariables = {
    offsetLimit?: Maybe<OffsetLimit>;
    filter?: Maybe<PlanFilterInput>;
    sort?: Maybe<PlanSortInput>;
};
export declare type ListPlansQuery = ({
    __typename?: 'Query';
} & {
    listPlans: Maybe<Array<Maybe<({
        __typename?: 'Plan';
    } & Pick<Plan, 'id' | 'accountId' | 'ownerId' | 'planTypeId' | 'startDate' | 'endDate' | 'active' | 'lastBillDate' | 'createdAt' | 'updatedAt' | 'isDeleted'> & {
        account: ({
            __typename?: 'Account';
        } & Pick<Account, 'id' | 'name' | 'website' | 'taxId' | 'ownerId' | 'planId' | 'createdAt' | 'updatedAt' | 'active' | 'numForms' | 'numUsers'>);
        ownedBy: ({
            __typename?: 'User';
        } & Pick<User, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>);
        planType: Maybe<({
            __typename?: 'PlanType';
        } & Pick<PlanType, 'id' | 'ownerId' | 'name' | 'cost' | 'active' | 'billingTerm' | 'createdAt' | 'updatedAt' | 'isDeleted'>)>;
    })>>>;
});
export declare type ListPlanTypesQueryVariables = {
    offsetLimit?: Maybe<OffsetLimit>;
    filter?: Maybe<PlanTypeFilterInput>;
    sort?: Maybe<PlanTypeSortInput>;
};
export declare type ListPlanTypesQuery = ({
    __typename?: 'Query';
} & {
    listPlanTypes: Maybe<Array<Maybe<({
        __typename?: 'PlanType';
    } & Pick<PlanType, 'id' | 'ownerId' | 'name' | 'cost' | 'active' | 'billingTerm' | 'createdAt' | 'updatedAt' | 'isDeleted'> & {
        ownedBy: ({
            __typename?: 'User';
        } & Pick<User, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>);
    })>>>;
});
export declare type ListFormsQueryVariables = {
    offsetLimit?: Maybe<OffsetLimit>;
    filter?: Maybe<FormFilterInput>;
    sort?: Maybe<FormSortInput>;
};
export declare type ListFormsQuery = ({
    __typename?: 'Query';
} & {
    listForms: Maybe<Array<Maybe<({
        __typename?: 'Form';
    } & Pick<Form, 'id' | 'ownerId' | 'name' | 'description' | 'versionId' | 'versionActivatedDate' | 'accountId' | 'createdAt' | 'updatedAt' | 'startDate' | 'endDate' | 'isPaused' | 'isDeleted' | 'redirectNotStarted' | 'redirectHasEnded'> & {
        version: Maybe<({
            __typename?: 'FormVersion';
        } & Pick<FormVersion, 'id' | 'createdAt' | 'displayName' | 'notes'>)>;
        ownedBy: ({
            __typename?: 'User';
        } & Pick<User, 'id' | 'email' | 'given_name' | 'family_name'>);
        account: ({
            __typename?: 'Account';
        } & Pick<Account, 'id' | 'name'>);
    })>>>;
});
export declare type ListFormVersionsQueryVariables = {
    offsetLimit?: Maybe<OffsetLimit>;
    filter?: Maybe<FormVersionFilterInput>;
    sort?: Maybe<FormVersionSortInput>;
};
export declare type ListFormVersionsQuery = ({
    __typename?: 'Query';
} & {
    listFormVersions: Maybe<Array<Maybe<({
        __typename?: 'FormVersion';
    } & Pick<FormVersion, 'id' | 'accountId' | 'formId' | 'ownerId' | 'createdAt' | 'displayName' | 'notes' | 'formData'> & {
        ownedBy: ({
            __typename?: 'User';
        } & Pick<User, 'id' | 'email' | 'userGroup' | 'given_name' | 'family_name'>);
    })>>>;
});
export declare type ListIntegrationTypesQueryVariables = {
    offsetLimit?: Maybe<OffsetLimit>;
    filter?: Maybe<IntegrationTypeFilterInput>;
    sort?: Maybe<IntegrationTypeSortInput>;
};
export declare type ListIntegrationTypesQuery = ({
    __typename?: 'Query';
} & {
    listIntegrationTypes: Maybe<Array<Maybe<({
        __typename?: 'IntegrationType';
    } & Pick<IntegrationType, 'id' | 'ownerId' | 'planTypeId' | 'name' | 'active' | 'createdAt' | 'updatedAt'> & {
        ownedBy: ({
            __typename?: 'User';
        } & Pick<User, 'id' | 'ownerId' | 'accountId' | 'email' | 'userGroup' | 'given_name' | 'family_name' | 'phone_number' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'numForms'>);
        planType: Maybe<({
            __typename?: 'PlanType';
        } & Pick<PlanType, 'id' | 'ownerId' | 'name' | 'cost' | 'active' | 'billingTerm' | 'createdAt' | 'updatedAt' | 'isDeleted'>)>;
    })>>>;
});
export declare type ListIntegrationsQueryVariables = {
    offsetLimit?: Maybe<OffsetLimit>;
    filter?: Maybe<IntegrationFilterInput>;
    sort?: Maybe<IntegrationSortInput>;
};
export declare type ListIntegrationsQuery = ({
    __typename?: 'Query';
} & {
    listIntegrations: Maybe<Array<Maybe<({
        __typename?: 'Integration';
    } & Pick<Integration, 'id' | 'integrationTypeId' | 'ownerId' | 'accountId' | 'formId' | 'active' | 'authType' | 'auth' | 'target' | 'method' | 'lastExecuted' | 'lastExecutionResult' | 'lastExecutionResultMessage' | 'createdAt' | 'updatedAt' | 'isDeleted'> & {
        integrationType: Maybe<({
            __typename?: 'IntegrationType';
        } & Pick<IntegrationType, 'id' | 'ownerId' | 'planTypeId' | 'name' | 'active' | 'createdAt' | 'updatedAt'>)>;
        form: ({
            __typename?: 'Form';
        } & Pick<Form, 'id' | 'ownerId' | 'name' | 'description' | 'versionId' | 'versionActivatedDate' | 'accountId' | 'createdAt' | 'updatedAt' | 'startDate' | 'endDate' | 'isPaused' | 'isDeleted' | 'redirectNotStarted' | 'redirectHasEnded'>);
    })>>>;
});
export declare type ListFormEntriesQueryVariables = {
    offsetLimit?: Maybe<OffsetLimit>;
    filter?: Maybe<FormEntryFilterInput>;
    sort?: Maybe<FormEntrySortInput>;
};
export declare type ListFormEntriesQuery = ({
    __typename?: 'Query';
} & {
    listFormEntries: Maybe<Array<Maybe<({
        __typename?: 'FormEntry';
    } & Pick<FormEntry, 'id' | 'accountId' | 'formId' | 'data' | 'createdAt'> & {
        form: ({
            __typename?: 'Form';
        } & Pick<Form, 'id' | 'ownerId' | 'name' | 'description' | 'versionId' | 'versionActivatedDate' | 'accountId' | 'createdAt' | 'updatedAt' | 'startDate' | 'endDate' | 'isPaused' | 'isDeleted' | 'redirectNotStarted' | 'redirectHasEnded'>);
    })>>>;
});
