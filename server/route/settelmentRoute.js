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
const Commissions = require("../Controller/SettlementController/commissions");

// ABHHINEET START
const amountreqController = require("../Controller/SettlementController/Dashboard/amountreqController");
const localSettlementController = require("../Controller/SettlementController/Dashboard/localSettlementController");
const InternationalSettlementController = require("../Controller/SettlementController/Dashboard/InternationalSettlementController");
const commissionController = require("../Controller/SettlementController/Dashboard/commissionController");
const dashboardTableController = require("../Controller/SettlementController/Dashboard/dahsboardTable");
// ABHHINEET END

// CREATING ROUTERS 🤓

//1-> READ API--->
settelmentRoute.post('/api/settelment/bankDeposit', helper.verify, BankDeposit.default)
settelmentRoute.post('/api/settelment/localPayouts', helper.verify, LocalPayouts.default)
settelmentRoute.post('/api/settelment/addFundRead', helper.verify, AddFund.default)
settelmentRoute.post('/api/settelment/localSettlement',helper.verify,LocalSettlement.default)
settelmentRoute.post('/api/settelment/internationalSettlement',helper.verify,InternationalSettlement.default)
settelmentRoute.post('/api/settelment/disputesChargeback',helper.verify,disputesChargeback.default)
settelmentRoute.post('/api/settelment/refunds',helper.verify,Refunds.default)
settelmentRoute.post('/api/settelment/commissions',helper.verify,Commissions.default)

// 2-> CREATE AND UPDATE API --->
settelmentRoute.post('/api/settelment/bankDeposit/createAndUpdate',helper.verify,BankDeposit.createAndUpdate)
settelmentRoute.post('/api/settelment/addFunds/merAndCurr',helper.verify,AddFund.curMer)
settelmentRoute.post('/api/settelment/addFunds/preBal',helper.verify,AddFund.murAndCurSelect)
settelmentRoute.post('/api/settelment/addFunds/addFund',helper.verify,AddFund.addFund)







// ABHHINEET START
settelmentRoute.post('/yesterday', helper.verify, amountreqController.yesterday);
settelmentRoute.post('/weekly', helper.verify, amountreqController.weekly);
settelmentRoute.post('/monthly', helper.verify, amountreqController.monthly);
settelmentRoute.post('/yearly', helper.verify, amountreqController.yearly);

settelmentRoute.post('/yesterdaySettlement', helper.verify, localSettlementController.yesterdaySettlement);
settelmentRoute.post('/weeklySettlement', helper.verify, localSettlementController.weeklySettlement);
settelmentRoute.post('/monthlySettlement', helper.verify, localSettlementController.monthlySettlement);
settelmentRoute.post('/yearlySettlement', helper.verify, localSettlementController.yearlySettlement);

settelmentRoute.post('/yesterdayInternational', helper.verify, InternationalSettlementController.yesterdayInternational);
settelmentRoute.post('/weeklyInternational', helper.verify, InternationalSettlementController.weeklyInternational);
settelmentRoute.post('/monthlyInternational', helper.verify, InternationalSettlementController.monthlyInternational);
settelmentRoute.post('/yearlyInternational', helper.verify, InternationalSettlementController.yearlyInternational);

settelmentRoute.post('/yesterdayCommissions', helper.verify, commissionController.yesterdayCommissions);
settelmentRoute.post('/weeklyCommissions', helper.verify, commissionController.weeklyCommissions);
settelmentRoute.post('/monthlyCommissions', helper.verify, commissionController.monthlyCommissions);
settelmentRoute.post('/yearlyCommissions', helper.verify, commissionController.yearlyCommissions);

settelmentRoute.post('/dashboardTable', helper.verify, dashboardTableController.dashboardTable);
// ABHHINEET END

module.exports = settelmentRoute