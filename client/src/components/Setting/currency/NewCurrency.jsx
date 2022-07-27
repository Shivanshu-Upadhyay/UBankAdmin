import React, { useState } from "react";
import CommonMid from "./Common";
import Header from "../../../commonComp/Header/Header";
import baseUrl from "../../config/baseUrl";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function NewCurrency() {
  const [deposit_currency, setDeposit_currency] = useState("");
  const [settled_currency, setSettled_currency] = useState("");
  const [rate, setRate] = useState("");
  
  const auth = localStorage.getItem("admin");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let formData = new FormData();
      formData.append("deposit_currency", deposit_currency);
      formData.append("settled_currency", settled_currency);
      formData.append("rate", rate);
      

      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(`${baseUrl}/createCurrency`, formData, config);

      toast.success(result.data.message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate("/CurrencyRate");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header title=" Currency Add new" path="/CurrencyRate" />
      <CommonMid
        deposit_currency={deposit_currency}
        setDeposit_currency={setDeposit_currency}
        settled_currency={settled_currency}
        setSettled_currency={setSettled_currency}
        rate={rate}
        setRate={setRate}
        handleSubmit={handleSubmit}
        buttonText="Create"
      />
    </>
  );
}

export default NewCurrency;
