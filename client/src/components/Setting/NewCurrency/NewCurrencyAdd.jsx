import React, { useState } from "react";
import Header from "../../../commonComp/Header/Header";
import baseUrl from "../../config/baseUrl";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CommonCurrency from "./CommonCurrency";

function NewCurrencyAdd() {
  const [country, setCountry] = useState("");
  const [currency, setCurrency] = useState("");
  const [currency_code, setCurrency_code] = useState("");
  
  const auth = localStorage.getItem("admin");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let formData = new FormData();
      formData.append("country", country);
      formData.append("currency", currency);
      formData.append("currency_code", currency_code);
      

      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(`${baseUrl}/addCurrency`, formData, config);

      toast.success(result.data.message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate("/Currency");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header title="Add New Currency" path="/Currency" />
      <CommonCurrency
        country={country}
        setCountry={setCountry}
        currency={currency}
        setCurrency={setCurrency}
        currency_code={currency_code}
        setCurrency_code={setCurrency_code}
        handleSubmit={handleSubmit}
        buttonText="Create"
      />
    </>
  );
}

export default NewCurrencyAdd;
