import React, { useState } from "react";
import Header from "../../../commonComp/Header/Header";
import baseUrl from "../../config/baseUrl";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Common from "./Common"



function NewMerchant() {
  const [users_id, setUser_id] = useState("");
  const [currencyId, setCurrencyID] = useState("");
  const [type, setType] = useState("");
  const [uniqueId, setUniqueId] = useState("");
  const [payee_name, setPayee_name] = useState("");
  const [amount, setAmount] = useState("");
  const auth = localStorage.getItem("admin");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let formData = new FormData();
      formData.append("merchantId", users_id);
      formData.append("currency_id", currencyId);
      formData.append("trx_type", type);
      formData.append("transaction_id", uniqueId);
      formData.append("name", payee_name);
      formData.append("amount", amount);

      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(`${baseUrl}/createMT`, formData, config);

      toast.success(result.data.message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate("/MerchantTrans");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header title="Merchant Payin " path="/MerchantTrans" />
      <Common
        users_id={users_id}
        setUser_id={setUser_id}
        currencyID={currencyId}
        setCurrencyID={setCurrencyID}
        type={type}
        setType={setType}
        uniqueId={uniqueId}
        setUniqueId={setUniqueId}
        payee_name={payee_name}
        setPayee_name={setPayee_name}
        amount={amount}
        setAmount={setAmount}
        handleSubmit={handleSubmit}
        buttonText="Create"
      />
    </>
  );
}

export default NewMerchant;
