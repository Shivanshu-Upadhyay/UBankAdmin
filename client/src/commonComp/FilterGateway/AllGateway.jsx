import React, { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "../../components/config/baseUrl";

function AllGateway({setGatewaySelect}) {
    const auth = localStorage.getItem("admin");
    const [gateway, setGateway] = useState([]);
    useEffect(() => {
      let fetchData = async () => {
        try {
          let formData = new FormData();
          const config = {
            headers: {
              "content-type": "multipart/form-data",
              Authorization: `Bearer ${auth}`,
            },
          };
          let result = await axios.post(
            `${baseUrl}/allGateway`,
            formData,
            config
          );
          setGateway(result.data.Data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }, [auth]);

  return (
    <>
      <select className="form-select" onChange={(e)=>setGatewaySelect(e.target.value)}>
            <option> Select Gateway</option>
                {gateway.map((item, index) => (
                    <option value={item.id}>{item.gateway_name}</option>
                ))}
      </select>
    </>
  );
}

export default AllGateway;
