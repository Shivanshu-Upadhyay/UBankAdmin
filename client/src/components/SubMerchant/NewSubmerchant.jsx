import React, { useState } from "react";
import CommonSubmerchant from "./CommonSubmerchant";
import Header from "../../commonComp/Header/Header";
import baseUrl from "../config/baseUrl";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function NewSubmerchant() {
  const [name, setName] = useState("");
  const [sec_key, setSec_key] = useState("");
  const [salt, setSalt] = useState("");
  const [percentage, setPercentage] = useState("");
  const [mid, setMid] = useState("");
  const [merchant_ids, setMerchant_ids] = useState("");
  
  const auth = localStorage.getItem("admin");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let formData = new FormData();
      formData.append("name", name);
      formData.append("sec_key", sec_key);
      formData.append("salt", salt);
      formData.append("percentage", percentage);
      formData.append("mid", mid);
      formData.append("merchant_ids", merchant_ids);
      

      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(`${baseUrl}/createSubmerchant`, formData, config);

      toast.success(result.data.message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate("/SubMerchant");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header title="Sub Merchant" path="/SubMerchant" />
      <CommonSubmerchant
        name={name}
        setName={setName}
        sec_key={sec_key}
        setSec_key={setSec_key}
        salt={salt}
        setSalt={setSalt}
        percentage={percentage}
        setPercentage={setPercentage}
        mid={mid}
        setMid={setMid}
        merchant_ids={merchant_ids}
        setMerchant_ids={setMerchant_ids}
        handleSubmit={handleSubmit}
        buttonText="Create"
      />
    </>
  );
}

export default NewSubmerchant;
