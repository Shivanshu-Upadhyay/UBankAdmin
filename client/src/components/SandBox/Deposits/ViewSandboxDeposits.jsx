import React, { useState, useEffect } from 'react'
import { Button } from "@mui/material";
import baseUrl from "../../config/baseUrl";
import axios from "axios";
import Header from "../../../commonComp/Header/Header";
import { useParams } from "react-router-dom";

import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function ViewSandboxDeposits() {

  const [user_id, setUser_id] = useState("");
  const [txn_id, setTxn_id] = useState("");
  const [order_no, setOrder_no] = useState("");
  const [transaction_id, setTransaction_id] = useState("");
  const [payment_type, setPayment_type] = useState("");
  const [payment_status, setPayment_status] = useState("");
  const [ammount_type, setAmmount_type] = useState("");
  const [ammount, setAmmount] = useState("");
  const [payin_charges, setPayin_charges] = useState("");
  const [gst_charges, setGst_charges] = useState("");
  const [our_bank_charge_gst, setOur_bank_charge_gst] = useState("");
  const [our_bank_charge, setOur_bank_charge] = useState("");
  const [rolling_reverse_amount, setRolling_reverse_amount] = useState("");
  const [settle_amount, setSettle_amount] = useState("");
  const [status, setStatus] = useState("");
  const [created_on, setCreated_on] = useState("");
  const [updated_on, setUpdated_on] = useState("");
  const [gatewayNumber, setGatewayNumber] = useState("");
  const [end_point_url, setEnd_point_url] = useState("");
  const [redirection_url, setRedirection_url] = useState("");
  const auth = localStorage.getItem("admin");
  let { invoice_id } = useParams();

  const ReadData = async () => {
    try {
      let formData = new FormData();
      formData.append("invoice_id",invoice_id)
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(
        `${baseUrl}/getIdDeposits`,
        formData,
        config
      );
      setUser_id(result.data.data[0].user_id);
      setTxn_id(result.data.data[0].txn_id);
      setOrder_no(result.data.data[0].order_no);
      setTransaction_id(result.data.data[0].transaction_id);
      setPayment_type(result.data.data[0].payment_type);
      setPayment_status(result.data.data[0].payment_status);
      setAmmount_type(result.data.data[0].ammount_type);
      setAmmount(result.data.data[0].ammount);
      setPayin_charges(result.data.data[0].payin_charges);
      setGst_charges(result.data.data[0].gst_charges);
      setOur_bank_charge_gst(result.data.data[0].our_bank_charge_gst);
      setOur_bank_charge(result.data.data[0].our_bank_charge);
      setRolling_reverse_amount(result.data.data[0].rolling_reverse_amount);
      setSettle_amount(result.data.data[0].settle_amount);
      setStatus(result.data.data[0].status);
      setCreated_on(result.data.data[0].created_on);
      setUpdated_on(result.data.data[0].updated_on);
      setGatewayNumber(result.data.data[0].gatewayNumber);
      setEnd_point_url(result.data.data[0].end_point_url);
      setRedirection_url(result.data.data[0].redirection_url);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    ReadData();
  }, []);

  return (
    <>
      <Header title="Sandbox Deposits" path="/SandBoxDeposits" />
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
                MOrder No
              </label>
              <input
                type="text"
                className="input1"
                value={txn_id}
                disabled
              />
            </div>
            <div className="col-md-2 d-flex flex-column text-center">
              <label
                htmlFor=""
                className="forminputDeposite"
              >
                Order No
              </label>
              <input
                type="text"
                className="input1"
                value={order_no}
                disabled
              />
            </div>
            <div className="col-md-2 d-flex flex-column text-center">
              <label
                htmlFor=""
                className="forminputDeposite"
              >
                Transaction Id
              </label>
              <input
                type="text"
                className="input1"
                value={transaction_id}
                disabled
              />
            </div>
            <div className="col-md-2 d-flex flex-column text-center">
              <label
                htmlFor=""
                className="forminputDeposite"
              >
                Pay By
              </label>
              <input 
                type="text" 
                className="input1"
                value={payment_type}
                disabled 
              />
            </div>
            <div className="col-md-2 d-flex flex-column text-center">
              <label
                htmlFor=""
                className="forminputDeposite"
              >
                Payment Status
              </label>
              <input 
                type="text" 
                className="input1"
                value={payment_status}
                disabled 
              />
            </div>
            <hr style={{ width: "95%" }} />

            <div className="col-md-2 d-flex flex-column text-center">
              <label
                htmlFor=""
                className="forminputDeposite"
              >
                Currency
              </label>
              <input
                type="text" 
                className="input1"
                value={ammount_type}
                disabled 
              />
            </div>
            <div className="col-md-2 d-flex flex-column text-center">
              <label
                htmlFor=""
                className="forminputDeposite"
              >
                Total Amount
              </label>
              <input 
                type="text" 
                className="input1"
                value={ammount}
                disabled 
              />
            </div>
            <div className="col-md-2 d-flex flex-column text-center">
              <label
                htmlFor=""
                className="forminputDeposite"
              >
                Payin Charges
              </label>
              <input 
                type="text" 
                className="input1"
                value= {payin_charges}
                disabled
              />
            </div>
            <div className="col-md-2 d-flex flex-column text-center">
              <label
                htmlFor=""
                className="forminputDeposite"
              >
                Bank GST Amount
              </label>
              <input 
                type="text" 
                className="input1"
                value= {our_bank_charge_gst}
                disabled 
              />
            </div>
            <div className="col-md-2 d-flex flex-column text-center">
              <label
                htmlFor=""
                className="forminputDeposite"
              >
                Bank Charges
              </label>
              <input 
                type="text" 
                className="input1"
                value={our_bank_charge}
                disabled 
              />
            </div>
            <div className="col-md-2 d-flex flex-column text-center  ">
              <label
                htmlFor=""
                className="forminputDeposite"
              >
                RR Amount
              </label>
              <input 
                type="text" 
                className="input1"
                value= {rolling_reverse_amount}
                disabled 
              />
            </div>
            <hr style={{ width: "95%" }} />

            <div className="col-md-2 d-flex flex-column text-center  ">
              <label
                htmlFor=""
                className="forminputDeposite"
              >
                Net Amt
              </label>
              <input 
                type="text" 
                className="input1"
                value={settle_amount}
                disabled 
              />
            </div>
            <div className="col-md-2 d-flex flex-column text-center  ">
              <label
                htmlFor=""
                className="forminputDeposite"
              >
                Status
              </label>
              <input 
                type="text" 
                className="input1"
                value={status === 0 ?"Failed": status === 1 ? "Success" : status === 2 ? "Waiting" : status === 3 ? "Pending" : status === 4 ? "Refund" : "Chargeback"}
                disabled 
              />
            </div>
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
                GST Amount
              </label>
              <input 
                type="text" 
                className="input1"
                value={gst_charges}
                disabled 
              />
            </div>
            <div className="col-md-2 d-flex flex-column text-center  ">
              <label
                htmlFor=""
                className="forminputDeposite"
              >
                Gateway No
              </label>
              <input 
                type="text" 
                className="input1"
                value={gatewayNumber}
                disabled 
              />
            </div>
            <hr style={{ width: "95%" }} />

            <div className="col-md-6 d-flex flex-column text-center  ">
              <label
                htmlFor=""
                className="forminputDeposite"
              >
                End Point URL
              </label>
              <input 
                type="text" 
                className="input1"
                value={end_point_url}
                disabled 
              />
            </div>
            <div className="col-md-6 d-flex flex-column text-center  ">
              <label
                htmlFor=""
                className="forminputDeposite"
              >
                Redirect URL
              </label>
              <input 
                type="text" 
                className="input1"
                value={redirection_url}
                disabled 
              />
            </div>
          </form>
        </div>
      </div> 
    </>
  );
}

export default ViewSandboxDeposits;
