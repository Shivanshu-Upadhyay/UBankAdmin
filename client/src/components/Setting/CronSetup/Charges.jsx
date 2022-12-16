import React, { useEffect, useState } from "react";
import CommonCron from "./CommonCron";
import baseUrl from "../../config/baseUrl";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Charges() {
  const [additional_charges, setAdditional_charges] = useState("");
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
        `${baseUrl}/readOneCron`,
        formData,
        config
    );
    setAdditional_charges(result.data.additional_charges);
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
      formData.append("additional_charges", additional_charges);
      formData.append("id",id)
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };
      let result = await axios.post(
        `${baseUrl}/updateAdditional`,
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
      navigate("/Cron");
    } catch (error) {
      console.log(error);
    }
};

  return (
    <>
      <CommonCron
        additional_charges={additional_charges}
        setAdditional_charges={setAdditional_charges}
        handleSubmit={handleSubmit}
        buttonText="Save Changes"
      />
    </>
  );
}

export default Charges;
