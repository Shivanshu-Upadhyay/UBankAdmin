import React from "react";
import Form from "react-bootstrap/Form";
import { Button } from "@mui/material";

function Table({
  payment_gate,
  setPayment_gate,
  title,
  setTitle,
  title_en,
  setTitle_en,
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
            value={payment_gate} onChange={(e)=>setPayment_gate(e.target.value)}
            >
            <option>Select Gate</option>
            <option value="19">YTpay</option>
            <option value="16">Gate8</option>
            </Form.Select>
          <Form.Group style={{ marginTop: "10px" }}>
            <Form.Label>
              Title<span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control type="text" value={title} onChange={(e)=>setTitle(e.target.value)}/>
          </Form.Group>
          <Form.Group style={{ marginTop: "10px" }}>
            <Form.Label>
              Title EN<span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control type="text"  value={title_en} onChange={(e)=>setTitle_en(e.target.value)}/>
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

export default Table;
