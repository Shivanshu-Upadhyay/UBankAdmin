import React from "react";
import Form from "react-bootstrap/Form";
import { Button } from "@mui/material";

function Common({
  type,
  setType,
  gateway_name,
  setGateway_Name,
  merNo,
  setMerNo,
  gateway_number,
  setGateway_Number,
  key1,
  setKey1,
  handleSubmit,
  buttonText,
}) {
  return (
    <>
      <div className="box">
        <Form onSubmit={(e)=>handleSubmit(e)}>

        <Form.Label style={{ marginTop: "10px" }}>
        Select Gate<span style={{ color: "red" }}>*</span>
        </Form.Label>
        <Form.Select
        aria-label="Default select example"
        style={{ marginTop: "10px", boxShadow: "none" }}
        value={type} onChange={(e)=>setType(e.target.value)}
        >
        <option>Select Gate</option>
        <option value="0">Payin</option>
        <option value="1">Payout</option>        
        </Form.Select>
          
          <Form.Group style={{ marginTop: "10px" }}>
            <Form.Label>
              Gateway Name<span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control type="text" value={gateway_name} onChange={(e)=>setGateway_Name(e.target.value)}/>
          </Form.Group>
          
          
          <Form.Group style={{ marginTop: "10px" }}>
            <Form.Label>
            Mer. No<span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control type="text"  value={merNo} onChange={(e)=>setMerNo(e.target.value)}/>
          </Form.Group>
          
          
          <Form.Group style={{ marginTop: "10px" }}>
            <Form.Label>
              Gateway Number<span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control type="text"  value={gateway_number} onChange={(e)=>setGateway_Number(e.target.value)}/>
          </Form.Group>
          
          
          <Form.Group style={{ marginTop: "10px" }}>
            <Form.Label>
              Key<span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control type="text" value={key1} onChange={(e)=>setKey1(e.target.value)}/>
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
