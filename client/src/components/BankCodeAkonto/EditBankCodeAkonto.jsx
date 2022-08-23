import React, { useState, useEffect } from "react";
import Common from "./Common";
import Header from "../../commonComp/Header/Header";
import baseUrl from "../config/baseUrl";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
function EditBankCodeAkonto() {
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const auth = localStorage.getItem("admin");
  const navigate = useNavigate();
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
          `${baseUrl}/readUpdateBankCodeAkonto`,
          formData,
          config
        );
       
        setTitle(result.data.data.title);
        setCode(result.data.data.code);
        setType(result.data.data.type);
      } catch (error) {
        console.log(error);
        toast.error("Data not Fetched", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    };
    fetchData();
  }, [id, auth]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(type, title, code);
    try {
      let formData = new FormData();
      formData.append("title", title);
      formData.append("code", code);
      formData.append("type", type);
      formData.append("id", id);

      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(
        `${baseUrl}/updateBankCodeAkonto`,
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
      navigate("/bankcodeakonto");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header title="Bankcode Akonto > Edit New" path="/bankcodeakonto" />
      <Common
        title={title}
        setTitle={setTitle}
        code={code}
        setCode={setCode}
        type={type}
        setType={setType}
        handleSubmit={handleSubmit}
        buttonText="Update"
      />
    </>
  );
}
export default EditBankCodeAkonto;
