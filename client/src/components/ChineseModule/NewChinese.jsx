import React, { useState } from "react";
import Header from "../../commonComp/Header/Header";
import baseUrl from "../config/baseUrl";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Table from "./Table";



function NewChinese() {
  const [payment_gate, setPayment_gate] = useState("");
  const [title, setTitle] = useState("");
  const [title_en, setTitle_en] = useState("");
  const auth = localStorage.getItem("admin");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let formData = new FormData();
      formData.append("type", payment_gate);
      formData.append("title", title);
      formData.append("title_en", title_en);

      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(`${baseUrl}/createChinese`, formData, config);

      toast.success(result.data.message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate("/Chinese");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header title="UBankConnect Chinese Bank" path="/Chinese" />
      <Table
        payment_gate={payment_gate}
        setPayment_gate={setPayment_gate}
        title={title}
        setTitle={setTitle}
        title_en={title_en}
        setTitle_en={setTitle_en}
        handleSubmit={handleSubmit}
        buttonText="Create"
      />
    </>
  );
}

export default NewChinese;
