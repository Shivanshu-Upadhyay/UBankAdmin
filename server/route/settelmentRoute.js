// 🤓 HELPERS  FUNCTIONS🤓
const helper = require("../helper/jwt");
const settelmentRoute = require('express').Router()
// 🤓 HELPERS FUNCTIONS END🤓
const BankDeposit = require("../Controller/SettlementController/bankDeposit");
const LocalPayouts = require("../Controller/SettlementController/localPayouts");
const AddFund = require("../Controller/SettlementController/addFund");
const LocalSettlement = require("../Controller/SettlementController/localSettlement");
const InternationalSettlement = require("../Controller/SettlementController/internationalSettlement");
const disputesChargeback = require("../Controller/SettlementController/disputesChargeback");
const Refunds = require("../Controller/SettlementController/refunds");
// CREATING ROUTERS 🤓
settelmentRoute.post('/api/settelment/bankDeposit', helper.verify, BankDeposit.default)
settelmentRoute.post('/api/settelment/localPayouts', helper.verify, LocalPayouts.default)
settelmentRoute.post('/api/settelment/addFundRead', helper.verify, AddFund.default)
settelmentRoute.post('/api/settelment/localSettlement',helper.verify,LocalSettlement.default)
settelmentRoute.post('/api/settelment/internationalSettlement',helper.verify,InternationalSettlement.default)
settelmentRoute.post('/api/settelment/disputesChargeback',helper.verify,disputesChargeback.default)
settelmentRoute.post('/api/settelment/refunds',helper.verify,Refunds.default)

module.exports = settelmentRoute