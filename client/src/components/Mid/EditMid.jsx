import React, { useEffect, useState } from "react";
import CommonMid from "./CommonMid";
import Header from "../../commonComp/Header/Header";
import { useParams } from "react-router-dom";
import baseUrl from "../config/baseUrl";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function EditMid() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [mid, setMid] = useState("");
  const [sec_key, setSec_key] = useState("");
  const [iv, setIv] = useState("");
  const [merchant_url, setMerchant_url] = useState("");
  const [merchant_otherurl, setMerchant_otherurl] = useState("");
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
          `${baseUrl}/readUpdateMid`,
          formData,
          config
        );
     
        setTitle(result.data.title);
        setMid(result.data.mid);
        setSec_key(result.data.sec_key);
        setIv(result.data.iv);
        setMerchant_url(result.data.merchant_url);
        setMerchant_otherurl(result.data.merchant_otherurl);

        toast.success(result.data.message, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
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
      formData.append("title", title);
      formData.append("mid", mid);
      formData.append("sec_key", sec_key);
      formData.append("iv", iv);
      formData.append("merchant_url", merchant_url);
      formData.append("merchant_otherurl", merchant_otherurl);

      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(`${baseUrl}/updateMid`, formData, config);
      
      toast.success(result.data.message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate("/mid");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header title="Mid Edit New" path="/mid" />
      <CommonMid
        title={title}
        setTitle={setTitle}
        mid={mid}
        setMid={setMid}
        sec_key={sec_key}
        setSec_key={setSec_key}
        iv={iv}
        setIv={setIv}
        merchant_url={merchant_url}
        setMerchant_url={setMerchant_url}
        merchant_otherurl={merchant_otherurl}
        setMerchant_otherurl={setMerchant_otherurl}
        handleSubmit={handleSubmit}
        buttonText="Update"
      />
    </>
  );
}

export default EditMid;
