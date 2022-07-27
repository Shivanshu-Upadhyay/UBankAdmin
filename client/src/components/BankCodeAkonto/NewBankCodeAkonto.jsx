import React, { useState } from "react";
import Common from "./Common";
import Header from "../../commonComp/Header/Header";
import baseUrl from "../config/baseUrl";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function NewBankCodeAkonto() {
  let [type, setType] = useState(-1);
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const auth = localStorage.getItem("admin");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(type, title, code);
    try {
      let formData = new FormData();
      formData.append("title", title);
      formData.append("code", code);
      formData.append("type", type);

      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(`${baseUrl}/createBankCodeAkonto`, formData, config);

      toast.success(result.data.message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate("/bankcodeakonto");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header title="Bankcode Akonto > Add New" path="/bankcodeakonto" />
      <Common
        title={title}
        setTitle={setTitle}
        setType={setType}
        type={type}
        code={code}
        setCode={setCode}
        handleSubmit={handleSubmit}
        buttonText="Create"
      />
    </>
  );
}
;

export default NewBankCodeAkonto