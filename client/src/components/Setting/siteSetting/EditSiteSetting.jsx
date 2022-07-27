import React, { useState, useEffect } from "react";
import Header from "../../../commonComp/Header/Header";
import { Button } from "@mui/material";
import baseUrl from "../../config/baseUrl";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
function EditSiteSetting() {
  const auth = localStorage.getItem("admin");
  const navigate = useNavigate();
  const [data, setData] = useState({
    contact_no: "",
    email: "",
    skype: "",
    copyright: "",
    full_address: "",
    facebook: "",
    twitter: "",
    instagram: "",
    google_plus: "",
  });
  let { id } = useParams();
  useEffect(() => {
    defaultApi();
  }, []);

  const defaultApi = async () => {
    try {
      let formData = new FormData();
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(`${baseUrl}/siteSetting`, formData, config);
      console.log(result.data.data);
      setData({
        contact_no: result.data.data.contact_no,
        email: result.data.data.email,
        skype: result.data.data.skype,
        copyright: result.data.data.copyright,
        full_address: result.data.data.full_address,
        facebook: result.data.data.facebook,
        twitter: result.data.data.twitter,
        instagram: result.data.data.linkedin,
        google_plus: result.data.data.google_plus,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let formData = new FormData();
      formData.append("contact_no", data.contact_no);
      formData.append("email", data.email);
      formData.append("skype", data.skype);
      formData.append("copyright", data.copyright);
      formData.append("full_address", data.full_address);
      formData.append("facebook", data.facebook);
      formData.append("twitter", data.twitter);
      formData.append("linkedin", data.instagram);
      formData.append("google_plus", data.google_plus);
      formData.append("id", id);

      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(
        `${baseUrl}/updateSiteSetting`,
        formData,
        config
      );

      if (result.status === 200) {
        toast.success(result.data.message, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate("/siteSetting");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Header title="Manage Site Setting Edit" path="/siteSetting" />
      <FormSlice
        title="Conatct No."
        type="text"
        name="contact_no"
        value={data.contact_no}
        onChange={handleChange}
      />
      <FormSlice
        title="Email"
        type="text"
        name="email"
        value={data.email}
        onChange={handleChange}
      />
      <FormSlice
        title="Skype"
        type="text"
        name="skype"
        value={data.skype}
        onChange={handleChange}
      />
      <FormSlice
        title="Copyright"
        type="text"
        name="copyright"
        value={data.copyright}
        onChange={handleChange}
      />
      <FormSlice
        title="Address"
        type="text"
        name="full_address"
        value={data.full_address}
        onChange={handleChange}
      />
      <FormSlice
        title="Facebook"
        type="text"
        name="facebook"
        value={data.facebook}
        onChange={handleChange}
      />
      <FormSlice
        title="Twitter"
        type="text"
        name="twitter"
        value={data.twitter}
        onChange={handleChange}
      />
      <FormSlice
        title="Instagram"
        type="text"
        name="instagram"
        value={data.instagram}
        onChange={handleChange}
      />
      <FormSlice
        title="Google Plus"
        type="text"
        name="google_plus"
        value={data.google_plus}
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
          Update
        </Button>
      </div>
    </form>
  );
}

const FormSlice = ({ title, type, name, value, onChange }) => {
  return (
    <>
      <div className="mb-3">
        <label className="form-label">{title}</label>
        <input
          type={type}
          className="form-control"
          name={name}
          value={value}
          onChange={onChange}
        />
      </div>
    </>
  );
};
export default EditSiteSetting;
