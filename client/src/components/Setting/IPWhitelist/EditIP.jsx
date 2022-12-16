import React, { useEffect, useState } from "react";
import CommonIP from "./CommonIP";
import Header from "../../../commonComp/Header/Header";
import baseUrl from "../../config/baseUrl";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function EditIP() {
  const [gateway, setGateway] = useState("");
  const [ip, setIP] = useState("");
  let { id } = useParams();
  const auth = localStorage.getItem("admin");
  const navigate = useNavigate();

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
          `${baseUrl}/readOneIP`,
          formData,
          config
        );
        console.log(result.data.gateway)
        setGateway(result.data.gateway);
        setIP(result.data.ip);
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
      formData.append("gateway", gateway);
      formData.append("ip", ip);
      formData.append("id",id)
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };
      let result = await axios.post(
        `${baseUrl}/editIP`,
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
      navigate("/IPWhiteList");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header title="IP Whitelist" path="/IPWhiteList" />
      <CommonIP
        gateway={gateway}
        setGateway={setGateway}
        ip={ip}
        setIP={setIP}
        handleSubmit={handleSubmit}
        buttonText="Update"
      />
    </>
  );
}

export default EditIP;
