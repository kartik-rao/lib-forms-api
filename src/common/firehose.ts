export function getDeliveryStreamName (serviceName: string, stage: string, tenantId: string, formId: string) {
    return `${serviceName}-${stage}-${tenantId}-${formId}`;
}

export function getDeliveryStreamPrefix (tenantId: string, formId: string) {
    return `/home/${tenantId}/${formId}/processed`;
}

export function getDeliveryStreamErrorPrefix (tenantId: string, formId: string) {
    return `/home/${tenantId}/${formId}/error`;
}