import React, { useEffect } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "@mui/material";
import baseUrl from "../config/baseUrl";
import axios from "axios";
function Common({
  type,
  setType,
  type1,
  setType1,
  bankCode,
  setBankCode,
  bankCodeName, setBankCodeName,
  bankServicesCharge,
  setbankServicesCharge,
  type1Name, setType1Name,
  title,
  setTitle,
  code,
  setCode,
  handleSubmit,
  buttonText,
}) {
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
        `${baseUrl}/readType1BankCode`,
        formData,
        config
      );
      let result2 = await axios.post(
        `${baseUrl}/readType2BankCode`,
        formData,
        config
      );    
      setType1Name(result.data.data);
      setBankCodeName(result2.data.data);
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
              Type<span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Select value={type} onChange={(e) => setType(e.target.value)}>
              <option value={-1}>Select</option>
              <option value={0}>NetBacking</option>
              <option value={1}>Wallet</option>
              <option value={2}>UPI</option>
              <option value={3}>Credite Card</option>
              <option value={4}>Debit Card</option>
              <option value={5}>QR Code</option>
            </Form.Select>
          </Form.Group>
          <Form.Group style={{ marginTop: "10px" }}>
            <Form.Label>
              Type<span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Select value={type1} onChange={(e) => setType1(e.target.value)}>
            <option value={-1}>Select</option>
            {
                type1Name.map((item, index) => {
                  return (
                    <option key={index} value={item.id}>
                      {item.gateway_name}
                    </option>
                  );
                }
                )
              }
            </Form.Select>
          </Form.Group>
          <Form.Group style={{ marginTop: "10px" }}>
            <Form.Label>
              Akonto Bank Code<span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Select value={bankCode} onChange={(e) => setBankCode(e.target.value)}>
              <option value={0}>Select</option>
              {bankCodeName.map((item,index)=>{
                return(
                  <option key={index} value={item.code}>
                    {item.title}
                  </option>
                )

              })}
              
            </Form.Select>
          </Form.Group>
          <Form.Group style={{ marginTop: "10px" }}>
            <Form.Label>
              Title<span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group style={{ marginTop: "10px" }}>
            <Form.Label>
              Code<span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </Form.Group>

          <Form.Group style={{ marginTop: "10px" }}>
            <Form.Label>
              Bank Services Charge<span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control
              type="text"
              value={bankServicesCharge}
              onChange={(e) => setbankServicesCharge(e.target.value)}
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

export default Common;
