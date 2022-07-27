import React from "react";
import Header from "../../commonComp/Header/Header";
import baseUrl from "../config/baseUrl";
import axios from "axios";
import { Button } from "@mui/material";
import {useNavigate} from 'react-router-dom'
import { toast } from "react-toastify";
function AddNewMerchantAdmin() {
  const auth = localStorage.getItem("admin");
  const [data, setData] = React.useState({
    fname: "",
    lname: "",
    email: "",
    mobileNo: "",
    businessName: "",
    businessLocation: "",
    jobTitle: "",
    website: "",
    annualProcessingVolume: "",
    averageTransactionAmount: "",
    chargeBackPercentage: "",
    currenciesRequired: "",
  });
  const navigate = useNavigate()
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    
    try {
      let formData = new FormData();
      formData.append("fname", data.fname);
      formData.append("lname", data.lname);
      formData.append("email", data.email);
      formData.append("mobile_no", data.mobileNo);
      formData.append("bname", data.businessName);
      formData.append("blocation", data.businessLocation);
      formData.append("job_title", data.jobTitle);
      formData.append("website", data.website);
      formData.append("apv", data.annualProcessingVolume);
      formData.append("ata", data.averageTransactionAmount);
      formData.append("charge_back_per", data.chargeBackPercentage);
      formData.append("currencies_req", data.currenciesRequired);
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(
        `${baseUrl}/createMerchantAdmin`,
        formData,
        config
      );
      console.log(result);
      navigate("/merchantAdmin")
      toast.success(result.data.message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }catch (error) {
      console.log(error);
      toast.error("Server Error", {
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

  return (
    <>
      <Header title="Merchant  Add New" path="/merchantAdmin" />
      <form className=" container" onSubmit={handleSubmit}>
        <FormSlice
          name="First name"
          type="text"
          name2="fname"
          value={data.fname}
          onChange={handleChange}
        />
        <FormSlice
          name="Last name"
          type="text"
          name2="lname"
          value={data.lname}
          onChange={handleChange}
        />
        <FormSlice
          name="Email"
          type="email"
          name2="email"
          value={data.email}
          onChange={handleChange}
        />
        <FormSlice
          name="Mobile no"
          type="text"
          name2="mobileNo"
          value={data.mobileNo}
          onChange={handleChange}
        />
        <FormSlice
          name="Business name"
          type="text"
          name2="businessName"
          value={data.businessName}
          onChange={handleChange}
        />
        <FormSlice
          name="Business location"
          type="text"
          name2="businessLocation"
          value={data.businessLocation}
          onChange={handleChange}
        />
        <FormSlice
          name="Job title"
          type="text"
          name2="jobTitle"
          value={data.jobTitle}
          onChange={handleChange}
        />
        <FormSlice
          name="Website"
          type="text"
          name2="website"
          value={data.website}
          onChange={handleChange}
        />
        <FormSlice
          name="Annual Processing Volume"
          type="text"
          name2="annualProcessingVolume"
          value={data.annualProcessingVolume}
          onChange={handleChange}
        />
        <FormSlice
          name="Average Transaction Amount"
          type="text"
          name2="averageTransactionAmount"
          value={data.averageTransactionAmount}
          onChange={handleChange}
        />
        <FormSlice
          name="Charge back percentage"
          type="text"
          name2="chargeBackPercentage"
          value={data.chargeBackPercentage}
          onChange={handleChange}
        />
        <FormSlice
          name="Currencies required"
          type="text"
          name2="currenciesRequired"
          value={data.currenciesRequired}
          onChange={handleChange}
        />
        <div className="text-end">
          <Button
            variant="primary"
            type="submit"
            style={{
              borderRadius: "20px",
              marginTop: "20px",
              color: "#fff",
              background: "#ff6600",
              display: "flex",
              marginLeft: "auto",
            }}
          >
            Create
          </Button>
        </div>
      </form>
    </>
  );
}

const FormSlice = ({ name, type, name2, value, onChange }) => {
  return (
    <>
      <div className="mb-3">
        <label className="form-label">{name}</label>
        <input
          type={type}
          className="form-control"
          name={name2}
          value={value}
          onChange={onChange}
        />
      </div>
    </>
  );
};

export default AddNewMerchantAdmin;
