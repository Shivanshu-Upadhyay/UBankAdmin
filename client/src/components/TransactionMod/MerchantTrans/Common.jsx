import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "@mui/material";

import baseUrl from "../../config/baseUrl";
import axios from "axios";

function Common({
  user_id,
  setUser_id,
  type,
  setType,
  uniqueId,
  setUniqueId,
  currencyID,
  setCurrencyID,
  payee_name,
  setPayee_name,
  amount,
  setAmount,
  handleSubmit,
  buttonText,
}) {

  const [data, setData] = useState([]);
  const [pass, setPass] = useState([]);
  const auth = localStorage.getItem("admin");

  const ReadData = async () => {
    try {
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${auth}`,
        },
      };
      let result = await axios.post(`${baseUrl}/defaultMT`,config);
      console.log(result.data.merchants)
      setData(result.data.merchants);
     
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    ReadData();
  }, []);

  const MerchantCurrency = async(val)=>{  
    try{
        const config = {
            headers: {
                "content-type": "multipart/form-data",
                Authorization: `Bearer ${auth}`,
            },
        };
        let formData = new FormData();
          formData.append("id", val);
        let cur = await axios.post(`${baseUrl}/getCurrencyMT`, formData, config)

        setPass(cur.data.data);
     
        console.log(cur.data);
        } catch(error){
            console.log(error);
        }
    }

  return (
    <>
      <div className="box">
        <Form onSubmit={(e)=>handleSubmit(e)}>
          <Form.Label style={{ marginTop: "10px" }}>
          Name<span style={{ color: "red" }}>*</span>
          </Form.Label>
          <Form.Select
          aria-label="Default select example"
          style={{ marginTop: "10px", boxShadow: "none" }}
          value={user_id} onChange={(e)=>{MerchantCurrency(e.target.value);setUser_id(e.target.value)}}
          >
          <option value="select name">Select Merchant</option>
          {
            data.map((item,index)=>{
            return(
              <option key={index} value={item.id}>
              {item.name}
              </option>
            );
            })
          }        
          </Form.Select>

          <Form.Label style={{ marginTop: "10px" }}>
          Currency<span style={{ color: "red" }}>*</span>
          </Form.Label>
          <Form.Select
          aria-label="Default select example"
          style={{ marginTop: "10px", boxShadow: "none" }}
          value={currencyID} onChange={(e)=>setCurrencyID(e.target.value)}
          >
          <option value="-1">Select Currency</option>
          {
            pass.map((item,index)=>{
              return(
                <option key={index} value={item.currencyID}>
                  {item.sortname}
                </option>
              );
            })
          }        
          </Form.Select>

          <Form.Label style={{ marginTop: "10px" }}>
          Trx. Type<span style={{ color: "red" }}>*</span>
          </Form.Label>
          <Form.Select
          aria-label="Default select example"
          style={{ marginTop: "10px", boxShadow: "none" }}
          value={type} onChange={(e)=>setType(e.target.value)}
          >
          <option value="-1">Select Gate</option>
          <option value="CASH">Cash</option>
          <option value="CRYPTO">Crypto</option>        
          </Form.Select>
          
          <Form.Group style={{ marginTop: "10px" }}>
          <Form.Label>
          Transaction Id<span style={{ color: "red" }}>*</span>
          </Form.Label>
          <Form.Control type="text" value={uniqueId} onChange={(e)=>setUniqueId(e.target.value)}/>
          </Form.Group>
          
          
          <Form.Group style={{ marginTop: "10px" }}>
          <Form.Label>
          Name<span style={{ color: "red" }}>*</span>
          </Form.Label>
          <Form.Control type="text"  value={payee_name} onChange={(e)=>setPayee_name(e.target.value)}/>
          </Form.Group>
          
          
          <Form.Group style={{ marginTop: "10px" }}>
          <Form.Label>
          Amount<span style={{ color: "red" }}>*</span>
          </Form.Label>
          <Form.Control type="text"  value={amount} onChange={(e)=>setAmount(e.target.value)}/>
          </Form.Group>
      

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
          {buttonText}
          </Button>
        </Form>
      </div>
    </>
  );
}

export default Common;
