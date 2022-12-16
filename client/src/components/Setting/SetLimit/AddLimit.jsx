import React, { useState } from "react";
import Header from "../../../commonComp/Header/Header";
import baseUrl from "../../config/baseUrl";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CommonLimit from "./CommonLimit";

function AddLimit() {
  const [merchants, setMerchants] = useState("");
  const [gateway, setGateway] = useState("");
  const [currency, setCurrency] = useState("");
  const [min_amount, setMin_amount] = useState("");
  const [max_amount, setMax_amount] = useState("");
  
  const auth = localStorage.getItem("admin");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let formData = new FormData();
      formData.append("user_id", merchants);
      formData.append("gateway", gateway);
      formData.append("currency", currency);
      formData.append("max", max_amount);
      formData.append("min", min_amount);
      

      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(`${baseUrl}/createLimit`, formData, config);

      toast.success(result.data.message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate("/Limit");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header title="Set Limit" path="/Limit" />
      <CommonLimit
        merchants={merchants}
        setMerchants={setMerchants}
        gateway={gateway}
        setGateway={setGateway}
        currency={currency}
        setCurrency={setCurrency}
        min_amount={min_amount}
        setMin_amount={setMin_amount}
        max_amount={max_amount}
        setMax_amount={setMax_amount}
        handleSubmit={handleSubmit}
        buttonText="Create"
      />
    </>
  );
}

export default AddLimit;
