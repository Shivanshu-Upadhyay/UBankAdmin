import React, { useEffect, useState } from "react";
import Header from "../../commonComp/Header/Header";
import { useParams } from "react-router-dom";
import baseUrl from "../config/baseUrl";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
 
import Table from "./Table";


function EditBank() {
  const navigate = useNavigate();
  const [payment_gate, setPayment_gate] = useState("");
  const [title, setTitle] = useState("");
  const [title_en, setTitle_en] = useState("");
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
          `${baseUrl}/getIdChinese`,
          formData,
          config
        );

        console.log(result.data.data.title_en)
     
        setPayment_gate(result.data.data.payment_gate);
        setTitle(result.data.data.title);
        setTitle_en(result.data.data.title_en);

        // toast.success(result.data.message, {
        //   position: "bottom-right",
        //   autoClose: 5000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        // });
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
      formData.append("type", payment_gate);
      formData.append("title", title);
      formData.append("title_en", title_en);

      console.log(payment_gate)
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(`${baseUrl}/editChinese`, formData, config);
      
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
      <Header title="Edit New Bank" path="/Chinese" />
      <Table
        payment_gate={payment_gate}
        setPayment_gate={setPayment_gate}
        title={title}
        setTitle={setTitle}
        title_en={title_en}
        setTitle_en={setTitle_en}
        handleSubmit={handleSubmit}
        buttonText="Update"
      />
    </>
  );
}

export default EditBank;
