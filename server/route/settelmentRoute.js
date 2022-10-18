// 🤓 HELPERS  FUNCTIONS🤓
const helper = require("../helper/jwt");
const settelmentRoute = require('express').Router()
// 🤓 HELPERS FUNCTIONS END🤓

const BankDeposit = require("../Controller/SettlementController/bankDeposit");
const LocalPayouts = require("../Controller/SettlementController/localPayouts");


// CREATING ROUTERS 🤓
settelmentRoute.post('/api/settelment/bankDeposit', helper.verify, BankDeposit.default )
settelmentRoute.post('/api/settelment/localPayouts', helper.verify, LocalPayouts.default )

module.exports = settelmentRoute