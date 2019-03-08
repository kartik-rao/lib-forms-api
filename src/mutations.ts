// tslint:disable
// this is an auto generated file. This will be overwritten

export const createPlanType = `mutation CreatePlanType($input: CreatePlanTypeInput!) {
  createPlanType(input: $input) {
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
export const updatePlanType = `mutation UpdatePlanType($input: UpdatePlanTypeInput!) {
  updatePlanType(input: $input) {
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
export const deletePlanType = `mutation DeletePlanType($input: DeletePlanTypeInput!) {
  deletePlanType(input: $input) {
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
export const createPlan = `mutation CreatePlan($input: CreatePlanInput!) {
  createPlan(input: $input) {
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
export const updatePlan = `mutation UpdatePlan($input: UpdatePlanInput!) {
  updatePlan(input: $input) {
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
export const deletePlan = `mutation DeletePlan($input: DeletePlanInput!) {
  deletePlan(input: $input) {
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
export const createUser = `mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
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
export const updateUser = `mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
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
export const deleteUser = `mutation DeleteUser($input: DeleteUserInput!) {
  deleteUser(input: $input) {
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
export const createAccount = `mutation CreateAccount($input: CreateAccountInput!) {
  createAccount(input: $input) {
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
export const updateAccount = `mutation UpdateAccount($input: UpdateAccountInput!) {
  updateAccount(input: $input) {
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
export const deleteAccount = `mutation DeleteAccount($input: DeleteAccountInput!) {
  deleteAccount(input: $input) {
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
export const createIntegration = `mutation CreateIntegration($input: CreateIntegrationInput!) {
  createIntegration(input: $input) {
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
export const updateIntegration = `mutation UpdateIntegration($input: UpdateIntegrationInput!) {
  updateIntegration(input: $input) {
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
export const deleteIntegration = `mutation DeleteIntegration($input: DeleteIntegrationInput!) {
  deleteIntegration(input: $input) {
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
export const createForm = `mutation CreateForm($input: CreateFormInput!) {
  createForm(input: $input) {
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
export const updateForm = `mutation UpdateForm($input: UpdateFormInput!) {
  updateForm(input: $input) {
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
export const deleteForm = `mutation DeleteForm($input: DeleteFormInput!) {
  deleteForm(input: $input) {
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
export const createFormEntry = `mutation CreateFormEntry($input: CreateFormEntryInput!) {
  createFormEntry(input: $input) {
    id
    data
  }
}
`;
export const updateFormEntry = `mutation UpdateFormEntry($input: UpdateFormEntryInput!) {
  updateFormEntry(input: $input) {
    id
    data
  }
}
`;
export const deleteFormEntry = `mutation DeleteFormEntry($input: DeleteFormEntryInput!) {
  deleteFormEntry(input: $input) {
    id
    data
  }
}
`;
