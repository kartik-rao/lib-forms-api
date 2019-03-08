// tslint:disable
// this is an auto generated file. This will be overwritten

export const onCreatePlanType = `subscription OnCreatePlanType {
  onCreatePlanType {
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
export const onUpdatePlanType = `subscription OnUpdatePlanType {
  onUpdatePlanType {
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
export const onDeletePlanType = `subscription OnDeletePlanType {
  onDeletePlanType {
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
export const onCreatePlan = `subscription OnCreatePlan {
  onCreatePlan {
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
export const onUpdatePlan = `subscription OnUpdatePlan {
  onUpdatePlan {
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
export const onDeletePlan = `subscription OnDeletePlan {
  onDeletePlan {
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
export const onCreateUser = `subscription OnCreateUser {
  onCreateUser {
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
export const onUpdateUser = `subscription OnUpdateUser {
  onUpdateUser {
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
export const onDeleteUser = `subscription OnDeleteUser {
  onDeleteUser {
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
export const onCreateAccount = `subscription OnCreateAccount {
  onCreateAccount {
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
export const onUpdateAccount = `subscription OnUpdateAccount {
  onUpdateAccount {
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
export const onDeleteAccount = `subscription OnDeleteAccount {
  onDeleteAccount {
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
export const onCreateIntegration = `subscription OnCreateIntegration {
  onCreateIntegration {
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
export const onUpdateIntegration = `subscription OnUpdateIntegration {
  onUpdateIntegration {
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
export const onDeleteIntegration = `subscription OnDeleteIntegration {
  onDeleteIntegration {
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
export const onCreateForm = `subscription OnCreateForm {
  onCreateForm {
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
export const onUpdateForm = `subscription OnUpdateForm {
  onUpdateForm {
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
export const onDeleteForm = `subscription OnDeleteForm {
  onDeleteForm {
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
export const onCreateFormEntry = `subscription OnCreateFormEntry {
  onCreateFormEntry {
    id
    data
  }
}
`;
export const onUpdateFormEntry = `subscription OnUpdateFormEntry {
  onUpdateFormEntry {
    id
    data
  }
}
`;
export const onDeleteFormEntry = `subscription OnDeleteFormEntry {
  onDeleteFormEntry {
    id
    data
  }
}
`;
