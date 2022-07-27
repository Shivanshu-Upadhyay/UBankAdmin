import React from "react";
import Form from "react-bootstrap/Form";
import { Button } from "@mui/material";

function Common({
  type,
  setType,
  title,
  setTitle,
  code,setCode,
  handleSubmit,
  buttonText,
}) {
  return (
    <>
      <div className="box">
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Group style={{ marginTop: "10px" }}>
          <Form.Label>
              Type<span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Select value={type} onChange={(e)=>setType(e.target.value)}>
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
