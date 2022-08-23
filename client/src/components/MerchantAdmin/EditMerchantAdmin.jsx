import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../../commonComp/Header/Header";
import baseUrl from "../config/baseUrl";
import Select from "react-select";
import { Button } from "@mui/material";

import axios from "axios";
function EditMerchantAdmin() {
  const { id } = useParams();
  const auth = localStorage.getItem("admin");
  const [check, setCheck] = useState({
    Card: "",
    NetBanking: "",
    UPI: "",
    Wallet: "",
    QRCode: "",
    Payout: "",
    MidData: "",
  });
  const [inputdata, setInputdata] = useState({
    ChargeBackChargesDown: "",
    ChargeBackChargesUp: "",
    RefundChargesINR: "",
    RollingReversemonth: "",
    RollingReverseCharges: "",
    PayoutCashCharges: "",
    PayoutCryptoCharges: "",
    Country1: "",
    PayinCharges1: "",
    PayoutCharges1: "",
    GSTCharges1: "",
    AddBankAndWallet: "",

    // After Set A defaul 🤓🤓🤓
    Firstname: "",
    Lastname: "",
    Email: "",
    Mobileno: "",
    Businessname: "",
    Businesslocation: "",
    Jobtitle: "",
    Website: "",
    AnnualProcessingVolume: "",
    AverageTransactionAmount: "",
    Chargebackpercentage: "",
    Currenciesrequired: "",
    MID: "",
    MKEY: "",
    MIDBilldesk: "",
    MKEYBilldesk: "",
    SettledCurrency: "",
    IsPayMerchantCode: "",
    IsPayEncryptionKey: "",
    IsPaySecureSecret: "",
    IsPayAccessCode: "",
    IsPayMccCode: "",
    IsPayTerminalID: "",
    CashfreeMid: "",
    CashfreeSecretkey: "",
    MerchantURL: "",
  });

  const [country, setCountry] = useState([]);
  const [bankName, setBankName] = useState([]);

  const fetchData = async () => {
    try {
      let formData = new FormData();
      formData.append("id", id);
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };
      let result = await axios.post(
        `${baseUrl}/readOneMerchantAdmin`,
        formData,
        config
      );
      setCountry(result.data.country);
      setBankName(result.data.bankName);
      setCheck({
        Card: result.data.data.allow_card_payment,
        NetBanking: result.data.data.allow_netbanking_payment,
        UPI: result.data.data.allow_upi_payment,
        Wallet: result.data.data.allow_wallet_payment,
        QRCode: result.data.data.allow_qr_payment,
        Payout: result.data.data.allow_payout,
        MidData: result.data.data.allow_webpayment,
      });

      setInputdata({
        ChargeBackChargesDown: result.data.data.chargebk_down,
        ChargeBackChargesUp: result.data.data.chargebk_up,
        RefundChargesINR: result.data.data.refund,
        RollingReversemonth: result.data.data.rolling_reverse_months,
        RollingReverseCharges: result.data.data.rolling_reverse,
        PayoutCashCharges: result.data.data.payout_imps,
        PayoutCryptoCharges: result.data.data.payout_rtgs,
        Country1: "",
        PayinCharges1: "",
        PayoutCharges1: "",
        GSTCharges1: "",
        AddBankAndWallet: "",

        // After Set a value 🤓🤓🤓
        Firstname: result.data.data.fname,
        Lastname: result.data.data.lname,
        Email: result.data.data.email,
        Mobileno: result.data.data.mobile_no,
        Businessname: result.data.data.bname,
        Businesslocation: result.data.data.blocation,
        Jobtitle: result.data.data.job_title,
        Website: result.data.data.website,
        AnnualProcessingVolume: result.data.data.apv,
        AverageTransactionAmount: result.data.data.ata,
        Chargebackpercentage: result.data.data.charge_back_per,
        Currenciesrequired: result.data.data.currencies_req,
        MID: result.data.data.mid,
        MKEY: result.data.data.mkey,
        MIDBilldesk: result.data.data.mid2,
        MKEYBilldesk: result.data.data.mkey2,
        SettledCurrency: result.data.data.settle_currency,
        IsPayMerchantCode: result.data.data.mid3,
        IsPayEncryptionKey: result.data.data.mkey3,
        IsPaySecureSecret: result.data.data.secure_secret,
        IsPayAccessCode: result.data.data.access_code,
        IsPayMccCode: result.data.data.mcc_code,
        IsPayTerminalID: result.data.data.terminal_id,
        CashfreeMid: result.data.data.cashfree_mid,
        CashfreeSecretkey: result.data.data.cashfree_scerity_key,
        MerchantURL: result.data.data.merchant_url,
      });

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Header title="Merchant  Edit New" path="/merchantAdmin" />
      <MiddleBlock
        check={check}
        setCheck={setCheck}
        inputdata={inputdata}
        setInputdata={setInputdata}
        country={country}
        bankName={bankName}
      />
    </>
  );
}

const MiddleBlock = ({ check, setCheck, inputdata, setInputdata, country,bankName }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  
  const checkHandleChange = (e) => {
    setCheck({ ...check, [e.target.name]: e.target.checked ? 1 : 0 });
  };
  const handleChangeInput = (e) => {
    setInputdata({ ...inputdata, [e.target.name]: e.target.value });
  };
  return (
    <form className="container my-2 mrchantAdminShadow">
      <div className="row">
        <div className="col-3 my-2">
          <CheckBox
            check={check.Card}
            onChange={checkHandleChange}
            name="Card"
            label="Card Payment"
          />
        </div>
        <div className="col-3 my-2">
          <CheckBox
            check={check.NetBanking}
            onChange={checkHandleChange}
            name="NetBanking"
            label="NetBanking Payment"
          />
        </div>
        <div className="col-3 my-2">
          <CheckBox
            check={check.UPI}
            onChange={checkHandleChange}
            name="UPI"
            label="UPI Payment"
          />
        </div>
        <div className="col-3 my-2">
          <CheckBox
            check={check.Wallet}
            onChange={checkHandleChange}
            name="Wallet"
            label="Wallet Payment"
          />
        </div>
        <div className="col-3 my-2">
          <CheckBox
            check={check.QRCode}
            onChange={checkHandleChange}
            name="QRCode"
            label="QR Code Payment"
          />
        </div>
        <div className="col-3 my-2">
          <CheckBox
            check={check.Payout}
            onChange={checkHandleChange}
            name="Payout"
            label="Payout Payment"
          />
        </div>
        <div className="col-3 my-2">
          <CheckBox
            check={check.MidData}
            onChange={checkHandleChange}
            name="MidData"
            label="Data to MID"
          />
        </div>

        {/* Input field */}

        <div className="col-6 my-2">
          <InputField
            title="ChargeBack Charges in INR Down"
            type="text"
            name="ChargeBackChargesDown"
            value={inputdata.ChargeBackChargesDown}
            onChange={handleChangeInput}
          />
        </div>

        <div className="col-6 my-2">
          <InputField
            title="ChargeBack Charges in INR UP"
            type="text"
            name="ChargeBackChargesUp"
            value={inputdata.ChargeBackChargesUp}
            onChange={handleChangeInput}
          />
        </div>
        <div className="col-6 my-2">
          <InputField
            title="Refund Charges in INR"
            type="text"
            name="RefundChargesINR"
            value={inputdata.RefundChargesINR}
            onChange={handleChangeInput}
          />
        </div>
        <div className="col-6 my-2">
          <InputField
            title="Rolling Reverse month"
            type="text"
            name="RollingReversemonth"
            value={inputdata.RollingReversemonth}
            onChange={handleChangeInput}
          />
        </div>
        <div className="col-4 my-2">
          <InputField
            title="Rolling Reverse Charges in %"
            type="text"
            name="RollingReverseCharges"
            value={inputdata.RollingReverseCharges}
            onChange={handleChangeInput}
          />
        </div>
        <div className="col-4 my-2">
          <InputField
            title="Payout Cash Charges in %*"
            type="text"
            name="PayoutCashCharges"
            value={inputdata.PayoutCashCharges}
            onChange={handleChangeInput}
          />
        </div>
        <div className="col-4 my-2">
          <InputField
            title="Payout Crypto Charges in %*"
            type="text"
            name="PayoutCryptoCharges"
            value={inputdata.PayoutCryptoCharges}
            onChange={handleChangeInput}
          />
        </div>

       
        {country.map((item, i) => {
          return (
            <div className="row" key={i}>
              <div className="col-3 my-2">
                <InputField
                  title="Country"
                  type="text"
                  name="Country1"
                  value={item.name}
                  onChange={handleChangeInput}
                />
              </div>
              <div className="col-3 my-2">
                <InputField
                  title="Payin Charges in %"
                  type="text"
                  name="PayinCharges1"
                  value={item.payin_amount}
                  onChange={handleChangeInput}
                />
              </div>
              <div className="col-3 my-2">
                <InputField
                  title="Payout Charges in %"
                  type="text"
                  name="PayoutCharges1"
                  value={item.payout_amount}
                  onChange={handleChangeInput}
                />
              </div>
              <div className="col-3 my-2">
                <InputField
                  title="GST Charges in %"
                  type="text"
                  name="GSTCharges1"
                  value={item.gst_amount}
                  onChange={handleChangeInput}
                />
              </div>
            </div>
          );
        })}

        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-8 ">
            <label className="form-label">Add Bank And Wallet</label>
            <Select
              isMulti
              name="AddBankAndWallet"
              options={bankName}
              className="basic-multi-select"
              classNamePrefix="select"
              selectOption
              onChange={setSelectedOption}
            />
          </div>
          <div className="col-4">
            <div>
              <button className="SvaeButtonAdmin w-50">Set a Value</button>
            </div>
          </div>
        </div>

        {/* end */}

        <div className="row">
          <div className="col-12 my-2">
            <InputField
              title="First name"
              type="text"
              name="Firstname"
              value={inputdata.Firstname}
              onChange={handleChangeInput}
            />
          </div>
          <div className="col-12 my-2">
            <InputField
              title="Last name"
              type="text"
              name="Lastname"
              value={inputdata.Lastname}
              onChange={handleChangeInput}
            />
          </div>
          <div className="col-12 my-2">
            <InputField
              title="Email"
              type="text"
              name="Email"
              value={inputdata.Email}
              onChange={handleChangeInput}
            />
          </div>
          <div className="col-12 my-2">
            <InputField
              title="Mobile no"
              type="text"
              name="Mobileno"
              value={inputdata.Mobileno}
              onChange={handleChangeInput}
            />
          </div>
          <div className="col-12 my-2">
            <InputField
              title="Business name"
              type="text"
              name="Businessname"
              value={inputdata.Businessname}
              onChange={handleChangeInput}
            />
          </div>
          <div className="col-12 my-2">
            <InputField
              title="Business location"
              type="text"
              name="Businesslocation"
              value={inputdata.Businesslocation}
              onChange={handleChangeInput}
            />
          </div>
          <div className="col-12 my-2">
            <InputField
              title="Job title"
              type="text"
              name="Jobtitle"
              value={inputdata.Jobtitle}
              onChange={handleChangeInput}
            />
          </div>
          <div className="col-12 my-2">
            <InputField
              title="Website"
              type="text"
              name="Website"
              value={inputdata.Website}
              onChange={handleChangeInput}
            />
          </div>
          <div className="col-12 my-2">
            <InputField
              title="Annual Processing Volume"
              type="text"
              name="AnnualProcessingVolume"
              value={inputdata.AnnualProcessingVolume}
              onChange={handleChangeInput}
            />
          </div>
          <div className="col-12 my-2">
            <InputField
              title="Average Transaction Amount"
              type="text"
              name="AverageTransactionAmount"
              value={inputdata.AverageTransactionAmount}
              onChange={handleChangeInput}
            />
          </div>
          <div className="col-12 my-2">
            <InputField
              title="Charge back percentage"
              type="text"
              name="Chargebackpercentage"
              value={inputdata.Chargebackpercentage}
              onChange={handleChangeInput}
            />
          </div>
          <div className="col-12 my-2">
            <InputField
              title="Currencies required"
              type="text"
              name="Currenciesrequired"
              value={inputdata.Currenciesrequired}
              onChange={handleChangeInput}
            />
          </div>
          <div className="col-12 my-2">
            <InputField
              title="MID"
              type="text"
              name="MID"
              value={inputdata.MID}
              onChange={handleChangeInput}
            />
          </div>
          <div className="col-12 my-2">
            <InputField
              title="MKEY"
              type="text"
              name="MKEY"
              value={inputdata.MKEY}
              onChange={handleChangeInput}
            />
          </div>
          <div className="col-12 my-2">
            <InputField
              title="MID Billdesk"
              type="text"
              name="MIDBilldesk"
              value={inputdata.MIDBilldesk}
              onChange={handleChangeInput}
            />
          </div>
          <div className="col-12 my-2">
            <InputField
              title="MKEY Billdesk"
              type="text"
              name="MKEYBilldesk"
              value={inputdata.MKEYBilldesk}
              onChange={handleChangeInput}
            />
          </div>
          <div className="col-12 my-2">
            <label className="form-label">Settled Currency</label>
            <select
              className="form-select"
              name="SettledCurrency"
              onChange={handleChangeInput}
              value={inputdata.SettledCurrency}
            >
              <option>Plese Select</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="USDT">USDT</option>
              <option value="BTC">BTC</option>
              <option value="ETH">ETH</option>
            </select>
          </div>
          <div className="col-12 my-2">
            <InputField
              title="IsPay Merchant Code"
              type="text"
              name="IsPayMerchantCode"
              value={inputdata.IsPayMerchantCode}
              onChange={handleChangeInput}
            />
          </div>
          <div className="col-12 my-2">
            <InputField
              title="IsPay Encryption Key"
              type="text"
              name="IsPayEncryptionKey"
              value={inputdata.IsPayEncryptionKey}
              onChange={handleChangeInput}
            />
          </div>
          <div className="col-12 my-2">
            <InputField
              title="IsPay Secure Secret"
              type="text"
              name="IsPaySecureSecret"
              value={inputdata.IsPaySecureSecret}
              onChange={handleChangeInput}
            />
          </div>
          <div className="col-12 my-2">
            <InputField
              title="IsPay Access Code"
              type="text"
              name="IsPayAccessCode"
              value={inputdata.IsPayAccessCode}
              onChange={handleChangeInput}
            />
          </div>
          <div className="col-12 my-2">
            <InputField
              title="IsPay Mcc Code"
              type="text"
              name="IsPayMccCode"
              value={inputdata.IsPayMccCode}
              onChange={handleChangeInput}
            />
          </div>
          <div className="col-12 my-2">
            <InputField
              title="IsPay Terminal ID"
              type="text"
              name="IsPayTerminalID"
              value={inputdata.IsPayTerminalID}
              onChange={handleChangeInput}
            />
          </div>
          <div className="col-12 my-2">
            <InputField
              title="Cashfree Mid"
              type="text"
              name="CashfreeMid"
              value={inputdata.CashfreeMid}
              onChange={handleChangeInput}
            />
          </div>
          <div className="col-12 my-2">
            <InputField
              title="Cashfree Secret key"
              type="text"
              name="CashfreeSecretkey"
              value={inputdata.CashfreeSecretkey}
              onChange={handleChangeInput}
            />
          </div>
          <div className="col-12 my-2">
            <InputField
              title="Merchant URL"
              type="text"
              name="MerchantURL"
              value={inputdata.MerchantURL}
              onChange={handleChangeInput}
            />
          </div>
        </div>
      </div>
      <div className="text-end">
        <Button
          variant="primary"
          type="submit"
          style={{
            borderRadius: "20px",
            marginTop: "20px",
            color: "#fff",
            background: "#ff6600",
            display: "flex",
            marginLeft: "auto",
          }}
        >
          Update
        </Button>
      </div>
    </form>
  );
};

const CheckBox = ({ check, onChange, name, label }) => {
  return (
    <>
      <div className="my-2">{label}</div>
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          value={check}
          checked={check ? true : false}
          onChange={onChange}
          name={name}
        />
        <label className="form-check-label">{check ? "Yes" : "No"}</label>
      </div>
    </>
  );
};

const InputField = ({ title, type, name, value, onChange }) => {
  return (
    <div className="mb-3">
      <label className="form-label">{title}</label>
      <input
        type={type}
        className="form-control"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={name}
      />
    </div>
  );
};

export default EditMerchantAdmin;
