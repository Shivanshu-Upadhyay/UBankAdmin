import React, { useEffect, useState } from "react";
import Header from "../../commonComp/Header/Header";
import baseUrl from "../config/baseUrl";
import axios from "axios";
import "./settelment.css";
const auth = localStorage.getItem("admin");
function Common() {
  return (
    <>
      <Header title="Settlement  Add New" path="/Settlement" />
      <Block />
    </>
  );
}

const Block = () => {
  const [currencyList, setCurrencyList] = useState([]);
  const [merchantList, setMerchantList] = useState([]);
  const [merchant, setMerchant] = useState("");
  const [currency, setCurrency] = useState("");
  const [available_balance, setAvailableBalance] = useState("");
  const [exchangeRate, setExchangeRate] = useState("");
  const [settlementType, setSettlementType] = useState("");
  const [SettlementID, setSettlementID] = useState(
    Math.trunc(Math.random() * 10000000)
  );
  const [accountNumber, setAccountNumber] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [requestedAmount,setRequestedAmount]=useState('');
  let remainingBalance=available_balance-requestedAmount;
  
  // date time
  let currentdate = new Date();
  let datetime =
    currentdate.getDate() +
    "/" +
    (currentdate.getMonth() + 1) +
    "/" +
    currentdate.getFullYear() +
    " " +
    currentdate.getHours() +
    ":" +
    currentdate.getMinutes() +
    ":" +
    currentdate.getSeconds();
  // End date time
const [settlementTime,setSettlementTime]=useState('');
const[feesCharges,setFeesCharges]=useState('');
let totalCharges=(requestedAmount*feesCharges)/100;
let netAmountForSettlement=requestedAmount-totalCharges;
let totalSettlementAmount=netAmountForSettlement/exchangeRate;
  useEffect(() => {
    const ReadData = async () => {
      try {
        let formData = new FormData();
        const config = {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${auth}`,
          },
        };

        let result = await axios.post(
          `${baseUrl}/defaultSettlement`,
          formData,
          config
        );
        setCurrencyList(result.data.currency);
        setMerchantList(result.data.merchants);
        console.log(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    ReadData();
  }, []);

  let detailsByMerchant = async (id) => {
    try {
      setMerchant(id);
      let formData = new FormData();
      formData.append("merchant_id", id);

      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(
        `${baseUrl}/detailSettlement`,
        formData,
        config
      );
      console.log(result.data);
      setAvailableBalance(result.data.data[0].wallet);
    } catch (error) {
      console.log(error);
    }
  };
  let currencyById = async (id) => {
    try {
      setCurrency(id);
      let formData = new FormData();
      formData.append("currency", id);
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(
        `${baseUrl}/detailSettlement`,
        formData,
        config
      );
      console.log(result.data);
      setExchangeRate(result.data.data[0].rate);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(walletAddress);

  return (
    <>
      <div className="row mx-4 my-5">
        <div className="col-12 dialogBlock1 mb-3 ">
          <form action="" className="row justify-content-around">
            <div className="col-md-2">
              <InputTypeCommon label="Settlement ID" value={SettlementID} />
            </div>
            <div className="col-md-2 d-flex flex-column align-items-center text-center mb-4">
              <label htmlFor="" className="mb-2 labelofstellement">
                Merchant Name
              </label>
              <select
                style={{ width: "100px" }}
                className="selectofstellement"
                value={merchant}
                onChange={(e) => {
                  detailsByMerchant(e.target.value);
                }}
              >
                <option value="Select">Select</option>
                {merchantList.map((item) => (
                  <option value={item.id} key={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-2 d-flex flex-column align-items-center text-center mb-4">
              <label htmlFor="" className="mb-2 labelofstellement">
                Settlement Type
              </label>
              <select
                style={{ width: "100px" }}
                className="selectofstellement"
                value={settlementType}
                onChange={(e) => setSettlementType(e.target.value)}
              >
                <option value="Select">Select</option>
                <option value="FIAT">FIAT</option>
                <option value="CRYPTO">CRYPTO</option>
              </select>
            </div>
            <div className="col-md-2 d-flex flex-column align-items-center text-center mb-4">
              <label htmlFor="" className="mb-2 labelofstellement">
                From Currency
              </label>
              <select
                style={{ width: "100px" }}
                className="selectofstellement"
                value={currency}
                onChange={(e) => currencyById(e.target.value)}
              >
                <option value="Select Currency">Select Currency</option>
                {currencyList.map((item) => (
                  <option value={item.sortname} key={item.currencyId}>
                    {item.sortname}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-2 d-flex flex-column align-items-center text-center mb-4">
              <label htmlFor="" className="mb-2 labelofstellement">
                To Currency
              </label>
              <select
                style={{ width: "100px" }}
                className="selectofstellement"
                
              >
                <option value="Select Currency">Select Currency</option>
                {currencyList.map((item) => (
                  <option value={item.sortname} key={item.currencyId}>
                    {item.sortname}
                  </option>
                ))}
              </select>
            </div>
            {settlementType !== "FIAT" ? (
              <div className="col-md-2">
                <InputTypeCommon
                  label="Wallet Address"
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                />
              </div>
            ) : null}
            <hr style={{ width: "95%" }} />
            {settlementType !== "CRYPTO" ? (
              <div className="col-md-2">
                <InputTypeCommon
                  label="Account Number"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                />
              </div>
            ) : null}

            <div className="col-md-2">
              <InputTypeCommon
                label="Available Balance"
                value={available_balance}
              />
            </div>
            <div className="col-md-2">
              <InputTypeCommon
                label="Remaining Balance"
                value={remainingBalance}
                
              />
            </div>
            <div className="col-md-2">
              <InputTypeCommon label="Requested Time" value={datetime} />
            </div>
            <div className="col-md-2">
              <InputTypeCommon label="Settlement Time" value={settlementTime} onChange={(e)=>setSettlementTime(e.target.value)}/>
            </div>
            <hr style={{ width: "95%" }} />
            <div className="col-md-2">
              <InputTypeCommon label="Requested Amount" value={requestedAmount} onChange={(e)=>setRequestedAmount(e.target.value)}/>
            </div>
            <div className="col-md-2">
              <InputTypeCommon label="Fees/Charges" value={feesCharges} onChange={(e)=>setFeesCharges(e.target.value)}/>
            </div>
            <div className="col-md-2">
              <InputTypeCommon label="Total Charges" value={totalCharges} />
            </div>
            <div className="col-md-4">
              <InputTypeCommon label="Net Amount For Settlement" value={netAmountForSettlement} />
            </div>
            <div className="col-md-2">
              <InputTypeCommon label="Exchange Rate" value={exchangeRate} />
            </div>
            {settlementType !== "CRYPTO" ? (
              <>
                <hr style={{ width: "95%" }} />
                <div className="col-md-2">
                  <InputTypeCommon label="Bank Name" />
                </div>
                <div className="col-md-2">
                  <InputTypeCommon label="Branch Name" />
                </div>
                <div className="col-md-2">
                  <InputTypeCommon label="City" />
                </div>
                <div className="col-md-2">
                  <InputTypeCommon label="Zip Code" />
                </div>
                <div className="col-md-2">
                  <InputTypeCommon label="Country" />
                </div>
                <div className="col-md-2">
                  <InputTypeCommon label="SWIFT/SEPA Code" />
                </div>
              </>
            ) : null}

            <div className="col-12">
              <div className="row justify-content-center align-items-center">
                <div className="col-6">
                  <div className="amoountfieldSettelment">
                    <div style={{ fontWeight: "700" }} className="text-center">
                      Amount
                    </div>
                    <div className="d-flex align-items-center mx-4 mb-2">
                      <span className="">
                        <img
                          src="https://www.bankconnect.online/assets/merchants/img/dollor.svg"
                          alt=""
                          width="50px"
                        />
                      </span>
                      <span className="mx-4">{totalSettlementAmount&&currency?totalSettlementAmount.toFixed(3):"00.00"}</span>
                    </div>
                  </div>
                </div>
                <div className="col-6 text-end">
                  <button className="mx-5 button-Settlement-submit">
                    <span className="mx-2">
                      <img
                        src="https://www.bankconnect.online/assets/merchants/img/send.png"
                        alt="not found"
                        width="25px"
                      />
                    </span>
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

const InputTypeCommon = ({ label, type, value, name, onChange }) => {
  return (
    <div className="d-flex flex-column text-center mb-4">
      <label htmlFor="" className="mb-2 labelofstellement">
        {label}
      </label>
      <input
        type={type}
        className="inputofstellement"
        name={name}
        value={value}
        style={{ color: "#BFBFBF" }}
        onChange={onChange}
      />
    </div>
  );
};

export default Common;
