const subAdminController = require("../Controller/subAdminController");
const midController = require("../Controller/midController");
const loginController = require("../Controller/loginController");
const bankCodeAkontoController = require("../Controller/bankCodeAkontoController");
const bankCodeController = require("../Controller/bankCodeController");
const contactController = require("../Controller/contactController");
const siteSettingController = require("../Controller/settingController/siteSettingController");
const currencyController = require("../Controller/settingController/currencyController");
const exchangeController = require("../Controller/settingController/exchangeController");
const allUpiController = require("../Controller/SettingController/allUpiController");
const merchantAdminController = require("../Controller/merchantAdminController");
const changePasswordController = require("../Controller/changePassController");
// SATBIR CODE 
const paymentGatewayController = require("../Controller/paymentController");
const chineseController = require("../Controller/chineseController");
const transactionMTController = require("../Controller/transactionMTController");
const transactionMRController = require("../Controller/transactionMRController");
const transactionMEODController = require("../Controller/transactionMEODController");
const transactionPMController = require("../Controller/transactionPMController");
const settlementController = require("../Controller/settlementController");
// END SATBIR CODE
const route = require("express").Router();
const multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../images"));
  },
  filename: function (req, file, cb) {
    let imgname = new Date().toString();
    imgname = imgname.replace(/ |:|\+|\(|\)/gi, "-");
    let imgext = path.extname(file.originalname);
    let image = `${imgname}${imgext}`;
    cb(null, image);
  },
});
const uploads = multer({ storage: storage });
const helper = require("../helper/jwt");
// Login Controller
route.post("/login", uploads.none(),loginController.login);
route.post("/modulePesmission", uploads.none(),loginController.modulePesmission);
// ❌❌❌❌❌❌❌🔚🔚🔚🔚🔚🔚🔚🔚👋👋👋👋👋👋👋👋🔚🔚🔚🔚🔚🔚❌❌❌❌❌❌❌
//Mid Controller 
route.post("/readMid", uploads.none(), helper.verify, midController.readMid);
route.post("/updateMid", uploads.none(), helper.verify, midController.updateMid);
route.post("/deleteMid", uploads.none(), helper.verify, midController.deleteMid);
route.post("/createMid", uploads.none(), helper.verify, midController.createMid);
route.post("/readUpdateMid", uploads.none(), helper.verify, midController.readUpdateMid);
// ❌❌❌❌❌❌❌🔚🔚🔚🔚🔚🔚🔚🔚👋👋👋👋👋👋👋👋🔚🔚🔚🔚🔚🔚❌❌❌❌❌❌❌
//BankCode Akonto Controller 
route.post("/readBankCodeAkonto", uploads.none(), helper.verify, bankCodeAkontoController.readBankCodeAkonto);
route.post("/updateBankCodeAkonto", uploads.none(), helper.verify, bankCodeAkontoController.updateBankCodeAkonto);
route.post("/deleteBankCodeAkonto", uploads.none(), helper.verify, bankCodeAkontoController.deleteBankCodeAkonto);
route.post("/createBankCodeAkonto", uploads.none(), helper.verify, bankCodeAkontoController.createBankCodeAkonto);
route.post("/readUpdateBankCodeAkonto", uploads.none(), helper.verify, bankCodeAkontoController.readUpdateBankCodeAkonto);
route.post("/toggleBankCodeAkonto", uploads.none(), helper.verify, bankCodeAkontoController.toggleBankCodeAkonto);
// ❌❌❌❌❌❌❌🔚🔚🔚🔚🔚🔚🔚🔚👋👋👋👋👋👋👋👋🔚🔚🔚🔚🔚🔚❌❌❌❌❌❌❌
//BankCode  Controller 
route.post("/readBankCode", uploads.none(), helper.verify, bankCodeController.readBankCode);
route.post("/updateBankCode", uploads.none(), helper.verify, bankCodeController.updateBankCode);
route.post("/deleteBankCode", uploads.none(), helper.verify, bankCodeController.deleteBankCode);
route.post("/createBankCode", uploads.none(), helper.verify, bankCodeController.createBankCode);
route.post("/readUpdateBankCode", uploads.none(), helper.verify, bankCodeController.readUpdateBankCode);
route.post("/toggleBankCode", uploads.none(), helper.verify, bankCodeController.toggleBankCode);
route.post("/readType1BankCode", uploads.none(), helper.verify, bankCodeController.readType1BankCode);
route.post("/readType2BankCode", uploads.none(), helper.verify, bankCodeController.readType2BankCode);
//❌❌❌❌❌❌❌🔚🔚🔚🔚🔚🔚🔚🔚👋👋👋👋👋👋👋👋🔚🔚🔚🔚🔚🔚❌❌❌❌❌❌❌
//Contact Controller
route.post("/contact", uploads.none(), helper.verify, contactController.Contact);
route.post("/deleteContact", uploads.none(), helper.verify, contactController.deleteContact);
route.post("/readContact", uploads.none(), helper.verify, contactController.readContact);
//❌❌❌❌❌❌❌🔚🔚🔚🔚🔚🔚🔚🔚👋👋👋👋👋👋👋👋🔚🔚🔚🔚🔚🔚❌❌❌❌❌❌❌
//Merchant Admin Controller
route.post("/merchantAdmin", uploads.none(), helper.verify, merchantAdminController.merchantAdmin);
route.post("/updateSelectKey", uploads.none(), helper.verify, merchantAdminController.updateSelectKey);
route.post("/deleteMerchantAdmin", uploads.none(), helper.verify, merchantAdminController.deleteMerchantAdmin);
route.post("/readOneMerchantAdmin", uploads.none(), helper.verify, merchantAdminController.readOneMerchantAdmin);
route.post("/updateWallet", uploads.none(), helper.verify, merchantAdminController.updateWallet);
route.post("/createMerchantAdmin", uploads.none(), helper.verify, merchantAdminController.createMerchantAdmin);
//❌❌❌❌❌❌❌🔚🔚🔚🔚🔚🔚🔚🔚👋👋👋👋👋👋👋👋🔚🔚🔚🔚🔚🔚❌❌❌❌❌❌❌
//Site Setting Controller
route.post("/siteSetting", uploads.none(), helper.verify, siteSettingController.siteSetting);
route.post("/updateSiteSetting", uploads.none(), helper.verify, siteSettingController.updateSiteSetting);
// Currency Setting  
route.post("/defaultCurrency", uploads.none(), helper.verify, currencyController.defaultCurrency);
route.post("/deleteCurrency", uploads.none(), helper.verify, currencyController.deleteCurrency);
route.post("/createCurrency", uploads.none(), helper.verify, currencyController.createCurrency);
route.post("/readOneCurrency", uploads.none(), helper.verify, currencyController.readOneCurrency);
route.post("/updateCurrency", uploads.none(), helper.verify, currencyController.updateCurrency);
// Exchange Setting Controller
route.post("/defaultExchange", uploads.none(), helper.verify, exchangeController.defaultExchange);
route.post("/deleteExchange", uploads.none(), helper.verify, exchangeController.deleteExchange);
route.post("/createExchange", uploads.none(), helper.verify, exchangeController.createExchange);
route.post("/readOneExchange", uploads.none(), helper.verify, exchangeController.readOneExchange);
route.post("/updateExchange", uploads.none(), helper.verify, exchangeController.updateExchange);
// AllUpi Setting Controller
route.post("/defaultAllUpi", uploads.none(), helper.verify, allUpiController.defaultAllUpi);
route.post("/createAllUpi", uploads.none(), helper.verify, allUpiController.createAllUpi);
//❌❌❌❌❌❌❌🔚🔚🔚🔚🔚🔚🔚🔚👋👋👋👋👋👋👋👋🔚🔚🔚🔚🔚🔚❌❌❌❌❌❌❌
// Change Password Controller
route.post("/changePassword", uploads.none(), helper.verify, changePasswordController.changePassword);
//❌❌❌❌❌❌❌🔚🔚🔚🔚🔚🔚🔚🔚👋👋👋👋👋👋👋👋🔚🔚🔚🔚🔚🔚❌❌❌❌❌❌❌


// 😎😎😎😎😎😎😎😎😎😎😎😎SATBIR API START😎😎😎😎😎😎😎😎😎😎😎😎😎
// SubAdmin Module
route.post('/subAdmin',uploads.none(),subAdminController.subAdmin);
route.post('/toggleSubAdmin',uploads.none(),subAdminController.toggleSubAdmin);
route.post('/deleteSubAdmin',uploads.none(),subAdminController.deleteSubAdmin);
route.post('/permissionSubAdmin',uploads.none(),subAdminController.permissionSubAdmin);
route.post('/createSubAdmin',uploads.none(),subAdminController.createSubAdmin);
route.post('/getRole',uploads.none(),subAdminController.getRole);
route.post('/getPermissionDetails',uploads.none(),subAdminController.getPermissionDetails);
route.post('/getViewSubAdmin',uploads.none(),subAdminController.getViewSubAdmin);
route.post('/updateSubAdmin',uploads.none(),subAdminController.updateSubAdmin);
//🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚
//Payment Gateway
route.post('/paymentGateway',uploads.none(),paymentGatewayController.paymentGateway);
route.post('/getId',uploads.none(),paymentGatewayController.getId);
route.post('/edit',uploads.none(),paymentGatewayController.edit);
route.post('/create',uploads.none(),paymentGatewayController.create);
route.post('/delete',uploads.none(),paymentGatewayController.delete);
route.post('/togglePayment',uploads.none(),paymentGatewayController.togglePayment);
//🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚

// Chinese Controller
route.post('/defaultChinese',uploads.none(),chineseController.defaultChinese);
route.post('/getIdChinese',uploads.none(),chineseController.getIdChinese);
route.post('/editChinese',uploads.none(),chineseController.editChinese);
route.post('/deleteChinese',uploads.none(),chineseController.deleteChinese);
route.post('/createChinese',uploads.none(),chineseController.createChinese);
route.post('/toggleChinese',uploads.none(),chineseController.toggleChinese);
//🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚
//Transaction Controller😎

// Merchant Transaction----1
route.post('/defaultMT',uploads.none(),transactionMTController.defaultMT);
route.post('/getIdMT',uploads.none(),transactionMTController.getIdMT);
route.post('/toggleStatusMT',uploads.none(),transactionMTController.toggleStatusMT);
route.post('/createMT',uploads.none(),transactionMTController.createMT);
route.post('/getCurrencyMT',uploads.none(),transactionMTController.getCurrencyMT);

// End Of Day------2
route.post('/defaultMEOD',uploads.none(),transactionMEODController.defaultMEOD);
route.post('/toggleStatusMEOD',uploads.none(),transactionMEODController.toggleStatusMEOD);
// Merchant Refund---3
route.post('/defaultMR',uploads.none(),transactionMRController.defaultMR);
// Payout Merchant---4
route.post('/defaultPM',uploads.none(),transactionPMController.defaultPM);
route.post('/toggleStatusPM',uploads.none(),transactionPMController.toggleStatusPM);
route.post('/createPM',uploads.none(),transactionPMController.createPM);
route.post('/getCurrency',uploads.none(),transactionPMController.getCurrency);

// ************************************* ALL MERCHABT ************************************

route.post('/allMerchant',uploads.none(),transactionMTController.allMerchant);

// ************************************* END ALL MERCHANT ********************************

// defaultSettlement
route.post('/defaultSettlement',uploads.none(),helper.verify,settlementController.defaultSettlement);
route.post('/toggleSettlement',uploads.none(),helper.verify,settlementController.toggleSettlement);
route.post('/createSettlement',uploads.none(),helper.verify,settlementController.createSettlement);
route.post('/detailSettlement',uploads.none(),helper.verify,settlementController.detailSettlement);
route.post('/updateSettlement',uploads.none(),settlementController.updateSettlement);
route.post('/getById',uploads.none(),settlementController.getById);

//🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚🔚
// 😎😎😎😎😎😎😎😎😎😎😎😎SATBIR API END😎😎😎😎😎😎😎😎😎😎😎😎😎

module.exports = route;

