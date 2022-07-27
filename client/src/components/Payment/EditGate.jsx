import React, { useEffect, useState } from "react";
import Common from "./Common";
import Header from "../../commonComp/Header/Header";
import { useParams } from "react-router-dom";
import baseUrl from "../config/baseUrl";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function EditGate() {
  const navigate = useNavigate();
  const [type, setType] = useState("");
  const [gateway_name, setGateway_Name] = useState("");
  const [merNo, setMerNo] = useState("");
  const [gateway_number, setGateway_Number] = useState("");
  const [key, setKey] = useState("");
  const auth = localStorage.getItem("admin");
  let { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        let formData = new FormData();
        formData.append("id", id);
        const config = {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${auth}`,
          },
        };
        let result = await axios.post(
          `${baseUrl}/getId`,
          formData,
          config
        );
      console.log(result.data.data.key)
        setType(result.data.data.type);
        setGateway_Name(result.data.data.gateway_name);
        setMerNo(result.data.data.merNo);
        setGateway_Number(result.data.data.gateway_number);
        setKey(result.data.data.key);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id, auth]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let formData = new FormData();
      formData.append("id", id);
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

      let result = await axios.post(`${baseUrl}/edit`, formData, config);
      
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
      <Header title="Edit Gate" path="/PGMod" />
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
        buttonText="Update"
      />
    </>
  );
}

export default EditGate;
