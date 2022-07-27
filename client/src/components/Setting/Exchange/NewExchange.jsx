import React, { useState } from "react";
import CommonMid from "./Common";
import Header from "../../../commonComp/Header/Header";
import baseUrl from "../../config/baseUrl";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function NewExchange() {
  const [exchange_title, setExchange_title] = useState("");
  const [rate, setRate] = useState("");
  
  const auth = localStorage.getItem("admin");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let formData = new FormData();
      formData.append("exchange_title", exchange_title);
      formData.append("rate", rate);
      

      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(`${baseUrl}/createExchange`, formData, config);

      toast.success(result.data.message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate("/Exchange");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header title="Mid Add New" path="/Exchange" />
      <CommonMid
        exchange_title={exchange_title}
        setExchange_title={setExchange_title}
        rate={rate}
        setRate={setRate}
        handleSubmit={handleSubmit}
        buttonText="Create"
      />
    </>
  );
}

export default NewExchange;
