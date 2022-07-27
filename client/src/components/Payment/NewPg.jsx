import React, { useState } from "react";
import Common from "./Common";
import Header from "../../commonComp/Header/Header";
import baseUrl from "../config/baseUrl";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


function NewPg() {
  const [type, setType] = useState("");
  const [gateway_name, setGateway_Name] = useState("");
  const [merNo, setMerNo] = useState("");
  const [gateway_number, setGateway_Number] = useState("");
  const [key, setKey] = useState("");
  const auth = localStorage.getItem("admin");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let formData = new FormData();
      formData.append("type", type);
      formData.append("gateway_name", gateway_name);
      formData.append("merchantN", merNo);
      formData.append("gatewayN", gateway_number);
      formData.append("key", key);

      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(`${baseUrl}/create`, formData, config);

      toast.success(result.data.message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate("/PGMod");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header title="Our Gate" path="/PGMod" />
      <Common
        type={type}
        setType={setType}
        gateway_name={gateway_name}
        setGateway_Name={setGateway_Name}
        merNo={merNo}
        setMerNo={setMerNo}
        gateway_number={gateway_number}
        setGateway_Number={setGateway_Number}
        key1={key}
        setKey1={setKey}
        handleSubmit={handleSubmit}
        buttonText="Create"
      />
    </>
  );
}

export default NewPg;
