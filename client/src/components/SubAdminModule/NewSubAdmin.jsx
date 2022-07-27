import React, { useState } from "react";
import Common from "./Common";
import Header from "../../commonComp/Header/Header";
import baseUrl from "../config/baseUrl";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function NewSubAdmin() {
  let [fname, setFname] = useState("");
  let [lname, setLname] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [role, setRole] = useState("");

  const auth = localStorage.getItem("admin");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
  console.log(fname, lname, email, password, role);
    try {
      let formData = new FormData();
      formData.append("fname", fname);
      formData.append("lname", lname);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("role", role);

      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };

      let result = await axios.post(
        `${baseUrl}/createSubAdmin`,
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
        navigate("/subAdmin");
      } else {
        toast.error(result.data.message, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header title="Add New Sub Admin " path="/subAdmin" />
      <Common
        fname={fname}
        setFname={setFname}
        lname={lname}
        setLname={setLname}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        role={role}
        setRole={setRole}
        handleSubmit={handleSubmit}
        buttonText="Create"
      />
    </>
  );
}

export default NewSubAdmin;
