import React, { useEffect, useState } from "react";
import CommonMeta from "./CommonMeta";
import Header from "../../../commonComp/Header/Header";
import baseUrl from "../../config/baseUrl";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


function EditMeta() {
  const [page_title, setPage_title] = useState("");
  const [meta_keyword, setMeta_keyword] = useState("");
  const [meta_description, setMeta_description] = useState("");
  let { meta_id } = useParams();
  const auth = localStorage.getItem("admin");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let formData = new FormData();
        formData.append("meta_id", meta_id);
        const config = {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${auth}`,
          },
        };
        let result = await axios.post(
          `${baseUrl}/readOneMeta`,
          formData,
          config
        );
        setPage_title(result.data.page_title);
        setMeta_keyword(result.data.meta_keyword);
        setMeta_description(result.data.meta_description);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [meta_id, auth]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let formData = new FormData();
      formData.append("meta_id", meta_id);
      formData.append("page_title", page_title);
      formData.append("meta_keyword", meta_keyword);
      formData.append("meta_description", meta_description);
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };
      let result = await axios.post(
        `${baseUrl}/updateMeta`,
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
      navigate("/Meta");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header title="Meta > Edit" path="/Meta" />
      <CommonMeta
        page_title={page_title}
        setPage_title={setPage_title}
        meta_keyword={meta_keyword}
        setMeta_keyword={setMeta_keyword}
        meta_description={meta_description}
        setMeta_description={setMeta_description}
        handleSubmit={handleSubmit}
        buttonText="Update"
      />
    </>
  );
}

export default EditMeta;
