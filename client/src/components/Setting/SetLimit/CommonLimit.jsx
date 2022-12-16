import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "@mui/material";
import baseUrl from "../../config/baseUrl";
import axios from "axios";

function CommonLimit({
  merchants,
  setMerchants,
  gateway,
  setGateway,
  currency,
  setCurrency,
  min_amount, 
  setMin_amount,
  max_amount, 
  setMax_amount,
  handleSubmit,
  buttonText,
}) {

    const [merchantName, setMerchantName] = useState([])
    const [gatewayName, setGatewayName] = useState([])
    const [currencyName, setCurrencyName] = useState([])
    const auth = localStorage.getItem("admin");
  
  const typeDataFirst = async () => {
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
      let result1 = await axios.post(
        `${baseUrl}/allCurrency`,
        formData,
        config
      );
      let result2 = await axios.post(
        `${baseUrl}/allGateway`,
        formData,
        config
      );    
      setMerchantName(result.data.Data);
      setCurrencyName(result1.data.Data);
      setGatewayName(result2.data.Data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    typeDataFirst();
  }, []);

  return (
    <>
      <div className="box">
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Group style={{ marginTop: "10px" }}>
            <Form.Label>
              Merchant ID<span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Select value={merchants} onChange={(e) => setMerchants(e.target.value)}>
                <option value={0}>Select</option>
                {merchantName.map((item,index)=>{
                    return(
                        <option value={item.id}>{item.name}</option>
                    )

                })}
            </Form.Select>
          </Form.Group>
          <Form.Group style={{ marginTop: "10px" }}>
            <Form.Label>
              Gateway<span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Select value={gateway} onChange={(e) => setGateway(e.target.value)}>
                <option value={-1}>Select</option>
                {
                    gatewayName.map((item, index) => {
                        return (
                            <option key={index} value={item.id}>
                            {item.gateway_name}
                            </option>
                        );
                    })
                }
            </Form.Select>
          </Form.Group>
          <Form.Group style={{ marginTop: "10px" }}>
            <Form.Label>
              Currency<span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Select value={currency} onChange={(e) => setCurrency(e.target.value)}>
                <option value={-1}>Select</option>
                {
                    currencyName.map((item, index) => {
                    return (
                        <option key={index} value={item.currency_code}>
                            {item.currency_code}
                        </option>
                    );
                    }
                    )
                }
            </Form.Select>
          </Form.Group>
          <Form.Group style={{ marginTop: "10px" }}>
            <Form.Label>
                Min. Amount<span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control
              type="text"
              value={min_amount}
              onChange={(e) => setMin_amount(e.target.value)}
            />
          </Form.Group>
          <Form.Group style={{ marginTop: "10px" }}>
            <Form.Label>
                Min. Amount<span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control
              type="text"
              value={max_amount}
              onChange={(e) => setMax_amount(e.target.value)}
            />
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

export default CommonLimit;
