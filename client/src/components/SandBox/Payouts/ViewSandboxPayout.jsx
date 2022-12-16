import React, { useState, useEffect } from 'react'
import { Button } from "@mui/material";
import baseUrl from "../../config/baseUrl";
import axios from "axios";
import Header from "../../../commonComp/Header/Header";
import { useParams } from "react-router-dom";

import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function ViewSandboxPayout() {

  const [user_id, setUser_id] = useState("");
  const [trx_from, setTrx_from] = useState("");
  const [payout_bank, setPayout_bank] = useState("");
  const [uniqueid, setUniqueid] = useState("");
  const [customer_order_id, setCustomer_order_id] = useState("");
  const [status, setStatus] = useState("");
  const [response, setResponse] = useState("");
  const [utrnumber, setUtrnumber] = useState("");
  const [trx_type, setTrx_type] = useState("");
  const [payee_name, setPayee_name] = useState("");
  const [creditacc, setCreditacc] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [remark, setRemark] = useState("");
  const [akonto_charge, setAkonto_charge] = useState("");
  const [gst_amount, setGst_amount] = useState("");
  const [bank_charges, setBank_charges] = useState("");
  const [wallet_deduct, setWallet_deduct] = useState("");
  const [currency, setCurrency] = useState("");
  const [created_on, setCreated_on] = useState("");
  const [updated_on, setUpdated_on] = useState("");
  const [bank_full_response, setBank_full_response] = useState("");
  const [bank_encrypted_request_response, setBank_encrypted_request_response] = useState("");
  const [wallet_address, setWallet_address] = useState("");
  const [amount, setAmount] = useState("");
  const auth = localStorage.getItem("admin");
  let { id } = useParams();

  const ReadData = async () => {
    try {
      let formData = new FormData();
      formData.append("id",id)
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(
        `${baseUrl}/getIdPayout`,
        formData,
        config
      );
      console.log(result.data.data[0].amount)
      setUser_id(result.data.data[0].users_id);
      setTrx_from(result.data.data[0].trx_from);
      setPayout_bank(result.data.data[0].payout_bank);
      setUniqueid(result.data.data[0].uniqueid);
      setCustomer_order_id(result.data.data[0].customer_order_id);
      setStatus(result.data.data[0].status);
      setResponse(result.data.data[0].response);
      setUtrnumber(result.data.data[0].utrnumber);
      setTrx_type(result.data.data[0].trx_type);
      setPayee_name(result.data.data[0].payee_name);
      setCreditacc(result.data.data[0].creditacc);
      setIfsc(result.data.data[0].ifsc);
      setRemark(result.data.data[0].remark);
      setAkonto_charge(result.data.data[0].akonto_charge);
      setGst_amount(result.data.data[0].gst_amount);
      setBank_charges(result.data.data[0].bank_charges);
      setWallet_deduct(result.data.data[0].wallet_deduct);
      setCurrency(result.data.data[0].currency);
      setCreated_on(result.data.data[0].created_on);
      setUpdated_on(result.data.data[0].updated_on);
      setBank_full_response(result.data.data[0].bank_full_response);
      setBank_encrypted_request_response(result.data.data[0].bank_encrypted_request_response);
      setWallet_address(result.data.data[0].wallet_address);
      setAmount(result.data.data[0].amount);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    ReadData();
  }, []);

  return (
    <>
      <Header title="Sandbox Payout" path="/SandBoxPayout" />
      <div className="row">
        <div className="col-12 dialogBlock1">
          <form className="row justify-content-around">
            <div className="col-md-2 d-flex flex-column text-center">
              <label
                htmlFor=""
                className="forminputDeposite"
              >
                Merchant ID
              </label>
              <input
                type="text"
                className="input1"
                value={user_id}
                disabled
              />
            </div>
            <div className="col-md-2 d-flex flex-column text-center">
              <label
                htmlFor=""
                className="forminputDeposite"
              >
                AC Type
              </label>
              <input
                type="text"
                className="input1"
                value={trx_from === 0 ? "Nodel" : "Current"}
                disabled
              />
            </div>
            <div className="col-md-2 d-flex flex-column text-center">
              <label
                htmlFor=""
                className="forminputDeposite"
              >
                Bank Name
              </label>
              <input
                type="text"
                className="input1"
                value={payout_bank === 1 ? "ICICI" : payout_bank === 2 ? "Gate8" : "YT Pay"}
                disabled
              />
            </div>
            <div className="col-md-2 d-flex flex-column text-center">
              <label
                htmlFor=""
                className="forminputDeposite"
              >
                Payout Id
              </label>
              <input
                type="text"
                className="input1"
                value={uniqueid}
                disabled
              />
            </div>
            <div className="col-md-2 d-flex flex-column text-center">
              <label
                htmlFor=""
                className="forminputDeposite"
              >
                Customer Payout Id
              </label>
              <input 
                type="text" 
                className="input1"
                value={customer_order_id}
                disabled
              />
            </div>
            <div className="col-md-2 d-flex flex-column text-center">
              <label
                htmlFor=""
                className="forminputDeposite"
              >
                Status
              </label>
              <input 
                type="text" 
                className="input1"
                value={status === "Failed" ?"Failed": status === "SUCCESS" ? "Success" : status === "WAITING" ? "Waiting" : status === "PENDING" ? "Pending" : status === "REFUND" ? "Refund" : "Chargeback"}
                disabled
              />
            </div>
            <hr style={{ width: "95%" }} />

            <div className="col-md-2 d-flex flex-column text-center">
              <label
                htmlFor=""
                className="forminputDeposite"
              >
                Message
              </label>
              <input
                type="text" 
                className="input1"
                value={response}
                disabled
              />
            </div>
            <div className="col-md-2 d-flex flex-column text-center">
              <label
                htmlFor=""
                className="forminputDeposite"
              >
                UTR
              </label>
              <input 
                type="text" 
                className="input1"
                value={utrnumber}
                disabled
              />
            </div>
            <div className="col-md-2 d-flex flex-column text-center">
              <label
                htmlFor=""
                className="forminputDeposite"
              >
                TRX Type
              </label>
              <input 
                type="text" 
                className="input1"
                value= {trx_type}
                disabled
              />
            </div>
            <div className="col-md-2 d-flex flex-column text-center">
              <label
                htmlFor=""
                className="forminputDeposite"
              >
                Payee
              </label>
              <input 
                type="text" 
                className="input1"
                value= {payee_name}
                disabled
              />
            </div>
            <div className="col-md-2 d-flex flex-column text-center">
              <label
                htmlFor=""
                className="forminputDeposite"
              >
                Credit Acc
              </label>
              <input 
                type="text" 
                className="input1"
                value={creditacc}
                disabled
              />
            </div>
            <div className="col-md-2 d-flex flex-column text-center  ">
              <label
                htmlFor=""
                className="forminputDeposite"
              >
                IFSC
              </label>
              <input 
                type="text" 
                className="input1"
                value= {ifsc}
                disabled
              />
            </div>
            <hr style={{ width: "95%" }} />

            <div className="col-md-2 d-flex flex-column text-center  ">
              <label
                htmlFor=""
                className="forminputDeposite"
              >
                Remark
              </label>
              <input 
                type="text" 
                className="input1"
                value={remark}
                disabled
              />
            </div>
            <div className="col-md-2 d-flex flex-column text-center  ">
              <label
                htmlFor=""
                className="forminputDeposite"
              >
                Payout Charge
              </label>
              <input 
                type="text" 
                className="input1"
                value={akonto_charge}
                disabled
              />
            </div>
            <div className="col-md-2 d-flex flex-column text-center  ">
              <label
                htmlFor=""
                className="forminputDeposite"
              >
                GST Charge
              </label>
              <input 
                type="text" 
                className="input1"
                value={gst_amount}
                disabled
              />
            </div>
            <div className="col-md-2 d-flex flex-column text-center  ">
              <label
                htmlFor=""
                className="forminputDeposite"
              >
                Bank Charge
              </label>
              <input 
                type="text" 
                className="input1"
                value={bank_charges}
                disabled
              />
            </div>
            <div className="col-md-2 d-flex flex-column text-center  ">
              <label
                htmlFor=""
                className="forminputDeposite"
              >
                Wallet Deduct
              </label>
              <input 
                type="text" 
                className="input1"
                value={wallet_deduct}
                disabled
              />
            </div>
            <div className="col-md-2 d-flex flex-column text-center  ">
              <label
                htmlFor=""
                className="forminputDeposite"
              >
                Currency
              </label>
              <input 
                type="text" 
                className="input1"
                value={currency}
                disabled
              />
            </div>
            <hr style={{ width: "95%" }} />

            <div className="col-md-2 d-flex flex-column text-center  ">
              <label
                htmlFor=""
                className="forminputDeposite"
              >
                Created On
              </label>
              <input 
                type="text" 
                className="input1"
                value={created_on}
                disabled
              />
            </div>
            <div className="col-md-2 d-flex flex-column text-center  ">
              <label
                htmlFor=""
                className="forminputDeposite"
              >
                Updated On
              </label>
              <input 
                type="text" 
                className="input1"
                value={updated_on}
                disabled
              />
            </div>
            <div className="col-md-2 d-flex flex-column text-center  ">
              <label
                htmlFor=""
                className="forminputDeposite"
              >
                B Response
              </label>
              <input 
                type="text" 
                className="input1"
                value={bank_full_response}
                disabled
              />
            </div>
            <div className="col-md-2 d-flex flex-column text-center  ">
              <label
                htmlFor=""
                className="forminputDeposite"
              >
                Bank Encrypted Request Response
              </label>
              <input 
                type="text" 
                className="input1"
                value={bank_encrypted_request_response}
                disabled
              />
            </div>
            <div className="col-md-2 d-flex flex-column text-center  ">
              <label
                htmlFor=""
                className="forminputDeposite"
              >
                Wallet Address
              </label>
              <input 
                type="text" 
                className="input1"
                value={wallet_address}
                disabled
              />
            </div>
            <hr style={{ width: "95%" }} />

            <div>
              <div
                defaultValue="0"
                className="dilogfirstbutton d-flex"
              >
                <img src="../imges/dollar.svg" alt="" width="35px" />
                <div className="mx-2 w-100" style={{marginTop: "20px"}}>
                  <label
                    htmlFor=""
                    className="forminputDeposite"
                    style={{color: "#000"}}
                  >
                    Amount
                  </label>
                  <input 
                    type="text" 
                    className="input1"
                    value={amount}
                    disabled
                    style={{color: "#000", fontSize: "15px", background: "transparent"}}
                  />
                  </div>
              </div>
            </div>
          </form>
        </div>
      </div> 
    </>
  );
}

export default ViewSandboxPayout;
