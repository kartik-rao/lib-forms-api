export type EntryMessageBodyKey      = "__RequestId"|"__RequestTimestamp"|"__RequestIpAddress"|"__RequestUserAgent"|"Payload";
export type EntryMessageAttributeKey = "Region"|"Service"|"Stage"|"FormId"|"TenantId"|"StreamName";
export type EntryMessageBody         = Record<EntryMessageBodyKey, string>;
export type EntryMessageAttributeMap<T> = { [key in EntryMessageAttributeKey]?: T };