import React, { useEffect, useState } from "react";
import CommonMid from "./Common";
import Header from "../../../commonComp/Header/Header";
import baseUrl from "../../config/baseUrl";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function UpdateExchange() {
  const [exchange_title, setExchange_title] = useState("");
  const [rate, setRate] = useState("");
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
          `${baseUrl}/readOneExchange`,
          formData,
          config
        );
        setExchange_title(result.data.exchange_title);
        setRate(result.data.rate);
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
      formData.append("exchange_title", exchange_title);
      formData.append("rate", rate);
      formData.append("id",id)
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };
      let result = await axios.post(
        `${baseUrl}/updateExchange`,
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
      navigate("/Exchange");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header title="Currency  Edit" path="/Exchange" />
      <CommonMid
        exchange_title={exchange_title}
        setExchange_title={setExchange_title}
        rate={rate}
        setRate={setRate}
        handleSubmit={handleSubmit}
        buttonText="Update"
      />
    </>
  );
}

export default UpdateExchange;
