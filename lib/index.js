"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AddressType;
(function (AddressType) {
    AddressType["Billing"] = "BILLING";
    AddressType["Contact"] = "CONTACT";
})(AddressType = exports.AddressType || (exports.AddressType = {}));
var BooleanFilterExpression;
(function (BooleanFilterExpression) {
    BooleanFilterExpression["Ne"] = "ne";
    BooleanFilterExpression["Eq"] = "eq";
})(BooleanFilterExpression = exports.BooleanFilterExpression || (exports.BooleanFilterExpression = {}));
var FilterWith;
(function (FilterWith) {
    FilterWith["And"] = "AND";
    FilterWith["Or"] = "OR";
})(FilterWith = exports.FilterWith || (exports.FilterWith = {}));
var NumericFilterExpression;
(function (NumericFilterExpression) {
    NumericFilterExpression["In"] = "in";
    NumericFilterExpression["Ne"] = "ne";
    NumericFilterExpression["Eq"] = "eq";
    NumericFilterExpression["Le"] = "le";
    NumericFilterExpression["Lt"] = "lt";
    NumericFilterExpression["Ge"] = "ge";
    NumericFilterExpression["Gt"] = "gt";
    NumericFilterExpression["Between"] = "between";
    NumericFilterExpression["NotBetween"] = "notBetween";
    NumericFilterExpression["IsNull"] = "isNull";
    NumericFilterExpression["IsNotNull"] = "isNotNull";
})(NumericFilterExpression = exports.NumericFilterExpression || (exports.NumericFilterExpression = {}));
var SortOrder;
(function (SortOrder) {
    SortOrder["Asc"] = "asc";
    SortOrder["Desc"] = "desc";
})(SortOrder = exports.SortOrder || (exports.SortOrder = {}));
var StringFilterExpression;
(function (StringFilterExpression) {
    StringFilterExpression["Ne"] = "ne";
    StringFilterExpression["Eq"] = "eq";
    StringFilterExpression["Contains"] = "contains";
    StringFilterExpression["NotContains"] = "notContains";
    StringFilterExpression["StartsWith"] = "startsWith";
    StringFilterExpression["IsNull"] = "isNull";
    StringFilterExpression["IsNotNull"] = "isNotNull";
    StringFilterExpression["In"] = "in";
})(StringFilterExpression = exports.StringFilterExpression || (exports.StringFilterExpression = {}));
