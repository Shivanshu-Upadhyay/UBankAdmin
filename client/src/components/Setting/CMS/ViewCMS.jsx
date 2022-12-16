import React, { useState, useEffect } from "react";
import Header from "../../../commonComp/Header/Header";
import baseUrl from "../../config/baseUrl";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";


function ViewCMS() {
  const [data,setData] = useState([])
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
          `${baseUrl}/viewCMS`,
          formData,
          config
        );
         console.log(result.data.data[0]);
         setData(result.data.data[0])
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

 
  return (
    <>
      <Header title="Pages > Details" path="/CMS" />
        <table className="table table-bordered my-4 table-box">
            <tbody>
                <tr>
                    <th scope="row">Page Title</th>
                    <td>{data.page_title}</td>
                </tr>
                <tr>
                    <th scope="row">Content</th>
                    <td style={{whiteSpace: "break-spaces"}}>{data.content}</td>
                </tr>
                <tr>
                    <th scope="row">Created On</th>
                    <td >{data.created_on}</td>
                </tr>
                <tr>
                    <th scope="row">Updated On</th>
                    <td >{data.updated_on}</td>
                </tr>
                
            </tbody>
        </table>
    </>
  );
}


export default ViewCMS