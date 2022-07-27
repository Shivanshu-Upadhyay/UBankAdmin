import React, { useState, useEffect } from "react";
import Header from "../../commonComp/Header/Header";
import baseUrl from "../config/baseUrl";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
function ViewSubAdmin() {
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
          `${baseUrl}/getViewSubAdmin`,
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
      <Header title="Sub Admin > Details" path="/subAdmin" />
      <table className="table table-striped my-4">
 
  <tbody>
    <tr>
      <th scope="row">First Name</th>
      <td>{data.firstname}</td>
    </tr>
    <tr>
      <th scope="row">Last Name</th>
      <td >{data.lastname}</td>
    </tr>
    <tr>
      <th scope="row">Email</th>
      <td >{data.email}</td>
    </tr>
    <tr>
      <th scope="row">Last Login</th>
      <td >{data.last_login_date}</td>
    </tr>
    <tr>
      <th scope="row">Last Logout</th>
      <td >{data.last_logout_time}</td>
    </tr>
    <tr>
      <th scope="row">Status</th>
      <td >{data.status?"Enable":"Disable"}</td>
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


export default ViewSubAdmin