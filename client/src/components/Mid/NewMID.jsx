import React, { useState } from "react";
import CommonMid from "./CommonMid";
import Header from "../../commonComp/Header/Header";
import baseUrl from "../config/baseUrl";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function NewMID() {
  const [title, setTitle] = useState("");
  const [mid, setMid] = useState("");
  const [sec_key, setSec_key] = useState("");
  const [iv, setIv] = useState("");
  const [merchant_url, setMerchant_url] = useState("");
  const [merchant_otherurl, setMerchant_otherurl] = useState("");
  const auth = localStorage.getItem("admin");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let formData = new FormData();
      formData.append("title", title);
      formData.append("mid", mid);
      formData.append("sec_key", sec_key);
      formData.append("iv", iv);
      formData.append("merchant_url", merchant_url);
      formData.append("merchant_otherurl", merchant_otherurl);

      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(`${baseUrl}/createMid`, formData, config);

      toast.success(result.data.message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate("/mid");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header title="Mid Add New" path="/mid" />
      <CommonMid
        title={title}
        setTitle={setTitle}
        mid={mid}
        setMid={setMid}
        sec_key={sec_key}
        setSec_key={setSec_key}
        iv={iv}
        setIv={setIv}
        merchant_url={merchant_url}
        setMerchant_url={setMerchant_url}
        merchant_otherurl={merchant_otherurl}
        setMerchant_otherurl={setMerchant_otherurl}
        handleSubmit={handleSubmit}
        buttonText="Create"
      />
    </>
  );
}

export default NewMID;
