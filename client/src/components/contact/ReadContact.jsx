import React, { useState, useEffect } from "react";
import Header from "../../commonComp/Header/Header";
import baseUrl from "../config/baseUrl";
import axios from "axios";
import {useParams } from "react-router-dom";
import { toast } from "react-toastify";
function ReadContact() {
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
          `${baseUrl}/readContact`,
          formData,
          config
        );
         console.log(result.data.data);
         setData(result.data.data)
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
      <Header title=" Manage Contact-Us > Details" path="/contact" />
      <table class="table table-striped my-4">
 
  <tbody>
    <tr>
      <th scope="row">Name</th>
      <td>{data.name}</td>
    </tr>
    <tr>
      <th scope="row">Email</th>
      <td >{data.email}</td>
    </tr>
    <tr>
      <th scope="row">Mobile No</th>
      <td >{data.mobile}</td>
    </tr>
    <tr>
      <th scope="row">Message</th>
      <td >{data.message}</td>
    </tr>
    <tr>
      <th scope="row">Send Date</th>
      <td >{data.created_on}</td>
    </tr>
    
  </tbody>
</table>
    </>
  );
}
export default ReadContact;
