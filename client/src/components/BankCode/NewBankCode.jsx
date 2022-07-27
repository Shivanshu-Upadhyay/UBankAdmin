import React, { useState } from "react";
import Common from "./Common";
import Header from "../../commonComp/Header/Header";
import baseUrl from "../config/baseUrl";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function NewBankCode() {
  let [type, setType] = useState(-1);
  let [type1, setType1] = useState(-1);
  let [type1Name, setType1Name] = useState([]);
  let [bankCode, setBankCode] = useState(-1);
  let [bankCodeName, setBankCodeName] = useState([]);
  let [bankServicesCharge, setbankServicesCharge] = useState('');
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const auth = localStorage.getItem("admin");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(type, title, code);
    try {
      let formData = new FormData();
      formData.append("type", type);
      formData.append("akontocode", bankCode);
      formData.append("payment_gate", type1);
      formData.append("bank_services_charge", bankServicesCharge);
      formData.append("title", title);
      formData.append("code", code);

      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(
        `${baseUrl}/createBankCode`,
        formData,
        config
      );

      toast.success(result.data.message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate("/bankcode");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header title="Bankcode  Add New" path="/bankcode" />
      <Common
        title={title}
        setTitle={setTitle}
        type1Name={type1Name}
        setType1Name={setType1Name}
        bankCode={bankCode}
        setBankCode={setBankCode}
        bankServicesCharge={bankServicesCharge}
        setbankServicesCharge={setbankServicesCharge}
        setType={setType}
        type={type}
        setType1={setType1}
        type1={type1}
        code={code}
        setCode={setCode}
        bankCodeName={bankCodeName}
        setBankCodeName={setBankCodeName}
        handleSubmit={handleSubmit}
        buttonText="Create"
      />
    </>
  );
}
export default NewBankCode;
