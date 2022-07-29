import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../Login/Login";
import Sidebar from "../Sidebar/Sidebar";
import Mid from "../Mid/Mid";
import NewMID from "../Mid/NewMID";
import EditMid from "../Mid/EditMid";
import BankCodeAkonto from "../BankCodeAkonto/BankCodeAkonto";
import NewBankCodeAkonto from "../BankCodeAkonto/NewBankCodeAkonto";
import EditBankCodeAkonto from "../BankCodeAkonto/EditBankCodeAkonto";
import BankCode from "../BankCode/BankCode";
import NewBankCode from "../BankCode/NewBankCode";
import EditBankCode from "../BankCode/EditBankCode";
import Contact from "../contact/Contact";
import ReadContact from "../contact/ReadContact";
import MerchantAdmin from "../MerchantAdmin/MerchantAdmin";
import { useStateContext } from "../../context/ContextProvider";
import { useEffect } from "react";
import ReadMerchantAdmin from "../MerchantAdmin/ReadMerchantAdmin";
import AddNewMerchantAdmin from "../MerchantAdmin/AddNewMerchantAdmin";
import EditMerchantAdmin from "../MerchantAdmin/EditMerchantAdmin";
import ChangePassword from "../ChangePassword/ChangePassword";
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
//Api Helper
import baseUrl from "../config/baseUrl";
import axios from "axios";
import Dashboard from "../Dashboard/Dashboard";
import Settlement from "../Settlement/Settlement";
import Common from "../Settlement/Common";

function Routers() {
  const [auth, setAuth] = useState(localStorage.getItem("admin"));
  const [modulePesmission, setModulePesmission] = useState([]);
  const { isLoginUser } = useStateContext();
  console.log(isLoginUser, auth);

  useEffect(() => {
    setAuth(localStorage.getItem("admin"));
    const fetchData = async () => {
      try {
        let formData = new FormData();
        formData.append("token", auth);
        const config = {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${auth}`,
          },
        };
        let result = await axios.post(
          `${baseUrl}/modulePesmission`,
          formData,
          config
        );
        if (result.status === 200) {
          setModulePesmission(result.data.permission);
          console.log(result.data.permission);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [isLoginUser, auth]);

  return (
    <>
      <Routes>
        {auth ? (
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
                      ) : item.module === "MID Module" && item.status === 1 ? (
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
                            path="/Settlement"
                            element={
                              <Settlement
                                authCreate={item.m_add}
                                authRead={item.m_view}
                                authUpdate={item.m_edit}
                                authDelete={item.m_delete}
                              />
                            }
                          /> 
                          <Route
                            path="/lolo"
                            element={<Common />}
                          />
                        </>
                      ) : item.module === "Activity Logs" &&
                        item.status === 1 ? (
                        <></>
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
        ) : (
          <Route path="/login-admin" element={<Login />} />
        )}
        <Route
          path="*"
          element={auth ? <Navigate to="/" /> : <Navigate to="/login-admin" />}
        />
      </Routes>
    </>
  );
}

export default Routers;
