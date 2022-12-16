import React, { useState } from "react";
import CommonIP from "./CommonIP";
import Header from "../../../commonComp/Header/Header";
import baseUrl from "../../config/baseUrl";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function NewIP() {
  const [gateway, setGateway] = useState("");
  const [ip, setIP] = useState("");
  const auth = localStorage.getItem("admin");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let formData = new FormData();
      formData.append("gateway", gateway);
      formData.append("ip", ip);
      

      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(`${baseUrl}/createIPWhitelist`, formData, config);

      toast.success(result.data.message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate("/IPWhitelist");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header title="New IP Whitelist" path="/IPWhitelist" />
      <CommonIP
        gateway={gateway}
        setGateway={setGateway}
        ip={ip}
        setIP={setIP}
        handleSubmit={handleSubmit}
        buttonText="Create"
      />
    </>
  );
}

export default NewIP;
