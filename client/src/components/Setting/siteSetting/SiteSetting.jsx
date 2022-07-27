import React, { useState, useEffect } from "react";
import { Link,Outlet } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import GoogleIcon from "@mui/icons-material/Google";
import baseUrl from "../../config/baseUrl";
import axios from "axios";
import { useStateContext } from "../../../context/ContextProvider";

function SiteSetting({authCreate, authRead, authUpdate, authDelete}) {
  const auth = localStorage.getItem("admin");
  const [data, setData] = useState({});
  const { setActive, setActive2, setToggel } = useStateContext();
  useEffect(() => {
    // setActive(14);
    // setActive2("Site Setup");
    // setToggel(true);
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
      setData(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    
      <div className="row justify-content-between align-items-center">
        <div className="col-sm-8">
          <h4 className="headingAll"> Manage Site Setting Details</h4>
        </div>
        <div className="col-sm-4 text-end">
        {authUpdate?<Link to={`/EditSiteSetting/${data.id}`} className="btn btn-primary">
            <EditIcon />
          </Link>:null}
          
        </div>
      </div>
      <div className="container my-3">
        <TableBlock data={data} />
      </div>
    </>
  );
}

const TableBlock = ({data}) => {
  return (
    <table className="table table-bordered ">
      <tbody>
        <TableRow title="Contact Number" value={data.contact_no} />
        <TableRow title="Email" value={data.email} />
        <TableRow title="Copyright" value={data.copyright} />
        <TableRow title="Address" value={data.full_address} />
        <TableRow title="Facebook" value={data.facebook}>
          <FacebookIcon />
        </TableRow>
        <TableRow title="Twitter" value={data.twitter}>
          
          <TwitterIcon />
        </TableRow>
        <TableRow title="Instagram" value={data.linkedin}>
          <InstagramIcon />
        </TableRow>
        <TableRow title="Google plus" value={data.google_plus}>
          <GoogleIcon />
        </TableRow>
      </tbody>
    </table>
  );
};

const TableRow = ({ title, value, children }) => {
  return (
    <tr>
      <th scope="row" style={{ width: "30%" }}>
        {children} {title}
      </th>
      <td>{value}</td>
    </tr>
  );
};

export default SiteSetting;
