import short from "short-uuid";
const uuidTranslator = short();

export function getDeliveryStreamName (stage: string, tenantId: string, formId: string) {
    return `${stage}-stream-${uuidTranslator.fromUUID(tenantId)}-${uuidTranslator.fromUUID(formId)}`;
}

export function getDeliveryStreamPrefix (tenantId: string, formId: string) {
    return `home/${tenantId}/${formId}/processed/`;
}

export function getDeliveryStreamErrorPrefix (tenantId: string, formId: string) {
    return `home/${tenantId}/${formId}/error/`;
}