"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IAddressType;
(function (IAddressType) {
    IAddressType["Billing"] = "BILLING";
    IAddressType["Contact"] = "CONTACT";
})(IAddressType = exports.IAddressType || (exports.IAddressType = {}));
var IBooleanFilterExpression;
(function (IBooleanFilterExpression) {
    IBooleanFilterExpression["Ne"] = "ne";
    IBooleanFilterExpression["Eq"] = "eq";
})(IBooleanFilterExpression = exports.IBooleanFilterExpression || (exports.IBooleanFilterExpression = {}));
var IFilterWith;
(function (IFilterWith) {
    IFilterWith["And"] = "AND";
    IFilterWith["Or"] = "OR";
})(IFilterWith = exports.IFilterWith || (exports.IFilterWith = {}));
var INumericFilterExpression;
(function (INumericFilterExpression) {
    INumericFilterExpression["In"] = "in";
    INumericFilterExpression["Ne"] = "ne";
    INumericFilterExpression["Eq"] = "eq";
    INumericFilterExpression["Le"] = "le";
    INumericFilterExpression["Lt"] = "lt";
    INumericFilterExpression["Ge"] = "ge";
    INumericFilterExpression["Gt"] = "gt";
    INumericFilterExpression["Between"] = "between";
    INumericFilterExpression["NotBetween"] = "notBetween";
    INumericFilterExpression["IsNull"] = "isNull";
    INumericFilterExpression["IsNotNull"] = "isNotNull";
})(INumericFilterExpression = exports.INumericFilterExpression || (exports.INumericFilterExpression = {}));
var ISortOrder;
(function (ISortOrder) {
    ISortOrder["Asc"] = "asc";
    ISortOrder["Desc"] = "desc";
})(ISortOrder = exports.ISortOrder || (exports.ISortOrder = {}));
var IStringFilterExpression;
(function (IStringFilterExpression) {
    IStringFilterExpression["Ne"] = "ne";
    IStringFilterExpression["Eq"] = "eq";
    IStringFilterExpression["Contains"] = "contains";
    IStringFilterExpression["NotContains"] = "notContains";
    IStringFilterExpression["StartsWith"] = "startsWith";
    IStringFilterExpression["IsNull"] = "isNull";
    IStringFilterExpression["IsNotNull"] = "isNotNull";
    IStringFilterExpression["In"] = "in";
})(IStringFilterExpression = exports.IStringFilterExpression || (exports.IStringFilterExpression = {}));
var IUserGroup;
(function (IUserGroup) {
    IUserGroup["Admin"] = "Admin";
    IUserGroup["AccountAdmin"] = "AccountAdmin";
    IUserGroup["AccountEditor"] = "AccountEditor";
    IUserGroup["AccountViewer"] = "AccountViewer";
})(IUserGroup = exports.IUserGroup || (exports.IUserGroup = {}));
