// tslint:disable
// this is an auto generated file. This will be overwritten

export const getPlanType = `query GetPlanType($id: ID!) {
  getPlanType(id: $id) {
    id
    name
    displayName
    description
    isFree
    billingCycle
    billingAmount
  }
}
`;
export const listPlanTypes = `query ListPlanTypes(
  $filter: ModelPlanTypeFilterInput
  $limit: Int
  $nextToken: String
) {
  listPlanTypes(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      displayName
      description
      isFree
      billingCycle
      billingAmount
    }
    nextToken
  }
}
`;
export const getPlan = `query GetPlan($id: ID!) {
  getPlan(id: $id) {
    id
    type {
      id
      name
      displayName
      description
      isFree
      billingCycle
      billingAmount
    }
    startDate
    endDate
  }
}
`;
export const listPlans = `query ListPlans(
  $filter: ModelPlanFilterInput
  $limit: Int
  $nextToken: String
) {
  listPlans(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      type {
        id
        name
        displayName
        description
        isFree
        billingCycle
        billingAmount
      }
      startDate
      endDate
    }
    nextToken
  }
}
`;
export const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    name
    account {
      id
      name
      enabled
      createdDate
      plan {
        id
        startDate
        endDate
      }
      forms {
        id
        name
        groupName
        createdDate
        updatedDate
        starts
        ends
        data
        version
      }
      integrations {
        id
        type
        externalId
        context
        authType
        authUrl
        credentials
        disabled
        version
      }
      lastPaymentDate
      lastPaymentAmount
      owingAmount
      users {
        id
        name
        group
        version
      }
      version
    }
    group
    version
  }
}
`;
export const listUsers = `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      account {
        id
        name
        enabled
        createdDate
        lastPaymentDate
        lastPaymentAmount
        owingAmount
        version
      }
      group
      version
    }
    nextToken
  }
}
`;
export const getAccount = `query GetAccount($id: ID!) {
  getAccount(id: $id) {
    id
    name
    enabled
    createdDate
    plan {
      id
      type {
        id
        name
        displayName
        description
        isFree
        billingCycle
        billingAmount
      }
      startDate
      endDate
    }
    forms {
      id
      name
      groupName
      integration {
        id
        type
        externalId
        context
        authType
        authUrl
        credentials
        disabled
        version
      }
      createdDate
      updatedDate
      starts
      ends
      data
      entries {
        id
        data
      }
      version
    }
    integrations {
      id
      type
      externalId
      context
      authType
      authUrl
      credentials
      disabled
      version
    }
    lastPaymentDate
    lastPaymentAmount
    owingAmount
    users {
      id
      name
      account {
        id
        name
        enabled
        createdDate
        lastPaymentDate
        lastPaymentAmount
        owingAmount
        version
      }
      group
      version
    }
    version
  }
}
`;
export const listAccounts = `query ListAccounts(
  $filter: ModelAccountFilterInput
  $limit: Int
  $nextToken: String
) {
  listAccounts(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      enabled
      createdDate
      plan {
        id
        startDate
        endDate
      }
      forms {
        id
        name
        groupName
        createdDate
        updatedDate
        starts
        ends
        data
        version
      }
      integrations {
        id
        type
        externalId
        context
        authType
        authUrl
        credentials
        disabled
        version
      }
      lastPaymentDate
      lastPaymentAmount
      owingAmount
      users {
        id
        name
        group
        version
      }
      version
    }
    nextToken
  }
}
`;
export const getIntegration = `query GetIntegration($id: ID!) {
  getIntegration(id: $id) {
    id
    type
    externalId
    context
    authType
    authUrl
    credentials
    disabled
    version
  }
}
`;
export const listIntegrations = `query ListIntegrations(
  $filter: ModelIntegrationFilterInput
  $limit: Int
  $nextToken: String
) {
  listIntegrations(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      type
      externalId
      context
      authType
      authUrl
      credentials
      disabled
      version
    }
    nextToken
  }
}
`;
export const getForm = `query GetForm($id: ID!) {
  getForm(id: $id) {
    id
    name
    groupName
    integration {
      id
      type
      externalId
      context
      authType
      authUrl
      credentials
      disabled
      version
    }
    createdDate
    updatedDate
    starts
    ends
    data
    entries {
      id
      data
    }
    version
  }
}
`;
export const listForms = `query ListForms(
  $filter: ModelFormFilterInput
  $limit: Int
  $nextToken: String
) {
  listForms(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      groupName
      integration {
        id
        type
        externalId
        context
        authType
        authUrl
        credentials
        disabled
        version
      }
      createdDate
      updatedDate
      starts
      ends
      data
      entries {
        id
        data
      }
      version
    }
    nextToken
  }
}
`;
export const getFormEntry = `query GetFormEntry($id: ID!) {
  getFormEntry(id: $id) {
    id
    data
  }
}
`;
export const listFormEntrys = `query ListFormEntrys(
  $filter: ModelFormEntryFilterInput
  $limit: Int
  $nextToken: String
) {
  listFormEntrys(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      data
    }
    nextToken
  }
}
`;
