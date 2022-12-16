import React, { useEffect, useState } from "react";
import CommonCMS from "./CommonCMS";
import Header from "../../../commonComp/Header/Header";
import baseUrl from "../../config/baseUrl";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function EditCMS() {
  const [page_title, setPage_title] = useState("");
  const [content, setContent] = useState("");
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
          `${baseUrl}/readOneCMS`,
          formData,
          config
        );
        console.log(result.data.content)
        setPage_title(result.data.page_title);
        setContent(result.data.content);
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
      formData.append("page_title", page_title);
      formData.append("content", content);
      formData.append("id",id)
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };
      let result = await axios.post(
        `${baseUrl}/updateCMS`,
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
      navigate("/CMS");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header title="Pages > Edit New" path="/CMS" />
      <CommonCMS
        page_title={page_title}
        setPage_title={setPage_title}
        content={content}
        setContent={setContent}
        handleSubmit={handleSubmit}
        buttonText="Update"
      />
    </>
  );
}

export default EditCMS;
