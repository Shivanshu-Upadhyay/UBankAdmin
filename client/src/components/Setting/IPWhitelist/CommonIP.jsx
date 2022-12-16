import React, { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "../../config/baseUrl";
import Form from "react-bootstrap/Form";
import { Button } from "@mui/material";

function CommonIP({
  gateway,
  setGateway,
  ip,
  setIP,
  handleSubmit,
  buttonText,
}) {

    const [gatewayName, setGatewayName] = useState([])
    const auth = localStorage.getItem("admin");
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
          setGatewayName(result.data.Data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }, [auth]);
  return (
    <>
      <div className="box">
        <Form onSubmit={(e) => handleSubmit(e)}>
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
                }
                )
              }
            </Form.Select>
          </Form.Group>
          <Form.Group style={{ marginTop: "10px" }}>
            <Form.Label>
              IP<span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="127.0.0.1"
              value={ip}
              onChange={(e) => setIP(e.target.value)}
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

export default CommonIP;
