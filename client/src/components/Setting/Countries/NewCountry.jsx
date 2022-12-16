import React, { useState } from "react";
import Header from "../../../commonComp/Header/Header";
import baseUrl from "../../config/baseUrl";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CommonCountry from "./CommonCountry";

function NewCountry() {
  const [countryName, setCountryName] = useState("");
  const [currency, setCurrency] = useState("");
  const [sortname, setSortname] = useState("");
  const [symbol, setSymbol] = useState("");
  
  const auth = localStorage.getItem("admin");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let formData = new FormData();
      formData.append("name", countryName);
      formData.append("currency", currency);
      formData.append("sortname", sortname);
      formData.append("symbol", symbol);
      

      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(`${baseUrl}/addCountry`, formData, config);

      toast.success(result.data.message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate("/Countries");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header title="Add New Country" path="/Countries" />
      <CommonCountry
        countryName={countryName}
        setCountryName={setCountryName}
        currency={currency}
        setCurrency={setCurrency}
        sortname={sortname}
        setSortname={setSortname}
        symbol={symbol}
        setSymbol={setSymbol}
        handleSubmit={handleSubmit}
        buttonText="Create"
      />
    </>
  );
}

export default NewCountry;
