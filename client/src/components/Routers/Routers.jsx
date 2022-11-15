import React, { useState,useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { useStateContext } from "../../context/ContextProvider";
import Login from "../Login/Login";
import Sidebar from "../Sidebar/Sidebar";
import Dashboard from "../Dashboard/Dashboard";
import Error from '../PAGE404/Error'
//Api Helper
import baseUrl from "../config/baseUrl";
import axios from "axios";
// MID Module
import Mid from "../Mid/Mid";
import NewMID from "../Mid/NewMID";
import EditMid from "../Mid/EditMid";
// Bankcode Akonto Module
import BankCodeAkonto from "../BankCodeAkonto/BankCodeAkonto";
import NewBankCodeAkonto from "../BankCodeAkonto/NewBankCodeAkonto";
import EditBankCodeAkonto from "../BankCodeAkonto/EditBankCodeAkonto";
// Bankcode Module
import BankCode from "../BankCode/BankCode";
import NewBankCode from "../BankCode/NewBankCode";
import EditBankCode from "../BankCode/EditBankCode";
// Contact Module
import Contact from "../contact/Contact";
import ReadContact from "../contact/ReadContact";
// Marchant Module
import MerchantAdmin from "../MerchantAdmin/MerchantAdmin";
import ReadMerchantAdmin from "../MerchantAdmin/ReadMerchantAdmin";
import AddNewMerchantAdmin from "../MerchantAdmin/AddNewMerchantAdmin";
import EditMerchantAdmin from "../MerchantAdmin/EditMerchantAdmin";
// Change Password Module
import ChangePassword from "../ChangePassword/ChangePassword";
// Site Setting Module
import SiteSetting from "../Setting/siteSetting/SiteSetting";
import EditSiteSetting from "../Setting/siteSetting/EditSiteSetting";
import CurrencyRate from "../Setting/currency/CurrencyRate";
import NewCurrency from "../Setting/currency/NewCurrency";
import UpdateCurrency from "../Setting/currency/UpdateCurrency";
import Exchange from "../Setting/Exchange/Exchange";
import NewExchange from "../Setting/Exchange/NewExchange";
import UpdateExchange from "../Setting/Exchange/UpdateExchange";
import AllUpi from "../Setting/AllUpi/AllUpi";
// SUB ADMIN MODULE
import SubAdmin from "../SubAdminModule/SubAdmin";
import NewSubAdmin from "../SubAdminModule/NewSubAdmin";
import SubAdminPermission from "../SubAdminModule/SubAdminPermission";
import EditSubAdmin from "../SubAdminModule/EditSubAdmin";
import ViewSubAdmin from "../SubAdminModule/ViewSubAdmin";
// PG MODULE
import PGMod from "../Payment/PGMod";
import NewPg from "../Payment/NewPg";
import EditGate from "../Payment/EditGate";
// Chines Module
import Chinese from "../ChineseModule/Chinese";
import NewChinese from "../ChineseModule/NewChinese";
import EditBank from "../ChineseModule/EditBank";
// Transaction Module
import MerchantTrans from "../TransactionMod/MerchantTrans/MerchantTrans";
import NewMerchant from "../TransactionMod/MerchantTrans/NewMerchant";
import ViewMerchant from "../TransactionMod/MerchantTrans/ViewMerchant";
import MerchantRefunds from "../TransactionMod/MerchantRefund/MerchantRefunds";
import EndOfDay from "../TransactionMod/MerchantEnd/EndOfDay";
import PayoutMerchants from "../TransactionMod/MerchantPayout/PayoutMerchants";
import CreatePayout from "../TransactionMod/MerchantPayout/CreatePayout";

// Settlemt Module
import Settlement from "../Settlement/Settlement";
import Common from "../Settlement/Common";
import AdminLogs from "../ActivityLogs/AdminLogs";
import MerchantLogs from "../ActivityLogs/MerchantLogs";
import WalletLogs from "../ActivityLogs/WalletLogs";


//<><><><><><><><><><><><><><><>🤓Settlement Dashboard🤓<><><><><><><><><><><><><><> 

import SettlementSidebar from '../SettlementComp/SIDEBAR/Sidebar'
import SettlementDashboard from '../SettlementComp/Dashboard/Dashboard'
import BankDeposit from "../SettlementComp/BankDeposit/BankDeposit";
import LocalPayouts from "../SettlementComp/LocalPayouts/LocalPayouts";
import AddFunds from "../SettlementComp/AddFunds/AddFunds";
import LocalSettlement from "../SettlementComp/LocalSettlement/LocalSettlement";
import InternationalSettlement from "../SettlementComp/InternationalSettlement/InternationalSettlement";
import DisputesChargebacks from "../SettlementComp/DisputesChargebacks/DisputesChargebacks";
import Refunds from "../SettlementComp/Refunds/Refunds";
import Commissions from "../SettlementComp/Commissions/Commissions";
import Reports from "../SettlementComp/Reports/Reports";

//<><><><><><><><><><><><><><><>🤓Settlement Dashboard End🤓<><><><><><><><><><><><><>
function Routers() {
  const [modulePesmission, setModulePesmission] = useState([]);
  const { isLoginUser,setIsLoginUser,role, setRole } = useStateContext();
  const location = useLocation();
  useEffect(() => {
   if(localStorage.getItem('admin')){
      fetchData();
      const { exp } = jwtDecode(localStorage.getItem('admin'))
      const expirationTime = (exp * 1000) - 60000
      if (Date.now() >= expirationTime) {
        return localStorage.clear()
      }
    }
    setIsLoginUser(localStorage.getItem('admin'))
    setRole(localStorage.getItem('role'))
  }, [location.pathname,isLoginUser,role]);
  const fetchData = async () => {
    try {
      let formData = new FormData();
      formData.append("token", isLoginUser);
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${isLoginUser}`,
        },
      };
      let result = await axios.post(
        `${baseUrl}/modulePesmission`,
        formData,
        config
      );
      if (result.status === 200) {
        setModulePesmission(result.data.permission);
        
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <>
      <Routes>
        {isLoginUser && role==='1' ? (
          <Route
            path="/"
            element={<Sidebar modulePesmission={modulePesmission} />}
          >
            <Route path="/" element={<Dashboard />} />

            {Object.keys(modulePesmission).length > 0
              ? modulePesmission.map((item, index) => {
                  return (
                    <>
                      {item.module === "Sub Admin Module" &&
                      item.status === 1 ? (
                        <>
                          <Route
                            path="/subAdmin"
                            element={
                              <SubAdmin
                                authCreate={item.m_add}
                                authRead={item.m_view}
                                authUpdate={item.m_edit}
                                authDelete={item.m_delete}
                              />
                            }
                          />
                          {item.m_add === 1 ? (
                            <Route
                              path="/newSubAdmin"
                              element={<NewSubAdmin />}
                            />
                          ) : null}

                          <Route
                            path="/subAdminPermission/:id"
                            element={<SubAdminPermission />}
                          />
                          {item.m_edit === 1 ? (
                            <Route
                              path="/EditSubAdmin/:id"
                              element={<EditSubAdmin />}
                            />
                          ) : null}
                          {item.m_view === 1 ? (
                            <Route
                              path="/ViewSubAdmin/:id"
                              element={<ViewSubAdmin />}
                            />
                          ) : null}
                        </>
                      ) : item.module === "PG Module" && item.status === 1 ? (
                        <>
                          {/* PG Module */}
                          <Route
                            path="/PGMod"
                            element={
                              <PGMod
                                authCreate={item.m_add}
                                authRead={item.m_view}
                                authUpdate={item.m_edit}
                                authDelete={item.m_delete}
                              />
                            }
                          />
                          <Route path="/NewPg" element={<NewPg />} />
                          <Route path="/EditGate/:id" element={<EditGate />} />
                          {/* End PG Module */}
                        </>
                      ) : item.module ==="MID Module" && item.status === 1 ? (
                        <>
                          <Route
                            path="/Mid"
                            element={
                              <Mid
                                authCreate={item.m_add}
                                authRead={item.m_view}
                                authUpdate={item.m_edit}
                                authDelete={item.m_delete}
                              />
                            }
                          />
                          {item.m_add === 1 ? (
                            <Route path="/NewMid" element={<NewMID />} />
                          ) : null}
                          {item.m_edit === 1 ? (
                            <Route path="/EditMid/:id" element={<EditMid />} />
                          ) : null}
                        </>
                      ) : item.module === "Chinese bank Module" &&
                        item.status === 1 ? (
                        <>
                          {/* Chinese Module */}
                          <Route
                            path="/Chinese"
                            element={
                              <Chinese
                                authCreate={item.m_add}
                                authRead={item.m_view}
                                authUpdate={item.m_edit}
                                authDelete={item.m_delete}
                              />
                            }
                          />
                          <Route path="/NewChinese" element={<NewChinese />} />
                          <Route path="/EditBank/:id" element={<EditBank />} />
                        </>
                      ) : item.module === "Bankcode BankConnect Module" &&
                        item.status === 1 ? (
                        <>
                          <Route
                            path="/bankcodeakonto"
                            element={
                              <BankCodeAkonto
                                authCreate={item.m_add}
                                authRead={item.m_view}
                                authUpdate={item.m_edit}
                                authDelete={item.m_delete}
                              />
                            }
                          />
                          {item.m_add === 1 ? (
                            <Route
                              path="/newbankcodeakonto"
                              element={<NewBankCodeAkonto />}
                            />
                          ) : null}
                          {item.m_edit === 1 ? (
                            <Route
                              path="/editbankcodeakonto/:id"
                              element={<EditBankCodeAkonto />}
                            />
                          ) : null}
                        </>
                      ) : item.module === "Bankcode Module" &&
                        item.status === 1 ? (
                        <>
                          <Route
                            path="/bankcode"
                            element={
                              <BankCode
                                authCreate={item.m_add}
                                authRead={item.m_view}
                                authUpdate={item.m_edit}
                                authDelete={item.m_delete}
                              />
                            }
                          />
                          {item.m_add === 1 ? (
                            <Route
                              path="/newbankcode"
                              element={<NewBankCode />}
                            />
                          ) : null}
                          {item.m_edit === 1 ? (
                            <Route
                              path="/editbankcode/:id"
                              element={<EditBankCode />}
                            />
                          ) : null}
                        </>
                      ) : item.module === "Merchant Module" &&
                        item.status === 1 ? (
                        <>
                          <Route
                            path="/merchantAdmin"
                            element={
                              <MerchantAdmin
                                authCreate={item.m_add}
                                authRead={item.m_view}
                                authUpdate={item.m_edit}
                                authDelete={item.m_delete}
                              />
                            }
                          />
                          {item.m_add === 1 ? (
                            <Route
                              path="/AddNewMerchantAdmin"
                              element={<AddNewMerchantAdmin />}
                            />
                          ) : null}
                          {item.m_view === 1 ? (
                            <Route
                              path="/readMerchantAdmin/:id"
                              element={<ReadMerchantAdmin />}
                            />
                          ) : null}
                          {item.m_edit === 1 ? (
                            <Route
                              path="/EditMerchantAdmin/:id"
                              element={<EditMerchantAdmin />}
                            />
                          ) : null}
                        </>
                      ) : item.module === "Transaction Module" &&
                        item.status === 1 ? (
                        <>
                          {/* Merchant Transaction */}
                          <Route
                            path="/MerchantTrans"
                            element={
                              <MerchantTrans
                                authCreate={item.m_add}
                                authRead={item.m_view}
                                authUpdate={item.m_edit}
                                authDelete={item.m_delete}
                              />
                            }
                          />
                          <Route
                            path="/NewMerchant"
                            element={<NewMerchant />}
                          />
                          <Route
                            path="/ViewMerchant/:invoice_id"
                            element={<ViewMerchant />}
                          />

                          {/* End Merchant Transaction */}

                          {/* End Of Day Transaction */}
                          <Route
                            path="/EndOfDay"
                            element={
                              <EndOfDay
                                authCreate={item.m_add}
                                authRead={item.m_view}
                                authUpdate={item.m_edit}
                                authDelete={item.m_delete}
                              />
                            }
                          />
                          {/* End Of Day Transaction */}

                          {/* Merchant Refund  */}
                          <Route
                            path="/MerchantRefunds"
                            element={
                              <MerchantRefunds
                                authCreate={item.m_add}
                                authRead={item.m_view}
                                authUpdate={item.m_edit}
                                authDelete={item.m_delete}
                              />
                            }
                          />
                          {/* End Merchant Refund */}

                          {/* Merchant Payouts */}
                          <Route
                            path="/PayoutMerchants"
                            element={
                              <PayoutMerchants
                                authCreate={item.m_add}
                                authRead={item.m_view}
                                authUpdate={item.m_edit}
                                authDelete={item.m_delete}
                              />
                            }
                          />
                          <Route
                            path="/CreatePayout"
                            element={<CreatePayout />}
                          />
                          {/* End Merchant Payouts */}
                        </>
                      ) : item.module === "SandBox Module" &&
                        item.status === 1 ? (
                        <></>
                      ) : item.module === "Banner Module" &&
                        item.status === 1 ? (
                        <></>
                      ) : item.module === "Settlement Module" &&
                        item.status === 1 ? (
                        <>
                          <Route
                            path="/LocalSettlement"
                            element={
                              <Settlement
                                authCreate={item.m_add}
                                authRead={item.m_view}
                                authUpdate={item.m_edit}
                                authDelete={item.m_delete}
                              />
                            }
                          />
                          <Route path="/LocalSettlementCreate" element={<Common />} />
                        </>
                      ) : item.module === "Activity Logs" &&
                        item.status === 1 ? (
                        <>
                        <Route path="/AdminLogs" element={<AdminLogs />} />
                        <Route path="/MerchantLogs" element={<MerchantLogs />} />
                        <Route path="/WalletLogs" element={<WalletLogs />} />
                       
                        </>
                      ) : item.module === "Contact Module" &&
                        item.status === 1 ? (
                        <>
                          <Route
                            path="/contact"
                            element={
                              <Contact
                                authCreate={item.m_add}
                                authRead={item.m_view}
                                authUpdate={item.m_edit}
                                authDelete={item.m_delete}
                              />
                            }
                          />
                          {item.m_view === 1 ? (
                            <Route
                              path="/readContact/:id"
                              element={<ReadContact />}
                            />
                          ) : null}
                        </>
                      ) : item.module === "CMS Module" && item.status === 1 ? (
                        <></>
                      ) : item.module === "Meta Module" && item.status === 1 ? (
                        <></>
                      ) : item.module === "Setting Module" &&
                        item.status === 1 ? (
                        <>
                          <Route
                            path="/siteSetting"
                            element={
                              <SiteSetting
                                authCreate={item.m_add}
                                authRead={item.m_view}
                                authUpdate={item.m_edit}
                                authDelete={item.m_delete}
                              />
                            }
                          />
                          {item.m_edit === 1 ? (
                            <Route
                              path="/EditSiteSetting/:id"
                              element={<EditSiteSetting />}
                            />
                          ) : null}
                          {/* Currency Setting */}
                          <Route
                            path="/CurrencyRate"
                            element={
                              <CurrencyRate
                                authCreate={item.m_add}
                                authRead={item.m_view}
                                authUpdate={item.m_edit}
                                authDelete={item.m_delete}
                              />
                            }
                          />
                          {item.m_add === 1 ? (
                            <Route
                              path="/NewCurrency"
                              element={<NewCurrency />}
                            />
                          ) : null}
                          {item.m_edit === 1 ? (
                            <Route
                              path="/UpdateCurrency/:id"
                              element={<UpdateCurrency />}
                            />
                          ) : null}
                          {/* Exchange Setting */}
                          <Route
                            path="/Exchange"
                            element={
                              <Exchange
                                authCreate={item.m_add}
                                authRead={item.m_view}
                                authUpdate={item.m_edit}
                                authDelete={item.m_delete}
                              />
                            }
                          />
                          {item.m_add === 1 ? (
                            <Route
                              path="/NewExchange"
                              element={<NewExchange />}
                            />
                          ) : null}
                          {item.m_edit === 1 ? (
                            <Route
                              path="/UpdateExchange/:id"
                              element={<UpdateExchange />}
                            />
                          ) : null}
                          {/* All Upi */}
                          <Route
                            path="/AllUpi"
                            element={
                              <AllUpi
                                authCreate={item.m_add}
                                authRead={item.m_view}
                                authUpdate={item.m_edit}
                                authDelete={item.m_delete}
                              />
                            }
                          />
                        </>
                      ) : item.module === "Change Password" &&
                        item.status === 1 ? (
                        <>
                          <Route
                            path="/ChangePassword"
                            element={<ChangePassword />}
                          />
                        </>
                      ) : null}
                    </>
                  );
                })
              : null}
          </Route>
        ) : isLoginUser && role ==="2"? (<Route path="/" element={<SettlementSidebar />}>
          <Route path="/" element={<SettlementDashboard/>} />
          <Route path="/BankDepositReceived" element={<BankDeposit/>} />
          <Route path="/LocalPayouts" element={<LocalPayouts/>} />
          <Route path="/AddFunds" element={<AddFunds/>} />
          <Route path="/LocalSettlement" element={<LocalSettlement/>} />
          <Route path="/InternationalSettlement" element={<InternationalSettlement/>} />
          <Route path="/DisputesChargebacks" element={<DisputesChargebacks/>} />
          <Route path="/Refunds" element={<Refunds/>} />
          <Route path="/Commissions" element={<Commissions/>} />
          <Route path="/Reports" element={<Reports/>} />
          <Route path="/ChangePassword" element={<ChangePassword/>} />
        </Route>) : (
          <>
          <Route path="/login-admin" element={<Login />} />
          </>
        )}
        <Route path="*" element={isLoginUser?<Error />:<Login/>} />
      </Routes>
    </>
  );
}

export default Routers;
