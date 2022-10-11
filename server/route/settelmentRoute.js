// 🤓 HELPERS  FUNCTIONS🤓
const helper = require("../helper/jwt");
const settelmentRoute = require('express').Router()
// 🤓 HELPERS FUNCTIONS END🤓

const BankDeposit = require("../Controller/SettlementController/bankDeposit");


// CREATING ROUTERS 🤓
settelmentRoute.post('/settelment/bankDeposit', helper.verify, BankDeposit.default )

module.exports = settelmentRoute