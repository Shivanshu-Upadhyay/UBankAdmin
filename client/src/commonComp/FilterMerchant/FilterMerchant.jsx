import axios from "axios";
import React, { useEffect, useState } from "react";
import baseUrl from "../../components/config/baseUrl";

function FilterMerchant({setMerchantSelect}) {
  const auth = localStorage.getItem("admin");
  const [merchant, setMerchant] = useState([]);
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
          `${baseUrl}/allMerchant`,
          formData,
          config
        );
        
        if (result.data.Data) {
          setMerchant(result.data.Data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [auth]);

  return (
    <>
      <select className="form-select" onChange={(e)=>setMerchantSelect(e.target.value)}>
        <option selected>Select By Merchant</option>
        {merchant.map((item, index) => (
          <option value={item.id}>{item.name}</option>
        ))}
      </select>
    </>
  );
}

export default FilterMerchant;
